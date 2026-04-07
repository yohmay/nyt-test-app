import { ArticleCard } from "@/components/ArticleCard";
import { palette } from "@/constants/theme";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "@/styles/favorite.styles";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function Favorites() {
  const { favorites, isFavorite, toggle } = useFavorites();
  const theme = useTheme();

  if (favorites.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="favorite" size={48} color={palette.black} />
        <Text style={styles.centerText}>No favorites yet</Text>
        <Text style={styles.subtitle}>
          Tap the heart icon on any article to save it here
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => String(item.id ?? index)}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.resultTitle}>
            {favorites.length} Saved article
            {favorites.length !== 1 ? "s" : ""}
          </Text>
        }
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggle(item)}
          />
        )}
      />
    </View>
  );
}
