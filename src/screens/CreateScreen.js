import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({navigation}) => {
    const {addPost} = useContext(Context);
    return <BlogPostForm onSubmit={(title,content)=>{
        addPost(title,content,()=> navigation.navigate('Index'));
    }}/>
};

const styles = StyleSheet.create({
    
});

export default CreateScreen;