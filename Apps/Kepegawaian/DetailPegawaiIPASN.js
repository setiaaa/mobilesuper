import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
  PADDING,
  spacing,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Config } from "../../constants/config";
import { CollapseCardBiodata } from "../../components/CollapseCardBiodata";

export const DetailPegawaiIPASN = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();
  const { device } = useSelector((state) => state.apps);
  const { DataPribadi, DataIPASN, loading } = useSelector(
    (state) => state.kepegawaian
  );
  const BASE_URL = Config.base_url + "bridge";
  const profile = item === "pegawai" ? DataIPASN.detail : DataPribadi.detail;
  console.log(DataPribadi.detail);
  return (
    <ScrollView>
      {loading ? <Loading /> : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: COLORS.primary,
          height: 80,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: device === "tablet" ? 40 : 28,
            height: device === "tablet" ? 40 : 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text
            style={{
              color: "white",
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
            }}
          >
            Detail Data IPASN
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: PADDING.Page,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: wp(87),
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            padding: PADDING.Page,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: BASE_URL + profile.avatar }}
            style={{
              width: device === "tablet" ? 100 : 61,
              height: device === "tablet" ? 100 : 61,
              borderRadius: device === "tablet" ? 50 : 30,
            }}
          />
          <Text
            style={{
              marginVertical: 10,
              color: COLORS.info,
              fontWeight: FONTWEIGHT.bold,
              fontSize: fontSizeResponsive("H4", device),
            }}
          >
            {profile.nama}
          </Text>
          <Text
            style={{
              color: COLORS.lighter,
              fontSize: fontSizeResponsive("H4", device),
            }}
          >
            {profile.unit_kerja}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 7,
          justifyContent: "center",
          width: wp(87),
          alignSelf: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: 177,
            paddingHorizontal: 10,
            paddingTop: 20,
            borderRadius: 8,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
            width: wp(43),
          }}
        >
          {/* <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              Absensi
            </Text> */}

          <View style={{ paddingBottom: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 20, gap: wp(2) }}>
              <Text
                style={{
                  width: "80%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Jumlah hari kerja
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.working_day}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
              <Text
                style={{
                  width: "80%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Jumlah hadir
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.present_day}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
              <Text
                style={{
                  width: "80%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Terlambat
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.late_day}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
              <Text
                style={{
                  width: "80%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Dinas
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.outstation_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                gap: wp(3),
              }}
            >
              <Text
                style={{
                  width: "80%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Cuti
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                -
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 10,
            paddingTop: 20,
            borderRadius: 8,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
            width: wp(43),
          }}
        >
          <Text
            style={{
              fontSize: fontSizeResponsive("Judul", device),
              fontWeight: FONTWEIGHT.bold,
            }}
          >
            IP ASN
          </Text>
          <Text
            style={{
              fontSize: fontSizeResponsive("H4", device),
              marginTop: 5,
            }}
          >
            Sumber Data SIASN
          </Text>

          <View style={{ paddingBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                width: "60%",
                gap: wp(5),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: device === "tablet" ? 60 : 30,
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                {profile.ipasn_nilai}
              </Text>
              {/* <View
                  style={{
                    backgroundColor: "#CED06C",
                    width: wp(18),
                    height: wp(5),
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    Tinggi
                  </Text>
                </View> */}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                gap: wp(1),
              }}
            >
              <Text
                style={{
                  width: "72%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Kualifikasi
              </Text>
              <View
                style={{
                  width: wp(3),
                  height: wp(3),
                  backgroundColor: "#FF9900",
                  borderRadius: 30,
                }}
              />
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.ipasn_kualifikasi}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                gap: wp(1),
              }}
            >
              <Text
                style={{
                  width: "72%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Kompetensi
              </Text>
              <View
                style={{
                  width: wp(3),
                  height: wp(3),
                  backgroundColor: COLORS.success,
                  borderRadius: 30,
                }}
              />
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.ipasn_kompetensi}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                gap: wp(1),
              }}
            >
              <Text
                style={{
                  width: "72%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Kinerja
              </Text>
              <View
                style={{
                  width: wp(3),
                  height: wp(3),
                  backgroundColor: "#CED06C",
                  borderRadius: 30,
                }}
              />
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.ipasn_kinerja}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                gap: wp(1),
              }}
            >
              <Text
                style={{
                  width: "72%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Disiplin
              </Text>
              <View
                style={{
                  width: wp(3),
                  height: wp(3),
                  backgroundColor: COLORS.success,
                  borderRadius: 30,
                }}
              />
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                {profile.ipasn_disiplin}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingVertical: spacing.default }}>
        <CollapseCardBiodata profile={profile} device={device} />
        {/* <CollapseCardLinimasa linimasa={linimasa} /> */}
      </View>
    </ScrollView>
  );
};
