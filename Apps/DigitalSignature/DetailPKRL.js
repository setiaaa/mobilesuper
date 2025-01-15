import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import {} from "react-native-safe-area-context";
import {
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import moment from "moment/min/moment-with-locales";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ModalSubmit } from "../../components/ModalSubmit";
import { setStatus } from "../../store/DigitalSign";
import {
  parafPerizinan,
  revisiPerizinan,
  tandaTanganMentri,
} from "../../service/api";
import * as LocalAuthentication from "expo-local-authentication";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Timeline from "react-native-timeline-flatlist";

export const DetailPKRL = ({ route }) => {
  const variant = route.params;
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const { digitalsign, status, loading } = useSelector(
    (state) => state.digitalsign
  );

  const [revisi, setRevisi] = useState("");
  const [modalLog, setModalLog] = useState(false);
  const item = digitalsign.detail;

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = () => {
    bottomSheetModalRef.current?.present();
  };

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
  const { device } = useSelector((state) => state.apps);
  const dispatch = useDispatch();

  const currentDate = new Date();

  const handleSubmit = () => {
    const payload = {
      passphrase: "",
      id_documents: [item.id],
      sign_date: moment(currentDate, "YYYY-MM-DD HH:mm:ss").format(
        DATETIME.LONG_DATE
      ),
      comment: "Dokumen sudah di tanda tangan",
    };
    const data = {
      token: variant.token,
      payload: payload,
    };
    dispatch(tandaTanganMentri(data));
    // console.log(data.payload);
  };

  const { profile } = useSelector((state) => state.superApps);

  const handleShowAttachment = (type) => {
    let idxAtt = -1;

    let attachments = item?.attachments;

    if (attachments?.length !== 0) {
      attachments.map((item, i) => {
        let name = item.name.toLowerCase();
        if (name.includes(type)) {
          idxAtt = i;
        }
      });
    }

    if (attachments?.length !== 0 && attachments[idxAtt] !== undefined) {
      navigation.navigate("PdfViewer", {
        data: attachments[idxAtt].file,
        type: "DokumenLain",
      });
    } else {
      Alert.alert("File Tidak Ada");
    }
  };

  const isMenkp = () => {
    if (item !== null) {
      if (
        item?.sequence ===
          item?.approvers[item?.approvers?.length - 1]?.sequence &&
        profile.nip === item?.approvers[item?.approvers?.length - 1]?.nip
      ) {
        return true;
      }
    }

    return false;
  };

  const handleParaf = () => {
    let payload = {
      id_documents: [item.id],
    };

    const data = {
      token: variant.token,
      payload: payload,
    };

    dispatch(parafPerizinan(data));
  };

  const handleRevisi = () => {
    let payload = {
      id_documents: [item.id],
      comment: revisi,
    };
    const data = {
      token: variant.token,
      payload: payload,
    };

    dispatch(revisiPerizinan(data));
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable) {
      handleSubmit();
    }

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      handleSubmit();
    }

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });
    // Log the user in on success
    if (biometricAuth.success) {
      handleSubmit();
    }
  };

  const handleGetFileLampiran = (tipe) => {
    if (item.attachments?.length !== 0) {
      const data = [...item?.attachments];
      const datas = data.filter((x) => x.name.includes(tipe))[0];
      if (datas) {
        navigation.navigate("PdfViewer", {
          data: datas.file,
          type: "DokumenLain",
        });
      }
    }
  };

  const timelineData = item?.logs?.map((log) => ({
    time: moment(log.created_at, "YYYY-MM-DD HH:mm:ss").format(
      DATETIME.LONG_DATETIME
    ),
    title: log.user,
    description: log.message ? log.message : "No message",
    action: log.action,
    icon:
      log.action === "submit" ? (
        <View
          style={{
            padding: 5,
            backgroundColor: COLORS.infoLight,
            borderRadius: 20,
          }}
        >
          <Feather name="send" size={20} color={COLORS.info} />
        </View>
      ) : log.action === "paraf" ? (
        <View
          style={{
            padding: 5,
            backgroundColor: COLORS.successLight,
            borderRadius: 20,
          }}
        >
          <MaterialIcons name="gesture" size={20} color={COLORS.success} />
        </View>
      ) : log.action === "revisi" ? (
        <View
          style={{
            padding: 5,
            backgroundColor: COLORS.infoDangerLight,
            borderRadius: 20,
          }}
        >
          <MaterialIcons
            name="content-paste-off"
            size={20}
            color={COLORS.infoDanger}
          />
        </View>
      ) : log.action === "approve" ? (
        <View
          style={{
            padding: 5,
            backgroundColor: "#efbbff",
            borderRadius: 20,
          }}
        >
          <MaterialIcons name="check" size={20} color={"#be29ec"} />
        </View>
      ) : null,
  }));

  console.log(item.logs);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ScrollView>
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
                marginLeft: 20,
                alignItems: "center",
                justifyContent: "center",
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
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: fontSizeResponsive("H1", device),
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                Detail Perizinan Menteri
              </Text>
            </View>
          </View>

          {Object.keys(item)?.length !== 0 ? (
            <View
              style={{
                width: "90%",
                backgroundColor: COLORS.white,
                marginHorizontal: "5%",
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 20,
                  width: "89%",
                }}
              >
                {loading ? (
                  <ShimmerPlaceHolder
                    style={{ borderRadius: 4, width: "100%" }}
                    height={20}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    {item?.subject}
                  </Text>
                )}

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "41%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Nomor Perizinan
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "50%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H4", device) }}
                      >
                        {item.extra_attributes?.no_perizinan}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Konseptor
                  </Text>
                  <View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Image
                          source={{ uri: item.composer.avatar_url }}
                          height={30}
                          width={30}
                          borderRadius={30}
                        />
                        <Text
                          style={{
                            fontSize: fontSizeResponsive("H4", device),
                            width: "90%",
                          }}
                        >
                          {item.composer.is_title
                            ? item.composer.officer.nama
                            : item.composer.nama}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <Text
                    style={{
                      width: "41%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Tanggal Dokumen
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "50%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H4", device) }}
                      >
                        {moment(item.created_at, "YYYY-MM-DD hh:mm:ss").format(
                          DATETIME.LONG_DATETIME
                        )}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <Text
                    style={{
                      width: "41%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Jenis Perizinan
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      width: "50%",
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      {loading ? (
                        <ShimmerPlaceHolder
                          style={{ borderRadius: 4, width: "100%" }}
                          height={20}
                        />
                      ) : (
                        <View>
                          <Text
                            style={{
                              fontSize: fontSizeResponsive("H4", device),
                            }}
                          >
                            {item?.extra_attributes?.jenis_perizinan}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <Text
                    style={{
                      width: "41%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Kategori Perizinan
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "50%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H4", device) }}
                      >
                        {item.extra_attributes?.kategori_perizinan}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <Text
                    style={{
                      width: "41%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Jenis Penomoran
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "50%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {item.extra_attributes?.jenis_permohonan}
                      </Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: COLORS.info,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    setModalLog(true);
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: FONTWEIGHT.bold,
                      color: COLORS.white,
                    }}
                  >
                    Riwayat aktivitas
                  </Text>
                </TouchableOpacity>

                {isMenkp() || item?.state === "done" ? (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: COLORS.danger,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                    onPress={() => {
                      //   navigation.navigate("PdfViewer", {
                      //     // data: data.file,
                      //     type: "DokumenLain",
                      //   });

                      handleGetFileLampiran("perizinan");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H2", device),
                        fontWeight: FONTWEIGHT.bold,
                        color: COLORS.white,
                      }}
                    >
                      Lihat Dokumen
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        fontWeight: FONTWEIGHT.bold,
                        fontSize: fontSizeResponsive("H2", device),
                      }}
                    >
                      Lampiran
                    </Text>
                    <View style={{ width: "100%" }}>
                      {loading ? (
                        <ShimmerPlaceHolder
                          style={{ borderRadius: 4, width: "100%" }}
                          height={20}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row", // Tetap dalam baris
                            flexWrap: "wrap", // Membungkus item ke bawah jika melebihi lebar
                            gap: 10, // Jarak antar item
                            justifyContent: "flex-start", // Mulai dari kiri
                          }}
                        >
                          {item.attachments.map((data, index) => (
                            <TouchableOpacity
                              key={index} // Tambahkan key untuk setiap item
                              style={{
                                marginTop: 10,
                                padding: 10,
                                backgroundColor: COLORS.bgLightGrey,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                width: "48%", // Kontrol lebar agar responsif
                              }}
                              onPress={() => {
                                navigation.navigate("PdfViewer", {
                                  data: data.file,
                                  type: "DokumenLain",
                                });
                              }}
                            >
                              <Image
                                source={require("../../assets/superApp/pdf.png")}
                                style={{ height: 50, width: 50 }} // Ukuran gambar
                              />
                              <Text
                                style={{
                                  fontSize: fontSizeResponsive("H4", device),
                                  textAlign: "center",
                                  marginTop: 5,
                                }}
                              >
                                {data.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: fontSizeResponsive("H4", device),
                                  textAlign: "center",
                                  marginTop: 5,
                                }}
                              >
                                {(data.file_size / 1024).toFixed(2)} KB
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
              {item.approvers.map((data, index) => {
                if (index !== 0 && index < item?.approvers?.length - 1) {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        width: "95%",
                        marginHorizontal: 10,
                        marginBottom: 20,
                        borderColor: "#DBDADE",
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.primary,
                          alignItems: "center",
                          height: 30,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontWeight: FONTWEIGHT.bold,
                            fontSize: fontSizeResponsive("H4", device),
                          }}
                        >
                          Paraf
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View style={{ width: "98%" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 10,
                              alignItems: "center",
                              marginLeft: 5,
                              gap: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: FONTWEIGHT.bold,
                                fontSize: fontSizeResponsive("H2", device),
                              }}
                            >
                              Paraf {index}
                            </Text>
                            {item.sequence > index ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  width: "60%",
                                  gap: 5,
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: COLORS.success,
                                    borderRadius: 50,
                                    height: 20,
                                    width: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Ionicons
                                    name="checkmark-outline"
                                    color={COLORS.white}
                                  />
                                </View>
                                <View
                                  style={{
                                    backgroundColor: COLORS.successLight,
                                    paddingVertical: 5,
                                    borderRadius: 20,
                                    paddingHorizontal: 15,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: COLORS.success,
                                      fontSize: fontSizeResponsive(
                                        "H4",
                                        device
                                      ),
                                    }}
                                  >
                                    Sudah Paraf
                                  </Text>
                                </View>
                              </View>
                            ) : item.sequence <= index ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 5,
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: COLORS.infoDanger,
                                    borderRadius: 50,
                                    height: 20,
                                    width: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Ionicons name="close" color={COLORS.white} />
                                </View>
                                <View
                                  style={{
                                    backgroundColor: COLORS.infoDangerLight,
                                    paddingVertical: 5,
                                    borderRadius: 20,
                                    paddingHorizontal: 15,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: COLORS.infoDanger,
                                      fontSize: fontSizeResponsive(
                                        "H4",
                                        device
                                      ),
                                    }}
                                  >
                                    Belum Paraf
                                  </Text>
                                </View>
                              </View>
                            ) : null}
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 10,
                              marginTop: 10,
                            }}
                          >
                            <Image
                              source={{ uri: data.avatar_url }}
                              style={{
                                width: device === "tablet" ? 80 : 50,
                                height: device === "tablet" ? 80 : 50,
                                borderRadius: device === "tablet" ? 80 : 50,
                                marginHorizontal: 10,
                                marginLeft: 5,
                              }}
                            />
                            <View>
                              {data?.officer ? (
                                <View style={{ width: 240 }}>
                                  {loading ? (
                                    <View style={{ width: "45%" }}>
                                      <ShimmerPlaceHolder
                                        style={{
                                          borderRadius: 4,
                                          marginTop: 5,
                                        }}
                                        height={20}
                                      />
                                    </View>
                                  ) : (
                                    <Text
                                      style={{
                                        marginTop: 10,
                                        color: COLORS.info,
                                        fontWeight: FONTWEIGHT.bold,
                                        fontSize: fontSizeResponsive(
                                          "H4",
                                          device
                                        ),
                                      }}
                                    >
                                      {data.display_title}
                                    </Text>
                                  )}
                                  {loading ? (
                                    <View style={{ width: "45%" }}>
                                      <ShimmerPlaceHolder
                                        style={{
                                          borderRadius: 4,
                                          marginTop: 5,
                                        }}
                                        height={20}
                                      />
                                    </View>
                                  ) : (
                                    <Text
                                      style={{
                                        color: COLORS.lighter,
                                        fontWeight: FONTWEIGHT.bold,
                                        fontSize: fontSizeResponsive(
                                          "H4",
                                          device
                                        ),
                                      }}
                                    >
                                      {data?.officer?.nama != undefined
                                        ? data?.officer?.nama
                                        : "-" || data?.nama !== undefined
                                        ? data?.nama
                                        : "-"}
                                    </Text>
                                  )}
                                </View>
                              ) : (
                                <View
                                  style={{
                                    width: 240,
                                  }}
                                >
                                  {loading ? (
                                    <View style={{ width: "45%" }}>
                                      <ShimmerPlaceHolder
                                        style={{
                                          borderRadius: 4,
                                          marginTop: 5,
                                        }}
                                        height={20}
                                      />
                                    </View>
                                  ) : (
                                    <Text
                                      style={{
                                        color: COLORS.lighter,
                                        fontWeight: FONTWEIGHT.bold,
                                        fontSize: fontSizeResponsive(
                                          "H4",
                                          device
                                        ),
                                      }}
                                    >
                                      {data?.nama !== undefined
                                        ? data?.nama
                                        : "-"}
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>

                      {item?.sequence === data?.sequence &&
                      profile.nip === data.nip &&
                      variant.variant === "inprogress" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                            marginLeft: 5,
                            gap: 8,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              gap: 5,
                              backgroundColor: COLORS.successLight,
                              padding: 5,
                              borderRadius: 8,
                              justifyContent: "center",
                              alignItems: "center",
                              width: "48%",
                            }}
                            onPress={() => {
                              handleParaf();
                            }}
                          >
                            <MaterialIcons
                              name="gesture"
                              size={24}
                              color={COLORS.success}
                            />
                            <Text
                              style={{
                                color: COLORS.success,
                                fontSize: fontSizeResponsive("H4", device),
                              }}
                            >
                              Paraf
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              gap: 5,
                              backgroundColor: COLORS.infoDangerLight,
                              padding: 5,
                              borderRadius: 8,
                              justifyContent: "center",
                              alignItems: "center",
                              width: "48%",
                            }}
                            onPress={() => {
                              bottomSheetAttach();
                            }}
                          >
                            <MaterialIcons
                              name="border-color"
                              size={24}
                              color={COLORS.infoDanger}
                            />
                            <Text
                              style={{
                                color: COLORS.infoDanger,
                                fontSize: fontSizeResponsive("H4", device),
                              }}
                            >
                              Revisi
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            ""
          )}

          {variant.variant === "inprogress" &&
          isMenkp() &&
          item?.state !== "done" ? (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                marginTop: 20,
                marginBottom: 40,
                marginHorizontal: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                handleBiometricAuth();
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H2", device),
                  fontWeight: FONTWEIGHT.bold,
                  color: COLORS.white,
                }}
              >
                Proses Tanda Tangan
              </Text>
            </TouchableOpacity>
          ) : null}

          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            index={0}
            style={{ borderRadius: 50 }}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjust"
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView onLayout={handleContentLayout}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => bottomSheetAttachClose()}>
                    <Ionicons name="chevron-back-outline" size={24} />
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: "center",
                      flex: 1,
                      marginRight: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H1", device),
                        fontWeight: 500,
                      }}
                    >
                      Komentar
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 20,
                  }}
                >
                  <BottomSheetTextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder="Masukan Komentar"
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      height: 40,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      borderRadius: 6,
                      borderColor: "#D0D5DD",
                    }}
                    allowFontScaling={false}
                    onChangeText={(e) => {
                      setRevisi(e);
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.danger,
                    height: 50,
                    marginVertical: 40,
                    borderRadius: 6,
                    alignItems: "center",
                    marginHorizontal: 20,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    bottomSheetAttachClose();
                    handleRevisi();
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: FONTWEIGHT.bold,
                      color: COLORS.white,
                    }}
                  >
                    Revisi
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
          <ModalSubmit
            status={status}
            setStatus={setStatus}
            messageSuccess={"Data Ditambahkan"}
            navigate={"MainPerizinanMenteri"}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalLog}
            onRequestClose={() => {
              setModalLog(false);
            }}
          >
            <TouchableOpacity
              style={[
                Platform.OS === "ios"
                  ? styles.iOSBackdrop
                  : styles.androidBackdrop,
                styles.backdrop,
              ]}
            />
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: "90%",
                  borderRadius: 10,
                  height: "60%",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: COLORS.grey,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Riwayat Aktivitas
                  </Text>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      setModalLog(false);
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={24}
                      color={COLORS.lighter}
                    />
                  </TouchableOpacity>
                </View>

                <Timeline
                  style={{
                    flex: 1,
                    marginTop: 10,
                    marginHorizontal: 20,
                  }}
                  data={timelineData}
                  circleSize={30}
                  circleColor="white"
                  lineColor="gray"
                  timeStyle={{
                    textAlign: "center",
                    padding: 5,
                    borderRadius: 13,
                    minWidth: 10, // Add minWidth to maintain consistent size for timeß
                  }}
                  descriptionStyle={{ color: "grey" }}
                  innerCircle={"icon"}
                  showTime={false}
                  renderDetail={(rowData) => (
                    <View style={{ marginTop: -10 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {rowData.title}
                      </Text>
                      <Text>{rowData.time}</Text>
                      <Text>{rowData.description}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: "90%", // Adjust the width as needed, e.g., "90%" or a fixed value like 300
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  iOSBackdrop: {
    backgroundColor: "#000",
    opacity: 0.5,
  },
  androidBackdrop: {
    backgroundColor: "#000",
    opacity: 0.7,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
