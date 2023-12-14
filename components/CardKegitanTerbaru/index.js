import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { COLORS, DATETIME, FONTWEIGHT } from "../../config/SuperAppps";
import moment from "moment";

export const CardKegiatanTerbaru = ({ item }) => {
  return (
    <View style={{ alignItems: "center", gap: 10 }}>
      {/* <View>
                <Ionicons name='ellipse-outline' size={24} />
            </View> */}
      <View
        style={{
          width: "90%",
          marginTop: 5,
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.white,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text style={{ marginTop: 10, color: COLORS.lighter }}>
          {moment(item.start_date, "DD-MM-YYYY").format(DATETIME.LONG_DATE)} -{" "}
          {moment(item.end_date, "DD-MM-YYYY").format(DATETIME.LONG_DATE)}
        </Text>
        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
          {item.fullname}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: COLORS.infoDanger }}>* </Text>
          <Text style={{ marginTop: 5 }}>{item.venue}</Text>
        </View>
      </View>
    </View>
  );
};
