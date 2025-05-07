// File: lib/appwrite.ts
import { Client, Databases, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67f001a80013dfc3ff5a'); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);