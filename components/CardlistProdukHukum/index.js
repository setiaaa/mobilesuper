import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";
import { getDetailProdukHukum } from "../../service/api";
import { Config } from "../../constants/config";
import { Divider } from "react-native-paper";

export const CardListProdukHukum = ({
  item,
  variant,
  token,
  device,
  isSelected,
  setSelection,
  nip,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailProdukHukum(params));
  };
  return (
    <View
      key={item.id}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        flex: 1,
        marginTop: 10,
        marginHorizontal: "5%",
        padding: 20,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        // //shadow android
        elevation: 2,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("DetailProdukHukum");
        }}
      >
        {variant === "inprogress" && nip !== "197208122001121002" ? (
          <Checkbox
            value={isSelected.includes(item?.id) ? true : false}
            onValueChange={() => {
              if (isSelected.includes(item?.id)) {
                const ids = [...isSelected];
                const newIds = ids.filter((id) => id !== item?.id);
                setSelection(newIds);
              } else {
                setSelection((prev) => [...prev, item?.id]);
              }
            }}
            color={isSelected === true ? COLORS.lighter : null}
          />
        ) : null}
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                fontWeight: FONTWEIGHT.bold,
                fontSize: fontSizeResponsive("H2", device),
                textAlign: "justify",
                flexWrap: "wrap",
              }}
            >
              {item?.subject}
            </Text>
          </View>
          <Divider style={{ marginVertical: 5 }} />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                textAlign: "justify",
                fontWeight: FONTWEIGHT.bold,
                flexWrap: "wrap",
              }}
            >
              Status
            </Text>
            <Text> :</Text>
            <View
              style={{
                backgroundColor: COLORS.bgLightGrey,
                alignSelf: "flex-start",
                paddingVertical: 5,
                borderRadius: 20,
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {item?.state == "done"
                  ? "Done"
                  : item?.state == "in_progress"
                  ? "Perlu Diproses"
                  : item?.state}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
