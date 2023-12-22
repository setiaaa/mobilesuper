import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Linking,
  Alert,
} from "react-native";
import ActionInprogress from "./ActionInprogress";
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from "react-native-render-html";
import { getHTTP } from "../../../../utils/http";
import { nde_api } from "../../../../utils/api.config";
import moment from "moment";
import { Config } from "../../../../constants/config";
import { IconButton, List } from "react-native-paper";
import { GlobalStyles } from "../../../../constants/styles";
import { WebView } from "react-native-webview";
import ActionDigisign from "./ActionDigisign";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { getWatermarkHTML } from "../../../../utils/print";
import { useDispatch, useSelector } from "react-redux";
const { StorageAccessFramework } = FileSystem;
import { shareAsync } from "expo-sharing";
import { setDataNotif } from "../../../../store/pushnotif";
import * as Clipboard from "expo-clipboard";
import { setClipboard } from "../../../../store/snackbar";

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

//untuk detail agenda yang isi suratnya langsung terbaca tanpa view document
function DetailAgendaInpro({
  id,
  noAgenda,
  data,
  style,
  tipe,
  showBody,
  preview,
}) {
  const profile = useSelector((state) => state.profile.profile);
  const { width } = useWindowDimensions();
  const [body, setBody] = useState();
  const [openKepada, setOpenKepada] = useState(false);
  const [openTembusan, setOpenTembusan] = useState(false);
  const [view, setView] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const zoomInOutAndroid = `
                    const meta = document.createElement('meta');
                    meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0');
                    meta.setAttribute('name', 'viewport');
                    document.getElementsByTagName('head')[0].appendChild(meta);
                    `;
  const zoomInOutIos = `const meta = document.createElement('meta'); " +
                    "meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1'); " +
                    "meta.setAttribute('name', 'viewport'); " +
                    "document.getElementsByTagName('head')[0].appendChild(meta); " +
                    "true; `;
  const customHTMLElementModels = {
    label: HTMLElementModel.fromCustomModel({
      tagName: "label",
      mixedUAStyles: {
        width: 70,
      },
      contentModel: HTMLContentModel.block,
    }),
  };
  const tagsStyles = {
    // ol: { listStyleType: "decimal" },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setView(preview);
    getHTMLnotaBG();
    dispatch(setDataNotif({}));
  }, [preview]);

  function getBG() {
    // if (
    //   data?.template.name != "nota_internal" &&
    //   data?.template.name != "nota_external" &&
    //   data?.template.name != "undangan" &&
    //   data?.template.name != "poh"
    // ) {
    getHTMLnotaBG();
    // }
  }

  async function getHTMLnotaBG() {
    //agenda in out dispoc
    if (view != "") {
      try {
        let response = await getHTTP(nde_api.baseurl + preview);
        // data.references = response?.data?.references;
        getHTML(response.data);
      } catch (error) {
        // handlerError(error, "Warning!", "Preview Letter not working!");
      }
      // } else if (view == "") {
      //   //inprogress
      //   try {
      //     if (id) {
      //       let response = await getHTTP(nde_api.preview.replace("{id}", id));
      //       data.references = response?.data?.references;

      //       getHTML(response.data);
      //     }
      //   } catch (error) {
      //     // handlerError(error, "Warning!", "Preview Letter not working!");
      //   }
    }
  }
  async function getHTML(item) {
    try {
      let response = await getHTTP(nde_api.baseurl + item.letters.raw);
      if (response.data.status == "Error") {
        setBody(response.data.msg);
      } else {
        setBody(
          `<style>ol{list-style-type: decimal;} ol ol{list-style-type: lower-alpha;} ol ol ol{list-style-type: lower-roman;}</style> ${response?.data}`
        );
      }
    } catch (error) {
      // handlerError(error, "Warning!", "Preview Letter not working!");
    }
  }
  async function printHTMLtoPDF() {
    let html = getWatermarkHTML(profile, data, body);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      width: 595,
      height: 842,
      // printerUrl: selectedPrinter?.url, // iOS only
    });
  }

  const printToFile = async () => {
    let html = getWatermarkHTML(profile, data, body);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printToFileAsync({
      html,
      width: 595,
      height: 842,
    }).then(
      async ({ uri }) => {
        // this changes the bit after the last slash of the uri (the document's name) to "invoice_<date of transaction"

        const pdfName = `${uri?.slice(0, uri?.lastIndexOf("/") + 1)}${
          Platform.OS == "android"
            ? data.subject
            : data.subject.slice(0, 55).replaceAll(" ", "_")
        }.pdf`;
        try {
          await FileSystem.moveAsync({
            from: uri,
            to: pdfName,
          }).then(async () => {
            if (Platform.OS == "android") {
              saveAndroidFile(
                pdfName,
                data.subject + ".pdf",
                "application/pdf"
              );
            } else {
              await shareAsync(pdfName, {
                UTI: ".pdf",
                mimeType: "application/pdf",
              });
            }
          });
        } catch (error) {
        }
      },
      (error) => {
      }
    );
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
  const copyToClipboard = async (text) => {
    Clipboard.setStringAsync(text);
    dispatch(setClipboard(true));
    setTimeout(() => {
      dispatch(setClipboard(false));
    }, 1500);
  };
  return (
    <ScrollView>
      <View style={{ padding: 20, gap: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 600 }}>
          Form Persetujuan Surat Dinas
        </Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "#DBDADE",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                width: "40%",
                paddingRight: 20,
              }}
            >
              Nomor Surat
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                width: "60%",
                paddingRight: 20,
              }}
            >
              {data?.ref_number}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "#DBDADE",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                width: "40%",
                paddingRight: 20,
              }}
            >
              Tanggal Surat
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                width: "60%",
                paddingRight: 20,
              }}
            >
              {data?.letter_date}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                width: "40%",
                paddingRight: 20,
              }}
            >
              Penanda Tangan
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                width: "60%",
                paddingRight: 20,
              }}
            >
              <Text>
                {data && data?.senders[0].title
                  ? data?.senders[0].title
                  : data?.senders[0].name}
              </Text>
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: 600 }}>Perihal</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 16,
          }}
        >
          <Text>{data?.subject}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.info }}>
            Kepada
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.danger }}>
            *
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 16,
          }}
        >
          {data &&
            data?.receivers_display?.length == 0 &&
            data?.kepada_bank?.length == 0 && (
              <>
                {data &&
                  data?.receivers?.length == 0 &&
                  data?.kepada_addressbook?.length == 0 && <Text>-</Text>}
                {data &&
                  data?.receivers?.length == 0 &&
                  data?.kepada_addressbook?.length != 0 && (
                    <Text>{data?.kepada_addressbook}</Text>
                  )}
                {data && data?.receivers?.length == 1 && (
                  <>
                    {data?.template.name != "nota_external" && !loading ? (
                      <Text>{data?.receivers[0].split("/")[0]}</Text>
                    ) : (
                      <></>
                    )}
                    {data?.template.name == "nota_external" && (
                      <RenderHTML
                        contentWidth={width}
                        source={{ html: data?.receivers[0].split("/")[0] }}
                      />
                    )}
                  </>
                )}
                {data && data?.receivers?.length > 1 && (
                  <>
                    {data?.template.name == "nota_external" && (
                      <RenderHTML
                        contentWidth={width}
                        source={{ html: data?.receivers.join("</br>") }}
                      />
                    )}
                    {data?.template.name != "nota_external" && (
                      <View
                        style={[
                          openKepada
                            ? {
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                              }
                            : {},
                        ]}
                      >
                        {data?.receivers.map((item, index) => (
                          <Text key={index}>
                            {index + 1}. {item.split("/")[0]}
                          </Text>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </>
            )}
          {data &&
            data.receivers_display?.length != 0 &&
            data.kepada_bank?.length == 0 && (
              <>
                {data.receivers_display?.length == 0 && <Text>-</Text>}
                {data && data.receivers_display?.length == 1 && (
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: data?.receivers_display[0] }}
                  />
                )}
                {data &&
                  data.receivers_display?.length > 1 &&
                  data.template.name != "nota_external" &&
                  data.receivers_display.map((item, index) => (
                    <Text key={index}>
                      {index + 1}. {item}
                    </Text>
                  ))}
                {data &&
                  data.receivers_display?.length > 1 &&
                  data.template.name == "nota_external" &&
                  data.receivers_display.map((item, index) => (
                    <Text key={index}>{item}</Text>
                  ))}
              </>
            )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.info }}>
            Tembusan
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.danger }}>
            *
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 16,
          }}
        >
          {data && data.copytos_display?.length == 0 && (
            <>
              {data && data.copytos?.length == 0 && <Text>-</Text>}
              {data && data.copytos?.length == 1 && (
                <Text>{data.copytos[0].split("/")[0]}</Text>
              )}
              {data && data.copytos?.length > 1 && (
                <View
                  style={[
                    openTembusan
                      ? {
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 12,
                        }
                      : {},
                  ]}
                >
                  {data.copytos.map((item, index) => (
                    <Text key={index}>
                      {index + 1}. {item.split("/")[0]}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}
          {data && data.copytos_display?.length != 0 && (
            <>
              {data && data.copytos_display?.length == 0 && <Text>-</Text>}
              {data && data.copytos_display?.length == 1 && (
                <RenderHTML
                  contentWidth={width}
                  source={{ html: data?.copytos_display[0] }}
                />
              )}
              {data && data.copytos_display?.length > 1 && (
                <RenderHTML
                  contentWidth={width}
                  source={{ html: data?.copytos_display.join("\n") }}
                />
              )}
            </>
          )}
        </View>
        {tipe !== "TrackingDetail" &&
          data?.state !== "rns" &&
          data?.state !== "finish" && (
            <ActionInprogress id={data?.id} data={data} />
          )}
      </View>
    </ScrollView>
  );
}

export default DetailAgendaInpro;

const styles = StyleSheet.create({
  screen: {
    margin: 16,
    backgroundColor: GlobalStyles.colors.white,
  },
  containerLabel: {
    flexDirection: "row",
    marginBottom: 6,
    justifyContent: "space-between",
  },
  titleLabel: {
    fontWeight: "bold",
    fontSize: GlobalStyles.font.md,
    marginBottom: 4,
  },
  subtitleLabel: {
    fontSize: GlobalStyles.font.md,
  },
  subtitleCopy: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  titleDropdown: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  listAccordion: {
    backgroundColor: GlobalStyles.colors.tertiery20,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  subtitleDropdown: {
    fontSize: GlobalStyles.font.md,
    paddingVertical: 4,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
});
