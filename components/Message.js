import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from "@expo/vector-icons";


const Message = () => {
  const navigation = useNavigation()
  
  navigation.setOptions({tabBarVisible: false});
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{ width: 38, height: 38, borderRadius: 50, }}
            source={{ uri: 'https://th.bing.com/th/id/OIP.0HPHOhiMHVdQGlxYc4z86AHaFj?pid=ImgDet&rs=1' }}
          />
        </View>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={{ fontSize: 14 }}>Elon Musk</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>@elonmusk</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1,  }}>
        <ScrollView style={{marginTop: 10}}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 4}}><Text>Today</Text></View>
            {/* <View style={{ flexDirection: 'row', margin: 4,  }}>
              <View style={{ flexDirection: 'row' }}>
              <Text style={{ backgroundColor: '#E2E2E2', borderRadius: 8, padding: 5 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Text> 
              </View>
           </View> */}
         <View style={{marginRight: 8, marginBottom: 6}}>
          <Text style={{alignSelf: 'flex-end', backgroundColor: '#3673CF', borderRadius: 8, padding: 5, color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
         </View>
          <View style={{marginLeft: 8}}>
          <Text style={{alignSelf: 'flex-start', backgroundColor: '#F3F3F3', borderRadius: 8, padding: 5, }}>
          Yo whats this, looks kinda like shitt!!
            </Text>
         </View>
          
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 9, marginTop: 3,borderTopWidth: 1, borderTopColor: 'grey'}}>
        <TouchableOpacity>
          <Feather name="smile" size={22} color="grey" />
        </TouchableOpacity>
        
        <TextInput placeholder="Say Something...." style={{ flex: 1, marginRight: 6, marginLeft: 6 }} />
        <TouchableOpacity style={{ marginRight: 4 }}>
          <Feather name="paperclip" size={22} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
        <Feather name="send" size={22} color="grey"  />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Message

