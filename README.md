# Hoplinks Codelab: Deep Linking & Universal Links

Welcome to the Hoplinks Codelab repository! This project contains multiple implementations of Deep Linking for React Native, ranging from Expo to standard React Native CLI.

## 📂 Project Structure

This repository is organized into several key modules, each representing a different stage or platform of the implementation:

### 1. [React Native CLI Demo](./ReactNativeCLIDemo) (Recommended)
**Location:** `/ReactNativeCLIDemo`

The flagship demo for **React Native CLI**. 
- **Features**: Custom URI Schemes, Android App Links, and iOS Universal Links.
- **Includes**: A detailed [Deep Linking Guide](./ReactNativeCLIDemo/DEEP_LINKING_GUIDE.md) and a premium 4-screen UI.
- **Best for**: Developers using the standard React Native workflow who need native control.

### 2. [Expo Deep Linking Demo](./ExpoDemo)
**Location:** `/ExpoDemo`

The implementation using the **Expo** framework.
- **Features**: Quick setup using Expo's built-in linking module and `app.json` configuration.
- **Includes**: Its own [Expo-specific guide](./ExpoDemo/DEEP_LINKING_GUIDE.md).
- **Best for**: Rapid prototyping and managed workflow.

### 3. [Blank Project](./BlankProject)
**Location:** `/BlankProject`

A baseline project used for testing and starting from scratch.

---

## 🛠 Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+)
- **React Native CLI** (for the CLI demo)
- **Expo Go** (for the Expo demo)
- **Xcode** (for iOS testing)
- **Android Studio** (for Android testing)

## 🔗 Key Documentation

- [Step-by-Step CLI Guide](./ReactNativeCLIDemo/DEEP_LINKING_GUIDE.md)
- [How to get SHA256 Fingerprint](./ReactNativeCLIDemo/DEEP_LINKING_GUIDE.md#step-22-get-sha256-fingerprint)
- [Testing Deep Links Script](./ReactNativeCLIDemo/test-links.sh)

---

## 📝 License

MIT
