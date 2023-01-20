import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  PixelRatio
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";
import useAuth from "../hooks/useAuth";
import { onSnapshot, query, doc, collection, where, addDoc } from "firebase/firestore";
import { FontAwesome5 } from "@expo/vector-icons";

const Post = ({ post }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [comments, setComments] = useState(false);
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([])
  const [ReplyModal, setReplyModal] = useState(false);
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  



  const handleLike = (post) => {
      
  
  };

  const handleSubmit = async () => {
   
  }

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReplyModal}

      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color="black" onPress={() => setReplyModal(false)} />
              <Text style={{ fontSize: 15, marginLeft: 4 }}>Compose A Reply</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginleft: 10 }}>
              <Text style={{ fontSize: 13, marginLeft: 4 }}>Replying to</Text>
              <Text style={{ color: '#7EA8F7', fontSize: 13 }}> {postInfo.lowerUsername}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18, backgroundColor: '#E9E9E9', padding: 5, borderRadius: 8 }}>
              <Feather name="smile" size={20} color="black" />
              <TextInput placeholder="Say Something...." style={{ flex: 1, marginLeft: 8, marginRight: 8 }} value={text} onChangeText={onChangeText} />
              <Feather name="send" size={20} color="black" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 4, marginBottom: 4,  borderRadius: 6,backgroundColor: 'white', padding: 2}}>
        {/* background #F9FFFF was used previously */}

        <PostHeader post={post} navigation={navigation} userInfo={userInfo} />
        <PostBody post={post} navigation={navigation} user={user}/>
        <PostFooter
          post={post}
          handleLike={handleLike}
          user={user}
          comments={comments}
          setComments={setComments}
          text={text}
          onChangeText={onChangeText}
          setReplyModal={setReplyModal}
          setPostInfo={setPostInfo}
        />

      </View>
    </View>
  );
};
const PostHeader = ({ post, navigation, follower, following, userInfo }) => (
  <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
      <View>
        <Image
          style={{ width: 42, height: 42, borderRadius: 50, marginLeft: 4 }}
          source={{ uri: post.profilePicture }}
        />
      </View>
      <View>
        <Text
          style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
          onPress={() =>
            navigation.navigate("UserProfile", {
              username: post.username,
              lowerUsername: post.lowerUsername,
              profile: post.profilePicture,
              email: post.owner_email,

            })
          }
        >
          {post.username}
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
);
const PostBody = ({ post, navigation, user }) => (
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
      <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 10, fontFamily: 'Roboto' }}>{post.posttext} </Text>
    </View>
    <View>
      {post.image && (
        <Image
          style={{
            alignSelf: "stretch",
            height: 400,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 10,
            marginBottom: 6
          }}
          source={{ uri: post?.image }}
        />
      )}
    </View>
   {post.id === "asdf" &&(
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
         style={{ width: 30, height: 30, borderRadius: 50, margin: 4,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
         source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg"}}
       />
     
 
 
       
       <Image
       style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -16,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
       source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg"}}
     />
    
    
        <Image
      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -32,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
    />

    


       {/* <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text> */}
   
    
       {/* {/* <Text style={{left: -18, color: '#A9A9A9' }}>{post.likes_by_users.slice(-2)[0].username}  and others likes it.</Text> */}
   
      
       <Text style={{left: -32, color: '#A9A9A9',fontSize: 12 }}>You and others liked this</Text> 
   
   </View>
   )}

  </View>
 </TouchableOpacity>
);
const PostFooter = ({
  post,
  handleLike,
  user,
  comments,
  setComments,
  text,
  onChangeText,
  userInfo,
  setReplyModal,
  setPostInfo,
}) => (
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
        onPress={() => handleLike(post)}
      >
       
          <Ionicons name="heart-outline" size={21} color="black" />
        
        <Text style={{ marginLeft: 6, fontSize: 16, marginRight: 6 }}>
         0 
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 12, padding: 4, borderRadius: 4 }}
        onPress={() =>
          comments == true ? setComments(false) : setComments(true)
        }
      >
        <Ionicons name="chatbubble-outline" size={21} color="black" />
        <Text style={{ marginLeft: 4, fontSize: 16 }}>0 </Text>
      </TouchableOpacity>
     
    </View>
  </View>
);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#00000aaa",

  },
  modalView: {

    backgroundColor: "white",
    borderRadius: 2,
    padding: 10,
    borderRadius: 14,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  modalText: {

  }
});

export default Post;
