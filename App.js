import "react-native-reanimated";
import "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox, StatusBar as RNStatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-native-reanimated";
// tmidcee
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ignore specific logs
LogBox.ignoreLogs(["AsyncStorage has been extracted"]);
// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: Asset.fromModule(require("./assets/fonts/Roboto-Black.ttf"))
            .uri,
          blackItalic: Asset.fromModule(
            require("./assets/fonts/Roboto-BlackItalic.ttf")
          ).uri,
          bold: Asset.fromModule(require("./assets/fonts/Roboto-Bold.ttf")).uri,
          boldItalic: Asset.fromModule(
            require("./assets/fonts/Roboto-BoldItalic.ttf")
          ).uri,
          italic: Asset.fromModule(require("./assets/fonts/Roboto-Italic.ttf"))
            .uri,
          light: Asset.fromModule(require("./assets/fonts/Roboto-Light.ttf"))
            .uri,
          lightItalic: Asset.fromModule(
            require("./assets/fonts/Roboto-LightItalic.ttf")
          ).uri,
          medium: Asset.fromModule(require("./assets/fonts/Roboto-Medium.ttf"))
            .uri,
          mediumItalic: Asset.fromModule(
            require("./assets/fonts/Roboto-MediumItalic.ttf")
          ).uri,
          regular: Asset.fromModule(
            require("./assets/fonts/Roboto-Regular.ttf")
          ).uri,
          thin: Asset.fromModule(require("./assets/fonts/Roboto-Thin.ttf")).uri,
          thinItalic: Asset.fromModule(
            require("./assets/fonts/Roboto-ThinItalic.ttf")
          ).uri,
        });
      } catch (error) {
        console.error("Error loading fonts:", error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null; // Show nothing until the fonts are loaded
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <SafeAreaProvider style={styles.container} onLayout={onLayout}>
          <RNStatusBar barStyle="dark-content" backgroundColor="#fff" />
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
