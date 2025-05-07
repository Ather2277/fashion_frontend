
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || "https://cloud.appwrite.io/v1"),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ""),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ""),
  appwriteCollectionIdUsers: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS || ""),
  appwriteCollectionIdPosts: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_POSTS || ""),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ""),
};

export default conf;
