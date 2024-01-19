import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PdfReader from "rn-pdf-reader-js-improved";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;
import * as Sharing from "expo-sharing";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { Platform } from "react-native";
import { Config } from "../../constants/config";
import {
  getDocumentAttachmentSPPD,
  getDocumentCetakSPPD,
} from "../../service/api";
import { Loading } from "../../components/Loading";

const LihatSuratSPPD = ({ route }) => {
  const { status, data } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dokumen, surat, cetak, detailPersonal } = useSelector(
    (state) => state.sppd
  );
  const id = detailPersonal?.id;
  const [token, setToken] = useState("");

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
      if (status === "share") {
        dispatch(getDocumentCetakSPPD({ token: val, id: detailPersonal?.id }));
      } else {
        dispatch(
          getDocumentAttachmentSPPD({
            token: val,
            id: detailPersonal?.id,
          })
        );
      }
    });
  }, []);

  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");

  const downloadFile = async (fileUrl, fileType, fileName) => {
    //alert(fileName)

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        downloadPath + fileName,
        { headers: { Authorization: token } }
      );
      try {
        // if (Platform.OS === "android") {
        //   const { uri } = await downloadResumable.downloadAsync();
        //   saveAndroidFile(uri, fileName, fileType);
        // } else {
        const { uri } = await downloadResumable.downloadAsync();
        saveIosFile(uri);
        // }
      } catch (e) {
        // setIsLoading(false);
        console.error("download error:", e);
      }
    } catch (e) {}
  };
  const saveAndroidFile = async (fileUri, fileName, fileType) => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          fileType
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("Success!", "Download Successfully.");
          })
          .catch((e) => {
            Alert.alert(
              "Failed!",
              "Download Unsuccessful. Please choose another folder to download file."
            );
          });
      } catch (e) {
        throw new Error(e);
      }
    } catch (err) {}
  };
  const saveIosFile = async (fileUri) => {
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/pdf",
        dialogTitle: "Share PDF",
      });
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  const fileName = data?.replace(/\s/g, "_");

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          height: 80,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: FONTSIZE.H1,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
              marginRight: status === "share" ? 0 : 50,
            }}
          >
            Surat Perjalanan Dinas
          </Text>
        </View>
        {status === "share" ? (
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                downloadFile(
                  Config.base_url +
                    "monperdin/document/back-form/" +
                    detailPersonal.id +
                    "/",
                  "application/pdf",
                  fileName + ".pdf"
                );
              }}
            >
              <Ionicons
                name="share-social-outline"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={{ width: "100%", height: "90%" }}>
        {status === "share" && cetak !== null ? (
          <PdfReader
            source={{
              base64: cetak,
            }}
            withScroll={true}
          />
        ) : status === "" && surat !== null ? (
          <PdfReader
            source={{
              base64: surat,
            }}
            withScroll={true}
          />
        ) : (
          <Loading />
        )}

        {/* <Image
          source={{ uri: pdfBlobData }}
          style={{ width: 100, height: 100 }}
        /> */}
        {/* <WebView source={{ html: surat }} /> */}
      </View>
    </>
  );
};

export default LihatSuratSPPD;

const styles = StyleSheet.create({
  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
  },
});
