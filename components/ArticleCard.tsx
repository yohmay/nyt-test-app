import { useTheme } from "@/hooks/useTheme";
import { styles } from "@/styles/article.styles";
import { Article } from "@/types/article";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

type Props = {
  article: Article;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function ArticleCard({ article, isFavorite, onToggleFavorite }: Props) {
  const theme = useTheme();
  const { title, abstract, byline, published_date, section, url } = article;

  const formattedDate = published_date
    ? new Date(published_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.section}>{section}</Text>
        <TouchableOpacity onPress={onToggleFavorite} hitSlop={10}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={20}
            color={
              isFavorite ? theme.palette.red[500] : theme.palette.gray[400]
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.abstract} numberOfLines={3}>
        {abstract}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
          {byline}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.linkSection}
          onPress={() => Linking.openURL(url)}
        >
          <MaterialIcons
            name="open-in-new"
            size={14}
            color={theme.palette.gray[600]}
          />
          <Text style={styles.linkText}>Read in browser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkSection}
          onPress={() =>
            router.push({
              pathname: "/articles/[id]",
              params: {
                id: String(article.id),
                title,
                abstract,
                byline,
                published_date,
                section,
                url,
              },
            })
          }
        >
          <MaterialIcons
            name="article"
            size={14}
            color={theme.palette.gray[600]}
          />
          <Text style={styles.linkText}>Read more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
