import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dim,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {} from "react-native-safe-area-context";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import Pdf from "react-native-pdf";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import PdfRendererView from "react-native-pdf-renderer";
import { getTokenValue } from "../../service/session";

const ViewerAnnotation = ({ route }) => {
  const { data, type, id } = route.params;
  const navigation = useNavigation();
  const { device } = useSelector((state) => state.apps);
  const pdfResource = { uri: data.link, chace: true };
  const [pdfLink, setPdfLink] = useState(data?.link);

  const [token, setToken] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      // This function runs when the screen is focused
      return () => {
        // This function runs when the screen is unfocused or back is pressed
        setPdfLink(null);
      };
    }, [])
  );

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Update key to force re-render
  }, [data?.link]);

  const injectJavaScript = `
(function () {
            const iframe = document.getElementById("iframe");

            if (iframe) {
                iframe.src = url;
            }

            window.addEventListener("message", (event) => {
                if (event.data.type === "PDF_BLOB") {
                    const file = event.data.blob;
                    const temp = new File([file], "sampe_pdf.pdf_copy", { type: "application/pdf", path: "sampe_pdf.pdf_copy" });
                    const formData = new FormData();


                    // Pastikan 'temp' adalah objek File yang valid
                    if (temp instanceof File) {
                        formData.append('files', temp);

                        fetch('https://apigw.kubekkp.coofis.com/repository/attachment/${id}/update/', {
                            method: 'PUT',
                            headers: {
                                'Authorization': '${token}',
                            },
                            body: formData,
                        })
                            .then(response => {
                                if (!response.ok) {
                                    // Jika response status bukan 2xx, buang error
                                    throw new Error('Network response was not ok.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.success) {
                                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "berhasil" }));
                                } else {
                                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "gagal", error: data.message }));
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                window.ReactNativeWebView.postMessage(JSON.stringify({ type: "gagal", error: error.message }));
                            });
                    } else {
                        console.error('Error: temp is not a valid File object');
                    }
                }
            });
        })();
`;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: COLORS.primary,
          height: 80,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: device === "tablet" ? 40 : 28,
            height: device === "tablet" ? 40 : 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                      <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail</Text>
                  </View> */}
      </View>
      <View style={{ flex: 1 }}>
        {type !== undefined ? (
          <WebView
            originWhitelist={["*"]}
            source={{
              uri: `http://192.168.0.243:5500/index.html?file=${encodeURIComponent(
                data
              )}`,
            }}
            style={{ flex: 1 }}
            allowFileAccess={true}
            androidLayerType={"software"}
            mixedContentMode={"always"}
            allowUniversalAccessFromFileURLs={true}
            scalesPageToFit={true}
            injectedJavaScript={injectJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data);
                if (data.type === "berhasil") {
                  Alert.alert("PERHATIAN!", "Data berhasil diubah");
                  navigation.navigate("DetailTinjauan");
                } else {
                  Alert.alert("PERHATIAN!", "Data gagal diubah");
                }
              } catch (error) {
                console.error("Error parsing message:", error);
              }
            }}
          />
        ) : (
          <Pdf
            trustAllCerts={false}
            key={key}
            source={{ uri: data }}
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          />
        )}
      </View>
    </>
  );
};

export default ViewerAnnotation;

const styles = StyleSheet.create({
  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
  },
});
