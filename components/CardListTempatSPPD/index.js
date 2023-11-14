import React from "react";
import { Text, View } from "react-native";

export const CardListTempatSPPD = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        marginHorizontal: 20,
        marginVertical: 5,
      }}
    >
      <Text>-</Text>
      <Text>{item.locations}</Text>
    </View>
  );
};
