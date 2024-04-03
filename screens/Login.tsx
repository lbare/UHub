import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import { useNavigation } from "@react-navigation/native";
import BackgroundImage from "../components/BackgroundImage";
import { CaretLeft } from "phosphor-react-native";

type LoginProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const [errorType, setErrorType] = useState<
    "email" | "password" | "both" | "server" | "firebase" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigation = useNavigation();
  const authManager = new FirebaseAuthManager();
  const passwordRef = useRef(null);

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
      setError("password", "OTP must be 6 digit numbers");
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
    const response = authManager.initiatePasswordlessSignIn(email);
    response
      .then(() => {
        setOtpSent(true);
        setInfoMessage("6-digit code has been sent to your email.");
        setError(null, "");
      })
      .catch((error) => {
        setError("server", error);
      });
  };

  const handleVerifyOTP = async () => {
    authManager
      .handleSignInWithOTP(email, password)
      .then((success) => {
        if (success) {
          setModalVisible(false);
          navigation.goBack();
        }
      })
      .catch((error) => {
        setError("server", error);
      });
  };

  const setError = (
    field: "email" | "password" | "both" | "firebase" | "server" | null,
    message: string
  ) => {
    setErrorType(field);
    setErrorMessage(message);
  };

  const validateEmail = () => email.endsWith("@uvic.ca");
  const validatePassword = () => {
    return password.length == 6 && !isNaN(Number(password));
  };
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      scrollEnabled={false}
    >
      <TouchableOpacity
        className="absolute top-14 left-6 rounded-full z-10 bg-blue h-8 w-8 justify-center items-center opacity-80"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <CaretLeft size={24} color="#ededed" weight="bold" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <BackgroundImage source={require("../assets/splash-login.png")} />
          <View className="flex justify-center items-center mt-96 px-10">
            <TextInput
              placeholder="UVic Email"
              returnKeyType="next"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              className={`w-full h-12 border-2 bg-white rounded-lg px-4 mb-3 ${
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
                opacity: otpSent ? 0.9 : 1,
              }}
              editable={!otpSent}
              onBlur={() => {
                if (validateEmail() && passwordRef.current) {
                  (passwordRef.current as any).focus();
                  setPasswordFocused(true);
                }
              }}
              onFocus={() => {
                setEmailFocused(true);
                if (errorType === "firebase") setError(null, "");
              }}
            />
            {infoMessage !== "" && (
              <View className="flex h-4 justify-center items-center px-2 rounded-lg mb-2 bg-white">
                <Text className="text-center text-xs font-bold text-blue">
                  {infoMessage}
                </Text>
              </View>
            )}
            {otpSent && (
              <TextInput
                ref={passwordRef}
                placeholder="One Time Password"
                value={password}
                returnKeyType="done"
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
                keyboardType="phone-pad"
                onBlur={() => {
                  setPasswordFocused(false);
                }}
                onFocus={() => {
                  setPasswordFocused(true);
                  if (errorType === "firebase") setError(null, "");
                }}
              />
            )}

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
              onPress={() => (otpSent ? handleVerifyOTP() : handleSignIn())}
              disabled={errorType == "email" || errorType == "password"}
              className="w-full h-12 rounded-full justify-center items-center mb-4 bg-orange"
            >
              <Text className="text-white font-bold text-base">
                {" "}
                {otpSent ? "Verify OTP" : "Send Code"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Login;
