import { palette } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabsContainer: {
    flexDirection: "row",
    padding: 8,
    margin: 16,
    borderRadius: 12,
    backgroundColor: palette.gray[400],
  },

  tab: {
    flex: 1,
    borderRadius: 10,
  },

  tabTitle: {
    padding: 10,
    textAlign: "center",
    fontWeight: "600",
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: palette.red[500],
  },

  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.red[500],
  },
});
