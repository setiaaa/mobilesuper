import React, { useEffect, useMemo, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
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
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import ListEmpty from "../../components/ListEmpty";
import moment from "moment/moment";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export const DetailSertifikat = (route) => {
  // const { data } = route.params
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const { digitalsign, loading } = useSelector((state) => state.digitalsign);
  const item = digitalsign.detail;
  let tanggalApprove = [];

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

  const [file, setFile] = useState();
  useEffect(() => {
    if (file === undefined) {
      item.attachments?.map((item) => {
        setFile({ link: item.file });
      });
    }
  }, [file, item]);
  console.log(item);
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
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
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: FONTSIZE.H1,
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                Detail Setifikat
              </Text>
            </View>
          </View>
          {Object.keys(item).length !== 0 ? (
            <View
              style={{
                width: "90%",
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                {loading ? (
                  <ShimmerPlaceHolder
                    style={{ borderRadius: 4 }}
                    width={330}
                    height={20}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: FONTSIZE.Judul,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    {item?.subject}
                  </Text>
                )}
                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>
                    No Sertifikat
                  </Text>
                  <Text>:</Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={165}
                      height={20}
                    />
                  ) : (
                    <Text style={{ width: "50%" }}>
                      {item.extra_attributes?.noSertif}
                    </Text>
                  )}
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>
                    Penerima Sertifikat
                  </Text>
                  <Text>:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* <Image source={item.composer.avatar} /> */}
                    <View>
                      {loading ? (
                        <ShimmerPlaceHolder
                          style={{ borderRadius: 4 }}
                          width={165}
                          height={20}
                        />
                      ) : (
                        <View>
                          {item.receivers[0]?.display_title !== undefined ? (
                            <>
                              <Text
                                style={{
                                  fontWeight: FONTWEIGHT.bold,
                                  color: COLORS.info,
                                  width: "80%",
                                  marginBottom: 5,
                                }}
                              >
                                {item.receivers[0]?.display_title !== undefined
                                  ? item.receivers[0]?.display_title
                                  : null}
                              </Text>
                              <Text
                                style={{ color: COLORS.lighter, width: "80%" }}
                              >
                                {item.receivers[0].officer.nama !== undefined
                                  ? item.receivers[0].officer.nama
                                  : null}
                              </Text>
                            </>
                          ) : (
                            <Text
                              style={{ color: COLORS.lighter, width: "80%" }}
                            >
                              {item.receivers[0].nama}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>
                    Tanggal Dibuat
                  </Text>
                  <Text>:</Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={165}
                      height={20}
                    />
                  ) : (
                    <Text>
                      {moment(item.extra_attributes?.tanggalSertif).format(
                        "DD MMMM yyyy"
                      )}
                    </Text>
                  )}
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>
                    Judul Course
                  </Text>
                  <Text>:</Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={165}
                      height={20}
                    />
                  ) : (
                    <Text style={{ width: "50%" }}>
                      {item.extra_attributes?.course?.name !== undefined
                        ? item.extra_attributes?.course?.name
                        : item.extra_attributes?.nama_course}
                    </Text>
                  )}
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                  <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>
                    keterangan
                  </Text>
                  <Text>:</Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={165}
                      height={20}
                    />
                  ) : (
                    <Text style={{ width: "50%" }}>
                      {item.extra_attributes?.keterangan === undefined ||
                      item.extra_attributes?.keterangan === ""
                        ? "-"
                        : item.extra_attributes?.keterangan}
                    </Text>
                  )}
                </View>
              </View>

              {item.logs?.map((log) => {
                tanggalApprove.push(log.created_at);
              })}
              {item.approvers?.map((data, index = 0) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      width: "95%",
                      marginHorizontal: 10,
                      marginBottom: 20,
                      borderColor: "#DBDADE",
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
                      <View style={{ alignItems: "left", width: "98%" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            marginTop: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                            Penandatangan
                          </Text>
                          {index < item.logs.length ? (
                            <>
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
                                <Text style={{ color: COLORS.success }}>
                                  Ditandatangani
                                </Text>
                              </View>
                            </>
                          ) : (
                            <>
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
                                <Text style={{ color: COLORS.infoDanger }}>
                                  Belum Ditandatangani
                                </Text>
                              </View>
                            </>
                          )}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={{ uri: data.avatar_url }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              marginVertical: 10,
                              marginHorizontal: 5,
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
                                      textAlign: "left",
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
                                      textAlign: "left",
                                    }}
                                  >
                                    {data.officer.nama}
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
                                    }}
                                  >
                                    {data.nama}
                                  </Text>
                                )}
                              </View>
                            )}
                            {index < item.logs.length ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  gap: 10,
                                  marginTop: 5,
                                  marginBottom: 10,
                                }}
                              >
                                <Text style={{ color: COLORS.lighter }}>
                                  Disetujui :
                                </Text>
                                {loading ? (
                                  <ShimmerPlaceHolder
                                    style={{ borderRadius: 4, marginTop: 5 }}
                                    width={165}
                                    height={20}
                                  />
                                ) : (
                                  <>
                                    <Text style={{ color: COLORS.lighter }}>
                                      {moment(tanggalApprove[index]).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </Text>
                                    <View
                                      style={{
                                        height: "100%",
                                        width: 1,
                                        backgroundColor: COLORS.lighter,
                                      }}
                                    />
                                    <Text style={{ color: COLORS.lighter }}>
                                      {moment(tanggalApprove[index]).format(
                                        "HH:mm"
                                      )}
                                    </Text>
                                  </>
                                )}
                              </View>
                            ) : (
                              <Text
                                style={{
                                  color: COLORS.lighter,
                                  marginVertical: 10,
                                }}
                              >
                                -
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            ""
          )}
          <View style={{ gap: 15, marginTop: 15 }}>
            {loading ? null : (
              <TouchableOpacity
                onPress={() => navigation.navigate("PdfViewer", { data: file })}
                style={{
                  width: "90%",
                  backgroundColor: COLORS.info,
                  borderRadius: 6,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ color: COLORS.white, marginVertical: 15 }}>
                  Lihat Sertifikat
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity style={{
                        width: '90%',
                        backgroundColor: COLORS.infoDanger,
                        borderRadius: 6,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginHorizontal: 20,
                    }}
                        onPress={() =>
                            bottomSheetAttach()
                        }
                    >
                        <Text style={{ color: COLORS.white, marginVertical: 15 }}>Sign</Text>
                    </TouchableOpacity> */}
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
        </ScrollView>
      </BottomSheetModalProvider>
    </View>
  );
};
