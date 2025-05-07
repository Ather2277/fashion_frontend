// File: SocialShareButtons.tsx
import { toast } from 'sonner';
import {
  Share, Facebook, Instagram, SearchIcon,
  MessageCircle, ShoppingBag, Heart, Download
} from 'lucide-react';
import { ShareButton } from './ShareButton';
import { databases } from '@/lib/appwrite';
import { ID, Storage, Permission, Role, Client } from 'appwrite';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

interface SocialShareButtonsProps {
  designId: string;
  imageUrl: string;
  onAddToGallery: () => void;
  liked: boolean;
  onLike: () => void;
  likesCount: number;
  generatedText: string;
}

const DATABASE_ID = '67f0024d002a19d137d4';
const COLLECTION_ID = '67f00267000a7cc16cee';
const BUCKET_ID = '67f002eb0021be72cc3b';
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '67f001a80013dfc3ff5a';

export function SocialShareButtons({
  designId,
  imageUrl,
  onAddToGallery,
  liked,
  onLike,
  likesCount,
  generatedText,
}: SocialShareButtonsProps) {
  const { user } = useAuth();
  const [serverClient, setServerClient] = useState<{ client: Client, storage: Storage } | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    const storage = new Storage(client);
    setServerClient({ client, storage });
  }, []);

  const uploadImageToAppwrite = async (): Promise<string> => {
    if (uploadedUrl) return uploadedUrl;
    if (!serverClient) throw new Error("Appwrite client not initialized");

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    const blob = await response.blob();
    const file = new File([blob], 'generated-outfit.jpg', { type: 'image/jpeg' });

    const upload = await serverClient.storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file,
      [Permission.read(Role.any())]
    );

    const fileUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${upload.$id}/view?project=${APPWRITE_PROJECT_ID}`;
    setUploadedUrl(fileUrl);
    return fileUrl;
  };

  const handleShare = async (platform: string) => {
    let shareLink = '';
    let fileUrl = imageUrl;

    if (['whatsapp', 'facebook', 'twitter'].includes(platform)) {
      try {
        fileUrl = await uploadImageToAppwrite();
      } catch (e) {
        toast.error("Upload failed. Cannot share image.");
        return;
      }
    }

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=Check out this AI-generated fashion design:\n${fileUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fileUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=Check out this AI-generated fashion design&url=${encodeURIComponent(fileUrl)}`;
        break;
      case 'instagram':
        handleDownload();
        toast.info('Image downloaded. Please open Instagram and upload it manually.');
        return;
      case 'myntra':
        navigateToMyntra(generatedText);
        return;
      case 'google':
        navigateToGoogleShopping(generatedText);
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank');
      toast.success(`Shared on ${platform}`);
    }
  };

  const navigateToMyntra = (text: string) => {
    const formatted = text.toLowerCase().replace(/\s+/g, '-');
    window.open(`https://www.myntra.com/${formatted}`, '_blank');
  };

  const navigateToGoogleShopping = (text: string) => {
    window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'StyleAI-outfit.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
  
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image.");
      console.error("Download error:", error);
    }
  };
  
  
  const handleAddToGallery = async () => {
    if (!user) {
      toast.error("You must be logged in to save to gallery.");
      return;
    }

    const loadingToast = toast.loading("Saving to gallery...");
    try {
      const fileUrl = await uploadImageToAppwrite();
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        prompt: generatedText,
        url: fileUrl,
        fileId: fileUrl.split('/files/')[1]?.split('/')[0],
        likes: 0,
        User_Email: user.email,
        User_Id: user.id,
      });
      toast.dismiss(loadingToast);
      toast.success("Design saved to community gallery!");
      onAddToGallery();
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(
        <div>
          <p>Failed to save design: {err.message}</p>
          <p className="text-sm mt-1">Ensure you're logged in and have proper permissions.</p>
        </div>
      );
    }
  };

  const handleLikeDesign = async () => {
    if (!user) {
      toast.error("You must be logged in to like designs.");
      return;
    }
    onLike();

    try {
      const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, designId);
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, designId, {
        likes: (doc.likes || 0) + 1
      });
      toast.success("You liked this design!");
    } catch (error: any) {
      console.error("Failed to update likes:", error);
      toast.error(error.message || "Failed to like the design.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <ShareButton icon={MessageCircle} onClick={() => handleShare('whatsapp')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#25D366" color="#ffffff" title="Share on WhatsApp" />
      <ShareButton icon={Instagram} onClick={() => handleShare('instagram')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#E1306C" color="#ffffff" title="Share on Instagram" />
      <ShareButton icon={Facebook} onClick={() => handleShare('facebook')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#3b5998" color="#ffffff" title="Share on Facebook" />
      <ShareButton icon={Share} onClick={() => handleShare('twitter')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#1DA1F2" color="#ffffff" title="Share on Twitter" />
      <ShareButton icon={ShoppingBag} onClick={() => handleShare('myntra')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#FB56C1" color="#ffffff" title="Search on Myntra" />
      <ShareButton icon={SearchIcon} onClick={() => handleShare('google')} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#4285F4" color="#ffffff" title="Search on Google Shopping" />
      <ShareButton icon={Download} onClick={handleDownload} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#4CAF50" color="#ffffff" title="Download Image" />
      <ShareButton icon={Share} onClick={handleAddToGallery} className="h-8 w-8 rounded-full hover:opacity-90" bgColor="#8B5CF6" color="#ffffff" title="Add to Gallery" />
      <ShareButton
        icon={Heart}
        onClick={handleLikeDesign}
        className="h-8 rounded-full hover:opacity-90"
        bgColor={liked ? "#EF4444" : "#F87171"}
        color="#ffffff"
        label={likesCount > 0 ? likesCount.toString() : undefined}
        title="Like this Design"
      />
    </div>
  );
}
