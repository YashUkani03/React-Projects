import config from '../config/config'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.account = new Account(this.account);
    }


    async CreateUser({ email, password, name }) {
        try {
            // console.log("Hello HEre Doubt");
            console.log(this.client);
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log(this.account);
            console.log(userAccount);
            if (userAccount) {
                return this.login({ email, password })
            }

            else {
                return userAccount
            }
        }
        catch (error) {
            console.log("Appwrite Error :: CreateUser :: error", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite error :: Login :: error", error);

        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite error :: Logout :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: getCurrentUser :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService;