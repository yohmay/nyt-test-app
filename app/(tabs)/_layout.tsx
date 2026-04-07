import { useTheme } from "@/hooks/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabLayout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.palette.white,
        tabBarInactiveTintColor: colors.palette.gray[700],
        tabBarStyle: {
          backgroundColor: colors.palette.black,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.palette.black,
          height: 100,
        },
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={require("../../assets/images/nyt-logo.png")}
            style={{
              width: 200,
              height: 150,
              resizeMode: "contain",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
