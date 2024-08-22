import React from "react";
import { Dimensions, Platform, useWindowDimensions, View } from "react-native";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { COLORS, getOrientation, PADDING } from "../../config/SuperAppps";
import { useSelector } from "react-redux";

export const APBN = () => {
  const widthTableu = Dimensions.get("window").width;
  let inject = `
  $('.tableauViz').css({'width': '${widthTableu}'})
  $('.tableauPlaceholder').css({'background-color': 'red', 'width': '900px'})
  `;

  const { device } = useSelector((state) => state.apps);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const getWidthCarousel = () => {
    let tempWidth = 0;
    let orientation = getOrientation(screenWidth, screenHeight);

    if (device === "tablet") {
      if (orientation === "landscape") {
        tempWidth = screenWidth - 50;
      } else {
        tempWidth = screenWidth - 50;
      }
    } else {
      tempWidth = screenWidth;
    }

    return tempWidth;
  };

  const getHeightCarousel = () => {
    let tempHeight = 0;
    let orientation = getOrientation(screenWidth, screenHeight);

    if (device === "tablet") {
      if (orientation === "landscape") {
        tempHeight = screenWidth;
      } else {
        tempHeight = screenWidth;
      }
    } else {
      tempHeight = 200;
    }

    return tempHeight;
  };
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
          // uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeu.html",
          html: `<iframe src="https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeu.html" style="width: ${getWidthCarousel()}; height: 100%; border: none;"title="description"></iframe>`,
        }}
        style={{
          flex: 1,
          width: 850,
        }}
        allowFileAccess={true}
        androidLayerType={"software"}
        mixedContentMode={"always"}
        allowUniversalAccessFromFileURLs={true}
        scalesPageToFit={false}
        setBuiltInZoomControls={true}
      />
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </View>
  );
};
