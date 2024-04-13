# UHub

[![.github/workflows/EAS.yml](https://github.com/lbare/UHub/actions/workflows/EAS.yml/badge.svg?branch=main)](https://github.com/lbare/UHub/actions/workflows/EAS.yml)

This is the UHub app, built with [Expo](https://expo.dev/). It's a React Native project that can be run on iOS and Android.

It aims to create a centralized platform for students to discover and explore resources on university campuses.

Below are links to our overview video showcasing the app's main features and the product page where you can download the latest public release of the application for iOS and Android:

**Product page**: https://lbare.github.io/UHub/

**Product Overview Video**: https://youtu.be/gkK6rIjaYvw?si=SQeNlrbTBYUWRqa8

## Development Prerequisites

Before you begin, ensure your development environment has the following required dependencies set up:

- You have installed [Node.js 20](https://nodejs.org/en/download) `nvm install 20.11.0`
- You have installed [Yarn](https://yarnpkg.com/) `npm install --global yarn`
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/) `yarn global add expo-cli`
- You have installed [eas](https://docs.expo.dev/build/introduction/) `npm install -g eas-cli`

## Cloning UHub Repository

To clone the project, follow these steps:

```bash
git clone https://github.com/lbare/UHub.git
cd UHub
code .
```

## Running Project

To install dependencies and start running the project from your local development environment, use `yarn run start`

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
# (builds for android + ios [requires Apple Developer Credentials])
eas build --profile preview --platform all
# (builds android apk)
eas build --profile preview --platform android
```

## License

© Copyright 2024 UHub Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use files hosted in this repository except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
