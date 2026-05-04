import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import * as Linking from 'expo-linking';

const Tab = createBottomTabNavigator();

// Step 3.1 — base prefix for Expo Go development URLs
const prefix = Linking.createURL('/');
console.log('--- LINKING PREFIX ---', prefix);
// Step 3.2 — full routing configuration
const linking = {
  prefixes: [
    prefix,              // Expo Go URLs
    'exp://127.0.0.1:8082/--/', // Explicit for iOS Simulator testing
    'exp://localhost:8082/--/',
    'myapp://',          // Custom scheme
    'https://www.hpln.in',
    'https://hoplinks.in',
  ],
  config: {
    screens: {
      Home: 'home',
      Explore: 'product/:id',   // :id is a dynamic param
      Notifications: 'notifications',
      Profile: 'profile',
    },
  },
};



const TAB_ICON = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Explore: { focused: 'compass', unfocused: 'compass-outline' },
  Notifications: { focused: 'notifications', unfocused: 'notifications-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? TAB_ICON[route.name].focused
              : TAB_ICON[route.name].unfocused;
            return (
              <View style={focused ? styles.activeTab : null}>
                <Ionicons name={iconName} size={22} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: '#555577',
          tabBarStyle: {
            backgroundColor: '#13132B',
            borderTopColor: '#2A2A4A',
            borderTopWidth: 1,
            height: 85,
            paddingTop: 8,
            paddingBottom: 28,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 4,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#6C63FF20',
    borderRadius: 12,
    padding: 6,
  },
});
