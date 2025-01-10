import React, { useMemo, useRef } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text, Image } from "react-native";
import {
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Search } from "../../components/Search";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useEffect } from "react";
import ListEmpty from "../../components/ListEmpty";
import {
  getDetailDigisign,
  getListRejected,
  getListComposer,
  getListDraft,
  getListInProgress,
  getListSignedDigiSign,
} from "../../service/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getTokenValue } from "../../service/session";
import { setDigitalSignLists } from "../../store/DigitalSign";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";
import { Config } from "../../constants/config";
import moment from "moment";

export const CardListPKRL = ({
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
    // dispatch(getDetailDigisign(params));
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
        marginVertical: 10,
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
          //   navigation.navigate("DetailPerizinanMenteri", {
          //     variant: variant,
          //     token: token,
          //   });
        }}
      >
        {/* {variant === "inprogress" ? (
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              color={isSelected === true ? COLORS.lighter : null}
            />
          ) : null} */}
        {/* {variant === "inprogress" && nip !== "197208122001121002" ? (
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
        ) : null} */}
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                textAlign: "justify",
                fontWeight: FONTWEIGHT.bold,
                flexWrap: "wrap",
              }}
            >
              {item?.subject}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.lighter,
              height: 1,
              marginVertical: 5,
              width: "90%",
            }}
          />
          <View style={{ width: "100%" }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  width: 120,
                  textAlign: "auto",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.normal,
                  width: "90%",
                  fontWeight: FONTWEIGHT.bold,
                  marginTop: 5,
                }}
              >
                Konseptor
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Image
                  source={{ uri: item.composer.avatar_url }}
                  height={30}
                  width={30}
                />
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    width: "90%",
                    textAlign: "auto",
                    fontSize: fontSizeResponsive("H3", device),
                  }}
                >
                  {item?.composer.display_title !== undefined
                    ? item?.composer.display_title
                    : "-"}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 5, width: "100%" }}>
            <View>
              {/* <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  textAlign: "auto",
                  fontWeight: FONTWEIGHT.normal,
                  fontWeight: FONTWEIGHT.bold,
                  marginTop: 5,
                }}
              >
                Paraf
              </Text> */}
              <View
                style={{
                  marginTop: 15,
                  backgroundColor: COLORS.primary,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    textAlign: "auto",
                    fontSize: fontSizeResponsive("H3", device),
                    color: COLORS.white,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Lihat Paraf
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
