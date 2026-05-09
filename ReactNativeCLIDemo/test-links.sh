#!/bin/bash

# Deep Linking Test Script
# Usage: ./test-links.sh <platform> <url>
# Example: ./test-links.sh android "myapp://product/123"
# Example: ./test-links.sh ios "myapp://home"

PLATFORM=$1
URL=$2

if [ "$PLATFORM" == "android" ]; then
    echo "Testing Android Deep Link: $URL"
    adb shell am start -W -a android.intent.action.VIEW -d "$URL" com.reactnativeclidemo
elif [ "$PLATFORM" == "ios" ]; then
    echo "Testing iOS Deep Link: $URL"
    xcrun simctl openurl booted "$URL"
else
    echo "Please specify platform: android or ios"
    echo "Usage: ./test-links.sh <platform> <url>"
fi
