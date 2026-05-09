# Step-by-Step Deep Linking Implementation Guide

This guide explains how Deep Linking (Custom URI Schemes and Universal/App Links) was implemented in this React Native CLI project.

## Table of Contents
1. [React Navigation Setup](#1-react-navigation-setup)
2. [Android Configuration (App Links)](#2-android-configuration-app-links)
3. [iOS Configuration (Universal Links)](#3-ios-configuration-universal-links)
4. [Testing the Implementation](#4-testing-the-implementation)

---

## 1. React Navigation Setup

First, we configure the `linking` object in `App.tsx` and pass it to the `NavigationContainer`.

### Code Implementation (`App.tsx`):
```tsx
const linking = {
  prefixes: [
    "myapp://",           // Custom URI scheme
    "https://hoplinks.in", // Universal/App Link domain
  ],
  config: {
    screens: {
      Home: "home",
      Explore: "product/:id",  // Mapping a URL path to a screen with parameters
      Notifications: "notifications",
      Profile: "profile",
    },
  },
};

// ... inside App component
<NavigationContainer linking={linking}>
  {/* ... navigation screens */}
</NavigationContainer>
```

---

## 2. Android Configuration (App Links)

To handle links on Android, we modify the `AndroidManifest.xml`.

### Step 2.1: Add Intent Filters
Open `android/app/src/main/AndroidManifest.xml` and add the following inside the `<activity>` tag:

```xml
<!-- Custom URI Scheme (myapp://) -->
<intent-filter android:label="Deep Link">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="myapp" />
</intent-filter>

<!-- App Links (https://hoplinks.in) -->
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="hoplinks.in" />
</intent-filter>
```

> [!NOTE]
> `android:autoVerify="true"` is required for App Links to verify ownership of the domain via an `assetlinks.json` file on your server.

### Step 2.2: Get SHA256 Fingerprint
To host the `assetlinks.json` file, you need your app's SHA256 fingerprint. Run this command:

**Debug Key:**
```bash
keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for the `SHA256:` line in the output. This is what you'll use in your `assetlinks.json` file.

---

## 3. iOS Configuration (Universal Links)

iOS requires configuration in `Info.plist`, `AppDelegate.mm`, and Entitlements.

### Step 3.1: Add URL Scheme
Open `ios/ReactNativeCLIDemo/Info.plist` and add:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
```

### Step 3.2: Update AppDelegate.mm
Import the Linking Manager and handle incoming URLs:

```objectivec
#import <React/RCTLinkingManager.h>

// ... inside @implementation AppDelegate

// Handle Custom URI Schemes
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [RCTLinkingManager application:application openURL:url options:options];
}

// Handle Universal Links
- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler {
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}
```

### Step 3.3: Associated Domains (Xcode)
In Xcode, go to **Signing & Capabilities** -> **+ Capability** -> **Associated Domains** and add:
`applinks:hoplinks.in`

---

## 4. Testing the Implementation

### Android (using ADB)
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myapp://product/456" com.reactnativeclidemo
```

### iOS (using simctl)
```bash
xcrun simctl openurl booted "myapp://product/456"
```

### Web Links (HTTPS)
Open the browser on your emulator/simulator and navigate to:
`https://hoplinks.in/product/789`

If configured correctly, the app should open directly to the Explore screen with the ID `789`.
