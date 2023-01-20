import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatList = () => {
  const navigation = useNavigation()

  return (
    // <View style={{ marginTop: 10, margin: 2 }}>
    //  <TouchableOpacity onPress={() => navigation.navigate('Message')}>
    //  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} >
    //     <View>
    //       <Image
    //         style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 4 }}
    //         source={{ uri: 'https://th.bing.com/th/id/OIP.0HPHOhiMHVdQGlxYc4z86AHaFj?pid=ImgDet&rs=1' }}
    //       />
    //     </View>
    //     <View style={{ marginLeft: 6 }}>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 15, fontStyle: 'bold' }}>Elon Musk</Text>
    //         {/* <Text style={{fontSize: 13, color: 'grey', marginLeft: 4}}>@elonmusk</Text> */}
    //       </View>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 13, color: 'grey' }}>Hey elon here, what about...</Text>
    //         <Text style={{ fontSize: 13,}}>5 min </Text>
    //       </View>
    //     </View>
    //   </View>
    //  </TouchableOpacity>
    // </View>
    <View style={{ marginTop: 10, }}>
      <View style={{ margin: 4, marginLeft: 10,  }}>
        <Text style={{color: 'grey', fontSize: 15}}>Pinned</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Message',{username: 'Elon Musk', profile: 'https://th.bing.com/th/id/OIP.0HPHOhiMHVdQGlxYc4z86AHaFj?pid=ImgDet&rs=1', lowerUsername: '@elonmusk'})} style={{ padding: 8, borderRadius: 9, marginLeft: 4, marginRight: 4, flexDirection: 'row', alignItems: 'center',  }}>
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, }}
            source={{ uri: 'https://th.bing.com/th/id/OIP.0HPHOhiMHVdQGlxYc4z86AHaFj?pid=ImgDet&rs=1' }}
          />
        </View>
        <View style={{ marginLeft: 4, flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>Elon Musk</Text>
          <View style={{ alignItems: 'center',flexDirection: 'row',  }}>
            <View style={{ flexDirection: 'row', alignItems: 'center',width: 200  }}>
              <Text numberOfLines={1} style={{ fontSize: 12, color: 'grey', }}>Hey elon here, what about making the users pay for the verified ticks ?? </Text>
              <Text style={{ fontSize: 12, color: '#A7A7A7', marginLeft: 2 }}> | 5 min</Text>
            </View>
          
          </View>
        </View>
        <View style={{position: 'absolute', right: 12}}>
           <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>1</Text>
            </View>
           </View>
      </TouchableOpacity>

      <View style={{ margin: 4, marginLeft: 10 }}>
        <Text style={{color: 'grey', fontSize: 15}}>Other</Text>
      </View>


      <TouchableOpacity onPress={() => navigation.navigate('Message', {username: 'Mark Zuckerberg', profile: 'https://specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401', lowerUsername: '@markzuckerberg'})} style={{ padding: 8, borderRadius: 9, marginLeft: 4, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, }}
            source={{ uri: 'https://specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401' }}
          />
        </View>
        <View style={{ marginLeft: 4, flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>Mark Zuckerberg</Text>
          <View style={{ alignItems: 'center',flexDirection: 'row',  }}>
            <View style={{ flexDirection: 'row', alignItems: 'center',width: 200  }}>
              <Text numberOfLines={1} style={{ fontSize: 12, color: 'grey',  }}>Biddng for 20 Billion!</Text>
              <Text style={{ fontSize: 12, color: '#A7A7A7',  marginLeft: 2 }}>  | 10 min</Text>
            </View>
          
          </View>
        </View>
        <View style={{position: 'absolute', right: 12}}>
           <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>9+</Text>
            </View>
           </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Message',{ username: 'Bill Gates', profile: 'https://specials-images.forbesimg.com/imageserve/62d599ede3ff49f348f9b9b4/416x416.jpg?background=000000&cropX1=155&cropX2=976&cropY1=340&cropY2=1161', lowerUsername: '@billgates'})} style={{ padding: 8, borderRadius: 9, marginLeft: 4, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, }}
            source={{ uri: 'https://specials-images.forbesimg.com/imageserve/62d599ede3ff49f348f9b9b4/416x416.jpg?background=000000&cropX1=155&cropX2=976&cropY1=340&cropY2=1161' }}
          />
        </View>
        <View style={{ marginLeft: 4, flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>Bill Gates</Text>
          <View style={{ alignItems: 'center',flexDirection: 'row',  }}>
            <View style={{ flexDirection: 'row', alignItems: 'center',width: 200}}>
              <Text numberOfLines={1} style={{ fontSize: 12, color: 'grey',  }}>Take my Funding</Text>
              <Text style={{ fontSize: 12, color: '#A7A7A7',  }}>  | 5 min</Text>
            </View>
          
          </View>
        </View>
        <View style={{position: 'absolute', right: 12}}>
           <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>2</Text>
            </View>
           </View>
      </TouchableOpacity>

    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: '#0D8EFF',
    width: 22,
    height: 22,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10
  }
})