import { View, Text, Image, StyleSheet, Settings } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './screens/SignupScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeNavigation from './Navigation/HomeNavigation';
import ProfileScreen from './screens/ProfileScreen';
import ProfileNavigaton from './Navigation/ProfileNavigation';
import { BlurView } from 'expo-blur';
import ChatNavigation from './Navigation/ChatNavigation';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import Shorts from './screens/Shorts';
import Notifications from './screens/Notifications';



const Stack = createBottomTabNavigator();
const Sck2ta = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  
  
  return (

    
   
<Stack.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        
        
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          
          if (route.name === 'Home') {

            iconName = focused
              ? 'home'
              : 'home-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          } else if (route.name === 'Profile') {

            iconName = focused ? 'person' : 'person-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
          else if (route.name === 'Chat') {

            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
          else if (route.name === 'Login') {

            iconName = focused ? 'person' : 'person-outline';
            iconColor = focused
              ? '#0078E9'
              : "black"
          }
          else if (route.name === 'Signup') {

            iconName = focused ? 'person-add' : 'person-add-outline';
            iconColor = focused
              ? '#0078E9'
              : "black"
          }
          else if (route.name === 'Shorts') {

            iconName = focused ? 'play-circle' : 'play-circle-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
          else if (route.name === 'Notifications') {

            iconName = focused ? 'notifications' : 'notifications-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
         

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={iconColor} />;
          ;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>

        
            {user ? (
              <>
          <Stack.Screen name="Home" component={HomeNavigation}  />
          <Stack.Screen name="Chat" component={ChatNavigation} />
          <Stack.Screen name="Shorts" component={Shorts} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Profile" component={ProfileNavigaton} />
  

         
          </>
            ) : (
              <>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignupScreen}/>
          </>
          )}
          </Stack.Navigator>
   
  )
}

export default StackNavigator