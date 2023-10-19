import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "../../components/DropDown";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { getSummaryBadUser, getSummaryTotalPost } from "../../service/api";

export const LaporanPengetahuan = () => {
  const navigation = useNavigation();

  const listYear = [
    { key: "year1", value: "2023" },
    { key: "year2", value: "2024" },
    { key: "year3", value: "2025" },
  ];

  const dataKuartal = [
    { key: "1", value: "TW 1" },
    { key: "2", value: "TW 2" },
    { key: "3", value: "TW 3" },
    { key: "4", value: "TW 4" },
  ];

  const [year, setYear] = useState({ key: "year1", value: "2023" });
  const [quarter, setQuarter] = useState({ key: "1", value: "TW 1" });

  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      const param = { token: token, year: year.value, quarter: quarter.key };

      const paramBad = {
        token: token,
        year: year.value,
        quarter:
          quarter.key === "1"
            ? "q1"
            : quarter.key === "2"
            ? "q2"
            : quarter.key === "3"
            ? "q3"
            : "q4",
      };
      dispatch(getSummaryTotalPost(param));
      dispatch(getSummaryBadUser(paramBad));
    }
  }, [token, year, quarter]);

  const { summary } = useSelector((state) => state.pengetahuan);

  const totalPost = summary?.total_post.total_post_per_quarter;
  const badUser = summary?.bad_user;

  // console.log(badUser);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
          <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
            <Text
              style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
            >
              Laporan
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            marginHorizontal: 20,
            gap: 5,
          }}
        >
          <View style={styles.dropdown}>
            <Dropdown
              data={listYear}
              placeHolder={"Pilih Tahun"}
              backgroundColor={COLORS.white}
              selected={year}
              setSelected={setYear}
              style={styles.dropdown}
            />
          </View>

          <View style={styles.dropdown}>
            <Dropdown
              data={dataKuartal}
              placeHolder={"Pilih Triwulan"}
              backgroundColor={COLORS.white}
              selected={quarter}
              setSelected={setQuarter}
              style={styles.dropdown}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginHorizontal: 20,
            marginStart: 20,
            padding: 20,
            borderRadius: 16,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 600 }}>
            Jumlah Postingan pada Triwulan Ke-{quarter.key} Tahun {year.value}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.warningLight,
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={24}
                  color={COLORS.warning}
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>
                {totalPost?.post_publish}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  width: 60,
                  textAlign: "center",
                }}
              >
                Post Masuk
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.successLight,
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={24}
                  color={COLORS.success}
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>
                {totalPost?.post_reviewed}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  width: 60,
                  textAlign: "center",
                }}
              >
                Post Sudah Dinilai
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.infoDangerLight,
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={24}
                  color={COLORS.infoDanger}
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>
                {totalPost?.post_waiting}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  width: 60,
                  textAlign: "center",
                }}
              >
                Post Belum Dinilai
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "48%",
              height: 176,
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 16,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  backgroundColor: "#F0F0F0",
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={COLORS.infoDanger}
                />
              </View>
              <Text
                style={{ fontSize: 16, fontWeight: 600, color: COLORS.primary }}
              >
                {badUser?.user_count}
              </Text>
            </View>
            <Text style={{ fontWeight: 400, marginTop: 10 }}>
              Jumlah pegawai belum memenuhi nilai minimum triwulan Ke-
              {quarter.key} Tahun
              {" " + year.value}
            </Text>
          </View>

          <View
            style={{
              width: "48%",
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 16,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  backgroundColor: "#F0F0F0",
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="document-outline"
                  size={18}
                  color={COLORS.grey}
                />
              </View>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>Report</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400 }}>Pegawai</Text>
              <TouchableOpacity>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.primary,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="download-outline"
                    size={18}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400 }}>Triwulan</Text>
              <TouchableOpacity>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.primary,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="download-outline"
                    size={18}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "50%",
    //shadow ios
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    //shadow android
    elevation: 2,
  },
});
