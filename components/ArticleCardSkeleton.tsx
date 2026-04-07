import { styles } from "@/styles/skeleton.styles";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

function SkeletonBox({
  width,
  height,
  style,
  opacity,
  styles,
}: {
  width?: number | string;
  height: number;
  style?: object;
  opacity: Animated.Value;
  styles: any;
}) {
  return (
    <Animated.View
      style={[styles.box, { width: width ?? "100%", height, opacity }, style]}
    />
  );
}

export function ArticleCardSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <SkeletonBox width={60} height={12} opacity={opacity} styles={styles} />
        <SkeletonBox
          width={20}
          height={20}
          opacity={opacity}
          style={{ borderRadius: 10 }}
          styles={styles}
        />
      </View>
      <SkeletonBox
        height={16}
        opacity={opacity}
        style={{ marginTop: 14 }}
        styles={styles}
      />
      <SkeletonBox
        width="70%"
        height={16}
        opacity={opacity}
        style={{ marginTop: 6 }}
        styles={styles}
      />
      <SkeletonBox
        height={12}
        opacity={opacity}
        style={{ marginTop: 12 }}
        styles={styles}
      />
      <SkeletonBox
        height={12}
        opacity={opacity}
        style={{ marginTop: 6 }}
        styles={styles}
      />
      <SkeletonBox
        width="80%"
        height={12}
        opacity={opacity}
        style={{ marginTop: 6 }}
        styles={styles}
      />
      <View style={[styles.row, { marginTop: 14 }]}>
        <SkeletonBox
          width="50%"
          height={11}
          opacity={opacity}
          styles={styles}
        />
        <SkeletonBox width={70} height={11} opacity={opacity} styles={styles} />
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <SkeletonBox
          width={100}
          height={12}
          opacity={opacity}
          styles={styles}
        />
        <SkeletonBox width={80} height={12} opacity={opacity} styles={styles} />
      </View>
    </View>
  );
}
