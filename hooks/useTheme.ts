import { Colors, palette } from "@/constants/theme";

export function useTheme() {
  return { ...Colors, palette };
}
