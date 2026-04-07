import { palette } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: palette.gray[300],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.black,
    gap: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: palette.black,
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

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  errorSearch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorSearchTitle: {
    paddingTop: 15,
    textAlign: "center",
    fontSize: 15,
    color: palette.black,
  },
});
