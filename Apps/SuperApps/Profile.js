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
  spacing,
  shadow,
  textStyle,
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
  removeMenuLite,
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
import { GlobalStyles } from "../../constants/styles";
import { Divider } from "react-native-paper";

export const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalLog, setModalLog] = useState(false);
  const [listMenu, setListMenu] = useState([]);
  const [listLog, setListLog] = useState([]);
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
  const pejabatTinggi = [
    "196503101989031016",
    "196301121990031002",
    "196605191993032003",
    "196611261999031001",
    "197604172003121005",
    "197805232002121004",
    "196909021997031002",
    "196701161997031002",
    "196508311991031002",
    "197707102001121001",
    "196212301990031006",
    "220316603002",
    "197902052005021001",
    "210218512041",
    "197507102005021001",
    "197309041999031004",
    "210118309029",
    "198211282009121001",
    "220929310003",
    "170818308021",
    "196508251994031004",
    "196710041999032001",
    "197407012003121003",
    "197106191994031001",
    "197306141997031001",
    "68030557",
    "197203282005021001",
    "197306141997031001",
    "196507241990031004",
    "196710041999032001",
    "197805022005021001",
    "197502152002121001",
    "196505181987032002",
    "197202021996031003",
    "197112122001121003",
    "197706202003121002",
    "196610271991011001",
    "196607241995031001",
    "197610162001121002",
    "196606041999031005",
    "197605222005021002",
    "197504142002122003",
    "197101071999031002",
    "196603121991031002",
    "197404211998032002",
    "197501042000031001",
    "196911231994031004",
    "197406122005021002",
    "197108271999011001",
    "196609261994031002",
    "197309302001121001",
    "196510291994031003",
    "196904241994031002",
    "196902231994032001",
    "196804071993032002",
    "196802251993031003",
    "196412171990032003",
    "196705021993032001",
    "196510011990031002",
    "198011282005021001",
    "196705021993032001",
    "190001",
    "196407211994031004",
    "197608031999031004",
    "197406261999031004",
    "197910292003121004",
    "196902062001122003",
    "197801122002121001",
    "196809212001121001",
    "197311302001121001",
    "197303241998031002",
    "197406261999031004",
    "197006241991022001",
    "196611301987021001",
    "197208122001121002",
    "196904221992031002",
    "197204021998031005",
    "196605141993032001",
    "197106191994031001",
    "198209202005021001",
    "197907152002122001",
    "196711061990031003",
    "197301081998031002",
    "197303031998031002",
    "196510221994031001",
    "197204102002122003",
  ];

  const isRoleLaporan = profile.roles_access?.some((item) =>
    roleLaporan.includes(item)
  );

  const isRoleKalender = profile.roles_access?.some((item) =>
    roleKalender.includes(item)
  );
  const isRolePreShare = profile.roles_access?.some((item) =>
    rolePreShare.includes(item)
  );

  const isPejabatTinggi = pejabatTinggi?.some((item) => item === profile.nip);
  // const isRoleTaskManagement = profile.roles_access?.some((item) =>
  //     roleTaskManagement.includes(item)
  // );
  const isRoleEvent = profile.roles_access?.some((item) =>
    roleEvent.includes(item)
  );

  console.log(isPejabatTinggi);

  useEffect(() => {
    let tmpMenu = [];
    let tmpLog = [];
    // Pilihan Menu
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
        title: "Kepegawaian",
        navigation: "KepegawaianApps",
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

    // Log Perbaikan
    tmpLog.push(
      {
        description: "Penambahan Menu Kepegawaian",
      },
      {
        description: "Update Korespondensi",
      },
      {
        description: "Penambahan Menu Perizinan Menteri",
      },
      {
        description: "Penambahan Menu FAQ",
      }
    );
    // setMenu(JSON.stringify(tmpMenu));
    setListMenu(tmpMenu);
    setListLog(tmpLog);
  }, [profile]);

  const [appsIsChecked, setAppsIsChecked] = useState([]);

  useEffect(() => {
    getMenuLite(profile.nip).then((val) => {
      try {
        const parsedVal = JSON.parse(val);
        setAppsIsChecked(parsedVal === null ? [] : parsedVal);
      } catch (e) {
        console.error("JSON Parse error:", e);
      }
    });
  }, [profile]);

  const handleChangeChecked = (checked, item, parent) => {
    if (parent === undefined) {
      if (checked) {
        setAppsIsChecked((prev) => [...prev, item]);
      } else {
        const index = appsIsChecked.map((e) => e.title).indexOf(item.title);
        let arr = [...appsIsChecked];
        arr.splice(index, 1);
        setAppsIsChecked(arr);
      }
    } else {
      if (checked) {
        const index = appsIsChecked.map((e) => e.title).indexOf(parent.title);
        let arr = [...appsIsChecked];

        //jika parent ada
        if (index > -1) {
          arr[index].subMenu.push(item);
        } else {
          arr.push({
            ...parent,
            subMenu: [item],
          });
        }
        setAppsIsChecked(arr);
      } else {
        const index = appsIsChecked.map((e) => e.title).indexOf(parent.title);
        let arr = [...appsIsChecked];
        const indexSubMenu = arr[index].subMenu
          .map((e) => e.title)
          .indexOf(item.title);

        arr[index].subMenu.splice(indexSubMenu, 1);

        if (arr[index].subMenu.length === 0) {
          arr.splice(index, 1);
        }
        setAppsIsChecked(arr);
      }
    }
  };

  const checkedMenu = (title) => {
    let checked = false;

    const loopData = (arr) => {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].title === title) {
          checked = true;
        } else if (arr[i].subMenu) {
          loopData(arr[i].subMenu);
        }
      }
    };

    const tempArr = [...appsIsChecked];
    loopData(tempArr);
    return checked;
  };

  const handleSaveMenuLite = () => {
    setMenuLite(JSON.stringify(appsIsChecked), profile.nip);
  };

  console.log(profile);

  return (
    <>
      {loading ? <Loading /> : null}
      <ScrollView>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            height: 80,
          }}
        >
          {/* Icon Topbar */}
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
              marginRight: spacing.default,
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

        {/* Profile */}
        <View
          style={{
            padding: spacing.default,
          }}
        >
          <View
            style={[
              {
                backgroundColor: COLORS.white,
                width: "100%",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                padding: spacing.default,
              },
              shadow.cardShadow,
            ]}
          >
            <Image
              source={{ uri: BASE_URL + profile.avatar_signed }}
              style={{
                width: device === "tablet" ? 100 : 61,
                height: device === "tablet" ? 100 : 61,
                borderRadius: device === "tablet" ? 50 : 30,
              }}
            />
            <Text
              style={[
                {
                  marginTop: spacing.default,
                  color: COLORS.info,
                  fontSize: fontSizeResponsive("H4", device),
                },
              ]}
            >
              {profile.nama}
            </Text>
            <Text
              style={[
                {
                  color: COLORS.lighter,
                  textAlign: "center",
                  fontSize: fontSizeResponsive("H5", device),
                },
              ]}
            >
              {profile.unit_kerja}
            </Text>
          </View>

          <View
            style={[
              {
                padding: spacing.default,
                rowGap: spacing.medium,
                backgroundColor: COLORS.white,
                marginTop: 10,
                borderRadius: 8,
              },
              shadow.cardShadow,
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Jumlah hari kerja
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.working_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Jumlah hadir
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.present_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Terlambat
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.late_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Dinas
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {profile.outstation_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                Cuti
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                -
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: spacing.default,
            columnGap: spacing.default,
          }}
        >
          {/* Content Absensi */}
          <View
            style={[
              {
                backgroundColor: COLORS.white,
                borderRadius: 8,
                flex: 1,
              },
              shadow.cardShadow,
            ]}
          >
            {/* <Text
              style={{
                fontSize: fontSizeResponsive("Judul", device),
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              Absensi
            </Text> */}
            <View
              style={[
                {
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                  flex: 1,
                },
                shadow.cardShadow,
              ]}
            >
              <View
                style={{ padding: spacing.default, rowGap: spacing.medium }}
              >
                <Text
                  style={[
                    {
                      marginVertical: -10,
                      fontSize: fontSizeResponsive("H4", device),
                    },
                  ]}
                >
                  IP ASN
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H5", device),
                    marginTop: 10,
                  }}
                >
                  Sumber Data EPEG 2024
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 60 : 30,
                      fontWeight: FONTWEIGHT.bold,
                    }}
                  >
                    {profile?.epeg_ipasn_data?.nilai}
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
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                      width: device === "tablet" ? "88%" : "78%",
                    }}
                  >
                    Kualifikasi
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: "#FF9900",
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.kualifikasi}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                      width: device === "tablet" ? "88%" : "78%",
                    }}
                  >
                    Kompetensi
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: COLORS.success,
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.kompetensi}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                      width: device === "tablet" ? "88%" : "78%",
                    }}
                  >
                    Kinerja
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: "#CED06C",
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.kinerja}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: device === "tablet" ? "88%" : "78%",
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    Disiplin
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: COLORS.orange,
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.disiplin}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: device === "tablet" ? "88%" : "78%",
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    Diklat
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: COLORS.success,
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.diklat20jp}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: device === "tablet" ? "88%" : "78%",
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    Fungsional
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: "#CED06C",
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.fungsional}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: device === "tablet" ? "88%" : "78%",
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    Hukdis
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: COLORS.orange,
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.hukdis}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: device === "tablet" ? "88%" : "78%",
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    PPKP
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: device === "tablet" ? 30 : 20,
                        height: device === "tablet" ? 30 : 20,
                        backgroundColor: COLORS.success,
                        borderRadius: 50,
                        marginRight: spacing.small,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      {profile?.epeg_ipasn_data?.ppkp}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Content IP ASN */}
          <View
            style={[
              {
                backgroundColor: COLORS.white,
                borderRadius: 8,
                flex: 1,
              },
              shadow.cardShadow,
            ]}
          >
            <View style={{ padding: spacing.default, rowGap: spacing.medium }}>
              <Text
                style={[
                  {
                    marginVertical: -10,
                    fontSize: fontSizeResponsive("H4", device),
                  },
                ]}
              >
                IP ASN
              </Text>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H5", device),
                  marginTop: 10,
                }}
              >
                Sumber Data SIASN
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H4", device),
                    width: device === "tablet" ? "88%" : "78%",
                  }}
                >
                  Kualifikasi
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      height: device === "tablet" ? 30 : 20,
                      backgroundColor: "#FF9900",
                      borderRadius: 50,
                      marginRight: spacing.small,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    {profile.ipasn_kualifikasi}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H4", device),
                    width: device === "tablet" ? "88%" : "78%",
                  }}
                >
                  Kompetensi
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      height: device === "tablet" ? 30 : 20,
                      backgroundColor: COLORS.success,
                      borderRadius: 50,
                      marginRight: spacing.small,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    {profile.ipasn_kompetensi}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H4", device),
                    width: device === "tablet" ? "88%" : "78%",
                  }}
                >
                  Kinerja
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      height: device === "tablet" ? 30 : 20,
                      backgroundColor: "#CED06C",
                      borderRadius: 50,
                      marginRight: spacing.small,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    {profile.ipasn_kinerja}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: device === "tablet" ? "88%" : "78%",
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Disiplin
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      height: device === "tablet" ? 30 : 20,
                      backgroundColor: COLORS.success,
                      borderRadius: 50,
                      marginRight: spacing.small,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    {profile.ipasn_disiplin}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Biodata */}
        <View style={{ paddingVertical: spacing.default }}>
          <CollapseCardBiodata profile={profile} device={device} />
          {/* <CollapseCardLinimasa linimasa={linimasa} /> */}
        </View>

        {/* Faq */}
        <View
          style={{
            paddingHorizontal: spacing.default,
            marginBottom: isPejabatTinggi === true ? null : spacing.default,
          }}
        >
          <TouchableOpacity
            style={[
              {
                backgroundColor: COLORS.white,
                borderRadius: 8,
                padding: spacing.default,
              },
              shadow.cardShadow,
            ]}
            onPress={() => {
              navigation.navigate("ListFaq");
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={device === "tablet" ? 40 : 24}
              />
              <Text
                style={[
                  {
                    fontWeight: "700",
                    fontSize: fontSizeResponsive("H4", device),
                  },
                ]}
              >
                FAQ
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {isPejabatTinggi && (
          <View
            style={{
              margin: spacing.default,
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.white,
                  padding: spacing.default,
                  borderRadius: 8,
                  width: "100%",
                  justifyContent: "space-between",
                },
                shadow.cardShadow,
              ]}
            >
              <View>
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
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
                        marginVertical: spacing.medium,
                        color: COLORS.info,
                        fontSize: fontSizeResponsive("H4", device),
                      }}
                    >
                      Pilih menu yang ingin ditampilkan
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.info }}
                thumbColor={isEnabled ? COLORS.white : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) => toggleSwitch(val)}
                value={isEnabled}
              />
            </View>
          </View>
        )}

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
            <View
              onLayout={handleContentLayout}
              style={{
                paddingHorizontal: spacing.default,
                marginHorizontal: spacing.medium,
              }}
            >
              <View style={{ marginBottom: spacing.default }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H4", device),
                    }}
                  >
                    Aplikasi
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      closeBottomSheet();
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={device === "tablet" ? 40 : 24}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
                <Divider />
                <View style={{ marginTop: spacing.medium }}>
                  <FlatList
                    data={listMenu}
                    renderItem={({ item, index }) => (
                      <CardListAplikasi
                        item={item}
                        index={index}
                        appsIsChecked={appsIsChecked}
                        handleChangeChecked={handleChangeChecked}
                        checked={checkedMenu}
                        device={device}
                      />
                    )}
                    keyExtractor={(item) => item.title}
                  />

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      height: 50,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: spacing.default,
                    }}
                    onPress={() => {
                      handleSaveMenuLite();
                      closeBottomSheet();
                    }}
                  >
                    <Text
                      style={[
                        {
                          color: COLORS.white,
                          fontSize: fontSizeResponsive("H4", device),
                        },
                      ]}
                    >
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        </Portal>

        {/* Logout Button */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: spacing.default,
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
              style={[
                {
                  color: COLORS.white,
                  fontSize: fontSizeResponsive("H4", device),
                },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              { marginVertical: spacing.default, color: COLORS.grey },
              fontSizeResponsive("textM", device),
            ]}
          >
            Version {Config.app_version}
          </Text>
        </View>

        {/* Pop up informasi */}
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
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: spacing.default,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    {
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: fontSizeResponsive("H4", device),
                    },
                  ]}
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
                    size={device === "tablet" ? 40 : 24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <Divider />
              <View
                style={{
                  flexDirection: "column",
                  rowGap: spacing.medium,
                  padding: spacing.default,
                }}
              >
                {listLog?.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: device === "tablet" ? 10 : 5,
                          height: device === "tablet" ? 10 : 5,
                          borderRadius: 10,
                          backgroundColor: COLORS.primary,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: fontSizeResponsive("H4", device),
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  );
                })}

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
