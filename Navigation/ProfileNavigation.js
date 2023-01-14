import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../components/EditProfile';
import { useNavigation } from '@react-navigation/native';


const ProfileNavigaton = () => {
    const navigation = useNavigation()
    const Stack = createNativeStackNavigator();
    Stack.navigationOptions = () => {

        let tabBarVisible = true;
    
        let routeName = navigation.state.routes[navigation.state.index].routeName
    
        if ( routeName == 'Message' ) {
            tabBarVisible = false
        }
    
        return {
            tabBarVisible,
        }
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, tabBarVisible: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    )
}

export default ProfileNavigaton