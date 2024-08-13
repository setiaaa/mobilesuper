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
import { COLORS, DATETIME, fontSizeResponsive } from "../../config/SuperAppps";
import moment from "moment";

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
    <View style={{ flex: 0.5 }}>
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
          marginHorizontal: 8,
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
              style={{
                height: device === "tablet" ? 300 : 193,
                borderRadius: 16,
              }}
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
              {/* {moment(tanggal, "DD MMMM YYYY").format(DATETIME.LONG_DATE)} */}
              {tanggal}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                marginVertical: 5,
                fontSize: fontSizeResponsive("H5", device),
                fontWeight: 600,
                // width: 140,
              }}
            >
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    borderRadius: 16,
  },
});
