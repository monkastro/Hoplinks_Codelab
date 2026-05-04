# Expo Deep Linking Guide

This guide provides a comprehensive step-by-step process to set up, configure, and test Deep Linking and Universal/App Links in an Expo React Native application.

## Prerequisites
- Expo CLI installed globally or locally.
- Expo Go app installed on a physical device, or an iOS Simulator/Android Emulator.
- React Navigation set up in your project (`@react-navigation/native`, `@react-navigation/bottom-tabs`, etc.).

## Step 1: Configure App Settings (`app.json`)

To enable deep linking, you need to configure your app's custom URL scheme and associate it with specific web domains for both iOS (Universal Links) and Android (App Links).

Open your `app.json` and make the following additions:

### 1. Add a Custom Scheme
This allows opening the app via a custom scheme like `myapp://`.

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

### 2. Configure iOS Universal Links
Add the `associatedDomains` array to the `expo.ios` configuration block to define which domains the iOS app is authorized to handle.

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.example.myapp",
      "associatedDomains": [
        "applinks:www.hpln.in",
        "applinks:hoplinks.in"
      ]
    }
  }
}
```

### 3. Configure Android App Links
Add `intentFilters` to the `expo.android` configuration block. This explicitly tells Android to intercept `https` URLs for the specified hosts and open your app.

```json
{
  "expo": {
    "android": {
      "package": "com.example.myapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            { "scheme": "https", "host": "www.hpln.in" },
            { "scheme": "https", "host": "hoplinks.in" }
          ]
        }
      ]
    }
  }
}
```

## Step 2: Implement Navigation Routing (`App.js`)

You need to instruct React Navigation on how to map incoming URLs to specific screens within your app's navigation structure.

### 1. Import `expo-linking`
```javascript
import * as Linking from 'expo-linking';
```

### 2. Define the Linking Configuration
Create a linking object that defines the URL prefixes your app responds to, and a `config` object that maps URL paths to navigation screens.

```javascript
// Creates a base prefix for Expo Go development URLs
const prefix = Linking.createURL('/');

const linking = {
  prefixes: [
    prefix,              // Handles Expo Go URLs (e.g., exp://...)
    'myapp://',          // Handles your custom scheme
    'https://www.hpln.in', // Handles production HTTPS links
    'https://hoplinks.in', // Handles production HTTPS links
  ],
  config: {
    screens: {
      Home: 'home',             // Matches myapp://home
      Explore: 'product/:id',   // Matches myapp://product/123, passes 123 as 'id' param
      Notifications: 'notifications', // Matches myapp://notifications
      Profile: 'profile',       // Matches myapp://profile
    },
  },
};
```

### 3. Pass the Linking Object to NavigationContainer
Provide the `linking` object as a prop to your root `NavigationContainer`.

```javascript
export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Your Tab.Navigator or Stack.Navigator goes here */}
    </NavigationContainer>
  );
}
```

## Step 3: Accessing Parameters in Screens

When a user opens a route that contains a dynamic parameter (like `product/:id`), React Navigation automatically extracts the parameter and passes it via the `route.params` object to the target screen.

**Example in `screens/ExploreScreen.js`:**

```javascript
import React from 'react';
import { View, Text } from 'react-native';

export default function ExploreScreen({ route }) {
  // Extract the dynamic 'id' parameter from the route
  const { id } = route.params || {};

  return (
    <View>
      <Text>Viewing Product Details</Text>
      {id ? <Text>Product ID: {id}</Text> : <Text>No product ID provided.</Text>}
    </View>
  );
}
```

## Step 4: Testing Deep Links

You can test deep links locally using command-line tools for your running simulator or emulator. Ensure your Expo Metro server is running (`npx expo start`).

### Testing on iOS Simulator

Use the `xcrun simctl openurl` command to send a deep link to an active iOS simulator.

**Testing via Expo Go (Development Mode):**
*Note: The `/--/` separator is necessary when testing paths in Expo Go. Replace the IP (`192.168.1.7:8081`) with the specific network address of your Metro Bundler.*

```bash
xcrun simctl openurl booted "exp://192.168.1.7:8081/--/home"
xcrun simctl openurl booted "exp://192.168.1.7:8081/--/product/99"
xcrun simctl openurl booted "exp://192.168.1.7:8081/--/notifications"
xcrun simctl openurl booted "exp://192.168.1.7:8081/--/profile"
```

**Testing via Custom Scheme (Standalone Build):**
```bash
xcrun simctl openurl booted "myapp://product/42"
```

### Testing on Android Emulator

Use `adb shell am start` to trigger deep links on a running Android emulator or connected device.

**Testing via Expo Go (Development Mode):**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "exp://192.168.1.7:8081/--/product/77" host.exp.exponent
```

**Testing via Custom Scheme (Standalone Build):**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myapp://home" com.example.myapp
```

### Alternative Testing Method: Expo URI Scheme Tool
Expo provides a built-in utility to test deep links easily across platforms:
```bash
npx uri-scheme open "myapp://home" --ios
npx uri-scheme open "myapp://product/123" --android
```

## Step 5: Production Deployment Verification

For Universal Links (iOS) and App Links (Android) to work with `https://` URLs in a production build, your website MUST serve association files to prove domain ownership.

- **iOS (AASA File):** Host an `apple-app-site-association` file at `https://www.hpln.in/.well-known/apple-app-site-association`.
- **Android (Asset Links File):** Host an `assetlinks.json` file at `https://www.hpln.in/.well-known/assetlinks.json`.

When you run `eas build`, Expo automatically injects the necessary configuration into the native application based on your `app.json`, but these server-side verification files remain a strict requirement by Apple and Google for security.
