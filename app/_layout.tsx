import { palette } from "@/constants/theme";
import { store } from "@/store";
import { hydrateFavorites } from "@/store/favoritesSlice";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppNavigator() {
  useEffect(() => {
    store.dispatch(hydrateFavorites());
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="articles/[id]"
          options={{
            title: "Article Details",
            headerBackTitle: "Back",
            headerTintColor: palette.white,
            headerStyle: { backgroundColor: palette.black },
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
