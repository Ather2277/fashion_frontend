
import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Post CRUD operations
    async createPost({title, prompt, imageUrl, userId}: {
        title: string;
        prompt: string;
        imageUrl: string;
        userId: string;
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdPosts,
                ID.unique(),
                {
                    title,
                    prompt,
                    imageUrl,
                    userId,
                    likes: 0,
                    createdAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async getUserPosts(userId: string) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdPosts,
                [Query.equal("User_Id", userId)] // Change 'userId' to 'User_Id' to match the collection schema
            );
        } catch (error) {
            console.log("Appwrite service :: getUserPosts :: error", error);
            throw error;
        }
    }

    async getAllPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdPosts,
                []
            );
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error", error);
            throw error;
        }
    }

    async likePost(postId: string) {
        try {
            // Get the current post
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdPosts,
                postId
            );
            
            // Update the likes count
            const updatedLikes = (post.likes || 0) + 1;
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdPosts,
                postId,
                { likes: updatedLikes }
            );
        } catch (error) {
            console.log("Appwrite service :: likePost :: error", error);
            throw error;
        }
    }

    // File upload services
    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;
