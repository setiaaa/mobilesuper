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
  spacing,
  shadow,
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
                style={[
                  {
                    backgroundColor:
                      collapse === true
                        ? COLORS.secondaryLighter
                        : COLORS.white,
                    padding: spacing.default,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomLeftRadius: collapse === true ? 0 : 8,
                    borderBottomRightRadius: collapse === true ? 0 : 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  shadow.cardShadow,
                ]}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: spacing.medium,
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={device === "tablet" ? 40 : 24}
                  />
                  <Text
                    style={[
                      {
                        fontWeight: FONTWEIGHT.bold,
                      },
                      fontSizeResponsive("textL", device),
                    ]}
                  >
                    Biodata
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: spacing.default,
                  }}
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
              {/* <View style={{ marginLeft: 50 }}> */}
              {/* custom divider */}
              {/* <View
                  style={{
                    height: 1,
                    width: "88%",
                    backgroundColor: "#DBDADE",
                  }}
                /> */}
              {/* </View> */}
            </View>
          </TouchableOpacity>
        </CollapseHeader>
        {}
        <CollapseBody>
          <View style={[styles.cardCollapse, shadow.cardShadow]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Nama
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.nama}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                NIP
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.nip}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Karpeg/Karis-Karsu/NPWP
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {profile.karpeg == null ? (
                  <Text style={fontSizeResponsive("textS", device)}>-</Text>
                ) : (
                  <Text style={fontSizeResponsive("textS", device)}>
                    {profile.karpeg}
                  </Text>
                )}
                <Text style={fontSizeResponsive("textS", device)}>/</Text>
                {profile.karis == null ? (
                  <Text>-</Text>
                ) : (
                  <Text style={fontSizeResponsive("textS", device)}>
                    {profile.karis}
                  </Text>
                )}
                <Text style={fontSizeResponsive("textS", device)}>/</Text>
                {profile.npwp === "" ? (
                  <Text style={fontSizeResponsive("textS", device)}>-</Text>
                ) : (
                  <Text style={fontSizeResponsive("textS", device)}>
                    {profile.npwp}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Tempat/Tanggal Lahir
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.place_birth}/{profile.date_birth}
              </Text>
            </View>
            {data === "detailpegawai" ? null : (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: spacing.small,
                    marginBottom: spacing.medium,
                  }}
                >
                  <Text
                    style={[
                      {
                        flex: 4,
                      },
                      fontSizeResponsive("textS", device),
                    ]}
                  >
                    Telepon Seluler
                  </Text>
                  <Text style={fontSizeResponsive("textS", device)}>:</Text>
                  <Text
                    style={[
                      {
                        flex: 5,
                      },
                      fontSizeResponsive("textS", device),
                    ]}
                  >
                    {profile.mobile}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: spacing.small,
                    marginBottom: spacing.medium,
                  }}
                >
                  <Text
                    style={[
                      {
                        flex: 4,
                      },
                      fontSizeResponsive("textS", device),
                    ]}
                  >
                    No KTP
                  </Text>
                  <Text style={fontSizeResponsive("textS", device)}>:</Text>
                  <Text
                    style={[
                      {
                        flex: 5,
                      },
                      fontSizeResponsive("textS", device),
                    ]}
                  >
                    {profile.ktp}
                  </Text>
                </View>
              </>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Email KKP
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.email}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Email Lain
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.email_alt}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Pendidikan Terakhir
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.pendidikan}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Unit Kerja
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.satuan_kerja_nama}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Satker
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.unit_kerja}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Pangkat
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.pangkat == null ? "-" : profile.pangkat}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Golongan
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.golongan == null ? "-" : profile.golongan}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: spacing.small,
                marginBottom: spacing.medium,
              }}
            >
              <Text
                style={[
                  {
                    flex: 4,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                Alamat Kantor
              </Text>
              <Text style={fontSizeResponsive("textS", device)}>:</Text>
              <Text
                style={[
                  {
                    flex: 5,
                  },
                  fontSizeResponsive("textS", device),
                ]}
              >
                {profile.office_address == null ? "-" : profile.office_address}
              </Text>
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
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: spacing.default,
  },
  cardCollapse: {
    backgroundColor: "#fff",
    marginHorizontal: spacing.default,
    padding: spacing.default,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
