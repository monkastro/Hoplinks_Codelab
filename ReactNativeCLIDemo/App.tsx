import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Deep Linking Configuration - To be added manually
// const linking = { ... };

const TAB_ICON: Record<string, { focused: string; unfocused: string }> = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Explore: { focused: 'compass', unfocused: 'compass-outline' },
  Notifications: { focused: 'notifications', unfocused: 'notifications-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

function App(): React.JSX.Element {

  /**
   * Deep Linking Configuration
   * 
   * This object defines how the application handles incoming links.
   * - prefixes: The URL schemes and domains the app should respond to.
   * - config: Mapping of URL paths to specific screens in the navigation stack.
   */
  const linking = {
    prefixes: [
      "myapp://",           // Custom URI scheme (e.g., myapp://home)
      "https://hoplinks.in", // Universal link domain (iOS) / App Link domain (Android)
      "https://www.hoplinks.in",
    ],
    config: {
      screens: {
        Home: "home",
        Explore: "product/:id",  // Dynamic parameter example: myapp://product/123
        Notifications: "notifications",
        Profile: "profile",
      },
    },
  };


  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <StatusBar barStyle="light-content" backgroundColor="#13132B" />
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#6C63FF20',
    borderRadius: 12,
    padding: 6,
  },
});

export default App;
