import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { getDataPribadiDetail } from "../../service/api";

export const CardListDataPribadi = ({ item, token, device }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getDetail = (id) => {
    dispatch(getDataPribadiDetail({ token, id }));
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
      }}
      onPress={() => {
        getDetail(item.nip);
        navigation.navigate("DetailPegawaiIPASN", "pribadi");
      }}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text
          style={{
            width: device === "tablet" ? 350 : 100,
            fontWeight: FONTWEIGHT.bold,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          NAMA
        </Text>
        <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>:</Text>
        <Text
          style={{
            width: device === "tablet" ? 350 : 200,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          {item.nama}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: device === "tablet" ? 350 : 100,
            fontWeight: FONTWEIGHT.bold,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          NIP
        </Text>
        <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>:</Text>
        <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
          {item.nip}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: device === "tablet" ? 350 : 100,
            fontWeight: FONTWEIGHT.bold,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          SATUAN KERJA
        </Text>
        <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>:</Text>
        <Text
          style={{
            width: device === "tablet" ? "90%" : 200,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          {item.department_name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: device === "tablet" ? 350 : 100,
            fontWeight: FONTWEIGHT.bold,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          UNIT KERJA
        </Text>
        <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>:</Text>
        <Text
          style={{
            width: device === "tablet" ? "90%" : 200,
            fontSize: fontSizeResponsive("H4", device),
          }}
        >
          {item.organization_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
