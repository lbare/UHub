import React, { useEffect, useState } from "react";
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
import BackgroundImage from "../components/BackgroundImage";

type LoginProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState<"email" | "password" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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

  const checkEmail = () => {
    if (!email.endsWith("@uvic.ca")) {
      setErrorType("email");
      setErrorMessage("Email must be a valid UVic email");
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (password.length < 6) {
      setErrorType("password");
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  return (
    <View className="flex w-full h-full justify-end">
      <BackgroundImage source={require("../assets/splash-login.png")} />
      <View className="flex justify-center items-center px-10 h-3/4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className={`w-full h-12 border-2 bg-white rounded-lg px-4 mb-4 ${
            errorType === "email"
              ? "border-orange"
              : passwordFocused || password !== ""
              ? "border-blue"
              : "border-neutral-400"
          }`}
          style={{
            fontSize: 16,
            color: "#154058",
            fontWeight: "bold",
          }}
          onBlur={() => {
            setEmailFocused(false);
            checkEmail();
          }}
          onFocus={() => setEmailFocused(true)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className={`w-full h-12 border-2 bg-white rounded-lg px-4 ${
            errorType === "password"
              ? "border-orange"
              : passwordFocused || password !== ""
              ? "border-blue"
              : "border-neutral-400"
          }`}
          style={{
            fontSize: 16,
            color: "#154058",
            fontWeight: "bold",
          }}
          secureTextEntry
          onBlur={() => {
            setPasswordFocused(false);
            checkPassword();
          }}
          onFocus={() => setPasswordFocused(true)}
        />

        <View className="flex h-10 justify-center items-center mb-4 bg-white">
          {errorMessage ? (
            <Text className="text-center font-bold text-orange">
              {errorMessage}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (checkEmail() && checkPassword()) {
              handleSignIn();
            }
          }}
          className="w-full h-12 rounded-full justify-center items-center mb-4 bg-orange"
        >
          <Text className="text-white font-bold text-base">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (checkEmail() && checkPassword()) {
              handleSignIn();
            }
          }}
          className={
            "w-full h-12 rounded-full justify-center items-center mb-4 bg-blue"
          }
        >
          <Text className="text-white font-bold text-base">Sign Up</Text>
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
