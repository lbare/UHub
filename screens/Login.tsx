import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import { useNavigation } from "@react-navigation/native";
import BackgroundImage from "../components/BackgroundImage";
import { CaretLeft, X } from "phosphor-react-native";

type LoginProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const [errorType, setErrorType] = useState<"email" | "server" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readyToFocus, setReadyToFocus] = useState(false);

  const navigation = useNavigation();
  const authManager = new FirebaseAuthManager();
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (email !== "" && !validateEmail()) {
      setError("email", "Email must be a valid UVic email");
    } else {
      setError(null, "");
    }
  }, [email]);

  // useEffect(() => {
  //   if (infoMessage) {
  //     const timer = setTimeout(() => {
  //       setInfoMessage("");
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [infoMessage]);

  useEffect(() => {
    if (otpSent) {
      setTimeout(() => {
        setReadyToFocus(true);
      }, 300);
    }
  }, [otpSent]);

  useEffect(() => {
    if (readyToFocus && passwordRef.current) {
      console.log("focusing");

      passwordRef.current.focus();
      setReadyToFocus(false);
    }
  }, [readyToFocus]);

  const handleSignIn = async () => {
    setLoading(true);

    const response = authManager.initiatePasswordlessSignIn(email);
    response
      .then(() => {
        setOtpSent(true);
        setInfoMessage("6-digit code has been sent to " + email);
        setLoading(false);
      })
      .catch((error) => {
        setError("server", error);
        setLoading(false);
      });
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    authManager
      .handleSignInWithOTP(email, password)
      .then((success) => {
        if (success) {
          Alert.alert("Success", "Successfully logged in as " + email);
          setModalVisible(false);
          navigation.goBack();
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("server", error);
        setLoading(false);
      });
  };

  const setError = (field: "email" | "server" | null, message: string) => {
    setErrorType(field);
    setErrorMessage(message);
  };

  const validateEmail = () => email.endsWith("@uvic.ca");

  const backToEmail = () => {
    setOtpSent(false);
    setPassword("");
    setInfoMessage("");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      {otpSent ? (
        <TouchableOpacity
          className="absolute top-8 left-0 z-10 h-24 w-24 justify-center items-center"
          onPress={backToEmail}
        >
          <View className="justify-center items-center rounded-full h-8 w-8 bg-blue">
            <CaretLeft size={24} color="#ededed" weight="bold" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="absolute top-8 left-0 z-10 h-24 w-24 justify-center items-center"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View className="justify-center items-center rounded-full h-8 w-8 bg-blue">
            <X size={24} color="#ededed" weight="bold" />
          </View>
        </TouchableOpacity>
      )}
      <>
        <BackgroundImage source={require("../assets/splash-login.png")} />
        <View className="flex h-80 pb-20 justify-end items-center px-10">
          {!otpSent ? (
            <TextInput
              placeholder="UVic Email"
              returnKeyType="send"
              value={email}
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              className={`w-full h-12 border-2 bg-white rounded-lg px-4 ${
                errorType === "email"
                  ? "border-orange"
                  : email !== "" || emailFocused
                  ? "border-blue"
                  : "border-neutral-400"
              }`}
              style={{
                fontSize: 16,
                color: "#154058",
                fontWeight: "bold",
                opacity: otpSent ? 0.9 : 1,
              }}
              editable={!otpSent}
              onBlur={() => {
                if (validateEmail()) {
                  handleSignIn();
                }
              }}
            />
          ) : (
            <TextInput
              ref={passwordRef}
              placeholder="One Time Password"
              value={password}
              returnKeyType="done"
              editable={!loading}
              onChangeText={(text) => {
                setPassword(text);
              }}
              className={`w-full h-12 border-2 bg-white rounded-lg px-4 ${
                passwordFocused && password !== ""
                  ? "border-blue"
                  : "border-neutral-400"
              }`}
              style={{
                fontSize: 16,
                color: "#154058",
                fontWeight: "bold",
              }}
              keyboardType="phone-pad"
              onBlur={() => {
                setPasswordFocused(false);
              }}
              onFocus={() => {
                setPasswordFocused(true);
              }}
            />
          )}
          <View
            className={`flex w-full h-10 justify-center items-center px-2 rounded-b-lg bg-white ${
              !errorMessage && !infoMessage && "opacity-0"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                errorMessage ? "text-orange" : "text-blue"
              }`}
            >
              {errorMessage || infoMessage}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => (otpSent ? handleVerifyOTP() : handleSignIn())}
            disabled={
              loading || errorType == "email" || (otpSent && password === "")
            }
            className="w-full h-12 rounded-full justify-center items-center mb-4 bg-orange"
          >
            {!loading ? (
              <Text className="text-white font-bold text-base">
                {otpSent ? "Verify OTP" : "Send Code"}
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </>
    </ScrollView>
  );
};

export default Login;
