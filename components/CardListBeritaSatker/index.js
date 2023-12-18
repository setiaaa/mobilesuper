import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";
import { getDetailBerita, getDetailSatkerNews } from "../../service/api";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, fontSizeResponsive } from "../../config/SuperAppps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const CardListBeritaSatker = ({
  image,
  tanggal,
  title,
  item,
  index,
  id,
  token,
  device,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getDetail = (id) => {
    const params = { token: token, id: id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailSatkerNews(params));
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        width: "90%",
        flex: 1,
        marginTop: 30,
        marginHorizontal: "5%",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          getDetail(id);
          navigation.navigate("DetailBeritaSatker");
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
        <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
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
              fontWeight: 400,
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
    backgroundColor: "white",
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
