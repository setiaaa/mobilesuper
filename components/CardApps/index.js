import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTSIZE,
  fontSizeResponsive,
  imageApps,
} from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Device from "expo-device";
import {
  getMenu,
  getMenuLite,
  getMenuType,
  setMenu,
} from "../../service/session";
import { setTypeMenu } from "../../store/SuperApps";

export const CardApps = ({
  handlePressModal,
  setModalBankom,
  setModalKepegawaian,
  closeBottomSheet,
}) => {
  const navigation = useNavigation();
  const [listMenu, setListMenu] = useState([]);
  const isFocused = useIsFocused();
  const { profile, typeMenu } = useSelector((state) => state.superApps);
  const { device } = useSelector((state) => state.apps);

  const roleEvent = ["EVENT.USER"];
  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  const roleTaskManagement = ["TASK.USER"];
  const roleLaporan = ["LAPORAN_BSRE"];
  const rolePerizinanMenteri = ["PERIZINAN_MENTERI"];

  const isRoleLaporan = profile.roles_access?.some((item) =>
    roleLaporan.includes(item)
  );

  const isRoleKalender = profile.roles_access?.some((item) =>
    roleKalender.includes(item)
  );
  const isRolePreShare = profile.roles_access?.some((item) =>
    rolePreShare.includes(item)
  );
  // const isRoleTaskManagement = profile.roles_access?.some((item) =>
  //     roleTaskManagement.includes(item)
  // );
  const isRoleEvent = profile.roles_access?.some((item) =>
    roleEvent.includes(item)
  );

  const isRoleMenteri = profile.roles_access?.some((item) =>
    rolePerizinanMenteri.includes(item)
  );

  const isTablet = Device.DeviceType.TABLET;

  const dispatch = useDispatch();

  useEffect(() => {
    let tmpMenu = [];
    tmpMenu.push(
      {
        title: "Korespondensi",
        navigation: "MainKoresp",
        image: require("../../assets/superApp/korespondensi.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 24,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: wp(15),
        },
      },
      {
        title: "Regulasi",
        navigation: "MainKeb",
        image: require("../../assets/superApp/kebijakan.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 50,
            hp: 33,
          },
        },
        titleStyle: {
          width: null,
        },
      },
      {
        title: "Digital Sign",
        navigation: "MainDigitalSign",
        image: require("../../assets/superApp/digitalsign.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 28,
          },
          height: {
            tablet: 50,
            hp: 35,
          },
        },
        titleStyle: {
          width: null,
        },
        // subMenu: [
        //   {
        //     title: "Dokumen Lain",
        //   },
        //   {
        //     title: "Verifikasi",
        //   },
        // ],
      },
      {
        title: "Cuti",
        navigation: "MainCuti",
        image: require("../../assets/superApp/cuti.png"),
        imagestyle: {
          width: {
            tablet: 60,
            hp: 40,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: null,
        },
      },
      {
        title: "Pengembangan Kompetensi",
        navigation: "ListAplikasiKepegawaian",
        image: require("../../assets/superApp/Bankomicon.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 40,
            hp: 24,
          },
        },
        titleStyle: {
          width: wp(15),
        },
      },
      {
        title: "SPPD",
        navigation: "MainSPPD",
        image: require("../../assets/superApp/sppd.png"),
        imagestyle: {
          width: {
            tablet: 60,
            hp: 32,
          },
          height: {
            tablet: 60,
            hp: 32,
          },
        },
        titleStyle: {
          width: null,
        },
      },
      {
        title: "Kepegawaian",
        navigation: "ListAplikasiKepegawaian",
        image: require("../../assets/superApp/pegawai.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 40,
            hp: 24,
          },
        },
        titleStyle: {
          width: wp(15),
        },
      },
      {
        title: "Task",
        navigation: "MyTask",
        image: require("../../assets/superApp/taskmanagement.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: null,
        },
        // subMenu: [
        //   {
        //     title: "Main",
        //   },
        //   {
        //     title: "Laporan",
        //   },
        // ],
      },
      // {
      //   title: "Pegawai",
      //   navigation: "ListPegawai",
      //   image: require("../../assets/superApp/pegawai.png"),
      //   imagestyle: {
      //     width: {
      //       tablet: 50,
      //       hp: 28,
      //     },
      //     height: {
      //       tablet: 50,
      //       hp: 30,
      //     },
      //   },
      //   titleStyle: {
      //     width: null,
      //   },
      // },
      {
        title: "Survei Layanan",
        navigation: "SurveyLayanan",
        image: require("../../assets/superApp/surveylayanan.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 28,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: null,
        },
      }
    );
    if (isRolePreShare) {
      tmpMenu.splice(2, 0, {
        title: "Preparing dan Sharing",
        navigation: "MainRepo",
        image: require("../../assets/superApp/repositori.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 40,
            hp: 24,
          },
        },
        titleStyle: {
          width: wp(15),
        },
      });
    }
    if (isRoleKalender) {
      tmpMenu.splice(7, 0, {
        title: "Kalender",
        navigation: "MainKalender",
        image: require("../../assets/superApp/kalender.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 28,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: null,
        },
        // subMenu: [
        //   {
        //     title: "Grup Kalender",
        //   },
        //   {
        //     title: "Kalender Personal",
        //   },
        // ],
      });
    } else {
      tmpMenu.splice(7, 0, {
        title: "Kalender",
        navigation: "KalenderPersonal",
        image: require("../../assets/superApp/kalender.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 28,
          },
          height: {
            tablet: 50,
            hp: 28,
          },
        },
        titleStyle: {
          width: null,
        },
      });
    }
    if (isRoleEvent) {
      tmpMenu.push({
        title: "Agenda Rapat",
        navigation: "HalamanUtama",
        image: require("../../assets/superApp/event.png"),
        imagestyle: {
          width: {
            tablet: 40,
            hp: 20,
          },
          height: {
            tablet: 60,
            hp: 35,
          },
        },
        titleStyle: {
          width: null,
        },
      });
    }
    if (isRoleMenteri) {
      tmpMenu.splice(8, 0, {
        title: "Perizinan Menteri",
        navigation: "PerizinanMenteri",
        image: require("../../assets/superApp/Bankomicon.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 30,
          },
          height: {
            tablet: 40,
            hp: 24,
          },
        },
        titleStyle: {
          width: wp(15),
        },
      });
    }
    setMenu(JSON.stringify(tmpMenu));
    getMenuType().then((val) => {
      try {
        const parsedVal = JSON.parse(val);
        dispatch(setTypeMenu(parsedVal));
      } catch (e) {
        console.error("JSON Parse error:", e);
      }
    });
  }, [profile]);

  useEffect(() => {
    if (typeMenu !== null) {
      if (typeMenu === false) {
        getMenu().then((val) => {
          try {
            const parsedVal = JSON.parse(val);
            if (parsedVal === null) {
              setListMenu(JSON.stringify(tmpMenu));
            } else {
              setListMenu(parsedVal);
            }
          } catch (e) {
            console.error("JSON Parse error:", e);
          }
        });
      } else {
        getMenuLite(profile.nip).then((val) => {
          try {
            const parsedVal = JSON.parse(val);
            if (parsedVal !== null) {
              setListMenu(parsedVal);
            } else {
              setListMenu([]);
            }
          } catch (e) {
            console.error("JSON Parse error:", e);
          }
        });
      }
    }
  }, [typeMenu, isFocused, profile.nip]);

  return (
    <>
      {listMenu.length === 0 ? null : (
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              gap: wp(6),
              justifyContent: listMenu.length > 8 ? "center" : null,
              alignItems: "center",
              flex: 1,
              marginHorizontal: listMenu.length < 8 ? 15 : null,
            }}
          >
            {listMenu &&
              listMenu.length > 0 &&
              listMenu.map((item, index) => {
                if (index <= 3) {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      key={index}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (item.title === "Pengembangan Kompetensi") {
                            navigation.navigate(item.navigation, item.title);
                          } else if (item.title === "Kepegawaian") {
                            navigation.navigate(item.navigation, item.title);
                          } else {
                            navigation.navigate(item.navigation);
                          }
                        }}
                      >
                        <View
                          style={[
                            device == "tablet"
                              ? styles.cardAppsTablet
                              : styles.cardApps,
                            {
                              backgroundColor: COLORS.secondary,
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            },
                          ]}
                        >
                          <Image
                            style={{
                              width:
                                device === "tablet"
                                  ? item.imagestyle.width.tablet
                                  : item.imagestyle.width.hp,
                              height:
                                device === "tablet"
                                  ? item.imagestyle.height.tablet
                                  : item.imagestyle.height.hp,
                            }}
                            source={imageApps(item.title)}
                          />
                          {/* <Text>{typeof item.image}</Text> */}
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: fontSizeResponsive("H4", device),
                          width: item.titleStyle.width,
                        }}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                    </View>
                  );
                }
              })}
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: wp(6),
              justifyContent: listMenu.length > 8 ? "center" : null,
              alignItems: "center",
              flex: 1,
              marginHorizontal: listMenu.length < 8 ? 15 : null,
              marginTop: 10,
            }}
          >
            {listMenu &&
              listMenu.length > 4 &&
              listMenu.map((item, index) => {
                if (index > 3 && index < 7)
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      key={index}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (item.title === "Pengembangan Kompetensi") {
                            navigation.navigate(item.navigation, item.title);
                          } else if (item.title === "Kepegawaian") {
                            navigation.navigate(item.navigation, item.title);
                          } else {
                            navigation.navigate(item.navigation);
                          }
                        }}
                      >
                        <View
                          style={[
                            device == "tablet"
                              ? styles.cardAppsTablet
                              : styles.cardApps,
                            {
                              backgroundColor: COLORS.secondary,
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            },
                          ]}
                        >
                          <Image
                            style={{
                              width:
                                device === "tablet"
                                  ? item.imagestyle.width.tablet
                                  : item.imagestyle.width.hp,
                              height:
                                device === "tablet"
                                  ? item.imagestyle.height.tablet
                                  : item.imagestyle.height.hp,
                            }}
                            source={imageApps(item.title)}
                          />
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: fontSizeResponsive("H4", device),
                          width: item.titleStyle.width,
                        }}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                    </View>
                  );
              })}
            {listMenu && listMenu.length > 7 && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <TouchableOpacity onPress={handlePressModal}>
                  <View
                    style={[
                      device == "tablet"
                        ? styles.cardAppsTablet
                        : styles.cardApps,
                      {
                        backgroundColor: COLORS.secondary,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      },
                    ]}
                  >
                    <Image
                      style={{
                        width: device === "tablet" ? 60 : 32,
                        height: device === "tablet" ? 60 : 32,
                      }}
                      source={require("../../assets/superApp/more.png")}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  More
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    width: "90%",
    // height: hp(30),
    borderRadius: 12,
    marginTop: 60,
    padding: 10,
    //shadow ios
    shadowOffset: { width: -2, height: 4 },
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    // shadow android
    elevation: 1,
  },
  profile: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
    left: 16,
  },
  cardApps: {
    width: wp(15),
    height: hp(7),
    borderRadius: 8,
  },
  cardAppsTablet: {
    width: wp(15),
    height: hp(10),
    borderRadius: 8,
  },
});
