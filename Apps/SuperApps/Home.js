import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import { CardProfile } from "../../components/CardProfile";
import { CardMenu } from "../../components/CardMenu";
// import { Carousel } from '../../components/Carousel/Carousel'
import { Search } from "../../components/Search";
import { Ionicons } from "@expo/vector-icons";
import { CardApps } from "../../components/CardApps";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { CardAppsB } from "../../components/CardAppsB";
import { useNavigation } from "@react-navigation/native";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { CardTautan } from "../../components/CardTautan";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardVisiMisi } from "../../components/CardVisiMisi";
import { CardVideo } from "../../components/CardVideo";
import YoutubePlayer from "react-native-youtube-iframe";
import { Button } from "react-native";
import { useCallback } from "react";
import { Portal } from "react-native-portalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenValue } from "../../service/session";
import {
  getBanner,
  getProfileMe,
  getGaleri,
  getBerita,
} from "../../service/api";
import { bannerKegiatan } from "../../components/BannerKegiatan";
import { BeritaHome } from "../../components/BeritaHome";
import { GaleriHome } from "../../components/GaleriHome";
import { Loading } from "../../components/Loading";

const { width: screenWidth } = Dimensions.get("window");
export const Home = () => {
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const [slide2, setSlide2] = useState(0);
  const [slide3, setSlide3] = useState(0);
  const [slide4, setSlide4] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleVisiMisi, setModalVisibleVisiMisi] = useState(false);
  const [modalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1)

  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getProfileMe(token));
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      dispatch(getBanner(token));
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      dispatch(getGaleri({ token, page }));
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      dispatch(getBerita({ token, page }));
    }
  }, [token]);

  const { berita, agenda, program, galeri, profile, visimisi, banner, loading } =
    useSelector((state) => state.superApps);



  const bottomSheetModalRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.collapse();
  };
  const navigation = useNavigation();

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // const [token, setToken] = useState('')

  // getTokenValue().then(val => {
  //     setToken(val)
  // })

  // console.log(token)

  // console.log(profile);
  // console.log(banner);
  // console.log(galeri.lists);
  // console.log(berita.lists);
  return (
    < >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          {
            loading ? (
              <Loading />
            ) : null
          }
          <ScrollView>
            <View
              style={{
                width: "100%",
                height: 170,
                position: "absolute",
                top: 0,
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
              }}
            >
              <Image
                source={require("../../assets/superApp/headerfix.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                }}
              />
            </View>

            <View
              style={{
                height: "3.5%",
                flexDirection: "row",
                paddingTop: 20,
                gap: 20,
              }}
            >
              <View style={{ paddingLeft: 20 }}>
                <Ionicons
                  name="notifications-outline"
                  size={25}
                  color={"white"}
                />
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flex: 1,
                  marginTop: 5,
                  flexDirection: "row",
                  gap: 10,
                  marginRight: "11%",
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "right",
                      fontWeight: FONTWEIGHT.bolder,
                      marginBottom: 10,
                      fontSize: FONTSIZE.H2,
                    }}
                  >
                    {profile.nama}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "right",
                      fontSize: FONTSIZE.H3,
                    }}
                  >
                    {profile.nip}
                  </Text>
                </View>
                <View>
                  <Image
                    source={{
                      uri:
                        "https://apigw.kubekkp.coofis.com/" +
                        "bridge/" +
                        profile.avatar,
                    }}
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <CardApps handlePressModal={handlePressModal} />
              <Portal>
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
                  <View onLayout={handleContentLayout}>
                    <View style={{ marginVertical: 20 }}>
                      <View style={{ marginLeft: 30 }}>
                        <Text
                          style={{
                            fontSize: FONTSIZE.H1,
                            fontWeight: FONTWEIGHT.bold,
                          }}
                        >
                          Aplikasi
                        </Text>
                      </View>
                      <View style={{ marginVertical: 50 }}>
                        <CardAppsB />
                      </View>
                    </View>
                  </View>
                </BottomSheetModal>
              </Portal>
            </View>

            <View style={[styles.containerr, { marginTop: 20 }]}>
              <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={banner}
                renderItem={bannerKegiatan}
                hasParallaxImages={true}
              />
            </View>

            <View style={{ marginHorizontal: 30, marginTop: 20 }}>
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Tautan Pintas</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginTop: 20,
                marginLeft: 30,
              }}
            >
              <CardTautan setModalVisible={setModalVisible} />
            </View>

            <View
              style={{
                marginVertical: 20,
                marginLeft: 30,
                flexDirection: "row",
                marginTop: 30,
              }}
            >
              <Text
                style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}
              >
                Video
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("")}
                style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: FONTSIZE.H3,
                    flex: 1,
                    color: "#1868AB",
                  }}
                >
                  Selengkapnya
                </Text>
              </TouchableOpacity>
            </View>

            <CardVideo setModalVisibleVideo={setModalVisibleVideo} />

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibleVideo}
              onRequestClose={() => {
                setModalVisibleVideo(!modalVisibleVideo);
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
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisibleVideo(false);
                  }}
                  style={{
                    position: "absolute",
                    top: "15%",
                    left: 20,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 51,
                      height: 51,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      color={COLORS.white}
                      size={24}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ width: 380, height: 283 }}>
                  <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={"tV6yMXX2hPs"}
                    onChangeState={onStateChange}
                  />
                </View>
              </View>
            </Modal>

            <View
              style={{
                marginVertical: 20,
                marginLeft: 30,
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}
              >
                Berita Terkini
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ListBerita")}
                style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: FONTSIZE.H3,
                    flex: 1,
                    color: "#1868AB",
                  }}
                >
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.containerr}>
                <Carousel
                  ref={carouselRef}
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth - 60}
                  data={berita.lists.slice(0, 3)}
                  renderItem={BeritaHome}
                  hasParallaxImages={true}
                />
              </View>
              {/* <Carousel data={CarouselData} /> */}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
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
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    width: "90%",
                    height: 550,
                    borderRadius: 10,
                    marginTop: 100,
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>
                      Kerumahtanggaan
                    </Text>
                    <TouchableOpacity
                      style={{ alignItems: "flex-end", flex: 1 }}
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      <Ionicons name="close-outline" size={24} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        Linking.openURL('https://halo-bupbj.com/')
                      }}
                    >
                      <Image
                        source={require("../../assets/superApp/BUPBJ.png")}
                        style={{ width: 48, height: 48 }}
                      />
                      <Text style={{ fontSize: FONTSIZE.H4 }}>Halo-BUPBJ</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>
                      Pengawasan
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        Linking.openURL('https://www.lapor.go.id/')
                      }}
                    >
                      <Image
                        source={require("../../assets/superApp/lapor.png")}
                        style={{ width: 48, height: 48 }}
                      />
                      <Text
                        style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                      >
                        Lapor.go.id
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        Linking.openURL('https://wbs.kkp.go.id/registration')
                      }}
                    >
                      <Image
                        source={require("../../assets/superApp/wbs.png")}
                        style={{ width: 48, height: 48 }}
                      />
                      <Text
                        style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                      >
                        WBS KKP
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        Linking.openURL('https://sidak.kkp.go.id/login')
                      }}
                    >
                      <Image
                        source={require("../../assets/superApp/sidak.png")}
                        style={{ width: 48, height: 48 }}
                      />
                      <Text
                        style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                      >
                        Sidak
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        Linking.openURL('https://jdih.kkp.go.id/')
                      }}
                    >
                      <Image
                        source={require("../../assets/superApp/JDIH.png")}
                        style={{ width: 48, height: 48 }}
                      />
                      <Text
                        style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                      >
                        JDIH
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>
                      Kinerja dan Pengembangan Pegawai
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://e-monev.bappenas.go.id/fe/')
                      }}
                    >
                      <View>
                        <Image
                          source={require("../../assets/superApp/monev.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          Emonev{"\n"} Bapennas
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://www.kinerjaku.kkp.go.id/')
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/superApp/kinerjaku.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          Kinerjaku
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://elearning.kkp.go.id/')
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/superApp/milea.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          E-Milea
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://kinerja.bkn.go.id/login')
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/superApp/kinerjabkn.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          E-Kinerja {"\n"}BKN
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://siasn.bkn.go.id/')
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/superApp/SIASN.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          SIASN{"\n"} BKN
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL('https://mysapk.bkn.go.id/')
                      }}
                    >
                      <View>
                        <Image
                          source={require("../../assets/superApp/mysapk.png")}
                          style={{ width: 48, height: 48 }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}
                        >
                          My SAPK
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View
              style={{ marginLeft: 30, marginVertical: 20, flexDirection: "row" }}
            >
              <Text
                style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}
              >
                Galeri
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ListGaleri")}
                style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: FONTSIZE.H3,
                    flex: 1,
                    color: "#1868AB",
                  }}
                >
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.containerr, { marginBottom: 80 }]}>
              <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={galeri.lists.slice(0, 3)}
                renderItem={GaleriHome}
                hasParallaxImages={true}
                onSnapToItem={setSlide4}
              />
              <Pagination
                dotsLength={galeri.lists.slice(0, 3).length}
                dotColor={"black"}
                inactiveDotColor={COLORS.grey}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={slide4}
                carouselRef={carouselRef}
                tappableDots={!!carouselRef}
              />
            </View>
          </ScrollView>

        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  containerCard: {
    backgroundColor: "#F4F7FE",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 36,
    marginLeft: 20,
  },
  containerr: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  items: {
    width: screenWidth - 60,
    height: screenWidth - 170,
  },
  imageContainer: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    // borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  images: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
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
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardVisiMisi: {
    backgroundColor: COLORS.primary,
    width: 77,
    height: 30,
    marginHorizontal: 15,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
