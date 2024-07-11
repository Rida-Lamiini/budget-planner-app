import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    if (fontError) {
      return <Text>Error loading fonts</Text>;
    }
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="AddNewCategory"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle:'Add New Category'
        }}

      />
      <Stack.Screen
      name='AddNewCatItem'
      options={{
        presentation:'modal',
        headerShown:true,
        headerTitle:'Add New Item'
      }}

      
      />
    </Stack>
  );
}
