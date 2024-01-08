import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { headerToken } from "../../../utils/http";
// import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js-improved";
import { nde_api } from "../../../utils/api.config";

function ViewAttachment({ route }) {
  //   const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState(route?.params.selected);
  const [header, setHeader] = useState();
  useEffect(() => {
    if (header == undefined) {
      getHeader();
    }
  }, [header]);
  async function getHeader() {
    let response = await headerToken();
    setHeader(response);
  }
  console.log(
    nde_api.baseurl + "crsbe/" + data?.file.slice(5, data?.file.length)
  );
  return (
    <>
      {header && (
        <>
          <View style={{ width: "100%", height: "100%" }}>
            <PDFReader
              source={{
                uri:
                  nde_api.baseurl +
                  "crsbe/" +
                  data?.file.slice(5, data?.file.length),
                headers: header,
              }}
              withScroll={true}
            />
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
