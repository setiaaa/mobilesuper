import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { COLORS, PADDING } from "../../config/SuperAppps";

export const APBN = () => {
  return (
    <View style={{ height: "100%", width: "100%", padding: PADDING.Page }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeu.html",
        }}
        style={{ flex: 1 }}
        allowFileAccess={true}
        androidLayerType={"software"}
        mixedContentMode={"always"}
        allowUniversalAccessFromFileURLs={true}
        setDisplayZoomControls={true}
      />
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </View>
  );
};
