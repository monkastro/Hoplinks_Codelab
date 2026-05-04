# Complete React Native (Expo) Deep Linking Guide

This document is a comprehensive, step-by-step tutorial on how we implemented Deep Linking, Android App Links, and iOS Universal Links in your Expo application, along with Hoplinks integration.

## 🛠 Tech Stack & Libraries
*   **Framework:** React Native with Expo (`expo` ^54.0)
*   **Navigation:** React Navigation (`@react-navigation/native` ^7.x)
*   **Deep Linking Library:** `expo-linking` (Handles URL parsing and routing)
*   **Testing Tool:** `uri-scheme` (CLI tool to test links locally)

---

## 📖 Step 1: Install Required Libraries

To capture incoming URLs and pass them to React Navigation, we need the `expo-linking` package.

```bash
# In your project directory
npx expo install expo-linking
```

---

## ⚙️ Step 2: Configure `app.json`

The `app.json` file is where you tell the iOS and Android operating systems that your app has the right to open specific URLs. 

We configure two things:
1.  **Custom URL Scheme** (`myapp://`)
2.  **Verified Web Domains** (`https://www.hpln.in` and `https://hoplinks.in`)

Update your `app.json` like this:

```json
{
  "expo": {
    "scheme": "myapp",
    "ios": {
      "bundleIdentifier": "com.example.myapp",
      "associatedDomains": [
        "applinks:www.hpln.in",
        "applinks:hoplinks.in"
      ]
    },
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
> [!NOTE] 
> `autoVerify: true` is what tells Android to fetch the `assetlinks.json` file from your website to verify ownership.

---

## 🗺 Step 3: Setup React Navigation Mapping (`App.js`)

Now that the OS knows to open your app when a link is clicked, your app needs to know **which screen** to show.

In `App.js`, we define a `linking` object and pass it to the `<NavigationContainer>`:

```javascript
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';

// 1. Define the base prefix for Expo
const prefix = Linking.createURL('/');

// 2. Define your routing configuration
const linking = {
  prefixes: [
    prefix, 
    'myapp://', 
    'https://www.hpln.in', 
    'https://hoplinks.in'
  ],
  config: {
    screens: {
      Home: 'home',
      Explore: 'product/:id',       // Maps URLs like /product/123 to the Explore screen
      Notifications: 'notifications', // Maps URLs like /notifications to the Notifications screen
      Profile: 'profile',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Your Tab.Navigator goes here */}
    </NavigationContainer>
  );
}
```

---

## 🎣 Step 4: Reading Data in your Screens

When a user clicks `myapp://product/id123`, React Navigation automatically routes them to the **Explore** screen and passes `{ id: "id123" }` as a parameter.

You can read this parameter using the `useRoute` hook in your component:

```javascript
import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

export default function ExploreScreen() {
  const route = useRoute();
  
  // Extract the ID from the deep link
  const deepLinkId = route.params?.id;

  return (
    <View>
      {deepLinkId && (
        <Text>You opened product: {deepLinkId}</Text>
      )}
    </View>
  );
}
```

---

## 🌍 Step 5: Verify Domain Ownership (Server-Side)

For standard `https://` links to open your app automatically (without prompting the user), Apple and Google require you to prove you own both the App and the Website. 

You must host two files on your web servers (`www.hpln.in` and `hoplinks.in`):

### Android (`assetlinks.json`)
Host at exactly: `https://hoplinks.in/.well-known/assetlinks.json`

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.myapp",
      "sha256_cert_fingerprints": [
        "5C:DB:7E:3F:47:14:4F:72:D0:EE:ED:01:7A:1D:04:87:D3:C3:32:11:F7:1C:D6:04:33:F7:02:ED:06:12:02:2A"
      ]
    }
  }
]
```
> [!TIP]
> You generate this SHA-256 fingerprint from the keystore you use to build the Android app (`debug.keystore` for local, or via `eas credentials` for production).

### iOS (`apple-app-site-association`)
Host at exactly: `https://hoplinks.in/.well-known/apple-app-site-association` *(Note: Do NOT add a .json extension)*

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "<APPLE_TEAM_ID>.com.example.myapp",
        "paths": ["*"]
      }
    ]
  }
}
```

---

## 🧪 Step 6: Testing the Integration

Testing behaves differently depending on whether you are using Expo Go or a Native Build.

### Testing in Expo Go (Development)
Run this in your terminal to test on a running emulator:
```bash
adb shell am start -W -a android.intent.action.VIEW -d "exp://127.0.0.1:8081/--/product/id123"
```

### Testing Native Builds (Production/Staging)
You can test the exact production links using the `uri-scheme` tool:
```bash
# Test Custom Scheme
npx uri-scheme open "myapp://product/id123" --android

# Test Verified App Link
npx uri-scheme open "https://hoplinks.in/product/id123" --android
```

---

## 🔗 Step 7: Integrating with the Hoplinks Dashboard

Now that your app is configured to receive links, you must configure **Hoplinks** to send them correctly.

When you create a marketing link in your Hoplinks Dashboard, you are generating a public URL (e.g., `https://hoplinks.in/promo-summer`). You need to tell Hoplinks exactly what internal app screen that URL should trigger.

### How to configure a link in the Dashboard:
1. Log into your **Hoplinks Dashboard**.
2. Click **Create New Link** (or edit an existing one).
3. Set your standard Destination URL (where web users go if they don't have the app).
4. Scroll down to the **Deep Link Intent** section.
5. In the **In-App Deep Link** field, enter your app's custom scheme followed by the exact path you set up in `App.js` in Step 3.

### Dashboard Configuration Examples:

Based on our `App.js` setup, here is exactly what you should type into the **In-App Deep Link** field in Hoplinks to open your 4 screens:

| Target Screen | What to type in the Hoplinks Dashboard (`In-App Deep Link`) |
| :--- | :--- |
| **Home Screen** | `myapp://home` |
| **Explore Screen** (with data) | `myapp://product/promo-summer-123` |
| **Notifications** | `myapp://notifications` |
| **Profile Screen** | `myapp://profile` |

> [!IMPORTANT]
> **How Hoplinks works under the hood:**
> When a user clicks your short link on their phone, Hoplinks executes a smart script. It attempts to launch the exact `myapp://` URI you provided. 
> * **If the app is installed:** The phone instantly intercepts the intent, opens the app, and React Navigation reads the path and opens the correct screen.
> * **If the app is NOT installed:** The URI fails, and Hoplinks immediately redirects the user to the App Store or Google Play Store to download your app.

---

## 🚀 Step 8: Handling Deferred Deep Linking (First Installs)

**Deferred Deep Linking** occurs when a user clicks your Hoplinks URL, but they *do not have your app installed yet*. 

Hoplinks redirects them to the App Store. The user downloads your app and opens it for the very first time. **How does the app know which screen to show them now?**

React Navigation needs to catch the URL *at the moment the app boots up*. We do this by tapping into Expo's `Linking.getInitialURL()` inside of our `linking` configuration.

Update your `App.js` linking object to handle the initial URL:

```javascript
const linking = {
  prefixes: [prefix, 'myapp://', 'https://www.hpln.in', 'https://hoplinks.in'],
  
  // Add this block to handle Deferred Links on first launch
  async getInitialURL() {
    // 1. Check if the app was opened via a standard OS deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    // 2. (Optional) If you are using a Hoplinks SDK or API to fetch deferred data 
    // based on the device fingerprint or Google Play Install Referrer, you would call it here.
    // const deferredUrl = await Hoplinks.getDeferredLink();
    // if (deferredUrl) return deferredUrl;

    return null;
  },

  config: {
    screens: {
      Home: 'home',
      Explore: 'product/:id',
      Notifications: 'notifications',
      Profile: 'profile',
    },
  },
};
```
By adding `getInitialURL()`, you guarantee that even if a user goes through the App Store installation process, React Navigation will check for any pending Hoplinks intent the second the app opens, routing them directly to the content they originally clicked on!

---

## ✅ Dos and ❌ Don'ts for Deep Linking

### ✅ DO:
*   **DO** ensure your `assetlinks.json` `package_name` matches your exact `app.json` package name.
*   **DO** restart the Expo development server every time you modify the `scheme` or `intentFilters` in `app.json`.
*   **DO** use human-readable paths in your URLs (e.g., `hoplinks.in/explore/design`) to make links more user-friendly.
*   **DO** test your custom scheme (`myapp://`) routing heavily using `npx uri-scheme` to ensure React Navigation is set up properly before moving on to testing `https://` App Links.

### ❌ DON'T:
*   **DON'T** try to test `https://` universal links in Expo Go. The Android/iOS operating systems will explicitly block this because Expo Go's security certificate does not match your website's `assetlinks.json`.
*   **DON'T** add the `.json` extension to the iOS `apple-app-site-association` file. It must be hosted on your server without any extension.
*   **DON'T** forget to update your SHA-256 fingerprint in `assetlinks.json` when you move from local development to production. The production release fingerprint will be completely different from your `debug.keystore`!
*   **DON'T** return an HTML page or any unexpected headers when the OS tries to fetch `assetlinks.json`. It must be served with an `application/json` content-type.
