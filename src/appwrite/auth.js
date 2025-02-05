import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                // Call another method and make the user log in
                return this.login({email, password});
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite Service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async getCurrentSession(){
        try {
            const session =  await this.account.getSession('current')
            console.log("Session :", session)
        } catch (error) {
            console.error("ppwrite Service :: getCurrentSession :: error", error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite Service :: logout :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();
export default authService;