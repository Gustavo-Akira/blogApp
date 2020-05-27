import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';
const IndexScreen = ({navigation})=>{
    const {state, addPost, deletePost,getPosts} = useContext(Context);
    useEffect(()=>{
        getPosts();
        const listener = navigation.addListener('didFocus', ()=>{
            getPosts();
        });
        return () => {
            listener.remove();
        }
    },[]);
    return (
        <View>
            <Text>Home</Text>
            <FlatList
                data={state}
                keyExtractor={(post) => post.title}
                renderItem={({item})=>{
                    return(
                    <TouchableOpacity onPress={() => navigation.navigate('Show',{id:item.id})}> 
                    <View style={style.row}>
                        <Text style={style.title}>{item.title} - {item.id}</Text>
                        <TouchableOpacity onPress={()=> deletePost(item.id)}>
                            <Feather style={style.icon} name="trash"/>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};
IndexScreen.navigationOptions = ({navigation}) => {
    return{
        headerRight:() => <TouchableOpacity onPress={() => navigation.navigate('Create')}><Feather name="plus" size={30}/></TouchableOpacity>
    };
}
const style = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical: 20,
        paddingHorizontal:20,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title:{
        fontSize: 18
    },
    icon:{
        fontSize:24
    }
});

export default IndexScreen;