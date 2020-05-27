import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Context } from '../context/BlogContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {EvilIcons} from '@expo/vector-icons';
const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context);
    const post = state.find((posts)=>posts.id === navigation.getParam('id'));
    return(
        <View>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
        </View>
    );
};
ShowScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight:()=>{
                return( 
                <TouchableOpacity onPress={()=> navigation.navigate('Edit',{id:navigation.getParam('id')})}>
                    <EvilIcons name="pencil" size={30}/>
                </TouchableOpacity>
                );
            }
        
    };
}
const sytle = StyleSheet.create({});
export default ShowScreen;