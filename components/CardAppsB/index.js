import React, { useEffect, useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTSIZE,
  fontSizeResponsive,
  imageApps,
} from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
import { getMenu, getMenuLite } from "../../service/session";
import { Loading } from "../Loading";

const numColumns = 3;

export const CardAppsB = ({
  handlePressModal,
  setModalBankom,
  setModalKepegawaian,
  closeBottomSheet,
}) => {
  const navigation = useNavigation();
  const [listMenu, setListMenu] = useState([]);
  const isFocused = useIsFocused();
  const { profile, typeMenu } = useSelector((state) => state.superApps);

  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  // const roleTaskManagement = ["TASK.USER"];
  const roleEvent = ["EVENT.USER"];
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
  //   roleTaskManagement.includes(item)
  // );
  const isRoleEvent = profile.roles_access?.some((item) =>
    roleEvent.includes(item)
  );

  const { device } = useSelector((state) => state.apps);

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
            setListMenu(parsedVal);
          } catch (e) {
            console.error("JSON Parse error:", e);
          }
        });
      }
    }
  }, [typeMenu, isFocused]);

  const numRows = Math.ceil(listMenu.length / 3);

  const renderRow = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={[styles.item, { height: device === "tablet" ? 200 : 100 }]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
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
