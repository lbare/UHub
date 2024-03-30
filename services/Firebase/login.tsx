import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';
import FirebaseAuthManager from './firebase-auth'; 

type LoginPageProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

// Use props in your component
const LoginPage: React.FC<LoginPageProps> = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authManager = new FirebaseAuthManager();

  const handleSignIn = async () => {
    try {
      await authManager.signIn(email, password);
      Alert.alert("Success", "You are now signed in.");
      setModalVisible(false); // Close modal upon successful sign-in
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      await authManager.signUp(email, password);
      Alert.alert("Success", "Account created. You are now signed in.");
      setModalVisible(false); // Close modal upon successful sign-up
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to sign up. Please make sure your email is a valid UVic email.");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)} // Allows closing the modal with the Android back button
    >
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
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default LoginPage;
