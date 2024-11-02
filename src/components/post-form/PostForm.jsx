import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from "../index";
import appwriteservice from "../../Appwrite/config";
import appwritefileservice from "../../Appwrite/uploadFile";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts,createPost } from '../../store/PostSlice';
import {loading} from "../../store/LoadingSlice"


const PostForm = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData); // Access user data from Redux

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            Content: post?.Content || "",
            Status: post?.Status || "active",
            images: []
        },
    });

    useEffect(() => {
        if (!userData) return; // Avoids the form submission if userData is unavailable
    }, [userData]);
    // console.log(userData)

    // Form submit handler
    const submit = async (data) => {
        if (!userData) return; // Check if userData is available
        dispatch(loading())
        let file;
        if (data.images && data.images.length > 0) {
            file = await appwritefileservice.uploadFile(data.images[0]);
            if (post && file) {
                appwritefileservice.deleteFile(post.featuredImage);
            }
        }

        if (post) {
            const dbPost = await appwriteservice.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if (dbPost) {
                dispatch(loading())
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwritefileservice.uploadFile(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await dispatch(createPost({ ...data, UserId: userData.$id })).unwrap();
                if (dbPost) {
                    dispatch(loading())
                    navigate(`/post/${dbPost.$id}`);
                    // console.log(dbPost)
                }
            }
        }
        dispatch(fetchPosts());
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
            }
        });
        return () => subscription.unsubscribe(); // Clean up subscription
    }, [watch, slugTransform, setValue]);

    if (!userData) {
        return <div>Loading user data...</div>; // Display a loading message until userData is available
    }

    return (
        <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteservice.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("Status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </>
    );
};

export default PostForm;
