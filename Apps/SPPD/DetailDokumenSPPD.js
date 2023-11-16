import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {} from "react-native-safe-area-context";
import {
  AVATAR,
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import moment from "moment";
import { getTokenValue } from "../../service/session";
import { getDocumentAttachmentSPPD } from "../../service/api";

export const DetailDokumenSPPD = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();

  const [collapse, setCollapse] = useState({
    id: 0,
    toggle: false,
  });

  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(
        getDocumentAttachmentSPPD({ token: token, id: dokumen.detail?.id })
      );
    }
  }, [token, surat]);

  const { dokumen, surat } = useSelector((state) => state.sppd);

  const hari = dokumen.detail?.days?.toString();

  return (
    <>
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
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            Detail Dokumen
          </Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <ScrollView style={{ height: "90%" }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 600, marginVertical: 10 }}>
              {data}
            </Text>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Tanggal Mulai
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {moment(dokumen.detail?.start_date, "DD-MM-YYYY").format(
                  DATETIME.LONG_DATE
                )}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Tanggal Selesai
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {moment(dokumen.detail?.end_date, "DD-MM-YYYY").format(
                  DATETIME.LONG_DATE
                )}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Jumlah Hari
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {hari}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Tujuan
              </Text>

              <View style={{ gap: 10, width: "60%", paddingRight: 20 }}>
                {/* <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  KABUPATEN MANGGARAI BARAT - Labuan Bajo
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  KOTA KUPANG - Hotel Nusantara
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  KOTA DENPASAR - Hotel Kempinsky
                </Text> */}
                {dokumen.detail?.venue?.map((item) => {
                  return <Text>{item.locations}</Text>;
                })}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Tujuan Provinsi
              </Text>
              <View style={{ gap: 10, width: "60%", paddingRight: 20 }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {dokumen.detail?.province}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Penanggung Jawab
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {dokumen.detail?.officer?.name} / {dokumen.detail?.officer?.nip}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Penanggung Jawab Unit Kerja
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {dokumen.detail?.officer_unker?.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "#DBDADE",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  width: "40%",
                  paddingRight: 20,
                }}
              >
                Satker Penanggung Jawab
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  width: "60%",
                  paddingRight: 20,
                }}
              >
                {dokumen.detail?.officer_satker}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="people-outline" size={24} />
            <Text style={{ fontSize: 15, fontWeight: 600 }}>
              Daftar Pelaksana
            </Text>
          </View>

          {dokumen.detail?.participant?.map((item) => {
            return (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setCollapse({ id: item.id, toggle: true })}
                  style={{
                    height: 50,
                    borderRadius: 8,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 13, fontWeight: 600 }}>
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 13, fontWeight: 400 }}>
                        {item.nip}
                      </Text>
                    </View>
                    {collapse.toggle === true && collapse.id === item.id ? (
                      <TouchableOpacity
                        onPress={() => setCollapse({ toggle: false })}
                      >
                        <Ionicons name="chevron-up-outline" size={24} />
                      </TouchableOpacity>
                    ) : (
                      <Ionicons name="chevron-down-outline" size={24} />
                    )}
                  </View>
                </TouchableOpacity>

                {collapse.toggle === true && collapse.id === item.id ? (
                  <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                    <TouchableOpacity
                      onPress={() => setCollapse({ toggle: false })}
                    >
                      <View style={{ gap: 10 }}>
                        <View>
                          <Text style={{ fontSize: 13, fontWeight: 400 }}>
                            Golongan
                          </Text>
                          <Text style={{ fontSize: 13, fontWeight: 600 }}>
                            {item.tier}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13, fontWeight: 400 }}>
                            Tempat Kedudukan
                          </Text>
                          <Text style={{ fontSize: 13, fontWeight: 600 }}>
                            {item.office_city}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })}

          <View style={{ gap: 10, marginVertical: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.info,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("LihatSuratSPPD", { surat: surat });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.white,
                }}
              >
                Lihat Surat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#752A2B",
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.white,
                }}
              >
                Cetak Lembar Belakang
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
