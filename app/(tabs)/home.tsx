import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";
import { palette } from "@/constants/theme";
import { useArticles } from "@/hooks/useArticles";
import { useFavorites } from "@/hooks/useFavorites";
import { TabType } from "@/services/articlesService";
import { styles } from "@/styles/home.styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const TABS: { label: string; value: TabType }[] = [
  { label: "Viewed", value: "viewed" },
  { label: "Shared", value: "shared" },
  { label: "Emailed", value: "emailed" },
];

const SKELETON_COUNT = 5;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("viewed");
  const { articles, isLoading, isError, retry } = useArticles(activeTab);
  const { isFavorite, toggle } = useFavorites();

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <TouchableOpacity
              key={tab.value}
              onPress={() => setActiveTab(tab.value)}
              style={{
                ...styles.tab,
                backgroundColor: isActive ? palette.black : "transparent",
              }}
            >
              <Text
                style={{
                  ...styles.tabTitle,
                  color: isActive ? palette.white : palette.black,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="wifi-off" size={48} color={palette.black} />
          <Text style={styles.errorText}>Failed to load</Text>
          <TouchableOpacity onPress={retry}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={isLoading ? Array(SKELETON_COUNT).fill(null) : articles}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : String(item.id)
        }
        contentContainerStyle={{ paddingInline: 16 }}
        renderItem={({ item }) =>
          isLoading ? (
            <ArticleCardSkeleton />
          ) : (
            <ArticleCard
              article={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggle(item)}
            />
          )
        }
      />
    </View>
  );
}
