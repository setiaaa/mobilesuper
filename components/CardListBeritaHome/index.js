import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBerita } from "../../service/api";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, fontSizeResponsive } from "../../config/SuperAppps";

export const CardListBeritaHome = ({
  image,
  tanggal,
  title,
  item,
  index,
  id,
  token,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.apps);

  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailBerita(params));
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        borderRadius: 16,
        width: "100%",
        marginBottom: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          getDetail(id);
          navigation.navigate("DetailBerita");
        }}
      >
        <View>
          <Image
            source={{ uri: image }}
            style={
              Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid
            }
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: COLORS.grey,
              marginVertical: 5,
              fontSize: fontSizeResponsive("H5", device),
              fontWeight: 400,
            }}
          >
            {tanggal}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              fontSize: fontSizeResponsive("H5", device),
              fontWeight: 600,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: "#fff",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  imageIos: {
    height: 193,
    width: "100%",
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    width: "100%",
    borderRadius: 16,
  },
});
