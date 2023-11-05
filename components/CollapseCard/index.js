import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Text, Touchable } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";

export const CollapseCard = ({
  teu_badan,
  singkatan_peraturan_cat,
  tempat_penetapan,
  tgl_penetapan,
  tgl_diundangkan,
  subjek,
  sumber_peraturan,
  bahasa,
  bidanghukum,
  dilihat,
  diunduh,
}) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <View>
      <Collapse>
        <CollapseHeader>
          <TouchableOpacity onPress={() => setCollapse(collapse)}>
            <View
              style={[
                styles.card,
                { borderRadius: collapse === true ? 0 : 16 },
              ]}
            >
              <View
                style={{
                  backgroundColor: COLORS.secondaryLighter,
                  hegiht: "30%",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Informasi Detail
                </Text>
                <View
                  style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
                >
                  {collapse ? (
                    <Ionicons name="chevron-up-outline" size={20} />
                  ) : (
                    <Ionicons name="chevron-down-outline" size={20} />
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>T.E.U</Text>
                <Text style={{ flex: 1, textAlign: "right", marginLeft: 100 }}>
                  {teu_badan}
                </Text>
              </View>
              <Divider bold />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Singkatan Jenis
                </Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {singkatan_peraturan_cat}
                </Text>
              </View>
              <Divider bold />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Tempat Terbit
                </Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {tempat_penetapan}
                </Text>
              </View>
              <Divider bold />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Tanggal Penetapan
                </Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {tgl_penetapan}
                </Text>
              </View>
              <Divider bold />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Tanggal Pengundangan
                </Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {tgl_diundangkan}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.cardCollapse}>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Subjek</Text>
              <Text style={{ flex: 1, textAlign: "right", marginLeft: 100 }}>
                {subjek}
              </Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Sumber</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>
                {sumber_peraturan}
              </Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Bahasa</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>{bahasa}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Lokasi</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>-</Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Bidang Hukum</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>{bidanghukum}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Keterangan</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>-</Text>
            </View>
            <Divider bold />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Abstrak</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>-</Text>
            </View>

            <View
              style={{
                backgroundColor: COLORS.secondaryLighter,
                flexDirection: "row",
                gap: 20,
                paddingLeft: 20,
                paddingBottom: 20,
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Dilihat</Text>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    gap: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="eye-outline" size={15} color={"black"} />
                  <Text style={styles.text}>{dilihat}</Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Diunduh</Text>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    gap: 5,
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  <Ionicons name="download-outline" size={15} color={"black"} />
                  <Text style={styles.text}>{diunduh}</Text>
                </View>
              </View>
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FE",
    gap: 20,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    height: 300,
  },
  cardCollapse: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
  },
});
