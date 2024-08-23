import React, { useEffect } from "react";
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
  const injectedJavaScriptBeforeContentLoadedMobile = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`

  const injectedJavaScriptBeforeContentLoadedIpadPotrait11 = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;

  const injectedJavaScriptBeforeContentLoadedIpadLandscape11 = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=0.7, maximum-scale=0.7, minimum-scale=0.7';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;


  const injectedJavaScriptBeforeContentLoadedIpadPotrait12 = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=0.7, maximum-scale=0.7, minimum-scale=0.7';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;

  const injectedJavaScriptBeforeContentLoadedIpadLandscape12 = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=0.9, maximum-scale=0.9, minimum-scale=0.9';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;

  // console.log('width', screenWidth)
  // let injected = null
  // if (device === 'tablet') {
  //   if (getOrientation(screenWidth, screenHeight) === 'landscape') {
  //     if (screenWidth <= 1194) {
  //       console.log('landscape 11')
  //       injected = injectedJavaScriptBeforeContentLoadedIpadLandscape11
  //     } else {
  //       console.log('landscape 12')
  //       injected = injectedJavaScriptBeforeContentLoadedIpadLandscape12
  //     }
  //   } else {
  //     if (screenWidth <= 834) {
  //       console.log('potrait 11')
  //       injected = injectedJavaScriptBeforeContentLoadedIpadPotrait11
  //     } else {
  //       console.log('potrait 12')
  //       injected = injectedJavaScriptBeforeContentLoadedIpadPotrait12
  //     }
  //   }
  // } else {
  //   injected = injectedJavaScriptBeforeContentLoadedMobile
  // }

  const renderWebView = () => {
    if (device === 'tablet') {
      if (getOrientation(screenWidth, screenHeight) === 'landscape') {
        if (screenWidth <= 1194) {
          console.log('landscape 11')
          return (
            <>
              <Text>&nbsp;</Text>
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
                injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoadedIpadLandscape11}
              />
            </>
          )
        } else {
          console.log('landscape 12')
          return (
            <>
              <Text>&nbsp;</Text>
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
                injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoadedIpadLandscape12}
              />
            </>
          )
        }
      } else {
        if (screenWidth <= 834) {
          console.log('potrait 11')
          return (
            <>
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
                injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoadedIpadPotrait11}
              />
            </>
          )
        } else {
          console.log('potrait 12')
          return (
            <>
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
                injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoadedIpadPotrait12}
              />
            </>
          )
        }
      }
    } else {
      return (
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
          injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoadedMobile}
        />
      )
    }
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        padding: PADDING.Page,
      }}
    >
      {renderWebView()}
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </View>
  );
};

//Ipad pro 12 inch
//landscape 1366 initial-scale 0.9
//potrait 1024 initial-scale 0.7