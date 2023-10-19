import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CardListPostingan = () => {
  return (
    <View style={{ width: "90%", alignSelf: "center", marginVertical: 5 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.white,
          height: 90,
          alignItems: "center",
          borderRadius: 8,
          padding: 20,
          flexDirection: "row",
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Image
          source={require("../../assets/superApp/linimasa2.png")}
          style={{ height: 50, width: 70, borderRadius: 4, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontSize: 13, fontWeight: 600 }}>Judul Postingan</Text>
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingEnd: 10,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.grey }}>
              Tanggal : 22 Juli 2023
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.grey }}>
              Nilai Saat ini : 0
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const ListPostinganPegawai = () => {
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
          marginBottom: 20,
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
            Postingan EFFIN MARTIANA
          </Text>
        </View>
      </View>

      <CardListPostingan />
      <CardListPostingan />
      <CardListPostingan />

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
