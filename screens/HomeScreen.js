import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { collection, query, addDoc, onSnapshot, orderBy, setDoc, getDocs, getDoc } from 'firebase/firestore';
import { auth, database } from '../firebase/Config';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {

  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  

  //alkuperäinen
  useEffect(() => {

    const usersRef = collection(database, 'users');
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        _id: doc.id,
        email: doc.data().email,

      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  console.log("Users:", users);

  return (

    <View style={styles.container}>
      <View style={styles.container3}>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                //createChatRoom(user, item);
                //navigation.navigate('Chat', { userEmail: item.email, });
                navigation.navigate('Chat', { userEmail: item.email });
              }}>
              <View style={styles.userInfo}>
                <View style={styles.imgwrp}>
                  <Ionicons
                    name="person-circle"
                    color={"#000000"}
                    size={50}
                    style={{ borderRadius: 25, height: 50, width: 50 }}
                  />
                </View>
                <View style={styles.textSelection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.username}>{item.email}</Text>
                  </View>
                  {/* <Text style={styles.messageText}>{lastMessages[item.email]}</Text> */}
                  <Text style={styles.messageText}>Last message here!</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

        />
      </View>
    </View>


    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    // backgroundColor: "#1c73ba",
    //backgroundColor: "#f2f2f2"
    backgroundColor: "#d1cfc7",
  },

  headerContainer: {
    paddingTop: 40,
    flex: 0.12,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },

  // container3: {
  //   flex: 0.88,
  //   backgroundColor: "#f2f2f2",
  //   width: "100%",
  //   borderTopStartRadius: 40,
  //   borderTopEndRadius: 40,
  // },

  chatButton: {
    backgroundColor: "#f57c00",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,

  },
  useritem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  touchable: {
    width: "100%",
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  textSelection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: "0",
    marginleft: 10,
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },

  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  username: {
    fontSize: 14,
    fontWeight: "bold",

  },

  imgwrp: {
    paddingTop: 15,
    paddingBottom: 15,

  },
  messageText: {
    fontSize: 14,
    color: "#333333"
  },

});

export default HomeScreen;
