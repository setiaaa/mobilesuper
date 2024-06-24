import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Platform,
  Switch,
  FlatList,
} from "react-native";
import {} from "react-native-safe-area-context";
import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
  PADDING,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "accordion-collapse-react-native";
import { CollapseCardBiodata } from "../../components/CollapseCardBiodata";
import { ScrollView } from "react-native";
import { CollapseCardLinimasa } from "../../components/CollapseCardLinimasa";
import {
  getMenuLite,
  getMenuType,
  removePushNotif,
  removeTokenValue,
  setMenuLite,
  setMenuType,
} from "../../service/session";
import { setLogout } from "../../store/LoginAuth";
import { Loading } from "../../components/Loading";
import { Alert } from "react-native";
import { setNotifIos, setProfile, setTypeMenu } from "../../store/SuperApps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Config } from "../../constants/config";
import { OneSignal } from "react-native-onesignal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "react-native-portalize";
import { CardListAplikasi } from "../../components/CardListAplikasi";

export const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalLog, setModalLog] = useState(false);
  const [listMenu, setListMenu] = useState([]);
  const { profile, linimasa, loading } = useSelector(
    (state) => state.superApps
  );
  const { device } = useSelector((state) => state.apps);
  const BASE_URL = Config.base_url + "bridge";
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (val) => {
    setIsEnabled(val);
    setMenuType(JSON.stringify(val));
    dispatch(setTypeMenu(val));
  };

  useEffect(() => {
    getMenuType().then((val) => {
      try {
        const parsedVal = JSON.parse(val);
        setIsEnabled(parsedVal === null ? false : parsedVal);
      } catch (e) {
        console.error("JSON Parse error:", e);
      }
    });
  }, []);

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
    bottomSheetModalRef.current.close();
  };

  const roleEvent = ["EVENT.USER"];
  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  const roleTaskManagement = ["TASK.USER"];
  const roleLaporan = ["LAPORAN_BSRE"];

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
        navigation: "bankom",
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
      },
      {
        title: "Pegawai",
        navigation: "ListPegawai",
        image: require("../../assets/superApp/pegawai.png"),
        imagestyle: {
          width: {
            tablet: 50,
            hp: 28,
          },
          height: {
            tablet: 50,
            hp: 30,
          },
        },
        titleStyle: {
          width: null,
        },
      },
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
        navigation: "GrupKalender",
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
    if (isRoleLaporan) {
      tmpMenu.splice(3, 0, {
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
        subMenu: [
          {
            subTitle: "Dokumen Lain",
          },
          {
            subTitle: "Verifikasi",
          },
        ],
      });
    } else {
      tmpMenu.splice(3, 0, {
        title: "Digital Sign",
        navigation: "DokumenLain",
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
        subMenu: [
          {
            subTitle: "Dokumen Lain",
          },
          {
            subTitle: "Verifikasi",
          },
        ],
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
    // setMenu(JSON.stringify(tmpMenu));
    setListMenu(tmpMenu);
  }, [profile]);

  const [appsIsChecked, setAppsIsChecked] = useState([]);

  useEffect(() => {
    getMenuLite().then((val) => {
      try {
        const parsedVal = JSON.parse(val);
        setAppsIsChecked(parsedVal === null ? [] : parsedVal);
      } catch (e) {
        console.error("JSON Parse error:", e);
      }
    });
  }, [profile]);

  const handleChangeChecked = (item) => {
    const index = appsIsChecked.map((e) => e.title).indexOf(item.title);
    const isChecked = index > -1;
    const arr = [...appsIsChecked];
    if (isChecked) {
      arr.splice(index, 1);
    } else {
      arr.push(item);
    }
    setAppsIsChecked(arr);
    console.log(arr);
  };

  const handleSaveMenuLite = () => {
    setMenuLite(JSON.stringify(appsIsChecked));
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            height: 80,
          }}
        >
          {/* <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              width: device === "tablet" ? 40 : 28,
              height: device === "tablet" ? 40 : 28,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={device === "tablet" ? 40 : 24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
          </View> */}
          <View style={{ flex: 1, alignItems: "center", marginLeft: 40 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H1", device),
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.white,
              }}
            >
              Profile Saya
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <TouchableOpacity onPress={() => setModalLog(true)}>
              <Ionicons
                name="information-circle-outline"
                size={device === "tablet" ? 30 : 30}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: PADDING.Page,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: wp(87),
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              padding: PADDING.Page,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: BASE_URL + profile.avatar }}
              style={{
                width: device === "tablet" ? 100 : 61,
                height: device === "tablet" ? 100 : 61,
                borderRadius: device === "tablet" ? 50 : 30,
              }}
            />
            <Text
              style={{
                marginVertical: 10,
                color: COLORS.info,
                fontWeight: FONTWEIGHT.bold,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              {profile.nama}
            </Text>
            <Text
              style={{
                color: COLORS.lighter,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              {profile.unit_kerja}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 7,
            justifyContent: "center",
            width: wp(87),
            alignSelf: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: 177,
              paddingHorizontal: 10,
              paddingTop: 20,
              borderRadius: 8,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
              width: wp(43),
            }}
          >
            {/* <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              Absensi
            </Text> */}

            <View style={{ paddingBottom: 20 }}>
              <View style={{ flexDirection: "row", marginTop: 20, gap: wp(2) }}>
                <Text
                  style={{
                    width: "80%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Jumlah hari kerja
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.working_day}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
                <Text
                  style={{
                    width: "80%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Jumlah hadir
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.present_day}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
                <Text
                  style={{
                    width: "80%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Terlambat
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.late_day}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10, gap: wp(2) }}>
                <Text
                  style={{
                    width: "80%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Dinas
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.outstation_day}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: wp(3),
                }}
              >
                <Text
                  style={{
                    width: "80%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Cuti
                </Text>
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  -
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 10,
              paddingTop: 20,
              borderRadius: 8,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
              width: wp(43),
            }}
          >
            <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              IP ASN
            </Text>
            <Text
              style={{
                fontSize: fontSizeResponsive("H4", device),
                marginTop: 5,
              }}
            >
              Sumber Data SIASN
            </Text>

            <View style={{ paddingBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  width: "60%",
                  gap: wp(5),
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 60 : 30,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  {profile.ipasn_nilai}
                </Text>
                {/* <View
                  style={{
                    backgroundColor: "#CED06C",
                    width: wp(18),
                    height: wp(5),
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    Tinggi
                  </Text>
                </View> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  gap: wp(1),
                }}
              >
                <Text
                  style={{
                    width: "72%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Kualifikasi
                </Text>
                <View
                  style={{
                    width: wp(3),
                    height: wp(3),
                    backgroundColor: "#FF9900",
                    borderRadius: 30,
                  }}
                />
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.ipasn_kualifikasi}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  gap: wp(1),
                }}
              >
                <Text
                  style={{
                    width: "72%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Kompetensi
                </Text>
                <View
                  style={{
                    width: wp(3),
                    height: wp(3),
                    backgroundColor: COLORS.success,
                    borderRadius: 30,
                  }}
                />
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.ipasn_kompetensi}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  gap: wp(1),
                }}
              >
                <Text
                  style={{
                    width: "72%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Kinerja
                </Text>
                <View
                  style={{
                    width: wp(3),
                    height: wp(3),
                    backgroundColor: "#CED06C",
                    borderRadius: 30,
                  }}
                />
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.ipasn_kinerja}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  gap: wp(1),
                }}
              >
                <Text
                  style={{
                    width: "72%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Disiplin
                </Text>
                <View
                  style={{
                    width: wp(3),
                    height: wp(3),
                    backgroundColor: COLORS.success,
                    borderRadius: 30,
                  }}
                />
                <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                  {profile.ipasn_disiplin}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CollapseCardBiodata profile={profile} device={device} />
          {/* <CollapseCardLinimasa linimasa={linimasa} /> */}
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 8,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                Pengaturan Menu
              </Text>
              {isEnabled ? (
                <TouchableOpacity
                  onPress={() => {
                    handlePressModal();
                  }}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      color: COLORS.info,
                    }}
                  >
                    Pilih menu yang ingin ditampilkan
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? COLORS.white : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(val) => toggleSwitch(val)}
              value={isEnabled}
            />
          </View>
        </View>
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
              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 14,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H1", device),
                    }}
                  >
                    Aplikasi
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      closeBottomSheet();
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={device === "tablet" ? 40 : 24}
                      color={COLORS.lighter}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    data={listMenu}
                    renderItem={({ item }) => (
                      <CardListAplikasi
                        item={item}
                        appsIsChecked={appsIsChecked}
                        handleChangeChecked={handleChangeChecked}
                      />
                    )}
                    keyExtractor={(item) => item.title}
                  />

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      width: "90%",
                      marginHorizontal: 20,
                      height: 50,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                      marginBottom: 100,
                    }}
                    onPress={() => {
                      handleSaveMenuLite();
                      closeBottomSheet();
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        </Portal>

        <View
          style={{
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              width: "100%",
              height: 50,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              Alert.alert(
                "Peringatan!",
                "Apakah anda yakin akan logout dari aplikasi?",
                [
                  {
                    text: "Tidak",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "YA",
                    onPress: () => {
                      removePushNotif();
                      setNotifIos(false);
                      removeTokenValue();
                      dispatch(setLogout());
                      dispatch(setProfile({}));
                      OneSignal.User.addTag("user_type", "");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "LoginToken" }],
                      });
                    },
                  },
                ]
              );
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 20, color: COLORS.grey }}>
            Version {Config.app_version}
          </Text>
        </View>

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
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
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
                  Log Perbaikan Aplikasi Version {Config.app_version}
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

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Perbaikan kalender personal
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Perubahan menu
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Perbaikan histori komentar cuti
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Perbaikan auth token
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Penambahan menu bankom
                  </Text>
                </View>

                {/* 
              <Text
                style={{
                  width: "70%",
                  marginHorizontal: 60,
                  marginTop: 10,
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {detail?.title !== "" && detail?.title !== null
                  ? detail.title
                  : "-"}
              </Text> */}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: "90%",
    marginVertical: 20,
    marginLeft: 20,
    borderRadius: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
});
