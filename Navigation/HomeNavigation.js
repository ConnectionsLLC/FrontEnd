import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlusModal from '../components/PlusModal';
import UserProfileScreen from '../screens/UserProfileScreen'
import UserPost from '../components/UserPost';


const HomeNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Plus" component={PlusModal}  />
            <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
            <Stack.Screen name="UserPost" component={UserPost}/>
    </Stack.Navigator>
  )
}

export default HomeNavigation