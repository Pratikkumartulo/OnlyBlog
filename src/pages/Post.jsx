import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import Fileservice from "../Appwrite/uploadFile";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/PostSlice";
import { loading } from "../store/LoadingSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const [src,setSrc] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.UserId === userData.$id : false;
    // console.log(isAuthor)
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    appwriteService.getFilePreview(post.featuredImage).then((ppst)=>{
                        setSrc(ppst)
                    })
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dispatch(loading())
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                Fileservice.deleteFile(post.featuredImage);
                dispatch(fetchPosts())
                dispatch(loading())
                navigate("/");
            }
        });
    };
    
    return post ? (
        <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={src}
                        alt={post.title}
                        className="rounded-xl h-[50vh]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.Content)}
                    </div>
        </div>
    ) : null;
}
