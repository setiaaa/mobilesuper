import React from "react";
import { Platform, Text, View } from "react-native";
import { COLORS, PADDING } from "../../config/SuperAppps";
import WebView from "react-native-webview";

export const BBMNonSubsidiKusuka = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        padding: PADDING.Page,
      }}
    >
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DKusuka/DBBMSubsidiNonKUSUKA.html",
        }}
        style={{ flex: 1 }}
        allowFileAccess={true}
        androidLayerType={"software"}
        mixedContentMode={"always"}
        allowUniversalAccessFromFileURLs={true}
        setDisplayZoomControls={true}
        // injectedJavaScript={inject}
        scalesPageToFit={false}
      />
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </View>
  );
};
