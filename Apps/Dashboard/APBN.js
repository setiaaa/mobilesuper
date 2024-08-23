import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
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
  const injectedJavaScriptBeforeContentLoaded = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;
  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
        padding: PADDING.Page,
      }}
      maximumZoomScale={3}
      minimumZoomScale={1}
      contentContainerStyle={{ flex: 1 }}
    >
      {Platform.OS === "android" ? (
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeu.html",
          }}
          style={{
            flex: 1,
          }}
          allowFileAccess={true}
          androidLayerType={"software"}
          mixedContentMode={"always"}
          allowUniversalAccessFromFileURLs={true}
          scalesPageToFit={true}
          setBuiltInZoomControls={true}
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeu.html",
          }}
          style={{
            flex: 1,
          }}
          allowFileAccess={true}
          androidLayerType={"software"}
          mixedContentMode={"always"}
          allowUniversalAccessFromFileURLs={true}
          scalesPageToFit={true}
          injectedJavaScriptBeforeContentLoaded={
            injectedJavaScriptBeforeContentLoaded
          }
          setDisplayZoomControls={true}
          useWebView2={true}
        />
      )}
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </ScrollView>
  );
};
