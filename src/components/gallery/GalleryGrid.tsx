import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ShoppingBag, Share2, Upload, Download, Heart, MessageCircle, Instagram, Facebook, Twitter, SearchIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { Client, Storage, ID, Permission, Role } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { useAuth } from '@/contexts/AuthContext';
import { GalleryItem } from './GalleryItem';

interface GalleryGridProps {
  items: Array<{
    id: string;
    imageUrl: string;
    prompt: string;
    userName: string;
    userLiked: boolean;
    likes: number;
  }>;
  layout: 'grid' | 'masonry';
  onLike: (itemId: string) => void;
  onAddToGallery: (itemId: string) => void;
}

export function GalleryGrid({ items, layout, onLike, onAddToGallery }: GalleryGridProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pattern = useMemo(() => [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
  ], []);

  const openViewer = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => setIsViewerOpen(false), []);

  const sortedItems = [...items];

  return (
    <>
      <div 
        className={layout === 'grid' 
          ? "grid grid-cols-3 lg:grid-cols-4 auto-rows-[8rem] sm:auto-rows-[10rem] md:auto-rows-[12rem] gap-1 sm:gap-2 md:gap-3"
          : "columns-3 lg:columns-4 gap-1 sm:gap-2 md:gap-3 space-y-3"
        }
      >
        {sortedItems.map((item, idx) => (
          <GalleryItem 
            key={item.id}
            item={item}
            layout={layout}
            onLike={onLike}
            onAddToGallery={onAddToGallery}
            spanClass={layout === 'grid' ? pattern[idx % pattern.length] : ''}
            onOpen={() => openViewer(idx)}
          />
        ))}
      </div>

      {isViewerOpen && (
        <ReelViewer items={sortedItems} startIndex={currentIndex} onClose={closeViewer} />
      )}
    </>
  );
}

function ReelViewer({ items, startIndex, onClose }: { items: GalleryGridProps['items']; startIndex: number; onClose: () => void; }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState<null | 'shop' | 'share' | 'transfer'>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [serverClient, setServerClient] = useState<{ client: Client, storage: Storage } | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
  const APPWRITE_PROJECT_ID = '67f001a80013dfc3ff5a';
  const BUCKET_ID = '67f002eb0021be72cc3b';
  const DATABASE_ID = '67f0024d002a19d137d4';
  const COLLECTION_ID = '67f00267000a7cc16cee';

  useEffect(() => {
    const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    const storage = new Storage(client);
    setServerClient({ client, storage });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current.querySelectorAll('[data-reel-item]')[startIndex] as HTMLElement | undefined;
    if (node) node.scrollIntoView({ block: 'center' });
  }, [startIndex]);

  useEffect(() => {
    if (!user) return;
    const initial: Record<string, boolean> = {};
    items.forEach((it) => {
      const key = `like:${user.id}:${it.id}`;
      try { initial[it.id] = localStorage.getItem(key) === '1'; } catch {}
    });
    setLikedMap(initial);
  }, [items, user]);

  const uploadImageToAppwrite = async (imageUrl: string): Promise<string> => {
    if (uploadedUrl) return uploadedUrl;
    if (!serverClient) throw new Error('Appwrite client not initialized');
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    const blob = await response.blob();
    const file = new File([blob], 'community-outfit.jpg', { type: 'image/jpeg' });
    const upload = await serverClient.storage.createFile(BUCKET_ID, ID.unique(), file, [Permission.read(Role.any())]);
    const fileUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${upload.$id}/view?project=${APPWRITE_PROJECT_ID}`;
    setUploadedUrl(fileUrl);
    return fileUrl;
  };

  const handleDownload = async (imageUrl: string) => {
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
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image.');
      console.error('Download error:', error);
    }
  };

  const handleUploadToGallery = async (imageUrl: string, prompt: string, userName: string) => {
    const loadingToast = toast.loading('Saving to gallery...');
    try {
      const fileUrl = await uploadImageToAppwrite(imageUrl);
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        prompt,
        url: fileUrl,
        fileId: fileUrl.split('/files/')[1]?.split('/')[0],
        likes: 0,
        User_Email: userName,
        User_Id: user ? user.id : 'community',
      });
      toast.dismiss(loadingToast);
      toast.success('Design saved to community gallery!');
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err?.message || 'Failed to save design');
    }
  };

  const handleShare = async (platform: 'whatsapp' | 'facebook' | 'twitter' | 'instagram', imageUrl: string, prompt: string) => {
    let shareLink = '';
    let fileUrl = imageUrl;
    try {
      if (platform !== 'instagram') {
        fileUrl = await uploadImageToAppwrite(imageUrl);
      }
    } catch (e) {
      toast.error('Upload failed. Cannot share image.');
      return;
    }
    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=Check out this AI-generated fashion design:%0A${encodeURIComponent(fileUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fileUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this AI-generated fashion design')}&url=${encodeURIComponent(fileUrl)}`;
        break;
      case 'instagram':
        await handleDownload(imageUrl);
        toast.info('Image downloaded. Open Instagram to upload manually.');
        return;
    }
    if (shareLink) window.open(shareLink, '_blank');
  };

  const toggleLike = async (designId: string) => {
    if (!user) {
      toast.error('You must be logged in to like designs.');
      return;
    }
    const key = `like:${user.id}:${designId}`;
    const currentlyLiked = !!likedMap[designId];
    const delta = currentlyLiked ? -1 : 1;
    setLikedMap((m) => ({ ...m, [designId]: !currentlyLiked }));
    try {
      const doc: any = await databases.getDocument(DATABASE_ID, COLLECTION_ID, designId);
      const newLikes = Math.max(0, (doc.likes || 0) + delta);
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, designId, { likes: newLikes });
      try {
        if (currentlyLiked) localStorage.removeItem(key); else localStorage.setItem(key, '1');
      } catch {}
    } catch (error: any) {
      setLikedMap((m) => ({ ...m, [designId]: currentlyLiked }));
      toast.error(error?.message || 'Failed to update like.');
    }
  };

  const navigateToMyntra = (text: string) => {
    const formatted = text.toLowerCase().replace(/\s+/g, '-');
    window.open(`https://www.myntra.com/${formatted}`, '_blank');
  };
  const navigateToGoogleShopping = (text: string) => {
    window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(text)}`, '_blank');
  };

  const [currentIdx, setCurrentIdx] = useState(startIndex);
  useEffect(() => { setCurrentIdx(startIndex); }, [startIndex]);

  const scrollingRef = useRef(false);
  const itemsRef = useRef<NodeListOf<Element> | null>(null);
  useEffect(() => {
    itemsRef.current = containerRef.current?.querySelectorAll('[data-reel-item]') || null;
  }, [items]);

  const scrollToIndex = (idx: number) => {
    if (!itemsRef.current) return;
    const node = itemsRef.current[idx] as HTMLElement | undefined;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setCurrentIdx(idx);
    }
  };

  // Disable wheel navigation per request
  const handleWheel = useCallback((_e: React.WheelEvent) => {}, []);

  let startY = 0;
  const onTouchStart = (_e: React.TouchEvent) => {};
  const onTouchEnd = (_e: React.TouchEvent) => {};

  return (
    <div className="fixed inset-0 z-50 bg-black/90">
      <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/80 hover:text-white"><X className="w-7 h-7" /></button>
       <div ref={containerRef} className="h-full w-full flex items-center justify-center px-4" onWheel={handleWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
         {items.length > 0 && (
           <div key={items[currentIdx].id} data-reel-item className="relative w-full h-full flex items-center justify-center">
             <img src={items[currentIdx].imageUrl} alt={items[currentIdx].prompt} className="max-h-[80vh] w-auto object-contain" />

            {/* Right-side vertical actions */}
             <div className="hidden md:flex flex-col gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-40">
              <div className="relative">
                <button className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'shop' ? null : 'shop')}>
                  <ShoppingBag className="w-6 h-6" />
                </button>
                {openMenu === 'shop' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-14 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                    <button className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center" onClick={() => navigateToMyntra(items[currentIdx].prompt)} title="Shop (Myntra)">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center" onClick={() => navigateToGoogleShopping(items[currentIdx].prompt)} title="Search (Google Shopping)">
                      <SearchIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'share' ? null : 'share')}>
                  <Share2 className="w-6 h-6" />
                </button>
                {openMenu === 'share' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-14 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                    <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center" onClick={() => handleShare('whatsapp', items[currentIdx].imageUrl, items[currentIdx].prompt)} title="WhatsApp">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#E1306C] text-white flex items-center justify-center" onClick={() => handleShare('instagram', items[currentIdx].imageUrl, items[currentIdx].prompt)} title="Instagram">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center" onClick={() => handleShare('facebook', items[currentIdx].imageUrl, items[currentIdx].prompt)} title="Facebook">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center" onClick={() => handleShare('twitter', items[currentIdx].imageUrl, items[currentIdx].prompt)} title="Twitter">
                      <Twitter className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'transfer' ? null : 'transfer')}>
                  <Upload className="w-6 h-6" />
                </button>
                {openMenu === 'transfer' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-14 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                    <button className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center" onClick={() => handleUploadToGallery(items[currentIdx].imageUrl, items[currentIdx].prompt, items[currentIdx].userName)} title="Upload to Gallery">
                      <Upload className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center" onClick={() => handleDownload(items[currentIdx].imageUrl)} title="Download">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

               <button className={`w-12 h-12 rounded-full flex items-center justify-center ${likedMap[items[currentIdx].id] ? 'bg-red-600 text-white' : 'bg-white/15 text-white hover:bg-white/25'}`} onClick={() => toggleLike(items[currentIdx].id)} title="Like">
                 <Heart className="w-6 h-6" fill={likedMap[items[currentIdx].id] ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Mobile actions */}
             <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
              <div className="relative">
                <button className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'shop' ? null : 'shop')}>
                  <ShoppingBag className="w-5 h-5" />
                </button>
                 {openMenu === 'shop' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-12 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                     <button className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center" onClick={() => navigateToMyntra(items[currentIdx].prompt)}>
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                     <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center" onClick={() => navigateToGoogleShopping(items[currentIdx].prompt)}>
                      <SearchIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'share' ? null : 'share')}>
                  <Share2 className="w-5 h-5" />
                </button>
                 {openMenu === 'share' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-12 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                     <button className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center" onClick={() => handleShare('whatsapp', items[currentIdx].imageUrl, items[currentIdx].prompt)}>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                     <button className="w-9 h-9 rounded-full bg-[#E1306C] text-white flex items-center justify-center" onClick={() => handleShare('instagram', items[currentIdx].imageUrl, items[currentIdx].prompt)}>
                      <Instagram className="w-4 h-4" />
                    </button>
                     <button className="w-9 h-9 rounded-full bg-[#3b5998] text-white flex items-center justify-center" onClick={() => handleShare('facebook', items[currentIdx].imageUrl, items[currentIdx].prompt)}>
                      <Facebook className="w-4 h-4" />
                    </button>
                     <button className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center" onClick={() => handleShare('twitter', items[currentIdx].imageUrl, items[currentIdx].prompt)}>
                      <Twitter className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center" onClick={() => setOpenMenu(openMenu === 'transfer' ? null : 'transfer')}>
                  <Upload className="w-5 h-5" />
                </button>
                 {openMenu === 'transfer' && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-12 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                     <button className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center" onClick={() => handleUploadToGallery(items[currentIdx].imageUrl, items[currentIdx].prompt, items[currentIdx].userName)}>
                      <Upload className="w-4 h-4" />
                    </button>
                     <button className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center" onClick={() => handleDownload(items[currentIdx].imageUrl)}>
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

               <button className={`w-11 h-11 rounded-full flex items-center justify-center ${likedMap[items[currentIdx].id] ? 'bg-red-600 text-white' : 'bg-white/15 text-white'}`} onClick={() => toggleLike(items[currentIdx].id)} aria-pressed={likedMap[items[currentIdx].id]}>
                 <Heart className="w-5 h-5" fill={likedMap[items[currentIdx].id] ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Metadata and description */}
             <div className="absolute bottom-6 left-6 right-24 md:right-40 text-white">
               <h3 className="text-lg md:text-xl font-semibold">{items[currentIdx].userName}</h3>
               <p className={`${isDescriptionExpanded ? '' : 'line-clamp-2'} text-white/90 max-w-xl`}>{items[currentIdx].prompt}</p>
              <button className="mt-2 text-sm underline underline-offset-4" onClick={() => setIsDescriptionExpanded(v => !v)}>
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
