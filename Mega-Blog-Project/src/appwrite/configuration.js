import conf from "../conf/config";

import { Client, Databases, ID, Storage, Query } from "appwrite";


export class DatabaseService {
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

    async createPost({ title, slug, content, featuredImage, status, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Using slug as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid
                }
            );
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;

        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true; // Return true if deletion is successful
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;

            return false; // Return false if deletion fails
        }

    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries

            )
        } catch (error) {
            console.error("Error getting all posts:", error);

            return false; // Return false if fetching fails
        }
    }

    //file upload methods

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file // Assuming 'file' is a File object
            )
        } catch (error) {
            console.error("Error uploading file:", error);

            return false; // Return false if upload fails

        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true; // Return true if deletion is successful
        } catch (error) {
            console.error("Error deleting file:", error);
            return false; // Return false if deletion fails
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

    

}










const databaseservice = new DatabaseService();

export default databaseservice;