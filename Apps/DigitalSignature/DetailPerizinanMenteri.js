import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import {} from "react-native-safe-area-context";
import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { tandaTanganMentri } from "../../service/api";

export const DetailPerizinanMenteri = ({ route }) => {
  const variant = route.params;
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const { digitalsign, loading, status } = useSelector(
    (state) => state.digitalsign
  );
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

  // const [file, setFile] = useState();
  // const [fileMemo, setFileMemo] = useState();
  // useEffect(() => {
  //   // if (item && item?.attachments?.length === 2) {
  //   if (file === undefined) {
  //     item.attachments?.map((item, index) => {
  //       if (index === 0) {
  //         setFile(item.file);
  //       } else {
  //         setFileMemo(item.file);
  //       }
  //     });
  //   }
  //   //   if (fileMemo === undefined) {
  //   //     item.attachments[1]?.map((item) => {
  //   //       setFileMemo({ link: item.file });
  //   //     });
  //   //   }
  //   // } else {
  //   //   if (file === undefined) {
  //   //     item.attachments[0]?.map((item) => {
  //   //       setFileMemo({ link: item.file });
  //   //     });
  //   //   }
  //   // }
  // }, [item, file]);
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
  const { device } = useSelector((state) => state.apps);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const payload = {
      passphrase: "",
      id_documents: [item.id],
      comment: "Dokumen sudah di tanda tangan",
    };
    const data = {
      token: variant.token,
      payload: payload,
    };
    dispatch(tandaTanganMentri(data));
  };

  const { profile } = useSelector((state) => state.superApps);
  return (
    <View style={{ flex: 1 }}>
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

          {Object.keys(item).length !== 0 ? (
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
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    ID Dokumen
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "45%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {item.extra_attributes?.id_permohonan}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Nomor Surat
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "45%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {item.extra_attributes?.noDokumen}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Jenis Permohonan
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "45%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {item.extra_attributes?.jenis}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Operator
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      width: "45%",
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
                          <Text>
                            {item?.composer?.is_title
                              ? item?.composer?.officer?.nama
                              : item?.composer?.nama}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Tanggal Dibuat
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View style={{ width: "45%" }}>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {moment(item.extra_attributes?.tanggalDokumen)
                          .locale("id")
                          .format("DD MMMM yyyy")}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Jenis Dokumen
                  </Text>
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    :
                  </Text>
                  <View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4, width: "100%" }}
                        height={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: fontSizeResponsive("H2", device) }}
                      >
                        {item.extra_attributes?.jenisDokumen}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text
                    style={{
                      width: "45%",
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Keterangan
                  </Text>
                  <Text>:</Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4, width: "100%" }}
                      height={20}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H2", device),
                        width: 150,
                      }}
                    >
                      {item.extra_attributes?.keterangan === undefined ||
                      item.extra_attributes?.keterangan === ""
                        ? "-"
                        : item.extra_attributes?.keterangan}
                    </Text>
                  )}
                </View>
              </View>
              {item.approvers.map((data, index) => {
                if (index > 0) {
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
                          Approval
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
                              gap: 5,
                              marginTop: 10,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: FONTWEIGHT.bold,
                                fontSize: fontSizeResponsive("H2", device),
                              }}
                            >
                              Penandatangan
                            </Text>
                            {item.sequence > index ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  width: "60%",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: 5,
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
                                        "H2",
                                        device
                                      ),
                                    }}
                                  >
                                    Ditandatangani
                                  </Text>
                                </View>
                              </View>
                            ) : item.sequence <= index ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  width: "60%",
                                  justifyContent: "center",
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
                                        "H2",
                                        device
                                      ),
                                    }}
                                  >
                                    Belum Ditandatangani
                                  </Text>
                                </View>
                              </View>
                            ) : null}
                          </View>
                          <View style={{ flexDirection: "row", columnGap: 20 }}>
                            <Image
                              source={{ uri: data.avatar_url }}
                              style={{
                                width: device === "tablet" ? 80 : 50,
                                height: device === "tablet" ? 80 : 50,
                                borderRadius: device === "tablet" ? 80 : 50,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                marginLeft: 5,
                              }}
                            />
                            <View>
                              {data?.officer ? (
                                <View style={{ width: "95%" }}>
                                  {loading ? (
                                    <ShimmerPlaceHolder
                                      style={{ borderRadius: 4, marginTop: 5 }}
                                      width={330}
                                      height={20}
                                    />
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
                                    <ShimmerPlaceHolder
                                      style={{ borderRadius: 4, marginTop: 5 }}
                                      width={165}
                                      height={20}
                                    />
                                  ) : (
                                    <Text
                                      style={{
                                        marginTop: 2,
                                        color: COLORS.lighter,
                                        fontWeight: FONTWEIGHT.bold,
                                        fontSize: fontSizeResponsive(
                                          "H2",
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
                                <View style={{ width: "95%" }}>
                                  {loading ? (
                                    <ShimmerPlaceHolder
                                      style={{ borderRadius: 4, marginTop: 5 }}
                                      width={330}
                                      height={20}
                                    />
                                  ) : (
                                    <Text
                                      style={{
                                        marginTop: 10,
                                        color: COLORS.lighter,
                                        fontWeight: FONTWEIGHT.bold,
                                        fontSize: fontSizeResponsive(
                                          "H2",
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
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            ""
          )}

          <View style={{ gap: 15, marginTop: 15, marginBottom: 15 }}>
            {loading ? null : (
              <>
                {profile?.nip === "88888" ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        item.attachments.length !== 0 &&
                        item.attachments[1].file !== undefined
                      ) {
                        navigation.navigate("PdfViewer", {
                          data: item.attachments[1].file,
                          type: "DokumenLain",
                        });
                      } else {
                        Alert.alert("File Tidak Ada");
                      }
                    }}
                    style={{
                      width: "90%",
                      backgroundColor: "rgb(245, 127, 23)",
                      borderRadius: 6,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginHorizontal: "5%",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        marginVertical: 15,
                        fontSize: fontSizeResponsive("H2", device),
                      }}
                    >
                      Lihat Dokumen Memo
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    if (
                      item.attachments.length !== 0 &&
                      item.attachments[0].file !== undefined
                    ) {
                      navigation.navigate("PdfViewer", {
                        data: item.attachments[0].file,
                        type: "DokumenLain",
                      });
                    } else {
                      Alert.alert("File Tidak Ada");
                    }
                  }}
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.info,
                    borderRadius: 6,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginHorizontal: "5%",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      marginVertical: 15,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Lihat Dokumen Perizinan
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {variant.variant === "inprogress" &&
            profile.nip !== "197208122001121002" ? (
              <>
                <TouchableOpacity
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 6,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginHorizontal: "5%",
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      marginVertical: 15,
                      fontSize: fontSizeResponsive("H2", device),
                    }}
                  >
                    Sign
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>

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
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>
                      Tanda Tangan Sertifikat
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
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder="Masukan Passphrase"
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      height: 40,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      borderRadius: 6,
                      borderColor: "#D0D5DD",
                    }}
                  />
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
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder="Masukan Passphrase"
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      height: 40,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      borderRadius: 6,
                      borderColor: "#D0D5DD",
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
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: FONTSIZE.H1,
                      fontWeight: 500,
                    }}
                  >
                    Tanda Tangan
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
          <ModalSubmit
            status={status}
            setStatus={setStatus}
            navigate={"PerizinanMenteri"}
          />
        </ScrollView>
      </BottomSheetModalProvider>
    </View>
  );
};
