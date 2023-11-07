import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  AVATAR,
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { Image } from "react-native";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAgendaDetail } from "../../store/GrupKalender";
import {} from "react-native-safe-area-context";
import moment from "moment";
import { deleteGrup, getDetailGrup } from "../../service/api";
import { getTokenValue } from "../../service/session";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { CardItemMember } from "../../components/CardItemMember";

const { width: screenWidth } = Dimensions.get("window");

export const DetailGrup = () => {
  const [tabItemIndex, setTabItemIndex] = useState();
  const [slide, setSlide] = useState(0);
  const [komen, setKomen] = useState("");
  const carouselRef = useRef(null);
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["95%"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = () => {
    bottomSheetModalRef.current?.present();
  };

  const dispatch = useDispatch();

  const { agenda, acara, detailGrup, loading } = useSelector(
    (state) => state.grupKalender
  );
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

  const detail = acara.detail;
  const gambar = agenda.detail.gambar;

  const [toggleComment, setToggleComment] = useState({
    toggle: false,
    // id: data[0].Komentar[0].id
  });
  const clickBalas = (id, temp) => {
    setToggleComment({
      toggle: temp,
      id: id,
    });
  };

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  const convertDate = (tanggal) => {
    const parts = tanggal?.split(" ");

    const months = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    const time = parts[3].split(":");
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const second = parseInt(time[2]);

    const date = new Date(year, month, day, hour, minute, second);
    const formatedDate = moment(date).format(DATETIME.LONG_DATE);

    console.log(detailGrup);

    return formatedDate;
  };

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ScrollView>
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
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
                >
                  Detail Grup
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: "90%",
                  borderRadius: 8,
                  marginLeft: 20,
                }}
              >
                {loading ? (
                  <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={100}
                      height={20}
                    />
                  </View>
                ) : (
                  <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text
                      style={{
                        fontWeight: FONTWEIGHT.bold,
                        fontSize: FONTSIZE.Judul,
                      }}
                    >
                      {detailGrup.name}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FONTSIZE.H2,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Dibuat oleh :
                  </Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={100}
                      height={20}
                    />
                  ) : (
                    <Text>{detailGrup.creator?.nama}</Text>
                  )}
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FONTSIZE.H2,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    Pada :
                  </Text>
                  {loading ? (
                    <ShimmerPlaceHolder
                      style={{ borderRadius: 4 }}
                      width={100}
                      height={20}
                    />
                  ) : (
                    <Text>
                      {detailGrup?.created_at === undefined
                        ? ""
                        : convertDate(detailGrup?.created_at)}
                    </Text>
                  )}
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        PIC
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : (
                      <View style={{ justifyContent: "center", width: 150 }}>
                        {detailGrup.pic?.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={{ uri: item.avatar_url }}
                                style={{
                                  marginLeft: -8,
                                  borderWidth: 2,
                                  borderRadius: 50,
                                  borderColor: COLORS.white,
                                  width: 30,
                                  height: 30,
                                }}
                              />
                              <Text>{item.nama}</Text>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Ketentuan Busana
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          width: "50%",
                        }}
                      >
                        <Text numberOfLines={10}>
                          {detailGrup?.extra_attributes?.ketentuan_busana === ""
                            ? "-"
                            : detailGrup?.extra_attributes?.ketentuan_busana}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Perlengkapan
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          width: "50%",
                        }}
                      >
                        <Text numberOfLines={10}>
                          {detailGrup?.extra_attributes?.perlengkapan === ""
                            ? "-"
                            : detailGrup?.extra_attributes?.perlengkapan}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Atribut Lainnya
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          width: "50%",
                        }}
                      >
                        <Text numberOfLines={10}>
                          {detailGrup?.extra_attributes?.atribut === ""
                            ? "-"
                            : detailGrup?.extra_attributes?.atribut}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Grup Editor
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        {detailGrup.editors?.map((item, index) => {
                          return (
                            <View key={index}>
                              <Image
                                source={{ uri: item.avatar_url }}
                                style={{
                                  marginLeft: -8,
                                  borderWidth: 2,
                                  borderRadius: 50,
                                  borderColor: COLORS.white,
                                  width: 30,
                                  height: 30,
                                }}
                              />
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: FONTSIZE.H2,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Anggota
                      </Text>
                    </View>
                    {loading ? (
                      <ShimmerPlaceHolder
                        style={{ borderRadius: 4 }}
                        width={100}
                        height={20}
                      />
                    ) : detailGrup.members?.length < 3 ? (
                      <View style={{ flexDirection: "row" }}>
                        {detailGrup.members?.map((item, index) => {
                          return (
                            <View key={index}>
                              <Image
                                source={{ uri: item.avatar_url }}
                                style={{
                                  marginLeft: -8,
                                  borderWidth: 2,
                                  borderRadius: 50,
                                  borderColor: COLORS.white,
                                  width: 30,
                                  height: 30,
                                }}
                              />
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Image
                            source={{ uri: detailGrup.members[0]?.avatar_url }}
                            style={{
                              marginLeft: -8,
                              borderWidth: 2,
                              borderRadius: 50,
                              borderColor: COLORS.white,
                              width: 30,
                              height: 30,
                            }}
                          />
                          <Image
                            source={{ uri: detailGrup.members[1]?.avatar_url }}
                            style={{
                              marginLeft: -8,
                              borderWidth: 2,
                              borderRadius: 50,
                              borderColor: COLORS.white,
                              width: 30,
                              height: 30,
                            }}
                          />
                          <Image
                            source={{ uri: detailGrup.members[2]?.avatar_url }}
                            style={{
                              marginLeft: -8,
                              borderWidth: 2,
                              borderRadius: 50,
                              borderColor: COLORS.white,
                              width: 30,
                              height: 30,
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            bottomSheetAttach();
                          }}
                        >
                          <Ionicons name="chevron-forward" size={24} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "90%",
                      backgroundColor: COLORS.lighter,
                      opacity: 0.3,
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}
                  />
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
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                      <View
                        style={{
                          marginBottom: 20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FONTSIZE.H2,
                            fontWeight: FONTWEIGHT.bold,
                            color: COLORS.lighter,
                          }}
                        >
                          Anggota
                        </Text>
                      </View>
                      <View>
                        <FlatList
                          data={detailGrup.members}
                          renderItem={({ item }) => (
                            <View key={item.nip}>
                              <CardItemMember item={item} />
                            </View>
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                let data = {
                  token: token,
                  id: detailGrup.id,
                };
                dispatch(deleteGrup(data));
                navigation.navigate("GrupKalender");
              }}
              style={{
                backgroundColor: COLORS.primary,
                width: "90%",
                marginHorizontal: 20,
                marginVertical: 20,
                padding: 15,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white }}>Hapus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(getDetailGrup({ token: token, id: detailGrup.id }));
                navigation.navigate("EditGrup");
              }}
              style={{
                borderColor: COLORS.primary,
                width: "90%",
                marginHorizontal: 20,
                padding: 15,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 40,
    marginTop: 20,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  galeri: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    marginTop: 20,
    flex: 1,
  },
});
