import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "../Appwrite/config";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await cardService.getPosts();
    return response.documents;  // Assuming `documents` contains the list of posts
});

// Create a new post
export const createPost = createAsyncThunk("posts/createPost", async ({title, slug, Content, featuredImage, Status, UserId}) => {
    const response = await cardService.createPost({title, slug, Content, featuredImage, Status, UserId});
    return response;
});




const initialState = {
    posts: [],
    singlePost: null,
    status: 'idle', // For fetchPosts
    singleStatus: 'idle', // For fetchPost
    error: null,
}

// postSlice.js continued
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
    }
});

export default postSlice.reducer;
