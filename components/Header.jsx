import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { client } from '../utils/KindeConfig';
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDetails = await client.getUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image 
            source={user.picture ? { uri: user.picture } : require('../assets/favicon.png')}
            style={styles.profileImage} 
          />
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.userName}>{user.given_name}</Text>
            </View>
            <Ionicons name="notifications" size={24} color="white" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 10,
  },
  welcomeText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily:'outfit'
  },
  userName: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily:'outfit-bold'
  },
});
