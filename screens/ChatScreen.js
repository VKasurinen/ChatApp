import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase/Config';
import { signOut } from 'firebase/auth';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { collection, query, addDoc, onSnapshot, orderBy} from 'firebase/firestore'

import {leftaction, chatinput, sendbutton} from 'react-native-gifted-chat'

const ChatScreen = () => {
  //const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const userEmail = route.params?.userEmail || "";
  

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  };

  // useEffect(() => {
  //   // Load messages from the chat room using the chatRoomId
  //   const unsubscribe = getMessagesFromChatRoom(chatRoomId, (messages) => {
  //     setMessages(messages);
  //   });

  //   return () => unsubscribe();
  // }, [chatRoomId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        style={{marginRight: 10}}
        onPress={onSignOut}
        >
          <AntDesign name='logout' size={24} color="#3d424a" style={{marginRight: 10}} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  
  //ALKUPERÄINEN
  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unSubscribe = onSnapshot(q, snapshot => {
      //console.log()
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unSubscribe();
  }, []);


  const onSend = useCallback((newMessages = [], userEmail) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [userEmail]: GiftedChat.append(prevMessages[userEmail] || [], newMessages),
    }));
  
    const { _id, createdAt, text, user } = newMessages[0];
    
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
      userEmail, // Add the user's email to identify the chat
    });
  }, []);
  



  //ALKUPERÄINEN
  // const onSend = useCallback((messages = []) => {
  //   setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
  
  //   const {_id, createdAt, text, user} = messages[0];
  //   //const chatRoomRef = collection(database, "chatRooms", chatRoomId, "messages");
  //   addDoc(collection(database, "chats"), {
  //     _id,
  //     createdAt,
  //     text,
  //     user
  //   });
  // }, []);

  const renderTextInput = (props) => {
    return (
      <View style={{ backgroundColor: 'lightblue', paddingHorizontal: 8 }}>
        <TextInput
          {...props}
          style={{ color: 'red', fontSize: 16 }}
          placeholderTextColor="gray"
        />
      </View>
    );
  };

  return (

    <GiftedChat
    messages={messages[userEmail] || []}
    onSend={(newMessages) => onSend(newMessages, userEmail)}
    user={{
      //_id: auth?.currentUser?.email,
      _id: auth?.currentUser?.uid,
    }}
    messagesContainerStyle={{
      backgroundColor: "#d1cfc7",
    }}
    alwaysShowSend
  />

    
      // <GiftedChat
      //   messages={messages}
      //   onSend={(newMessages) => onSend(newMessages)}
      //   //renderComposer={renderTextInput}
      //   user={{
      //     _id: auth?.currentUser?.email,
      //     _id: auth?.currentUser?.uid
      //     //avatar: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsm.ign.com%2Fign_nordic%2Fcover%2Fa%2Favatar-gen%2Favatar-generations_prsz.jpg&tbnid=iK0aSJqa8CD5XM&vet=12ahUKEwjtpJDpiqqBAxXQKhAIHU2DBrQQMygVegQIARB5..i&imgrefurl=https%3A%2F%2Fnordic.ign.com%2Favatar-generations&docid=wjdb3XJbc0CZ8M&w=1024&h=1024&q=avatar&ved=2ahUKEwjtpJDpiqqBAxXQKhAIHU2DBrQQMygVegQIARB5" 
      //   }}
      //   messagesContainerStyle={{
      //     backgroundColor: "#d1cfc7"
      //   }}//#e0dfda
      //   alwaysShowSend
        
        
      // />
    
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

export default ChatScreen