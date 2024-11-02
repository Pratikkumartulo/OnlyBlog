import conf from "../config/config";
import { Client,Databases,Storage,Query,ID } from "appwrite";

export class Service{
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

    async createPost({title, slug, Content, featuredImage, Status, UserId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {title,
                Content,
                featuredImage,
                Status,
                UserId}
            )

        }catch(err){
            console.log("Error creating post : ",err)
        }
    }

    async updatePost(slug,{title, Content, featuredImage, Status}){
        try{
           return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {title, Content, featuredImage, Status}
           )
        }catch(err){
            console.log("Update error for post : ",err)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        }catch(err){
            console.log("Error in deleting post :",err)
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )

        }catch(err){
            console.log("Error in fetching",err);
            return false;
        }
    }

    async getPosts(queries=[]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        }catch(err){
            console.log("Get posts service err:",err)
            return false;
        }
    }

    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const cardService = new Service()

export default cardService