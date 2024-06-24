import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dim,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {} from "react-native-safe-area-context";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import Pdf from "react-native-pdf";

const PdfViewer = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  useEffect(() => {}, []);
  const { device } = useSelector((state) => state.apps);
  const pdfResource = { uri: data.link, chace: true };
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
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail</Text>
                </View> */}
      </View>
      <View style={{ flex: 1 }}>
        <Pdf
          trustAllCerts={false}
          source={pdfResource}
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
      </View>
    </>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
  },
});
