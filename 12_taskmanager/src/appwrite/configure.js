import { transformWithEsbuild } from 'vite';
import config from '../config/config'
import { Client, ID, Databases, Storage } from 'appwrite';


export class Service {

    client = new Client();
    Databases;
    buckets;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID)
        this.Databases = new Databases(this.client);
        this.buckets = new Storage(this.client)
    }

    async createTask({ title, due, userId }) {
        try {
            return await this.Databases.createDocument(

                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                userId,
                {
                    title,
                    due
                }
            )
        }
        catch (error) {
            console.log("Appwrite Error :: CreateTask :: error");
        }
    }

    async updateTask(userId, { title, due }) {
        try {
            return await this.Databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                userId,
                {
                    title,
                    due
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updateTask :: error");
        }
    }

    async deleteTask(userId) {
        try {
            return await this.Databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                userId
            )
        } catch (error) {
            console.log("Appwrite Error :: deleteTask :: error");

        }
    }
}

const appwriteService = new Service()

export default appwriteService;