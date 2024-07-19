import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
  spacing,
} from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export const MenuDashboard = () => {
  const { device } = useSelector((state) => state.apps);

  const { profile } = useSelector((state) => state.superApps);
  const [listMenu, setListMenu] = useState([]);
  const navigation = useNavigation();

  const dataRoleDashboard = ["D_KK", "D_KP", "D_BD", "D_PK"];
  const dataRoleDashboardKeuangan = ["D_KK"];
  const dataRoleDashboardkepegawaian = ["D_KP"];
  const dataRoleDashboardbudidaya = ["D_BD"];
  const dataRoleDashboardpenangkapan = ["D_PK"];
  const dataRoleDashboardBantuanPemerintah = ["D_KP"];

  const numColumns = 3;

  const isRole = profile.roles_access?.some((item) =>
    dataRoleDashboard.includes(item)
  );
  const isRoleKeuangan = profile.roles_access?.some((item) =>
    dataRoleDashboardKeuangan.includes(item)
  );
  const isRoleKepegawaian = profile.roles_access?.some((item) =>
    dataRoleDashboardkepegawaian.includes(item)
  );
  const isRoleBudidaya = profile.roles_access?.some((item) =>
    dataRoleDashboardbudidaya.includes(item)
  );
  const isRolePenangkapan = profile.roles_access?.some((item) =>
    dataRoleDashboardpenangkapan.includes(item)
  );
  const isRoleBantuanPemerintah = profile.roles_access?.some((item) =>
    dataRoleDashboardBantuanPemerintah.includes(item)
  );

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

  useEffect(() => {
    let menuDash = [];
    if (isRoleKeuangan) {
      menuDash.push(
        <View
          style={{
            alignItems: "center",
            height: 150,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Keuangan");
              // setVisibleModal(false);
            }}
          >
            <View
              style={[
                styles.cardApps,
                {
                  backgroundColor: "#11C15B",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                },
              ]}
            >
              <Image
                style={{
                  width: device === "tablet" ? 50 : 26,
                  height: device === "tablet" ? 40 : 18,
                }}
                source={require("../../assets/superApp/ikon-keuangan.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: device === "tablet" ? 200 : 100,
              textAlign: "center",
            }}
          >
            Keuangan dan Kinerja
          </Text>
        </View>
      );
    }

    if (isRoleKepegawaian) {
      menuDash.push(
        <View
          style={{
            alignItems: "center",
            height: 150,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Kepegawaian");
              // setVisibleModal(false);
            }}
          >
            <View
              style={[
                styles.cardApps,
                {
                  backgroundColor: "#F6AD1D",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                },
              ]}
            >
              <Image
                style={{
                  width: device === "tablet" ? 50 : 24,
                  height: device === "tablet" ? 50 : 25,
                }}
                source={require("../../assets/superApp/ikon-kepagawaian.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: device === "tablet" ? 200 : 100,
              textAlign: "center",
            }}
          >
            Kepegawaian
          </Text>
        </View>
      );
    }

    if (isRoleBantuanPemerintah) {
      menuDash.push(
        <View
          style={{
            alignItems: "center",
            height: 150,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BantuanPemerintah");
              // setVisibleModal(false);
            }}
          >
            <View
              style={[
                styles.cardApps,
                {
                  backgroundColor: "#B745FF",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                },
              ]}
            >
              <Image
                style={{
                  width: device === "tablet" ? 50 : 24,
                  height: device === "tablet" ? 50 : 24,
                }}
                source={require("../../assets/superApp/ikon-perencanaan.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: device === "tablet" ? 200 : 100,
              textAlign: "center",
            }}
          >
            Bantuan Pemerintah
          </Text>
        </View>
      );
    }
    if (isRoleBudidaya) {
      menuDash.push(
        <View
          style={{
            alignItems: "center",
            height: 150,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProduksiBudidaya");
              // setVisibleModal(false);
            }}
          >
            <View
              style={[
                styles.cardApps,
                {
                  backgroundColor: "#38B2AC",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                },
              ]}
            >
              <Image
                style={{
                  width: device === "tablet" ? 50 : 24,
                  height: device === "tablet" ? 50 : 24,
                }}
                source={require("../../assets/superApp/ikon-budidaya.png")}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: fontSizeResponsive("H4", device),
              width: device === "tablet" ? 200 : 100,
              textAlign: "center",
            }}
          >
            Produksi Budidaya
          </Text>
        </View>
      );
    }
    if (isRolePenangkapan) {
      menuDash.push(
        <View
          style={{
            alignItems: "center",
            height: 150,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 100,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Penangkapan");
                // setVisibleModal(false);
              }}
            >
              <View
                style={[
                  styles.cardApps,
                  {
                    backgroundColor: "#1868AB",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  },
                ]}
              >
                <Image
                  style={{
                    width: device === "tablet" ? 50 : 24,
                    height: device === "tablet" ? 50 : 18,
                  }}
                  source={require("../../assets/superApp/ikon-penangkapan.png")}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                fontSize: fontSizeResponsive("H4", device),
                width: device === "tablet" ? 200 : 100,
                textAlign: "center",
              }}
            >
              Produksi Penangkapan
            </Text>
          </View>
        </View>
      );
    }

    setListMenu(menuDash);
  }, [profile]);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          height: 80,
        }}
      >
        <View style={{ flex: 1, alignItems: "center", marginLeft: 40 }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
              marginRight: 40,
            }}
          >
            Dashboard & Report
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={formatData(listMenu, numColumns)}
          renderItem={renderRow}
          keyExtractor={(row, index) => `row_${index}`}
          columnWrapperStyle={{
            gap: 5,
          }}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  cardApps: {
    width: wp(15),
    height: wp(15),
    borderRadius: 50,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    //shadow android
    elevation: 5,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 1, // approximate a square
    marginTop: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
});
