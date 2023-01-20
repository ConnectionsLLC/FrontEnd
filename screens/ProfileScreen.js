
import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import firebase from '../firebase';
import useAuth from '../hooks/useAuth'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfile';


const ProfileScreen = () => {
  const { user } = useAuth()
  // const [userInfo, setUserInfo] = useState({username: 'Aniket Mishra', lowerUsername: '@aniketmishra',  profile: '', followers: [], following: [], about: '' });
  const [userInfo, setUserInfo] = useState([]);

  const navigation = useNavigation()
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentTab, setCurrentTab] = useState("Posts")
  useEffect(() => {
    fetch('https://social-backend-three.vercel.app/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        email: user.email
      })
    })
      .then(res => res.json())
      .then(async data => {
        if (data.message == "User Found") {
          setUserInfo(data.savedUser)
          console.log("User", data.savedUser)
        }
      })
  }, [])


  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <Header /> */}
        <View>
          <View>
            <Image style={{ alignSelf: "stretch", height: 200, marginBottom: 8 }} source={{ uri: 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }} />


            <><Image style={{ width: 100, height: 100, borderRadius: 100, top: 150, position: 'absolute', zIndex: 999, left: 15 }} source={{ uri: userInfo.profile ? userInfo.profile : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' }} /><View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 12 }}>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="settings-outline" size={24} color="black" />
               <Text style={{ borderWidth: 1, borderRadius: 16, padding: 6, fontWeight: '600',marginLeft: 6 }} onPress={() => navigation.navigate("EditProfile", {
                lastUsername: userInfo.username,
                lastAbout: userInfo.about
              })}>Edit Profile</Text>
            </View>
            </View></>





          </View>
          <View style={{ marginTop: 40 }}>



            <View style={{ marginLeft: 20, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{userInfo.username}</Text>
                <Image style={{ width: 20, height: 20, marginLeft: 2, bottom: -2 }} source={{ uri: 'https://th.bing.com/th/id/OIP.Qq0Ov_N_BiXjTfZA3EriXQHaHa?pid=ImgDet&rs=1' }} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: '200', top: -4, color: 'grey' }}>{userInfo.lowerUsername}</Text>
              <Text>{userInfo.descritption}</Text>

              {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

              <View style={{ marginTop: 10, flexDirection: 'row', }}>
                <Ionicons name="calendar-sharp" size={20} color="black" />
                <Text style={{ color: 'light-blue', marginleft: 2 }}> Joined On December 2022</Text>
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
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


          </View>
          <View>
          <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: '#D6D6D6' }}>
              {currentTab == "Posts" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Posts</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{}} onPress={() => setCurrentTab('Posts')}>
                  <Text style={{ margin: 4 }}>Posts</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Posts & Replies" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Posts & Replies</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{}} onPress={() => setCurrentTab('Posts & Replies')}>
                  <Text style={{ margin: 4 }}>Posts & Replies</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Media" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Media</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCurrentTab('Media')}>
                  <Text style={{ margin: 4 }}>Media</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Likes" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Likes</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCurrentTab('Likes')}>
                  <Text style={{ margin: 4 }}>Likes</Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <View
                style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
                >
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                  <View>
                    <Image
                      style={{ width: 42, height: 42, borderRadius: 50, marginLeft: 4 }}
                      source={{ uri: 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
                    >
                      Aniket Mishra
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>

                      <Text style={{ marginLeft: 10, fontSize: 11, fontWeight: '300' }}>10 mins ago</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ marginRight: 10, fontSize: 22, color: 'grey' }}>...</Text>
                </View>
              </View>
















              <TouchableOpacity

              //  onPress={() => navigation.push("UserPost", {
              //   username: post.username, 
              //   post: post
              //  })}
              >
                <View >
                  <View
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 6,

                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 10, fontFamily: 'Roboto' }}>Getting Into UI/UX Engineering...</Text>
                  </View>
                  <View>

                    <Image
                      style={{
                        alignSelf: "stretch",
                        height: 400,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 10,
                        marginBottom: 6
                      }}
                      source={{ uri: 'https://i2.wp.com/www.wendyzhou.se/blog/wp-content/uploads/2019/08/uixninja.png?fit=1600%2C1200&ssl=1' }}
                    />

                  </View>

                  <View
                    style={{
                      marginRight: 15,
                      marginLeft: 15,
                      paddingBottom: 6,
                      flexDirection: "row",

                      alignItems: 'center'
                    }}
                  >




                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />




                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -16, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />


                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -32, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />




                    {/* <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text> */}


                    {/* {/* <Text style={{left: -18, color: '#A9A9A9' }}>{post.likes_by_users.slice(-2)[0].username}  and others likes it.</Text> */}


                    <Text style={{ left: -32, color: '#A9A9A9', fontSize: 12 }}>You and others liked this</Text>

                  </View>


                </View>
              </TouchableOpacity>
              <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 4,borderTopColor: '#E9E9E9',
  borderTopWidth: 1, }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 4,
        marginBottom: 4
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", borderRadius: 4,padding: 4, }}
      >
       
          <Ionicons name="heart-outline" size={21} color="black" />
        
        <Text style={{ marginLeft: 6, fontSize: 16, marginRight: 6 }}>
         0 
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 12, padding: 4, borderRadius: 4 }}
       
      >
        <Ionicons name="chatbubble-outline" size={21} color="black" />
        <Text style={{ marginLeft: 4, fontSize: 16 }}>0 </Text>
      </TouchableOpacity>
     
    </View>
  </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen