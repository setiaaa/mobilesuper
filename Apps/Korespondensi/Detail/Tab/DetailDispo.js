import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GlobalStyles } from "../../../../constants/styles";
import DetailAgenda from "../../Detail/Tab/DetailAgenda";
import LoadingOverlay from "../../../../components/UI/LoadingOverlay";

import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;
import { headerToken } from "../../../../utils/http";
import * as Sharing from "expo-sharing";
import { nde_api } from "../../../../utils/api.config";
import { useDispatch } from "react-redux";
import { setDataNotif } from "../../../../store/pushnotif";
import WebView from "react-native-webview";

function DetailDispo({ data, noAgenda, preview, title }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );

  const [header, setHeader] = useState();
  const [extensionPdf, setExtensionPdf] = useState(false);
  const [selectedAttach, setSelectedAttach] = useState();
  const [selectedIconAttach, setSelectedIconAttach] = useState();

  const [downloadProgress, setDownloadProgress] = useState();
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");

  const bottomSheetRefAttach = useRef(null);
  const snapPoint = useMemo(() => [50, 250], []);
  const snapPointPdf = useMemo(() => [50, 300], []);

  useEffect(() => {
    if (header == undefined) {
      getHeader();
    }
    dispatch(setDataNotif({}));
  }, [header]);
  async function getHeader() {
    let response = await headerToken();
    setHeader(response);
  }
  function showBottommSheet(item, icon) {
    let temp = item?.truncate_name?.split(".");
    if (temp?.length != 0) {
      if (temp[temp?.length - 1] == "pdf") {
        setExtensionPdf(true);
      } else {
        setExtensionPdf(false);
      }
    }
    setSelectedIconAttach(icon);
    setSelectedAttach(item);
    bottomSheetRefAttach.current.present();
  }
  const ensureDirAsync = async (dir, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir);
    if (props.exist && props.isDirectory) {
      return props;
    }
    let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates });
    return await ensureDirAsync(dir, intermediates);
  };
  const downloadCallback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };
  const downloadFile = async (item) => {
    // setIsLoading(true);
    let fileUrl = item.file;
    let fileType = item.description;
    let fileName = item.filename;
    if (Platform.OS == "android") {
      const dir = ensureDirAsync(downloadPath);
    }
    fileName = item.filename.split("/")[3];
    //alert(fileName)
    const downloadResumable = FileSystem.createDownloadResumable(
      nde_api.baseurl + fileUrl,
      downloadPath + fileName,
      { headers: header },
      downloadCallback
    );
    try {
      const { uri } = await downloadResumable.downloadAsync();
      if (Platform.OS == "android") saveAndroidFile(uri, fileName, fileType);
      else saveIosFile(uri);
    } catch (e) {
      setIsLoading(false);
    }
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
            bottomSheetRefAttach.current?.dismiss();
            Alert.alert("Success!", "Download Successfully");
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
      const UTI = "public.item";
      const shareResult = await Sharing.shareAsync(fileUri, { UTI });
    } catch (error) {}
  };

  let urlNote = nde_api.baseurl + "crsbe" + data?.attachments[0]?.file;
  let newUrlNote = urlNote.replace("/api/", "/");

  return (
    <>
      <ScrollView>
        {loadingOverlay}
        <View style={styles.screen}>
          <View style={{ marginBottom: 8 }}>
            <Text>Diteruskan Dari</Text>
          </View>
          <Card style={styles.containerCard}>
            <Text style={styles.title}>{data?.sender?.person}</Text>
          </Card>
          <View style={{ marginBottom: 8 }}>
            <Text>Diteruskan Kepada</Text>
          </View>
          <Card style={styles.containerCard}>
            <View style={styles.containerColumn}>
              {data?.receivers.length > 0 &&
                data?.receivers.map((item, index) => (
                  <Text key={index} style={styles.title}>
                    {item}
                  </Text>
                ))}
            </View>
            <View>
              <Text style={styles.title}>Aksi Disposisi</Text>
            </View>
            <View>
              <Text>{data?.action ? data?.action : "-"}</Text>
            </View>
            <View>
              <Text style={styles.title}>Catatan Disposisi</Text>
            </View>
            <View>
              <Text>{data?.action_manual ? data?.action_manual : "-"}</Text>
            </View>
            <View>
              <View>
                <Text style={styles.title}>Attachments Disposisi</Text>
              </View>
              {data?.attachments?.length == 0 && <Text>-</Text>}
              {data?.attachments?.length != 0 &&
                data?.attachments?.map((item, index) => (
                  <View
                    key={item.id}
                    onPress={() => {
                      // showBottommSheet(item, getExtensionIcon(item));
                    }}
                  >
                    <View style={styles.containerRow}>
                      <IconButton
                        // icon={getExtensionIcon(item)}
                        size={18}
                        style={styles.icon}
                      />
                      <View style={styles.containerColumn}>
                        {/* <Text>{item?.truncate_name}</Text> */}
                        {/* <Text>{item?.size}</Text>
                        <Text>{item.file}</Text> */}
                        <WebView
                          originWhitelist={["*"]}
                          source={{
                            uri: newUrlNote,
                            headers: header,
                          }}
                          style={{
                            flex: 1,
                            height: 100,
                            width: 399,
                          }}
                          allowFileAccess={true}
                          androidLayerType={"software"}
                          mixedContentMode={"always"}
                          allowUniversalAccessFromFileURLs={true}
                          setDisplayZoomControls={true}
                          scalesPageToFit={false}
                        />
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </Card>
          <View style={{ marginBottom: 8 }}>
            <Text>Informasi Surat</Text>
          </View>
          <Card style={[styles.containerCard, { padding: 0 }]}>
            <DetailAgenda
              style={{
                backgroundColor: GlobalStyles.colors.tertiery20,
                borderRadius: 12,
              }}
              showBody={false}
              noAgenda={noAgenda ? noAgenda : ""}
              data={data?.obj}
              title="Detail Disposisi"
            />
          </Card>
          <Button
            mode="contained"
            style={{ backgroundColor: GlobalStyles.colors.tertiery }}
            onPress={() => {
              navigation.navigate("ViewAttachment", {
                selected: data?.obj?.attachments[0],
                title: "Lihat Surat",
              });
            }}
          >
            Lihat Surat
          </Button>
        </View>
      </ScrollView>

      <BottomSheetModalProvider>
        <SafeAreaView>
          <View>
            <BottomSheetModal
              name="download"
              ref={bottomSheetRefAttach}
              index={1}
              snapPoints={extensionPdf ? snapPointPdf : snapPoint}
              keyboardBehavior={
                Platform?.OS == "android" ? "fillParent" : "interactive"
              }
              keyboardBlurBehavior="restore"
              android_keyboardInputMode="adjust"
            >
              <View style={styles.contentContainer}>
                <View>
                  <Text style={styles.title}>Attachment</Text>
                  <View style={[styles.containerRow, styles.border]}>
                    <IconButton
                      icon={selectedIconAttach}
                      // icon="file"
                      size={18}
                      style={styles.icon}
                    />
                    <View style={styles.containerColumn}>
                      <Text>{selectedAttach?.name}</Text>
                      <Text>{selectedAttach?.size}</Text>
                    </View>
                  </View>
                </View>
                {extensionPdf && (
                  <>
                    <Button
                      mode="contained"
                      style={[
                        {
                          marginBottom: 16,
                          backgroundColor: GlobalStyles.colors.green,
                        },
                      ]}
                      onPress={() => {
                        navigation.navigate("ViewAttachment", {
                          selected: selectedAttach,
                          title: "View Attachment",
                        });
                      }}
                    >
                      View
                    </Button>
                    <Button
                      mode="contained"
                      style={[
                        {
                          marginBottom: 16,
                          backgroundColor: GlobalStyles.colors.blue,
                        },
                      ]}
                      onPress={() => downloadFile(selectedAttach)}
                    >
                      Download
                    </Button>
                  </>
                )}
                {!extensionPdf && (
                  <>
                    <Button
                      mode="contained"
                      style={[
                        {
                          marginBottom: 16,
                          backgroundColor: GlobalStyles.colors.blue,
                        },
                      ]}
                      onPress={() => downloadFile(selectedAttach)}
                    >
                      Download
                    </Button>
                  </>
                )}
                <Button
                  mode="contained"
                  style={[
                    {
                      backgroundColor: GlobalStyles.colors.gray500,
                      marginBottom: 16,
                    },
                  ]}
                  onPress={() => {
                    bottomSheetRefAttach.current?.dismiss();
                  }}
                >
                  Cancel
                </Button>
              </View>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </>
  );
}

export default DetailDispo;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    margin: 16,
  },
  containerCard: {
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  containerCardTitle: {
    padding: 0,
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colors.greylight,
  },
  containerColumn: {
    flexDirection: "column",
    marginBottom: 8,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  title: {
    marginBottom: 6,
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
});
