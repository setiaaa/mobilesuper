import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";
import { Search } from "../../components/Search";

const CardPostinganSaya = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: "90%", alignSelf: "center", marginTop: 5 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailPostinganSaya")}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            elevation: 2,
            borderRadius: 8,
            height: 130,
            flexDirection: "row",
            padding: 10,
            marginVertical: 5,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Image
              source={require("../../assets/superApp/Cover.png")}
              style={{ height: 38, width: 70 }}
            />
          </View>
          <View style={{ marginStart: 10 }}>
            <Text
              style={{
                width: 270,
                fontSize: 13,
                textAlign: "justify",
                marginBottom: 5,
              }}
            >
              Dongkrak Perekonomian Nelayan Kupang, KKP Gulirkan...
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ color: "#6B7280", fontSize: 13 }}>
                Tanggal : 22 Juli 2023
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#6B7280", fontSize: 13, marginEnd: 5 }}>
                  Poin :
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    borderRadius: 8,
                    width: 30,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                    0.5
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 8,
                    width: 33,
                    height: 26,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="thumbs-up-outline"
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.primary,
                    marginStart: 5,
                  }}
                >
                  324
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={18}
                  color={COLORS.grey}
                />
                <Text style={{ fontSize: 13, marginStart: 5 }}>81</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="eye-outline" size={18} color={COLORS.grey} />
                <Text style={{ fontSize: 13, marginStart: 5 }}>436</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: COLORS.infoDangerLight,
                    borderRadius: 20,
                    width: 79,
                    height: 24,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: COLORS.infoDanger, textAlign: "center" }}
                  >
                    Canceled
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          elevation: 2,
          borderRadius: 8,
          height: 130,
          flexDirection: "row",
          padding: 10,
          marginVertical: 5,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Image
            source={require("../../assets/superApp/Cover.png")}
            style={{ height: 38, width: 70 }}
          />
        </View>
        <View style={{ marginStart: 10 }}>
          <Text
            style={{
              width: 270,
              fontSize: 13,
              textAlign: "justify",
              marginBottom: 5,
            }}
          >
            Dongkrak Perekonomian Nelayan Kupang, KKP Gulirkan...
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ color: "#6B7280", fontSize: 13 }}>
              Tanggal : 22 Juli 2023
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#6B7280", fontSize: 13, marginEnd: 5 }}>
                Poin :
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.success,
                  borderRadius: 8,
                  width: 30,
                }}
              >
                <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                  0.5
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 8,
                  width: 33,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="thumbs-up-outline" size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 13, color: COLORS.primary, marginStart: 5 }}
              >
                324
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={18}
                color={COLORS.grey}
              />
              <Text style={{ fontSize: 13, marginStart: 5 }}>81</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="eye-outline" size={18} color={COLORS.grey} />
              <Text style={{ fontSize: 13, marginStart: 5 }}>436</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: COLORS.successLight,
                  borderRadius: 20,
                  width: 79,
                  height: 24,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: COLORS.success, textAlign: "center" }}>
                  Publish
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          elevation: 2,
          borderRadius: 8,
          height: 130,
          flexDirection: "row",
          padding: 10,
          marginVertical: 5,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Image
            source={require("../../assets/superApp/Cover.png")}
            style={{ height: 38, width: 70 }}
          />
        </View>
        <View style={{ marginStart: 10 }}>
          <Text
            style={{
              width: 270,
              fontSize: 13,
              textAlign: "justify",
              marginBottom: 5,
            }}
          >
            Dongkrak Perekonomian Nelayan Kupang, KKP Gulirkan...
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ color: "#6B7280", fontSize: 13 }}>
              Tanggal : 22 Juli 2023
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#6B7280", fontSize: 13, marginEnd: 5 }}>
                Poin :
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.success,
                  borderRadius: 8,
                  width: 30,
                }}
              >
                <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                  0.5
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 8,
                  width: 33,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="thumbs-up-outline" size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 13, color: COLORS.primary, marginStart: 5 }}
              >
                324
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={18}
                color={COLORS.grey}
              />
              <Text style={{ fontSize: 13, marginStart: 5 }}>81</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="eye-outline" size={18} color={COLORS.grey} />
              <Text style={{ fontSize: 13, marginStart: 5 }}>436</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#E0E0E0",
                  borderRadius: 20,
                  width: 79,
                  height: 24,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: COLORS.grey, textAlign: "center" }}>
                  Draft
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export const PostinganSaya = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
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
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            Postingan Saya
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("JumlahPostingan")}
          >
            <Ionicons
              name="document-text-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
        <View
          style={{
            marginVertical: 15,
            borderRadius: 8,
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Cari..."
            style={{
              width: "85%",
              backgroundColor: "#FFFFFF",
              marginRight: 10,
              borderRadius: 8,
              paddingStart: 10,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#C34647",
              borderRadius: 8,
              height: 54,
              width: "12%",
              justifyContent: "center",
              alignItems: "center",
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
            onPress={() => navigation.navigate("PostinganBaru")}
          >
            <Ionicons name="add-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <CardPostinganSaya />

      {/* <FlatList
                data={linimasa.lists}
                renderItem={({ item }) =>
                    <View key={item.id}>
                        <CardLiniMasa
                            item={item}
                            token={token}
                        // setVisibleModal={setVisibleModal}
                        />
                    </View>
                }
                style={{ marginBottom: 80 }}
                keyExtractor={item => item.id}
            /> */}
    </SafeAreaView>
  );
};
