import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import firebase from '../firebase';
import useAuth from '../hooks/useAuth'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';



const EditProfile = () => {
    const { user } = useAuth()
    const [userInfo, setUserInfo] = useState();
    const navigation = useNavigation()
    const route = useRoute();
    const { lastUsername , lastAbout } = route.params;
    const [username , setUsername] = useState(lastUsername)
    const [about, setAbout] = useState(lastAbout)

    


    onSnapshot(query(collection(firebase.firestore(), 'users',user.email,"posts"), where("owner_email", "==", user.email)),
        snapshot => {
            setUserInfo(snapshot.docs)


        }
    )
const saveChanges = () => {
  userInfo.map(info => {
    firebase.firestore().collectionGroup("posts").doc(info.id).update({
        username: username
    })
  })
} 

  return (
     <View style={{backgroundColor: 'white', flex:1}}>
          <View style={styles.container1}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Pressable style={styles.button} onPress={saveChanges}>
                  <Text style={styles.buttonText} >Save</Text>
              </Pressable>
          </View>
          <View style={{margin: 10}}>
          <Text style={{fontWeight: 'bold'}}>Username -</Text>
          <TextInput      
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            multiline={false}
            style={{backgroundColor: '#E6E6E6', padding: 3, borderRadius: 6, marginTop: 10}}
          />
    <Text style={{fontWeight:'bold'}}>About - </Text>
          <TextInput      
            value={about}
            onChangeText={setAbout}
            placeholder="About"
            multiline={true}
            style={{backgroundColor: '#E6E6E6', padding: 3, borderRadius: 6, marginTop: 10}}
          />
          </View>
     </View>
  )
}
const styles = StyleSheet.create({
    container1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 6,
        backgroundColor: 'white',
        

    },
    button: {
        backgroundColor: '#0096F6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 32,
        borderRadius: 24,
        width: 64,
    },
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16,

    },
})
export default EditProfile