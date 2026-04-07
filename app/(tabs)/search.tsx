import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";
import { palette } from "@/constants/theme";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearch } from "@/hooks/useSearch";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "@/styles/search.styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SKELETON_COUNT = 2;

export default function Search() {
  const [query, setQuery] = useState("");
  const { results, isLoading } = useSearch(query);
  const { isFavorite, toggle } = useFavorites();
  const theme = useTheme();
  const [input] = useState("");
  const showEmpty = query.length >= 3 && !isLoading && results.length === 0;
  const showPrompt = query.length < 3 && !isLoading;

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(input);
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={palette.black} />
        <TextInput
          style={{ flex: 1, fontSize: 15, color: theme.text }}
          placeholder="Search articles..."
          placeholderTextColor={palette.gray[700]}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={8}>
            <MaterialIcons name="close" size={18} color={theme.mutedText} />
          </TouchableOpacity>
        )}
      </View>
      {showPrompt && (
        <View style={styles.centerContainer}>
          <MaterialIcons name="search" size={48} color={palette.black} />
          <Text style={styles.centerText}>
            Type at least 3 characters to search
          </Text>
        </View>
      )}
      {isLoading && (
        <FlatList
          data={Array(SKELETON_COUNT).fill(null)}
          keyExtractor={(_, i) => String(i)}
          keyboardShouldPersistTaps="handled"
          renderItem={() => <ArticleCardSkeleton />}
          contentContainerStyle={styles.listContent}
        />
      )}
      {showEmpty && (
        <View style={styles.errorSearch}>
          <MaterialIcons name="find-in-page" size={48} color={palette.black} />
          <Text style={styles.errorSearchTitle}>No results for "{query}"</Text>
        </View>
      )}
      {!isLoading && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => String(item.id ?? index)}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggle(item)}
            />
          )}
        />
      )}
    </View>
  );
}
