import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import PdfReader from "rn-pdf-reader-js-improved";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";

export const FileViewerRepo = ({ route }) => {
  const navigation = useNavigation();
  const { lampiran, type } = route.params;
  const { device } = useSelector((state) => state.apps);

  return (
    <>
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
            width: device === "tablet" ? 40 : 28,
            height: device === "tablet" ? 40 : 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                  <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail</Text>
              </View> */}
      </View>
      <View style={{ width: "100%", height: "100%" }}>
        {type === "ppt" ||
        type === "pptx" ||
        type === "xls" ||
        type === "xlsx" ||
        type === "doc" ||
        type === "docx" ? (
          <PdfReader
            source={{
              uri: lampiran,
            }}
            webviewProps={{
              startInLoadingState: true,
            }}
          />
        ) : type === "pdf" ? (
          <PdfReader
            source={{
              uri: lampiran,
            }}
            webviewProps={{
              startInLoadingState: true,
            }}
          />
        ) : null}
      </View>
    </>
  );
};
