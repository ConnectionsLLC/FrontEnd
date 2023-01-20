import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import useAuth from './hooks/useAuth';


export default function App() {
 const {user} = useAuth()
 
  return (
   <NavigationContainer >
    <AuthProvider>
    
    
      <StackNavigator />
     
    
    </AuthProvider>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
