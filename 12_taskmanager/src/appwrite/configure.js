import config from '../config/config'
import { Client, Databases, Storage, ID } from 'appwrite';


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

    async createTask({ title, startDate, dueDate, status }) {
        try {
            // console.log(this.Databases);
            return await this.Databases.createDocument(
                '6684d6f700124046455e',
                '6684d7100004eb8bfcc1',
                ID.unique(),
                {
                    title,
                    startDate,
                    dueDate,
                    status

                }
            )
        }
        catch (error) {
            console.log("Appwrite Error :: CreateTask :: error", error);
        }
    }

    async updateTask(userId, { title, startDate, dueDate }) {
        try {
            return await this.Databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                userId,
                {
                    title,
                    startDate,
                    dueDate,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updateTask :: error");
        }
    }

    async deleteTask(userId) {
        try {
            return await this.Databases.deleteDocument(
                '6684d6f700124046455e',
                '6684d7100004eb8bfcc1',
                userId
            )
        } catch (error) {
            console.log("Appwrite Error :: deleteTask :: error");

        }
    }

    async getTask(userId) {
        try {
            const task = await this.Databases.getDocument(
                '6684d6f700124046455e',
                '6684d7100004eb8bfcc1',
                userId
            )
            return task
        } catch (error) {
            console.log("appwrite error :: getTask :: error", error);
        }
    }
    async getTasks() {
        try {
            const response = await this.Databases.listDocuments(
                '6684d6f700124046455e',
                '6684d7100004eb8bfcc1',
            )
            return response.documents
        } catch (error) {
            console.log("Appwrite Error :: getTasks :: error", error);
            return false
        }
    }

    // async uploadTask(userId) {
    //     try {
    //         await this.buckets.createFile(
    //             config.appwriteDatabaseID,
    //             config.appwriteCollectionID,
    //             userId
    //         )
    //     } catch (error) {
    //         console.log("Appwrite Error :: UploadTask :: error", error)
    //     }
    // }
}

const appwriteService = new Service()

export default appwriteService;