import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import { useNavigation } from "@react-navigation/native";

type LoginProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const authManager = new FirebaseAuthManager();

  const handleSignIn = async () => {
    try {
      await authManager.signIn(email, password);
      Alert.alert("Success", "You are now signed in.");
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      await authManager.signUp(email, password);
      Alert.alert("Success", "Account created. You are now signed in.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to sign up. Please make sure your email is a valid UVic email."
      );
    }
  };

  return (
    <View className="flex w-full h-full">
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: "#4CAF50",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: "#2196F3",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#408CA8",
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: -220,
  },
  input: {
    height: 50,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  error: {
    color: "#dc3545",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
  },
});

export default Login;
