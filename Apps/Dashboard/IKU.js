import React from "react";
import { Platform, View } from "react-native";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { COLORS, PADDING } from "../../config/SuperAppps";

export const IKU = () => {
  return (
    <View style={{ height: "100%", width: "100%", padding: PADDING.Page }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri:
            Platform.OS === "android"
              ? "https://portal.kkp.go.id/assets/dashboardExt/DPerencanaan/IKU.html"
              : "https://dashboard.coofis.com/t/kkp/views/DashboardNPSS/DashboardNPSS?:origin=card_share_link&:embed=n",
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
