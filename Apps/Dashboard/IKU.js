import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { COLORS, PADDING } from "../../config/SuperAppps";

export const IKU = () => {
  return (
    <View style={{ height: "100%", width: "100%", padding: PADDING.Page }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DPerencanaan/IKU.html",
        }}
        style={{ flex: 1 }}
        allowFileAccess={true}
        androidLayerType={"software"}
        mixedContentMode={"always"}
        allowUniversalAccessFromFileURLs={true}
      />
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </View>
  );
};
