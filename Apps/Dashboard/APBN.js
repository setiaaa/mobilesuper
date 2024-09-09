import React, { useEffect } from "react";
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
  const { device } = useSelector((state) => state.apps);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const injectedJavaScriptBeforeContentLoadedMobile = `setTimeout(function () {
    var met = document.createElement('meta');
    met.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1';
    met.charset = 'UTF-8';
    met.name = 'viewport';
    var head = document.getElementsByTagName("head")[0];
    head.append(met);
  }, 500)`;

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

  const getTableauTicket = async () => {
    try {
      const response = await fetch("https://dashboard.coofis.com/trusted", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {
          username: "armsviewer", // Ganti dengan username Tableau Anda
          target_site: "kkp",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get Tableau trusted ticket");
      }

      const ticket = await response.json();
      return ticket;
    } catch (error) {
      console.error("Error fetching Tableau ticket:", error);
      return null;
    }
  };

  // Memperoleh Tableau Ticket dan menggunakannya dalam URL Tableau
  getTableauTicket().then((ticket) => {
    if (ticket) {
      const tableauVizUrl = `https://dashboard.coofis.com/trusted/${ticket}/views/KeuanganMobile/DashboardKeuangan`;
      console.log("Tableau Viz URL:", tableauVizUrl);
      // Gunakan tableauVizUrl untuk menampilkan Tableau di WebView
    }
  });

  const renderWebView = () => {
    if (device === "tablet") {
      if (getOrientation(screenWidth, screenHeight) === "landscape") {
        if (screenWidth <= 1194) {
          console.log("landscape 11");
          return (
            <>
              <Text>&nbsp;</Text>
              <WebView
                originWhitelist={["*"]}
                source={{
                  uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeuMobile.html",
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
                  injectedJavaScriptBeforeContentLoadedIpadLandscape11
                }
              />
            </>
          );
        } else {
          console.log("landscape 12");
          return (
            <>
              <Text>&nbsp;</Text>
              <WebView
                originWhitelist={["*"]}
                source={{
                  uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeuMobile.html",
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
                  injectedJavaScriptBeforeContentLoadedIpadLandscape12
                }
              />
            </>
          );
        }
      } else {
        if (screenWidth <= 834) {
          console.log("potrait 11");
          return (
            <>
              <WebView
                originWhitelist={["*"]}
                source={{
                  uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeuMobile.html",
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
                  injectedJavaScriptBeforeContentLoadedIpadPotrait11
                }
              />
            </>
          );
        } else {
          console.log("potrait 12");
          return (
            <>
              <WebView
                originWhitelist={["*"]}
                source={{
                  uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeuMobile.html",
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
                  injectedJavaScriptBeforeContentLoadedIpadPotrait12
                }
              />
            </>
          );
        }
      }
    } else {
      return (
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DRealDanRenKeuMobile.html",
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
            injectedJavaScriptBeforeContentLoadedMobile
          }
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          domStorageEnabled={true}
        />
      );
    }
  };

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
      {renderWebView()}
      <Text style={{ color: COLORS.primary }}>
        *) Gunakan 2 jari untuk menyesuaikan zoom
      </Text>
    </ScrollView>
  );
};

//Ipad pro 12 inch
//landscape 1366 initial-scale 0.9
//potrait 1024 initial-scale 0.7
