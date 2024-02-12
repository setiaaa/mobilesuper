import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Text, Touchable } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { TouchableOpacity } from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const CollapseCardBiodata = ({ profile, device, data }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <View>
      <Collapse isExpanded={collapse}>
        <CollapseHeader>
          <TouchableOpacity onPress={() => setCollapse(!collapse)}>
            <View style={styles.card}>
              <View
                style={{
                  backgroundColor:
                    collapse === true ? COLORS.secondaryLighter : COLORS.white,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={device === "tablet" ? 40 : 24}
                />
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Biodata
                </Text>
                <View
                  style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
                >
                  {collapse === true ? (
                    <Ionicons
                      name="chevron-up-outline"
                      size={device === "tablet" ? 40 : 20}
                    />
                  ) : (
                    <Ionicons
                      name="chevron-down-outline"
                      size={device === "tablet" ? 40 : 20}
                    />
                  )}
                </View>
              </View>
              <View style={{ marginLeft: 50 }}>
                {/* custom divider */}
                <View
                  style={{
                    height: 1,
                    width: "88%",
                    backgroundColor: "#DBDADE",
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </CollapseHeader>
        {}
        <CollapseBody>
          <View style={styles.cardCollapse}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Nama
              </Text>
              <Text>:</Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.nama}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                NIP
              </Text>
              <Text>:</Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.nip}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Karpeg/Karis-Karsu/NPWP
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <View
                style={{
                  width: "55%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {profile.karpeg == null ? (
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    -
                  </Text>
                ) : (
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    {profile.karpeg}
                  </Text>
                )}
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  /
                </Text>
                {profile.karis == null ? (
                  <Text>-</Text>
                ) : (
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    {profile.karis}
                  </Text>
                )}
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  /
                </Text>
                {profile.npwp === "" ? (
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    -
                  </Text>
                ) : (
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    {profile.npwp}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Tempat/Tanggal lahir
              </Text>
              <Text>:</Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.place_birth}/{profile.date_birth}
              </Text>
            </View>
            {data === "detailpegawai" ? null : (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  marginTop: 10,
                  gap: 5,
                  width: wp(82),
                }}
              >
                <Text
                  style={{
                    width: "40%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Telepon Seluler
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  :
                </Text>
                <Text
                  style={{
                    width: "55%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  {profile.mobile}
                </Text>
              </View>
            )}

            {data === "detailpegawai" ? null : (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  marginTop: 10,
                  gap: 5,
                  width: wp(82),
                }}
              >
                <Text
                  style={{
                    width: "40%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  No KTP
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  :
                </Text>
                <Text
                  style={{
                    width: "55%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  {profile.ktp}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Email KKP
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.email}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Email Lain
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.email_alt}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Pendidikan Terakhir
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.pendidikan}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Unit Kerja
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.satuan_kerja_nama}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Satker
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              <Text
                style={{
                  width: "55%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.unit_kerja}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Pangkat
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              {profile.pangkat == null ? (
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  -
                </Text>
              ) : (
                <Text
                  style={{
                    width: "55%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  {profile.pangkat}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Golongan
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              {profile.golongan == null ? (
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  -
                </Text>
              ) : (
                <Text
                  style={{
                    width: "55%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  {profile.golongan}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 10,
                gap: 5,
                width: wp(82),
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  width: "40%",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Alamat Kantor
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                :
              </Text>
              {profile.office_address == null ? (
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  -
                </Text>
              ) : (
                <Text
                  style={{
                    width: "50%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  {profile.office_address}
                </Text>
              )}
            </View>

            {/* custom divider */}
            {/* <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginTop: 10,
              }}
            /> */}
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 8,
    width: wp(88),
    alignItems: "center",
  },
  cardCollapse: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    width: wp(88),
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
});
