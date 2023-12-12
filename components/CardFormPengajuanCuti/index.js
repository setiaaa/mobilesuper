import React from "react";
import { useDispatch } from "react-redux";
import { getFormCuti } from "../../service/api";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const CardFormPengajuanCuti = ({ item, profile }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formCuti = (id) => {
    const params = { nip: profile.nip, id: id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getFormCuti(params));
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <TouchableOpacity
          onPress={() => {
            formCuti(item.id);
            navigation.navigate("TambahCutiTahunan");
          }}
          style={{
            backgroundColor: COLORS.infoDanger,
            padding: 15,
            borderRadius: 30,
            width: 55,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="calendar-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={{ width: wp(30), textAlign: "center" }}>{item.nama}</Text>
      </View>
    </View>
  );
};
