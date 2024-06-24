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
import { Rating } from "react-native-ratings";

export const CardAksiPerubahan = ({
  item,
  device,
  token,
  bottomSheetAttachDetail,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getDetail = (id) => {
    const params = { token, id };
    dispatch(getDetailAksiPerubahan(params));
  };

  function convertToRoman(num) {
    if (isNaN(num)) return "";

    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].numeral;
        num -= romanNumerals[i].value;
      }
    }
    return result;
  }

  // console.log(convertToRoman(item.angkatan));
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
        bottomSheetAttachDetail();
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

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          RATING
        </Text>
        <Rating
          fractions={2}
          startingValue={item.rating}
          readonly
          imageSize={20}
          style={{ marginTop: 5, alignItems: "flex-start" }}
        />
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

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          ANGKATAN
        </Text>
        <Text style={{ marginTop: 5 }}>{convertToRoman(item.angkatan)}</Text>
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
