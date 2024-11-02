import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/PostSlice';
import { PostCard } from '../components';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts) || [];
    const status = useSelector(state => state.posts.status);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts.
                        </h1>
                    </div>
                </div>
            </div>
        );
    } else if (status === 'loading') {
        return <div className="text-center">Loading posts...</div>;
    } else {
        return (
            <div className="w-full py-8">
                {posts && posts.length === 0 ? (
                    <div className="text-2xl font-bold hover:text-gray-500 w-full text-center">
                        No Posts yet to display
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            post.Status=="active"?
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} height={10} />
                            </div>:null

                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default Home;
