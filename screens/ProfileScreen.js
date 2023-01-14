
import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import  { useEffect, useState } from 'react'
import firebase from '../firebase';
import useAuth from '../hooks/useAuth'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfile';

const ProfileScreen = () => {
    const { user } = useAuth()
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation()
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  onSnapshot(query(collection(firebase.firestore(), 'users'), where("owner_uid", "==", user.uid)),
    snapshot => {
      setUserInfo(snapshot.docs)


    }
  )
  useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', user.email, 'followers'), (snapshot) =>
  setFollowers(snapshot.docs)), [firebase,user]
)
useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', user.email, 'following'), (snapshot) =>
setFollowing(snapshot.docs)), [firebase, user]
)
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
      {/* <Header /> */}
        <View>
          <View>
            <Image style={{ alignSelf: "stretch", height: 200, marginBottom: 8 }} source={{ uri: 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }} />

            {userInfo?.map(info => {
              return (
                <><Image key={info.id} style={{ width: 100, height: 100, borderRadius: 100, top: 150, position: 'absolute', zIndex: 999, left: 15 }} source={{ uri: info.data().profile_picture }} /><View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 12 }}>

                  <Text key={info.id} style={{ borderWidth: 1, borderRadius: 16, padding: 6, fontWeight: '600', }} onPress={() => navigation.navigate("EditProfile", {
                    lastUsername: info.data().username,
                    lastAbout: info.data().about
                  })}>Edit Profile</Text>
                </View></>
                )
            })}

      


          </View>
          <View style={{ marginTop: 40,borderBottomColor: 'grey', borderBottomWidth: 0.5 }}>

            {userInfo?.map(info => {
              return (
                <View style={{ marginLeft: 20,  }} key={info.id}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{info.data().username}</Text>
                  <Image style={{ width: 20, height: 20, marginLeft: 2,bottom: -2 }} source={{ uri: 'https://th.bing.com/th/id/OIP.Qq0Ov_N_BiXjTfZA3EriXQHaHa?pid=ImgDet&rs=1' }} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '200', top: -4, color: 'grey' }}>{info.data().lowerUsername}</Text>
                  <Text>{info.data().about} </Text>

                  {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

                  <View style={{ marginTop: 10, flexDirection: 'row',  }}>
                    <Ionicons name="calendar-sharp" size={20} color="black" />
                    <Text style={{ color: 'light-blue', marginleft: 2 }}> Joined On December 2022</Text>
                  </View>

                  <View style={{ marginTop: 10,marginBottom: 10, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', marginRight: 4 }}>
                      <Text style={{ fontWeight: "bold", marginRight: 2 }}>{followers.length}</Text>
                      <Text>Followers</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: "bold", marginRight: 2 }}>{following.length}</Text>
                      <Text>Following</Text>
                    </View>
                  </View>

                  

                </View>
              )
            })}

          </View>
          <View>
                    <View style={{flexDirection: 'row', marginTop: 4, }}>
                      

 
                    </View>
                  </View>
        </View>
    </View>
  )
}

export default ProfileScreen