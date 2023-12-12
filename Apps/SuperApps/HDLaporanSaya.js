import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";

export const HDLaporanSaya = () => {
  const navigation = useNavigation();
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
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.white,
              marginRight: 50,
            }}
          >
            Laporan Saya
          </Text>
        </View>
      </View>

      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "90%", marginTop: "5%" }}>
          <Search placeholder={"Cari..."} iconColor={COLORS.primary} />
        </View>
        <View style={{ width: "90%", marginTop: "5%" }}>
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
        </View>
      </View>
    </>
  );
};
