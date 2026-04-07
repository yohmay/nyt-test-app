import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { Article } from "@/types/article";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { palette } from "@/constants/theme";

export default function ArticleDetail() {
  const theme = useTheme();
  const { isFavorite, toggle } = useFavorites();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    abstract: string;
    byline: string;
    published_date: string;
    section: string;
    url: string;
  }>();

  const article: Article = {
    id: Number(params.id) || 0,
    title: params.title ?? "",
    abstract: params.abstract ?? "",
    byline: params.byline ?? "",
    published_date: params.published_date ?? "",
    url: params.url ?? "",
    section: params.section ?? "",
  };

  const formattedDate = article.published_date
    ? new Date(article.published_date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {article.section ? (
        <View>
          <Text style={styles.badgeText}>{article.section.toUpperCase()}</Text>
        </View>
      ) : null}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.abstract}>{article.abstract}</Text>
      <View style={styles.divider} />
      <View style={styles.section}>
        {article.byline ? (
          <Text style={styles.byline} numberOfLines={1} ellipsizeMode="tail">
            {article.byline}
          </Text>
        ) : null}
        {formattedDate ? (
          <Text style={styles.date}>{formattedDate}</Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(article.url)}
        >
          <MaterialIcons name="open-in-new" size={14} color={palette.white} />
          <Text style={styles.buttonText}>Read full article</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggle(article)}
        >
          <MaterialIcons
            name={isFavorite(article.id) ? "favorite" : "favorite-border"}
            size={16}
            color={
              isFavorite(article.id)
                ? theme.palette.red[500]
                : theme.palette.gray[100]
            }
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
  },

  badgeText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: palette.gray[700],
  },

  title: {
    marginTop: 12,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: palette.black,
  },

  abstract: {
    fontSize: 14,
    color: palette.gray[800],
  },

  divider: {
    height: 1,
    marginVertical: 12,
    backgroundColor: palette.gray[500],
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  byline: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: palette.gray[600],
  },

  date: {
    fontSize: 14,
    color: palette.gray[600],
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    gap: 10,
    borderRadius: 12,
    backgroundColor: palette.black,
  },

  buttonText: {
    fontSize: 14,
    color: palette.white,
  },

  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: palette.gray[400],
  },
});
