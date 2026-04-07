import { palette } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: palette.gray[400],
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: palette.gray[700],
  },

  title: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: palette.black,
  },

  abstract: {
    fontSize: 16,
    color: palette.gray[800],
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  author: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: palette.gray[600],
  },

  date: {
    fontSize: 14,
    color: palette.gray[600],
  },

  divider: {
    height: 1,
    marginVertical: 12,
    backgroundColor: palette.gray[400],
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  linkSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  linkText: {
    fontSize: 14,
    color: palette.gray[600],
  },
});
