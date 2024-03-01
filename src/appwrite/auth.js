import { config } from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices{
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.account = new Account(this.client);
    }
    
    async createAccount(email, password, name){
        try{
            const useraccount = await this.account.create(ID.unique(),email, password, name);
            if(useraccount){
                return this.login(email, password);
            }else{
                return false;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login(email, password){
        try{
            return await this.account.createEmailSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }

    async getUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            throw error;
        }
    }
}

const authServices = new AuthServices();
export default authServices;