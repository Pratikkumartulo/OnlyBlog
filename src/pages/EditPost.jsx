import React,{useState,useEffect} from 'react';
import { PostForm } from '../components';
import appwriteservice from "../Appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post,setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteservice.getPost(slug)
            .then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <PostForm post={post}></PostForm>
    </div>
  ) :null
}

export default EditPost
