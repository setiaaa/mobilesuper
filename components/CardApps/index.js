import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTSIZE, fontSizeResponsive } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Device from "expo-device";

export const CardApps = ({ handlePressModal }) => {
  const navigation = useNavigation();
  const [listMenu, setListMenu] = useState([]);

  const { profile } = useSelector((state) => state.superApps);
  const { device } = useSelector((state) => state.apps);

  const roleEvent = ["EVENT.USER"];
  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  const roleTaskManagement = ["TASK.USER"];

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

  const isTablet = Device.DeviceType.TABLET;

  useEffect(() => {
    let tmpMenu = [];
    tmpMenu.push(
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Drawer")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 50 : 28,
                height: device === "tablet" ? 50 : 28,
              }}
              source={require("../../assets/superApp/korespondensi.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: fontSizeResponsive("H4", device),
            width: wp(15),
          }}
          numberOfLines={1}
        >
          Korespondensi
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MainKeb")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 50 : 30,
                height: device === "tablet" ? 50 : 30,
              }}
              source={require("../../assets/superApp/kebijakan.png")}
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
          Kebijakan
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("MainPengetahuan")}
        >
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 40 : 24,
                height: device === "tablet" ? 55 : 34,
              }}
              source={require("../../assets/superApp/pengetahuan.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: fontSizeResponsive("H4", device),
            width: wp(15),
            textAlign: device === "tablet" ? "center" : null,
          }}
          numberOfLines={1}
        >
          Pengetahuan
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("MainDigitalSign")}
        >
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 50 : 28,
                height: device === "tablet" ? 50 : 28,
              }}
              source={require("../../assets/superApp/digitalsign.png")}
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
          Digital Sign
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MainCuti")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                height: device === "tablet" ? 50 : 32,
              }}
              source={require("../../assets/superApp/cuti.png")}
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
          Cuti
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MainSPPD")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
              source={require("../../assets/superApp/sppd.png")}
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
          SPPD
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MyTask")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 50 : 28,
                height: device === "tablet" ? 50 : 28,
              }}
              source={require("../../assets/superApp/task-ikon.png")}
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
          Task
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ListPegawai")}>
          <View
            style={[
              device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                width: device === "tablet" ? 50 : 28,
                height: device === "tablet" ? 50 : 28,
              }}
              source={require("../../assets/superApp/pegawai-ikon.png")}
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
          Pegawai
        </Text>
      </View>
    );
    if (isRolePreShare) {
      tmpMenu.splice(
        2,
        0,
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("MainRepo")}>
            <View
              style={[
                device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                  width: device === "tablet" ? 50 : 30,
                  height: device === "tablet" ? 40 : 24,
                }}
                source={require("../../assets/superApp/repositori.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: wp(15),
            }}
            numberOfLines={1}
          >
            Preparing dan Sharing
          </Text>
        </View>
      );
    }
    if (isRoleKalender) {
      tmpMenu.splice(
        7,
        0,
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("GrupKalender")}>
            <View
              style={[
                device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                  width: device === "tablet" ? 50 : 28,
                  height: device === "tablet" ? 50 : 28,
                }}
                source={require("../../assets/superApp/kalender-ikon.png")}
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
            Kalender
          </Text>
        </View>
      );
    }
    // if (isRoleTaskManagement) {
    //     tmpMenu.push(
    //         <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
    //             <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
    //                 <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
    //                     <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/task-ikon.png')} />
    //                 </View>
    //             </TouchableOpacity>
    //             <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Task</Text>
    //         </View>
    //     )
    // }
    if (isRoleEvent) {
      tmpMenu.push(
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("HalamanUtama")}>
            <View
              style={[
                device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
                  width: device === "tablet" ? 50 : 28,
                  height: device === "tablet" ? 50 : 28,
                }}
                source={require("../../assets/superApp/agenda-ikon.png")}
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
            Agenda{" "}
          </Text>
        </View>
      );
    }

    setListMenu(tmpMenu);
  }, [profile]);

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          gap: wp(6),
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {listMenu &&
          listMenu.length > 0 &&
          listMenu.map((item, index) => {
            if (index <= 3) {
              return <Fragment>{item}</Fragment>;
            }
          })}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: wp(6),
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {listMenu &&
          listMenu.length > 4 &&
          listMenu.map((item, index) => {
            if (index > 3 && index < 7) return <Fragment>{item}</Fragment>;
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
                  device == "tablet" ? styles.cardAppsTablet : styles.cardApps,
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
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    width: "90%",
    height: hp(30),
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
