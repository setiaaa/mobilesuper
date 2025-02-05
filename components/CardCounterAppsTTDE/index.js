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

export const CardCounterAppsTTDE = () => {
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
        Need Sign
      </Text>

      {/* <FlatList
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
      /> */}
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
    marginBottom: 10,
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
