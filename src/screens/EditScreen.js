import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import { TextInput } from 'react-native-gesture-handler';
import BlogPostForm from '../components/BlogPostForm';
const EditScreen = ({navigation}) => {
    const id = navigation.getParam('id');
    const {state, editPost} = useContext(Context);

    const post = state.find((posts) => posts.id === navigation.getParam('id'));

    return <BlogPostForm initialState={{title:post.title, content:post.content}} onSubmit={(title,content) =>{
        editPost(id,title,content,()=>{
            navigation.pop();
        });
    }}/>
}
const styles = StyleSheet.create({});

export default EditScreen;