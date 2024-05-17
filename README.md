# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Configure Google Debug Credentials for Social Login

Add plugins @react-native-google-signin/google-signin to app.json

```json
  expo:{
    "plugins": ["@react-native-google-signin/google-signin"],
  }
```

```bash
npx expo prebuild --clean
```

Generate a debug key SHA1 with the android keypass
Use this

```bash
keytool -keystore ./android/app/debug.keystore -list -v
```

or this one

```bash
keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Add on android/app/build.gradle the dependency

```json
dependencies {
    implementation("com.google.android.gms:play-services-vision:20.1.3")
}
```

## Run Android with development build

Build the native folders android/ios

```
npx expo prebuild
```

Run the project with emulator

```
npx expo run:android
```

## Configure keystore for release

https://docs.expo.dev/app-signing/local-credentials/

Generate EAS
eas credentials
eas build -p android --profile preview
eas build --local
In the output, you'll find options to open the app in a

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
