import config from "../config/config"
import { Client, ID, Databases, Storage, Query } from "appwrite"


export class Service {

    client = new Client();
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.Databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite error :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.Databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite error :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.Databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("error ", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return this.Databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("error", error);
            return false
        }
    }

    async getPosts(queries) {
        try {
            return await this.Databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries = [Query.equal("status", "active")]
            )
        } catch (error) {
            console.log("appwrite :: getPosts :: error", error);

        }
        return false
    }

    // file upload methods

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite error :: uploadFile :: error ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: error", error);
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }
}

const   appwriteService = new Service();
export default appwriteService;