import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import { useDispatch } from "react-redux";
import { getDataDetailIPASN } from "../../service/api";
import { useNavigation } from "@react-navigation/native";

export const CardListDataIPASN = ({ item, token }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getDetail = (id) => {
    dispatch(getDataDetailIPASN({ token, id }));
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
        navigation.navigate("DetailPegawaiIPASN", "pegawai");
      }}
    >
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>NAMA</Text>
        <Text>:</Text>
        <Text style={{ width: 200 }}>{item.nama}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>
          KUALIFIKASI
        </Text>
        <Text>:</Text>
        <Text>
          {item.ipasn_kualifikasi} ({(item.ipasn_kualifikasi / 25) * 100}%)
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>
          kOMPETENSI
        </Text>
        <Text>:</Text>
        <Text>
          {item.ipasn_kompetensi} ({(item.ipasn_kompetensi / 40) * 100}%)
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>KINERJA</Text>
        <Text>:</Text>
        <Text>
          {item.ipasn_kinerja} ({(item.ipasn_kinerja / 30) * 100}%)
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>
          DISIPLIN
        </Text>
        <Text>:</Text>
        <Text>
          {item.ipasn_disiplin} ({(item.ipasn_disiplin / 5) * 100}%)
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
        <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold }}>NILAI</Text>
        <Text>:</Text>
        <Text>{item.ipasn_nilai}</Text>
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
          PREDIKAT
        </Text>
        <Text>:</Text>
        <View
          style={{
            backgroundColor:
              item.ipasn_nilai <= 100 && item.ipasn_nilai > 90
                ? COLORS.successLight
                : item.ipasn_nilai <= 90 && item.ipasn_nilai > 80
                ? COLORS.infoLight
                : item.ipasn_nilai <= 80 && item.ipasn_nilai > 70
                ? COLORS.warningLight
                : item.ipasn_nilai <= 60 && item.ipasn_nilai > 50
                ? COLORS.orange
                : COLORS.infoDangerLight,
            padding: 6,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color:
                item.ipasn_nilai <= 100 && item.ipasn_nilai > 90
                  ? COLORS.success
                  : item.ipasn_nilai <= 90 && item.ipasn_nilai > 80
                  ? COLORS.info
                  : item.ipasn_nilai <= 80 && item.ipasn_nilai > 70
                  ? COLORS.warning
                  : item.ipasn_nilai <= 60 && item.ipasn_nilai > 50
                  ? COLORS.orange
                  : COLORS.danger,
            }}
          >
            {item.ipasn_nilai <= 100 && item.ipasn_nilai > 90
              ? "Sangat Tinggi"
              : item.ipasn_nilai <= 90 && item.ipasn_nilai > 80
              ? "Tinggi"
              : item.ipasn_nilai <= 80 && item.ipasn_nilai > 70
              ? "Sedang"
              : item.ipasn_nilai <= 60 && item.ipasn_nilai > 50
              ? "Rendah"
              : "Sangat Rendah"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
