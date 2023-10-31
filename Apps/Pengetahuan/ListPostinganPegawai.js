import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT, PADDING } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import ListEmpty from "../../components/ListEmpty";
import { StatusBar } from "expo-status-bar";

const CardListPostingan = ({ item }) => {
  // console.log(item);
  return (
    <View style={{ width: "90%", alignSelf: "center", marginVertical: 20, padding: PADDING.Page }}>
      <View
        style={{
          height: 90,
          borderBottomWidth: 10,
          borderColor: COLORS.lighter,
          alignItems: "center",
          borderRadius: 8,
          flexDirection: "row",
          //shadow ios
          //shadow android
          elevation: 2,
        }}
      >
        <View>
          <Text style={{ fontSize: 13, fontWeight: 600 }}>{item?.title}</Text>
          <View
            style={{
              display: "flex",
              // justifyContent: "space-between",
              marginVertical: 10,
              gap: 10,
              paddingBottom: 10
            }}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{ fontSize: 13, fontWeight: 400, color: COLORS.grey }}
              >
                Tanggal : {item?.created_at}
              </Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 13, fontWeight: 400, color: COLORS.grey }}
              >
                {"Nilai Saat ini : " + item?.score}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export const ListPostinganPegawai = (param) => {
  const navigation = useNavigation();

  const { postinganPegawai } = useSelector((state) => state.pengetahuan);

  // console.log(postinganPegawai);

  // console.log(param.route.params);

  const nama = param?.route?.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("Home")}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            Postingan {nama}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 130 }}>
        <FlatList
          data={postinganPegawai?.lists}
          renderItem={({ item }) => (
            <View key={item.id}>
              <CardListPostingan item={item} />
            </View>
          )}
          style={{ marginBottom: 80 }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <ListEmpty />}
        />
      </View>
    </SafeAreaView>
  );
};
