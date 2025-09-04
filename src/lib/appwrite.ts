// appwrite.ts
import { Client, Databases, Storage, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // your endpoint
  .setProject("67f001a80013dfc3ff5a");        // your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);

const DATABASE_ID = "67f0024d002a19d137d4";
const COLLECTION_ID = "67f00267000a7cc16cee";

// 🔥 New function to fetch gallery documents
export async function getGalleryDocuments(limit: number = 100000) {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [
      Query.limit(limit),          // fetch more than 25
      Query.orderDesc("$createdAt") // newest first
    ]
  );
}
