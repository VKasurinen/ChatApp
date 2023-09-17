import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen  from './screens/HomeScreen';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase/Config';

const Stack = createStackNavigator();

const AuthUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  )
}

const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={{component: HomeScreen}}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={{component: HomeScreen}} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
    </Stack.Navigator>
  )
}


const RootNavigator = () => {
  const {user, setUser} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,
      async authenticatedUser => { 
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unSubscribe();
    }, [user]);
    if(loading){
      return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  return (
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  );
}


