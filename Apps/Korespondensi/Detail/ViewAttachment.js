import { useEffect, useState } from "react";
import { BackHandler, Dimensions, StyleSheet, View } from "react-native";
import { headerToken } from "../../../utils/http";
// import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js-improved";
import { nde_api } from "../../../utils/api.config";
import Pdf from "react-native-pdf";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

function ViewAttachment({ route }) {
  //   const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState(route?.params.selected);
  const [header, setHeader] = useState();
  const [stylus, setStylus] = useState(route?.params?.stylus);
  const [token, setToken] = useState(route?.params?.token);
  const [id, setId] = useState(route?.params?.id);
  const navigation = useNavigation();
  useEffect(() => {
    if (header == undefined) {
      getHeader();
    }
  }, [header]);
  async function getHeader() {
    let response = await headerToken();
    setHeader(response);
  }
  const urlPdf =
    nde_api.baseurl + "crsbe/" + data?.file.slice(5, data?.file.length);
  const pdfResource = {
    uri: nde_api.baseurl + "crsbe/" + data?.file.slice(5, data?.file.length),
    header: header,
    chace: true,
  };

  const backAction = () => {
    if (stylus) {
      navigation.goBack();
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <>
      {header && (
        <>
          <View style={{ flex: 1 }}>
            {stylus && (
              <WebView
                source={{
                  uri:
                    nde_api.baseurl_kores +
                      "stylus-mobile/" +
                      id +
                      "?stylusToken=" +
                      token || undefined,
                  headers: header,
                }}
                style={{
                  flex: 1,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                }}
              />
            )}
            {!stylus && (
              <Pdf
                trustAllCerts={false}
                source={{
                  uri:
                    nde_api.baseurl +
                      "crsbe/" +
                      data?.file.slice(5, data?.file.length) || undefined,
                  headers: header,
                }}
                style={{
                  flex: 1,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                }}
              />
            )}
          </View>
        </>
      )}
    </>
  );
}
export default ViewAttachment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
