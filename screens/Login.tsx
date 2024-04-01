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
  const [errorType, setErrorType] = useState<
    "email" | "password" | "both" | "firebase" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigation = useNavigation();
  const authManager = new FirebaseAuthManager();

  useEffect(() => {
    if (
      email !== "" &&
      !validateEmail() &&
      password.length > 0 &&
      !validatePassword()
    ) {
      setError("both", "Email must be a valid UVic email");
    } else if (email !== "" && !validateEmail()) {
      setError("email", "Email must be a valid UVic email");
    } else if (password.length > 0 && !validatePassword()) {
      setError("password", "Password must be at least 6 characters");
    } else {
      setError(null, "");
    }
  }, [email, password]);

  useEffect(() => {
    if (errorType === "firebase") {
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  }, [errorType]);

  const handleSignIn = async () => {
    try {
      await authManager.signIn(email, password);
      Alert.alert("Success", "You are now signed in.");
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setError(
        "firebase",
        "Failed to sign in. Please check your email and password."
      );
    }
  };

  const handleSignUp = async () => {
    try {
      await authManager.signUp(email, password);
      Alert.alert("Success", "Account created. You are now signed in.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setError("firebase", "Failed to sign up. Please try again.");
    }
  };

  const setError = (
    field: "email" | "password" | "both" | "firebase" | null,
    message: string
  ) => {
    setErrorType(field);
    setErrorMessage(message);
  };

  const validateEmail = () => email.endsWith("@uvic.ca");
  const validatePassword = () => password.length >= 6;

  return (
    <View className="flex w-full h-full justify-end">
      <BackgroundImage source={require("../assets/splash-login.png")} />
      <View className="flex justify-center items-center px-10 h-3/4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          className={`w-full h-12 border-2 bg-white rounded-lg px-4 mb-4 ${
            errorType === "email" ||
            errorType === "both" ||
            errorType === "firebase"
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
          }}
          onFocus={() => {
            setEmailFocused(true);
            if (errorType === "firebase") setError(null, "");
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          className={`w-full h-12 border-2 bg-white rounded-lg px-4 ${
            errorType === "password" ||
            errorType === "both" ||
            errorType === "firebase"
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
          }}
          onFocus={() => {
            setPasswordFocused(true);
            if (errorType === "firebase") setError(null, "");
          }}
        />

        <View
          className={`flex h-10 justify-center items-center px-2 rounded-b-lg mb-4 bg-white ${
            !errorMessage && "opacity-0"
          }`}
        >
          <Text className="text-center font-bold text-orange">
            {errorMessage}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleSignIn()}
          disabled={errorType !== null}
          className="w-full h-12 rounded-full justify-center items-center mb-4 bg-orange"
        >
          <Text className="text-white font-bold text-base">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSignUp()}
          disabled={errorType !== null}
          className="w-full h-12 rounded-full justify-center items-center mb-4 bg-blue"
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
