import React, { useEffect, useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTSIZE, fontSizeResponsive } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";

const numColumns = 3;

export const CardAppsB = ({ handlePressModal }) => {
  const navigation = useNavigation();
  const [listMenu, setListMenu] = useState([]);

  const { profile } = useSelector((state) => state.superApps);

  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  // const roleTaskManagement = ["TASK.USER"];
  const roleEvent = ["EVENT.USER"];

  const isRoleKalender = profile.roles_access?.some((item) =>
    roleKalender.includes(item)
  );
  const isRolePreShare = profile.roles_access?.some((item) =>
    rolePreShare.includes(item)
  );
  // const isRoleTaskManagement = profile.roles_access?.some((item) =>
  //   roleTaskManagement.includes(item)
  // );
  const isRoleEvent = profile.roles_access?.some((item) =>
    roleEvent.includes(item)
  );

  const { device } = useSelector((state) => state.apps);

  useEffect(() => {
    let tmpMenu = [];
    tmpMenu.push(
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MainKoresp")}>
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
                width: device === "tablet" ? 50 : 24,
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
            textAlign: device === "tablet" ? "center" : null,
            width: device === "tablet" ? 200 : null,
          }}
        >
          Korespondensi
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
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
                height: device === "tablet" ? 50 : 33,
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
          Regulasi
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
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
                width: device === "tablet" ? 40 : 23,
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
            width: device === "tablet" ? 200 : null,
            textAlign: "center",
          }}
        >
          Pengetahuan
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
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
            {/* <Ionicons name='school-outline' size={24} color={COLORS.primary} /> */}
            <Image
              style={{
                width: device === "tablet" ? 50 : 27,
                height: device === "tablet" ? 50 : 35,
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
            width: device === "tablet" ? 200 : null,
            textAlign: device === "tablet" ? "center" : null,
          }}
        >
          Digital Sign
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
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
                width: device === "tablet" ? 60 : 40,
                height: device === "tablet" ? 50 : 28,
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
          width: 100,
          height: 100,
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
                width: device === "tablet" ? 60 : 28,
                height: device === "tablet" ? 60 : 28,
              }}
              source={require("../../assets/superApp/sppd.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            textAlign: "center",
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
          width: 100,
          height: 100,
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
                width: device === "tablet" ? 60 : 35,
                height: device === "tablet" ? 60 : 32,
              }}
              source={require("../../assets/superApp/taskmanagement.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: fontSizeResponsive("H4", device),
            textAlign: "center",
            width: 300,
          }}
        >
          Task Management
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("KalenderPersonal")}
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
                width: device === "tablet" ? 60 : 35,
                height: device === "tablet" ? 60 : 32,
              }}
              source={require("../../assets/superApp/kalender.png")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            fontSize: fontSizeResponsive("H4", device),
            textAlign: "center",
            width: 300,
          }}
        >
          Kalender Personal
        </Text>
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
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
                width: device === "tablet" ? 50 : 25,
                height: device === "tablet" ? 55 : 29,
              }}
              source={require("../../assets/superApp/pegawai.png")}
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
      </View>,
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("SurveyLayanan")}>
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
                width: device === "tablet" ? 50 : 38,
                height: device === "tablet" ? 55 : 38,
              }}
              source={require("../../assets/superApp/surveylayanan.png")}
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
          Survei Layanan
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
            width: 100,
            height: 100,
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
                  width: device === "tablet" ? 50 : 28,
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
              textAlign: "center",
              width: device === "tablet" ? 400 : 200,
            }}
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
            width: 100,
            height: 100,
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
                  width: device === "tablet" ? 60 : 35,
                  height: device === "tablet" ? 60 : 35,
                }}
                source={require("../../assets/superApp/kalender.png")}
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
    //   tmpMenu.push(
    //     <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
    //       <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
    //         <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
    //           <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/task-ikon.png')} />
    //         </View>
    //       </TouchableOpacity>
    //       <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Task Management</Text>
    //     </View>
    //   )
    // }
    if (isRoleEvent) {
      tmpMenu.splice(
        8,
        0,
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
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
                  width: device === "tablet" ? 40 : 20,
                  height: device === "tablet" ? 60 : 35,
                }}
                source={require("../../assets/superApp/event.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: device === "tablet" ? 200 : null,
              textAlign: "center",
            }}
          >
            Agenda Rapat
          </Text>
        </View>
      );
    }
    // tmpMenu.push(

    // );

    setListMenu(tmpMenu);
  }, []);

  const numRows = Math.ceil(listMenu.length / 3);

  const renderRow = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={[styles.item, { height: device === "tablet" ? 200 : 100 }]}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    listMenu.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <View>
      <FlatList
        data={formatData(listMenu, numColumns)}
        renderItem={renderRow}
        keyExtractor={(row, index) => `row_${index}`}
        columnWrapperStyle={{
          marginHorizontal: "5%",
          gap: 5,
        }}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    width: "90%",
    height: 150,
    borderRadius: 12,
    marginVertical: 30,
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
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
});
