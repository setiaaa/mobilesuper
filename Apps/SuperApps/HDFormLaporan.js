import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Dropdown } from "../../components/DropDown";

export const HDFormLaporan = () => {
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
            Form Laporan
          </Text>
        </View>
      </View>
      <View
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
          <View
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
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}
                >
                  Kendala / Permintaan
                </Text>
                <Text style={{ color: COLORS.danger }}>*</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: COLORS.ExtraDivinder,
                }}
              >
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  placeholder="Ketikkan Sesuatu"
                  style={{ padding: 10 }}
                  // onChangeText={setJudul}
                  // value={Judul}
                />
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}
                >
                  Aplikasi
                </Text>
                <Text style={{ color: COLORS.danger }}>*</Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: COLORS.ExtraDivinder,
                }}
              >
                <Dropdown
                  placeHolder={"Pilih Aplikasi"}
                  // borderWidth={1}
                  // borderwidthDrop={1}
                  // borderWidthValue={1}
                  // borderColor={COLORS.ExtraDivinder}
                  // borderColorDrop={COLORS.ExtraDivinder}
                  // borderColorValue={COLORS.ExtraDivinder}
                  heightValue={150}
                  search={true}
                />
              </View>
            </View>
          </View>

          <View
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
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}
                >
                  Lampiran
                </Text>
              </View>

              <Pressable>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: COLORS.ExtraDivinder,
                    height: 250,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <View style={{ marginBottom: 10 }}>
                    <Ionicons
                      name="md-cloud-upload-outline"
                      size={30}
                      color={"#66656C"}
                    />
                  </View>
                  <Text style={{ color: "#66656C" }}>Klik Untuk Unggah</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "90%",
              backgroundColor: COLORS.primary,
              marginTop: "5%",
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
          >
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
            >
              <Ionicons name="send-outline" size={24} color={COLORS.white} />
              <Text
                style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}
              >
                Kirim
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
