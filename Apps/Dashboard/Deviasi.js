import React from "react";
import { Platform, Text, View } from "react-native";
import { COLORS, PADDING } from "../../config/SuperAppps";
import WebView from "react-native-webview";

export const Deviasi = () => {
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
          uri:
            Platform.OS === "android"
              ? "https://portal.kkp.go.id/assets/dashboardExt/DKusuka/DDeviasiKusuka.html"
              : "https://dashboard.coofis.com/t/kkp/views/DeviasiKusuka/DeviasiKusuka?:origin=card_share_link&:embed=n",
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
