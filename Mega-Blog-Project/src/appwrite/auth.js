import { use } from "react";
import conf from "../conf/config";

import { Client, Account, ID } from "appwrite";

export class AppwriteAuth {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method 
                return this.login({ email, password });//login after creating account
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(email, password);
            return userSession;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user)
                return user;
            else {
                return null;
            }
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }

    }

    async logout() {
        try {
            await this.account.deleteSessions();
         
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

}


const appwriteauth = new AppwriteAuth();

export default appwriteauth

