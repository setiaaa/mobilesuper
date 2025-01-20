import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
  shadow,
  spacing,
} from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from "accordion-collapse-react-native";
import { useSelector } from "react-redux";

export const CollapsePKRLSigned = ({ profile, device, counter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("done");

  const getCountDashboard = (type) => {
    let count = 0;

    if (counter?.data !== undefined) {
      Object.keys(counter?.data).forEach((element) => {
        if (counter?.data[element][type] !== undefined) {
          count = count + counter?.data[element][type];
        }
      });
    }

    return count;
  };

  const jenisPerizinan = [
    {
      label: "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan",
      alias: "Direktorat KEBP",
    },
    {
      label: "Direktorat Jaskel - Jasa Kelautan",
      alias: "Direktorat Jaskel",
    },
    {
      label: "Direktorat Pendayagunaan Pesisir dan Pulau Pulau Kecil",
      alias: "Direktorat P4K",
    },
  ];

  return (
    <Collapse isExpanded={isOpen}>
      <CollapseHeader>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.card}>
            <View
              style={[
                {
                  backgroundColor:
                    isOpen === true ? COLORS.secondaryLighter : COLORS.white,
                  padding: 10,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: isOpen === true ? 0 : 8,
                  borderBottomRightRadius: isOpen === true ? 0 : 8,
                  //   flexDirection: "row",
                  alignItems: "center",
                  //   justifyContent: "space-between",
                },
                shadow.cardShadow,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center", // Pastikan elemen sejajar secara vertikal
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    padding: 5,
                    backgroundColor: COLORS.successLight,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons
                    name={"file-check-outline"}
                    size={device === "tablet" ? 40 : 30}
                    color={COLORS.success}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    justifyContent: "center", // Tambahkan ini untuk memastikan konten vertikal sejajar
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H1", device),
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Signed
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: fontSizeResponsive("H4", device),
                      color: COLORS.grey,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Dokumen Sudah Ditandatangani
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center", // Tambahkan untuk sejajar vertikal
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: 40,
                    }}
                  >
                    {getCountDashboard("done")}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                      color: COLORS.grey,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Dokumen
                  </Text>
                </View>
              </View>

              {/* <View
                style={{
                  marginRight: spacing.default,
                }}
              >
                {isOpen === true ? (
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
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </CollapseHeader>
      {}
      <CollapseBody>
        <View
          style={[
            shadow.cardShadow,
            styles.cardCollapse,
            {
              flexDirection: "column",
              gap: 8,
            },
          ]}
        >
          {jenisPerizinan?.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H5", device),
                    width: "85%",
                  }}
                >
                  {item?.label}
                </Text>
                {/* Niai dan Badge */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      height: device === "tablet" ? 20 : 10,
                      width: device === "tablet" ? 20 : 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.success,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 30 : 15,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    {counter?.data !== undefined
                      ? counter?.data[item.label] === undefined
                        ? 0
                        : counter?.data[item.label][
                            title === "Need Sign" ? "need_sign" : "done"
                          ]
                      : 0}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </CollapseBody>
    </Collapse>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: "100%",
  },
  cardCollapse: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
