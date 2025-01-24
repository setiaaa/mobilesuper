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
import {
  kategoriPerizinan,
  listParaf,
} from "../../Apps/DigitalSignature/dataDokPerizinan";

export const CollapsePKRLSignIn = ({
  profile,
  device,
  counter,
  filterHandlerInProgress,
  filterDirektorat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Need Sign");

  const jenisPerizinan = [
    {
      label: "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan",
      alias: "Direktorat KEBP",
      group: 1,
    },
    {
      label: "Direktorat Jaskel - Jasa Kelautan",
      alias: "Direktorat Jaskel",
      group: 2,
    },
    {
      label: "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil",
      alias: "Direktorat P4K",
      group: 3,
    },
  ];

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

  const handleGetDataByDirektorat = (type) => {
    let dataDashboard = {};
    jenisPerizinan?.map((x) => (dataDashboard[x.label] = 0));

    if (counter?.data !== undefined) {
      const listDirektorat = [];
      const jabatanUser =
        counter?.data !== undefined
          ? counter?.data?.direktorat_user?.toLowerCase()
          : "";
      const kp = listParaf?.filter(
        (x) => x.title.toLowerCase() === jabatanUser
      )[0];

      if (kp) {
        kp?.group?.map((x) => {
          const group = kategoriPerizinan?.filter((y) => y.key === x)[0][
            "group"
          ];
          const jp = jenisPerizinan?.filter((z) => z.group === group)[0];

          if (!listDirektorat?.some((x) => x === jp.label)) {
            listDirektorat?.push(jp.label);
          }
        });
      } else if (
        jabatanUser === "menteri kelautan dan perikanan" ||
        jabatanUser !== undefined
      ) {
        jenisPerizinan?.map((x) => listDirektorat?.push(x.label));
      }

      Object.keys(dataDashboard)?.forEach((element) => {
        if (
          counter?.data[element] !== undefined &&
          counter?.data[element][type] !== undefined &&
          listDirektorat?.some((x) => x === element)
        ) {
          dataDashboard[element] = counter?.data[element][type];
        }
      });
    }

    return dataDashboard;
  };

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
                    backgroundColor: COLORS.infoDangerLight,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons
                    name={"file-alert-outline"}
                    size={device === "tablet" ? 40 : 30}
                    color={COLORS.infoDanger}
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
                    Need Sign
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: fontSizeResponsive("H4", device),
                      color: COLORS.grey,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Dokumen Belum Ditandatangani
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
                    {/* {getCountDashboard("need_sign")} */}
                    {counter?.data?.need_sign ?? 0}
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
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor:
                    filterDirektorat === item.label
                      ? COLORS.ExtraDivinder
                      : null,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  filterHandlerInProgress(item.label);
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
                      backgroundColor: COLORS.infoDanger,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 30 : 15,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    {/* {counter?.data !== undefined
                      ? counter?.data[item?.label] === undefined
                        ? 0
                        : counter?.data[item?.label][
                            title === "Need Sign" ? "need_sign" : "done"
                          ]
                      : 0} */}
                    {handleGetDataByDirektorat("need_sign")[item.label] ?? 0}
                  </Text>
                </View>
              </TouchableOpacity>
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
