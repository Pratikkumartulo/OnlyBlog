import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAcount = await this.account.create(ID.unique(),email,password,name);
            if(userAcount){
                return this.login({email,password})
            }else{
                return userAcount;
            }
        } catch(err){
            throw err;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(err){
            throw err;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.error("Failed to get user:", err);
            return null;
        }
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();

export default authService;