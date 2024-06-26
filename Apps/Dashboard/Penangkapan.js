import React from "react";
import { Platform, View } from "react-native";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { COLORS, PADDING, fontSizeResponsive } from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const Penangkapan = () => {
  const navigation = useNavigation();
  const { device } = useSelector((state) => state.apps);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: "10%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              width: device === "tablet" ? 46 : 28,
              height: device === "tablet" ? 46 : 28,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Ionicons
              name="chevron-back"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontSizeResponsive("H3", device),
              fontWeight: 600,
            }}
          >
            Produksi Penangkapan
          </Text>
        </View>
      </View>
      <View style={{ height: "90%", width: "100%", padding: PADDING.Page }}>
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://portal.kkp.go.id/assets/dashboardExt/DProduksiTangkap/DProduksiTangkap.html",
          }}
          style={{ flex: 1 }}
          allowFileAccess={true}
          androidLayerType={"software"}
          mixedContentMode={"always"}
          allowUniversalAccessFromFileURLs={true}
          scalesPageToFit={false}
        />
        <Text style={{ color: COLORS.primary }}>
          *) Gunakan 2 jari untuk menyesuaikan zoom
        </Text>
      </View>
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
    width: 350,
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    width: 369,
    borderRadius: 16,
  },
});
