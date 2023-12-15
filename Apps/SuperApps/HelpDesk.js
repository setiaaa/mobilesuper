import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT, PADDING } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { getParts, getProfileMe, getTicket } from "../../service/api";
import { getTokenValue } from "../../service/session";
import { setTiket } from "../../store/HelpDesk";

export const HelpDesk = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.superApps);
  const { tiket, parts } = useSelector((state) => state.helpDesk);
  const [collapse, setCollapse] = useState({
    toggle: false,
  });
  const [token, setToken] = useState("");
  const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge";

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);
  useEffect(() => {
    nip = profile?.nip
    if (token !== "" && nip !== "") {
      dispatch(getTicket( { nip, token} ));
    }
  }, [token]);
  console.log(tiket.list)
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          height: 80,
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.white,
            }}
          >
            Help Desk
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
          }}
          onPress={() => {
            navigation.navigate("HDLaporanSaya");
          }}
        >
          <Ionicons
            name="document-text-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              marginTop: "5%",
              borderRadius: 8,
              padding: "5%",
              alignItems: "center",
              gap: 10,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          >
            <View
              style={{
                height: 75,
                width: 75,
                backgroundColor: "brown",
                borderRadius: 75,
              }}
            ></View>
            <Text style={{ fontWeight: FONTWEIGHT.bold }}>
              BENNART DEM GUNAWAN
            </Text>
            <Text>198505042009122001</Text>
          </View> */}
          <View style={{ padding: PADDING.Page }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}
            >
              <Image
                source={require("../../assets/superApp/Card-Background-Red.png")}
                style={{
                  width: "100%",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                }}
              />
              <View
                style={{ alignItems: "center", gap: 10, position: "absolute" }}
              >
                <Image
                  source={{ uri: BASE_URL + profile.avatar }}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 36,
                    borderWidth: 2,
                    borderColor: COLORS.white,
                  }}
                />
                <Text
                  style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
                >
                  {profile.nama}
                </Text>
                <Text
                  style={{ fontSize: 13, fontWeight: 400, color: COLORS.white }}
                >
                  {profile?.nip}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 15,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  setCollapse({ toggle: true })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: "80%",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    Profil
                  </Text>
                  {
                  collapse.toggle === true ? (
                    <TouchableOpacity
                      onPress={() => setCollapse({ toggle: false })}
                    >
                      <Ionicons name="chevron-up" size={24} />
                    </TouchableOpacity>
                  ) : (
                    <Ionicons name="chevron-down" size={24} />
                  )}
                </View>
              </TouchableOpacity>
              {
              collapse.toggle === true ? (
                <View>
                  <TouchableOpacity
                    onPress={() => setCollapse({ toggle: false })}
                  >
                    <Text style={{ marginTop: 10 }}>Jenis Kelamin</Text>
                    <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
                      {profile.jenis_kelamin}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Golongan</Text>
                    <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
                      {profile.golongan}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Jabatan</Text>
                    <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
                      {profile.nama_jabatan}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Unit Kerja</Text>
                    <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
                      {profile.unit_kerja}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Satuan Kerja</Text>
                    <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>
                      {profile.satuan_kerja_nama}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flexDirection:"row",
              columnGap: wp(4),
            }}
          >
            <View
              style={{
                marginTop: "5%",
                width: "43%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.danger,
                  borderRadius: 8,
                  alignItems: "center",
                  paddingVertical: 16,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                }}
                onPress={() => 
                  {
                    navigation.navigate("HDFormLaporan"), profile?.nip
                  }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={COLORS.white}
                  />
                  <Text style={{ color: COLORS.white }}>Form Laporan</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: "5%",
                width: "43%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                  alignItems: "center",
                  paddingVertical: 16,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                }}
                onPress={() => 
                  {
                    navigation.navigate("HDLaporanSaya"), profile?.nip
                  }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={COLORS.grey}
                  />
                  <Text style={{ color: COLORS.grey }}>Laporan Saya</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: "90%",
              marginVertical: "3%",
              gap: 10,
            }}
          >
            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Status Laporan</Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                  padding: 5,
                  gap: 10,
                  alignItems: "center",
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                  width: "30%",
                  marginRight: "5%",
                }}
              >
                <Ionicons name="cog-outline" size={46} color={COLORS.lighter} />
                <Text style={{ fontSize: FONTSIZE.H1, textAlign: "center" }}>
                  Sedang Diproses
                </Text>
                <Text
                  style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}
                >
                  0
                </Text>
                <Text style={{ color: COLORS.lighter }}>Laporan</Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.orange,
                  borderRadius: 8,
                  padding: 5,
                  gap: 10,
                  alignItems: "center",
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                  width: "30%",
                  marginRight: "5%",
                }}
              >
                <Ionicons name="timer-outline" size={46} color={COLORS.white} />
                <Text
                  style={{
                    fontSize: FONTSIZE.H1,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Menunggu Konfirmasi
                </Text>
                <Text
                  style={{
                    fontSize: FONTSIZE.H1,
                    fontWeight: FONTWEIGHT.bold,
                    color: COLORS.white,
                  }}
                >
                  0
                </Text>
                <Text style={{ color: COLORS.lighter }}>Laporan</Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.success,
                  borderRadius: 8,
                  padding: 5,
                  gap: 10,
                  alignItems: "center",
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                  width: "30%",
                }}
              >
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={46}
                  color={COLORS.white}
                />
                <Text
                  style={{
                    fontSize: FONTSIZE.H1,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Selesai
                </Text>
                <Text
                  style={{
                    fontSize: FONTSIZE.H1,
                    fontWeight: FONTWEIGHT.bold,
                    color: COLORS.white,
                  }}
                >
                  0
                </Text>
                <Text style={{ color: COLORS.lighter }}>Laporan</Text>
              </View>
            </View>
          </View>

          {/* <View
            style={{
              width: "90%",
              gap: 10,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: FONTWEIGHT.bold }}>
              Laporan Terakhir
            </Text>
            <View
              style={{
                width: "100%",
                borderRadius: 8,
                paddingHorizontal: 18,
                paddingVertical: 12,
                backgroundColor: COLORS.white, //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ rowGap: 5 }}>
                <Text
                  style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}
                >
                  Bagian: Portal
                </Text>
                <Text>Permintaan: error lagi</Text>
                <Text style={{ color: COLORS.lighter }}>
                  Waktu Laporan: 04-10-2023 17:55
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.secondaryLighter,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    width: 195,
                  }}
                >
                  <Text>Nomor Tiket: 20231005003</Text>
                </View>
              </View>
              <View style={{ rowGap: 5, alignItems: "center" }}>
                <Text style={{ color: COLORS.lighter }}>Status</Text>
                <View
                  style={{
                    backgroundColor: COLORS.successLight,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ color: COLORS.success }}>Selesai</Text>
                </View>
              </View>
            </View>
          </View> */}
          
        </View>
      </ScrollView>
    </>
  );
};
