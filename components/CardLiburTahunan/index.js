import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";

export const CardLiburTahunan = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* <View>
                <Ionicons name='ellipse-outline' size={24} />
            </View> */}
      <View
        style={{
          width: "100%",
          // borderWidth: 1,
          marginTop: 5,
          padding: 10,
          borderRadius: 8,
          // borderColor: COLORS.grey,
          backgroundColor: COLORS.white,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text style={{ marginTop: 10 }}>{item.tanggal_libur}</Text>
        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
          {item.informasi}
        </Text>
      </View>
    </View>
  );
};
