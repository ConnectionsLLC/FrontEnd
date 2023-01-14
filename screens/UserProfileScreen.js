import React from "react";
import Header from "../components/Header";
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import useAuth from "../hooks/useAuth";
import {
  onSnapshot,
  query,
  doc,
  collection,
  where,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "../components/EditProfile";
import { useRoute } from "@react-navigation/native";
import { validate } from "email-validator";


const UserProfileScreen = () => {
  const route = useRoute();
  const { username, lowerUsername, profile, uid, email } =
    route.params;
  const { user } = useAuth();
  const navigation = useNavigation();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState(false);
  const [currentFollowing, setCurrentFollowing] = useState([]);
  const [hasFollowed, setHasFollowed] = useState(false)
  const [userInfo, setUserInfo] = useState([]);


  onSnapshot(
    query(
      collection(firebase.firestore(), "users"),
      where("owner_uid", "==", user.uid)
    ),
    (snapshot) => {
      setUserInfo(snapshot.docs);
    }
  );

  useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', email, 'followers'), (snapshot) =>
  setFollowers(snapshot.docs)), [firebase,email]
)
useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', email, 'following'), (snapshot) =>
setFollowing(snapshot.docs)), [firebase,email]
)
  useEffect(() => {
    setHasFollowed(followers.findIndex(follower => follower.id === user.email) !== -1)
}, [followers])

  const followUser = async () => {
      
    if (hasFollowed && uid != user.uid) {
        await deleteDoc(doc(firebase.firestore(), 'users', email, 'followers', user.email))
        await deleteDoc(doc(firebase.firestore(), 'users', user.email, 'following', email))
        setHasFollowed(false)
    } else {

       
          await setDoc(doc(firebase.firestore(), 'users', email, 'followers', user.email), {
           uid: user.uid
         });
      
        await setDoc(doc(firebase.firestore(), 'users', user.email, 'following', email), {
           uid: user.uid
        });
       
    }
    
};


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ position: "absolute", zIndex: 999 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 8,
            // borderWidth: 2,
            // borderColor: "white",
            // borderRadius: 20,
            padding: 4,
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ fontSize: 18, color: "white", marginLeft: 4 }}>{username}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Image
            style={{ alignSelf: "stretch", height: 200, marginBottom: 8, backgroundColor: 'blue' }}
            source={{
              uri: "https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200",
            }}
          />

          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              top: 150,
              position: "absolute",
              zIndex: 99,
              left: 15,
            }}
            source={{ uri: profile }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 12,
            }}
          >
            {user.uid == uid && (
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 6,
                  fontWeight: "600",
                }}
                onPress={() => navigation.navigate("EditProfile")}
              >
                Edit Profile
              </Text>
            )}

            {user.uid!=uid && (
             <Pressable
             style={{
               borderWidth: 1,
               borderRadius: 16,
               padding: 6,
               fontWeight: "600",
             }}
             onPress={followUser}
           >
             <Text>{ hasFollowed ? 'Following' : "Follow"}</Text>
           </Pressable>
             )}
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
          }}
        >
          <View style={{ marginLeft: 20 }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{username}</Text>
                  <Image style={{ width: 20, height: 20, marginLeft: 2,bottom: -2 }} source={{ uri: 'https://th.bing.com/th/id/OIP.Qq0Ov_N_BiXjTfZA3EriXQHaHa?pid=ImgDet&rs=1' }} />
                  </View>
            <Text style={{ fontSize: 12, fontWeight: "200", top:-4, color: 'grey' }}>
              {lowerUsername}
            </Text>
            <Text>The chief and the developer of this application </Text>

            {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Ionicons name="calendar-sharp" size={20} color="black" />
              <Text style={{ color: "light-blue", marginleft: 2 }}>
                {" "}
                Joined On December 2022
              </Text>
            </View>

            <View
              style={{ marginTop: 10, marginBottom: 10, flexDirection: "row" }}
            >
              <View style={{ flexDirection: "row", marginRight: 4 }}>
                <Text style={{ fontWeight: "bold", marginRight: 2,  }}>{followers.length}</Text>
                <Text>Followers</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", marginRight: 2 }}>{following.length}</Text>
                <Text>Following</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: 4 }}></View>
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
