import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Alert,
  } from "react-native";
  import { useState } from 'react';
  import { useFonts } from "expo-font";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { auth, database } from '../firebase/Config';
  import { collection, query, addDoc, onSnapshot, orderBy } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focused, setFocused] = useState(false);
    const [focused2, setFocused2] = useState(false);
    const [users, setUsers] = useState([]);
    const user = auth.currentUser;

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!loaded) {
        return undefined;
    }    

    const handleRegister = () => {
      if (email !== "" && password !== "") {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Successfully registered
            // Create a user document in Firestore
            const usersRef = collection(database, 'users');
            addDoc(usersRef, {
              userId: auth.currentUser.uid,
              email: email, 
              
            })
              .then(() => {
                console.log('User document added to Firestore');
              })
              .catch((error) => {
                console.error('Error adding user document: ', error);
              });
          })
          .catch((err) => Alert.alert("Register error", err.message));
      }
    }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Ionicons
        name="lock-closed-sharp"
        color={"#000000"}
        size={60}
        style={{ marginBottom: 50 }}
      />

      <Text
        style={{
          fontSize: 20,
          marginHorizontal: 50,
          fontFamily: "Poppins",
          fontWeight: 500,
        }}
      >
        Get started{" "}
      </Text>

      <Text style={styles.registerText3}>Register Here</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[
            {
              fontWeight: "500",
              backgroundColor: "#dae0eb",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 5,
              borderWidth: 1,
              borderColor: "#838c9c",
            },
            focused && {
              backgroundColor: "#dae0eb",
              borderWidth: 3,
              borderColor: "#0853d4",
              shadowOffset: { width: 4, height: 20 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 20,
            },
          ]}
        />

        <TextInput
          onFocus={() => setFocused2(true)}
          onBlur={() => setFocused2(false)}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
          style={[
            {
              fontWeight: "500",
              backgroundColor: "#dae0eb",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 5,
              borderWidth: 1,
              borderColor: "#838c9c",
            },
            focused2 && {
              backgroundColor: "#dae0eb",
              borderWidth: 3,
              borderColor: "#0853d4",
              shadowOffset: { width: 4, height: 20 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 20,
            },
          ]}
        />
      </View>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonOutline}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.registerText1}>Already have an account?</Text>
        <Text
          style={styles.registerText2}
          onPress={() => navigation.navigate("Login")}
        >
          Login Here
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F2F2F2",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      fontWeight: "500",
      backgroundColor: "#dae0eb",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#838c9c",
    },
    registerContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#2c6bed",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    buttonOutline: {
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
    },
    registerText1: {
      fontSize: 17,
      fontFamily: "Poppins",
    },
    registerText2: {
      color: "#2c6bed",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Poppins",
    },
  
    registerText3: {
      fontSize: 35,
      color: "#1c73ba",
      marginVertical: 50,
      margin: 20,
      fontFamily: "Poppins",
    },
  });

export default RegisterScreen