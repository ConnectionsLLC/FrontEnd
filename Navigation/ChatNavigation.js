import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import Message from '../components/Message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const ChatNavigation = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()
    const route = useRoute()
    
     useEffect(() => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if("Message".includes(getFocusedRouteNameFromRoute(route))){
              navigation.setOptions({tabBarStyle: {display: 'none'}});
             } else {
             navigation.setOptions({tabBarStyle: {display: 'flex'}});
            }
        }, [navigation, route]);
    return (
      
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={Message}  />
            
    </Stack.Navigator>
  )
}

export default ChatNavigation