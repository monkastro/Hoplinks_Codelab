# React Native CLI Deep Linking Demo

A premium React Native CLI application demonstrating the implementation of **Deep Linking** (Custom URI Schemes) and **Universal/App Links** (HTTPS links).

![App Demo](https://raw.githubusercontent.com/react-navigation/react-navigation/main/docs/static/img/nav-logo-fixed.png)

## 🚀 Features

- **Custom URI Scheme**: Open the app using `myapp://`.
- **Universal Links (iOS)**: Open the app directly from a website link (`https://hoplinks.in`).
- **App Links (Android)**: Verified deep linking for a seamless user experience.
- **React Navigation v6**: Integrated linking configuration.
- **Premium UI**: 4-screen layout with smooth animations and dark mode aesthetic.

## 🛠 Prerequisites

Ensure you have your environment set up for React Native CLI:

- [Node.js](https://nodejs.org/) (LTS)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- **iOS**: macOS, Xcode, CocoaPods
- **Android**: Android Studio, Android SDK, Emulator or Physical Device

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd ReactNativeCLIDemo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS Pods**:
   ```bash
   cd ios && pod install && cd ..
   ```

## 🏃‍♂️ Running the App

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

## 🔗 Deep Linking Implementation

For a detailed step-by-step guide on how Deep Linking was implemented in this project, refer to the [Deep Linking Guide](./DEEP_LINKING_GUIDE.md).

### Quick Test Commands

**Android**:
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myapp://product/123" com.reactnativeclidemo
```

**iOS**:
```bash
xcrun simctl openurl booted "myapp://product/123"
```

## 📝 License

MIT
