import conf from "../config/config";
import { Client,Databases,Storage,Query,ID } from "appwrite";

export class fileServices{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL) 
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }catch(err){
            console.log("Upload File error :",err);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true
        }catch(err){
            console.log("Deleting File error :",err);
            return false;
        }
    }
}

const fileService = new fileServices()

export default fileService