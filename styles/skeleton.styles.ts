import { palette } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: palette.gray[200],
    backgroundColor: palette.gray[600],
  },

  box: {
    backgroundColor: palette.gray[200],
    borderRadius: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: palette.gray[200],
    marginVertical: 14,
  },
});
