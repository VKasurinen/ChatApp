import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { auth } from '../firebase/Config';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focused, setFocused] = useState(false);
    const [focused2, setFocused2] = useState(false);

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!loaded) {
        return undefined;
    }

    const handleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login success"))
            .catch((err) => Alert.alert("Login error", err.message));
        }
    }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Ionicons
        name="lock-open-sharp"
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
        Welcome to ChatApp
      </Text>

      <Text style={styles.loginText3}>Login Here</Text>

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
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonOutline}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.loginText1}>Need an account?</Text>
        <Text
          style={styles.loginText2}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


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
    loginContainer: {
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
    loginText1: {
      fontSize: 17,
      fontFamily: "Poppins",
    },
    loginText2: {
      color: "#2c6bed",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Poppins",
    },
  
    loginText3: {
      fontSize: 35,
      color: "#1c73ba",
      marginVertical: 50,
      margin: 20,
      fontFamily: "Poppins",
    },
  });