import React from "react";
import { View, Image } from "react-native";
import {
  COLORS,
  DATETIME,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const CardKuotaCuti = ({ item, device }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ gap: 20, flexDirection: "row" }}>
        <View style={[styles.cardKouta]}>
          <View
            style={{
              width: "60%",
              padding: 12,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
            }}
          >
            <View style={{ rowGap: hp(0.5) }}>
              <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                Jenis : {item.jenis_cuti}
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                Periode: {item.periode}{" "}
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  color: COLORS.lighter,
                }}
              >
                Mulai Berlaku:{" "}
                {moment(item.mulai_berlaku, "DD MMMM YYYY HH:mm:ss").format(
                  DATETIME.LONG_DATE
                )}
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  color: COLORS.lighter,
                }}
              >
                Akhir Berlaku:{" "}
                {moment(item.akhir_berlaku, "DD MMMM YYYY HH:mm:ss").format(
                  DATETIME.LONG_DATE
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "40%",
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/superApp/Vector2.png")}
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                height: 115,
                width: 145,
              }}
            />
            <View style={{ gap: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                  Kuota Cuti
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H3", device),
                    }}
                  >
                    {item.kuota}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                  Sisa Kuota
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H3", device),
                    }}
                  >
                    {item.sisa_kuota}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardStatus: {
    width: "20%",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    margin: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  cardKouta: {
    // padding: 1,
    borderRadius: 8,
    // marginHorizontal: 5,
    // margin:10,
    marginVertical: 10,
    flexDirection: "row",
  },
});
