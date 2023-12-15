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
import { COLORS, FONTSIZE } from "../../config/SuperAppps";
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
              styles.cardApps,
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
              source={require("../../assets/superApp/korespondensi-ikon3.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
            width: device === "tablet" ? wp(16) : wp(15),
            textAlign: device === "tablet" ? "center" : null,
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
              styles.cardApps,
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
              source={require("../../assets/superApp/kebijakan-ikon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
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
              styles.cardApps,
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
              source={require("../../assets/superApp/pengetahuan-ikon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
            width: device === "tablet" ? wp(16) : wp(15),
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
              styles.cardApps,
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
              source={require("../../assets/superApp/digital-ikon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
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
              styles.cardApps,
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
              source={require("../../assets/superApp/cuti-ikon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
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
              styles.cardApps,
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
              source={require("../../assets/superApp/sppd-ikon.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE.H4,
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
              styles.cardApps,
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
            fontSize: FONTSIZE.H4,
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
              styles.cardApps,
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
            fontSize: FONTSIZE.H4,
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
                styles.cardApps,
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
                source={require("../../assets/superApp/preparing-ikon.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: FONTSIZE.H4,
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
                styles.cardApps,
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
              fontSize: FONTSIZE.H4,
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
                styles.cardApps,
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
              fontSize: FONTSIZE.H4,
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
                  styles.cardApps,
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
                  source={require("../../assets/superApp/more-ikon.png")}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                fontSize: FONTSIZE.H4,
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
    height: hp(25),
    borderRadius: 12,
    marginTop: 60,
    padding: 5,
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
});
