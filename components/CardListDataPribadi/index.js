import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import { getDataPribadiDetail } from "../../service/api";

export const CardListDataPribadi = ({ item, token }) => {
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
        marginVertical: 10,
        borderRadius: 8,
      }}
      onPress={() => {
        getDetail(item.nip);
        navigation.navigate("DetailPegawaiIPASN", "pribadi");
      }}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>NAMA</Text>
        <Text>:</Text>
        <Text style={{ width: 200 }}>{item.nama}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>NIP</Text>
        <Text>:</Text>
        <Text>{item.nip}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>
          SATUAN KERJA
        </Text>
        <Text>:</Text>
        <Text>{item.department_name}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>
          UNIT KERJA
        </Text>
        <Text>:</Text>
        <Text style={{ width: 200 }}>{item.organization_name}</Text>
      </View>
    </TouchableOpacity>
  );
};
