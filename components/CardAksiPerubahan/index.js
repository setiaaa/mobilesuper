import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { getDetailAksiPerubahan } from "../../service/api";
import { useDispatch } from "react-redux";

export const CardAksiPerubahan = ({ item, device, token, setModalDetail }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getDetail = (id) => {
    const params = { token, id };
    dispatch(getDetailAksiPerubahan(params));
  };
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
      }}
      onPress={() => {
        getDetail(item.id);
        setModalDetail(true);
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          NAMA
        </Text>
        <Text style={{ marginTop: 5 }}>{item.display_name}</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          NIP
        </Text>
        <Text style={{ marginTop: 5 }}>{item.nip}</Text>
      </View>

      <View>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          JENIS KATEGORI
        </Text>
        <Text style={{ marginTop: 5 }}>{item.title}</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          TAHUN
        </Text>
        <Text style={{ marginTop: 5 }}>{item.year}</Text>
      </View>

      <View>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          SATUAN KERJA
        </Text>
        <Text style={{ marginTop: 5 }}>{item.satker}</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          UNIT KERJA
        </Text>
        <Text style={{ marginTop: 5 }}>{item.unker}</Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          TERIMPLEMENTASI
        </Text>
        <View
          style={{
            backgroundColor:
              item.implementation === true
                ? COLORS.successLight
                : COLORS.infoDangerLight,
            padding: 4,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              color:
                item.implementation === true
                  ? COLORS.success
                  : COLORS.infoDanger,
            }}
          >
            {item.implementation === true ? "Ya" : "Tidak"}
          </Text>
        </View>
        {item.url !== null ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AksiPerubahanView", item.url);
            }}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                color: COLORS.info,
              }}
            >
              Lihat Dokumen
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
