import React from "react";
import { Platform, Text, View } from "react-native";
import WebView from "react-native-webview";
import { COLORS, PADDING } from "../../config/SuperAppps";

export const Absensi = () => {
  return (
    <View style={{ height: "90%", width: "100%", padding: PADDING.Page }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri:
            Platform.OS === "android"
              ? "https://portal.kkp.go.id/assets/dashboardExt/DKepegawaian/DAbsensi.html"
              : "https://dashboard.coofis.com/t/kkp/views/DashboardAbsensiKKP/DashboardAbsensi?:origin=card_share_link&:embed=n",
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
  );
};
