import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ComparisonScreen from './screens/ComparisonScreen';
import PlaceDetailsScreen from './screens/PlaceDetailsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import AreasScreen from './screens/AreasScreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'NeatoFood - Home' }}
        />
        <Stack.Screen 
          name="Comparison" 
          component={ComparisonScreen}
          options={{ title: 'Compare Prices' }}
        />
        <Stack.Screen 
          name="PlaceDetails" 
          component={PlaceDetailsScreen}
          options={{ title: 'Place Details' }}
        />
        <Stack.Screen 
          name="AboutUs" 
          component={AboutUsScreen}
          options={{ title: 'About Us' }}
        />
        <Stack.Screen 
          name="Areas" 
          component={AreasScreen}
          options={{ title: 'Areas' }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={{ title: 'Map' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


