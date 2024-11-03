import React, { useState, useEffect } from 'react';
import appWritePostService from "../Appwrite/config";
import { PostCard } from '../components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../store/PostSlice';

const AllPost = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData);
  const Allposts = useSelector(state => state.posts.posts);  
  const [post, setPost] = useState([]);
  useEffect(() => {
    dispatch(fetchPosts())
    if (userData) {
      const userPosts = Allposts.filter((pst) => pst.UserId === userData.$id);
      setPost(userPosts);
    }
  }, [Allposts, userData,dispatch]);

  return (
    <div className="w-full py-8 flex flex-wrap gap-4">
      {post.length === 0 ? (
        <p>No post yet...</p>
      ) : (
        post.map((pst) => (
          <div key={pst.$id} className={`p-2 rounded-lg bg-green-500 ${pst.Status === "active" ? "bg-green-500" : "bg-red-500"}`}>
            <PostCard {...pst}></PostCard>
          </div>
        ))
      )}
    </div>
  );
};

export default AllPost;
