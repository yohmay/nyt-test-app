import { palette } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  centerText: {
    textAlign: "center",
    fontSize: 15,
    color: palette.black,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.gray[500],
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  resultTitle: {
    paddingTop: 15,
    fontSize: 15,
    color: palette.gray[700],
  },
});
