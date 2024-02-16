# UHub

[![.github/workflows/EAS.yml](https://github.com/lbare/UHub/actions/workflows/EAS.yml/badge.svg?branch=main)](https://github.com/lbare/UHub/actions/workflows/EAS.yml)

This is the UHub app, built with [Expo](https://expo.dev/). It's a React Native project that can be run on iOS, Android, and web platforms.

It aims to create a centralized platform for students to discover and explore resources on university campuses.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js 20](https://nodejs.org/en/download) `nvm install 20.11.0`
- You have installed [Yarn](https://yarnpkg.com/) `npm install --global yarn`
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/) `yarn global add expo-cli`
- You have installed [eas](https://docs.expo.dev/build/introduction/) `npm install -g eas-cli`

## Installing UHub

To clone the project, follow these steps:

```bash
git clone https://github.com/lbare/UHub.git
cd UHub
code .
```

## Running Project

To install dependencies and start the project, use `yarn run start`

### Expo Go
To run the project from your phone, install the [Expo Go](https://docs.expo.dev/get-started/expo-go/) app and either scan the QR code on the screen or enter your login.

### Using Simulators/Emulators
Run the app on [iOS Simulator](https://apps.apple.com/ca/app/xcode/id497799835?mt=12) (Mac only):
`yarn ios`

Run the app on [Android Emulator](https://developer.android.com/studio):
`yarn android`


## Testing Project

To run tests through the Jest framework, use `yarn test`


## Creating a Build

Use the following to create both an ios and android build.
NOTE: Your build can be found on your Expo cloud account dashboard.

```bash
# first time setup only
eas login
eas build:configure

# for every new build
eas build --platform all
```
