import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
  getOrientation,
} from "../../config/SuperAppps";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { nde_api } from "../../utils/api.config";
import { getHTTP } from "../../utils/http";

const Cardlist = ({ item, loading, CARD_WIDTH, device, orientation }) => (
  <View
    style={[
      styles.card,
      {
        width: CARD_WIDTH,
        backgroundColor:
          item.type === "agenda_in"
            ? COLORS.infoLight
            : item.type === "sign"
            ? "#d2e9e8"
            : item.type === "onprogress"
            ? COLORS.successLight
            : null,
      },
    ]}
  >
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      <Text
        style={[
          styles.title,
          {
            fontSize: device === "tablet" ? 20 : 10,
            width:
              device === "tablet" && orientation === "landscape"
                ? "85%"
                : device === "tablet" && orientation === "potrait"
                ? "80%"
                : "70%",
          },
        ]}
      >
        {item.type === "agenda_in"
          ? "Surat Masuk"
          : item.type === "sign"
          ? "Perlu TTDE"
          : item.type === "onprogress"
          ? "Perlu Diperoses"
          : null}
      </Text>

      {item.type === "agenda_in" ? (
        <MaterialIcons
          name="move-to-inbox"
          size={device === "tablet" ? 40 : 24}
          color={COLORS.info}
          style={{ opacity: 0.2 }}
        />
      ) : item.type === "sign" ? (
        <MaterialCommunityIcons
          name="email-edit-outline"
          size={device === "tablet" ? 40 : 24}
          color={COLORS.info}
          style={{ opacity: 0.2 }}
        />
      ) : item.type === "onprogress" ? (
        <MaterialCommunityIcons
          name="email-edit"
          size={device === "tablet" ? 40 : 24}
          color={COLORS.info}
          style={{ opacity: 0.2 }}
        />
      ) : null}
    </View>
    {loading ? (
      <ActivityIndicator
        size="small"
        color={COLORS.primary}
        style={{ marginTop: 10 }}
      />
    ) : (
      <View
        style={{
          borderRadius: 10,
          backgroundColor:
            item.type === "agenda_in"
              ? COLORS.info
              : item.type === "sign"
              ? "#4CB9B4"
              : item.type === "onprogress"
              ? COLORS.success
              : null,
          width: device === "tablet" ? "50%" : "90%",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          flexDirection: "row",
          gap: device == "tablet" ? 8 : 5,
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            width: device === "tablet" ? 10 : 5,
            height: device === "tablet" ? 10 : 5,
            borderRadius: 50,
            backgroundColor: COLORS.white,
          }}
        />
        <Text
          style={[styles.value, { fontSize: fontSizeResponsive("H4", device) }]}
        >
          {item.value}
        </Text>
        <Text
          style={[styles.value, { fontSize: fontSizeResponsive("H4", device) }]}
        >
          New
        </Text>
      </View>
    )}
  </View>
);

export const CardCounterApps = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0); // State untuk paginasi
  const { profile, typeMenu } = useSelector((state) => state.superApps);
  const { profile: profileKores = {} } = useSelector((state) => state.profile);
  const { device } = useSelector((state) => state.apps);
  const [counter, setCounter] = useState([
    { count: 1, type: "onprogress", value: 0 },
    { count: 2, type: "agenda_in", value: 0 },
    { count: 6, type: "sign", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions(); // Ambil lebar layar

  const CARD_MARGIN = 16;
  const numColumns = 3; // Tetap 3 kolom
  const CARD_WIDTH = (width - CARD_MARGIN * (numColumns * 2)) / numColumns;

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  let orientation = getOrientation(screenWidth, screenHeight);

  useEffect(() => {
    const getIsCounter = async () => {
      try {
        const response = await getHTTP(nde_api.dashboard);
        if (response?.data?.length > 0) {
          setCounter(response.data);
        } else {
          console.log("Data kosong");
        }
      } catch (error) {
        if (!error?.response?.status && !error?.status) {
          console.warn("Unknown error", error);
        } else if (error?.status === 401 || error?.response?.status === 401) {
          Sentry.captureEvent(error?.response);
        } else {
          handlerError(error, "Peringatan!", "Counter tidak berfungsi!");
          console.error(error);
        }
      } finally {
        setLoading(false); // Pastikan loading state diubah meskipun terjadi error
      }
    };

    getIsCounter();
  }, []);

  const order = ["agenda_in", "sign", "onprogress"];

  const filteredData = counter
    .filter((item) => order.includes(item.type)) // Filter hanya data yang diperlukan
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type)); // Urutkan sesuai array 'order'

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: fontSizeResponsive("H4", device),
          fontWeight: FONTWEIGHT.bold,
          color: COLORS.grey,
        }}
      >
        Korespondensi
      </Text>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Cardlist
            item={item}
            loading={loading}
            CARD_WIDTH={CARD_WIDTH}
            device={device}
            orientation={orientation}
          />
        )}
        keyExtractor={(item) => item.type}
        numColumns={numColumns} // Menampilkan 3 card dalam satu baris
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 12,
    padding: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    elevation: 1,
    height: "100%",
  },
  listContainer: {
    alignItems: "center",
  },
  card: {
    padding: 10,
    margin: 8,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 4, // Shadow untuk Android
    shadowColor: "#000", // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    color: "#374151",
  },
  value: {
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default CardCounterApps;
