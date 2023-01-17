import { View, Text, Button, StyleSheet, ScrollView, StatusBar, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import  Header  from '../components/Header'
import Stories from '../components/Stories'
import firebase from '../firebase'
import Post from '../components/Post'
import PlusModal from '../components/PlusModal'
import { orderBy } from 'firebase/firestore'


const HomeScreen = () => {
  const navigation = useNavigation()
  
  const [posts, setPosts] = useState([
   
    {id: "asdff",image: "https://i2.wp.com/www.wendyzhou.se/blog/wp-content/uploads/2019/08/uixninja.png?fit=1600%2C1200&ssl=1", profilePicture: 'https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg',username: "Elon Musk", lowerUsername: "@elonmusk",posttext: 'The world is full of fake people'},
    {id: "asdf", profilePicture: 'https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg',username: "Elon Musk", lowerUsername: "@elonmusk",posttext: 'Working on a large project, I was thinking about potential features which could be added to this application.'},
    {id: "asdfadfage", profilePicture: 'https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg',username: "Elon Musk", lowerUsername: "@elonmusk",posttext: 'The world is full of fake people'},
    {id: "asdf", profilePicture: 'https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg',username: "Elon Musk", lowerUsername: "@elonmusk",posttext: 'Working on a large project, I was thinking about potential features which could be added to this application.'},
    
  ])
  
  const STYLES = ['default', 'dark-content', 'light-content'];
  return (

    

<View style={styles.container}>
      <StatusBar
       animated={true}
       backgroundColor="white"
       barStyle="dark-content" 
           />
     <Header/>
      <ScrollView>
       <Stories />
       <View style={{marginTop: 4, marginBottom: 80}}>
       {posts.map((post,index) => (
       <Post post={post} key={index} />
))}
       </View>

       </ScrollView> 
    
     {/* <Button title='Go To Chat' onPress={() => navigation.navigate('Chat')}/> */}
   </View>



        
      


  )
}
const styles = StyleSheet.create({
  container: {
    

  },
});

export default HomeScreen