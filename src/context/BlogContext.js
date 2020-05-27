import React, { useReducer } from 'react';
import createDataContext from './createDataContext';
import jsonserver from '../api/jsonserver';
const blogReducer = (state, action) => {
    switch(action.type){
        case 'get_posts':
            return action.payload;
        case 'add_post':
            return [...state, {id:Math.floor(Math.random()*99999),title:action.payload.title, content:action.payload.content}];
        case 'delete_post':
            return state.filter((post)=> post.id !== action.payload);
        case 'edit_post':
            return state.map((post)=>{
                return post.id === action.payload.id ? action.payload : post;
            });
        default:
            return state;
    }
}
    const getPosts = dispatch => {
        return async () => {
            const response = await jsonserver.get('/posts/');

            dispatch({type: 'get_posts', payload: response.data});
        }
    }
    const addPost = (dispatch) => {
        return async (title, content, callback)=>{
            await jsonserver.post('/posts',{title, content});
            if(callback){
                callback();
            }
        }
    };
    const deletePost = (dispatch) => {
        return async (id)=>{
            await jsonserver.delete(`/posts/${id}`);
            dispatch({type: 'delete_post', payload: id });
        }
    };
    const editPost = dispatch => {
        return async (id,title,content,callback) => {
            await jsonserver.put(`/posts/${id}`,{title,content});
            dispatch({type: 'edit_post', payload:{id,title,content} });
            if(callback){
                callback();
            }
        }
    };

export const {Context, Provider} = createDataContext(blogReducer,{getPosts,addPost,deletePost,editPost},[]);