import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import loginbg from './../../assets/images/bglogin.png';
import Colors from '../../utils/Colors';
import { client } from '../../utils/KindeConfig';
import services from './../../utils/services';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const token = await client.login();
      if (token) {
        // User was authenticated
        await services.storeData('login', 'true');
        router.replace('/');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginbg} style={styles.bgImage} />

      <View style={styles.content}>
        <Text style={styles.title}>Personal Budget Planner</Text>
        <Text style={styles.subtitle}>
          Stay on Track, Event by Event: Your Personal Budget App
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login/Signup</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          * By login/signup you agree to our terms
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK,
  },
  content: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    height: '60%',
    padding: 20,
    marginTop: -30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.WHITE,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 13,
    color: Colors.WHITE,
    marginTop: 10,
    textAlign: 'center',
  },
});

