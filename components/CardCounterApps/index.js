import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { COLORS, FONTWEIGHT, getOrientation } from "../../config/SuperAppps";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export const CardCounterApps = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0); // State untuk paginasi
  const { profile, typeMenu } = useSelector((state) => state.superApps);
  const { profile: profileKores = {} } = useSelector((state) => state.profile);
  const { device } = useSelector((state) => state.apps);

  const data = [
    { title: "Korespondensi", content: "Surat belum diproses", need_sign: 20 },
    {
      title: "Slide 2",
      content: "Ini adalah konten slide kedua",
      need_sign: 20,
    },
    {
      title: "Slide 3",
      content: "Ini adalah konten slide ketiga",
      need_sign: 20,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { height: device == "tablet" ? 180 : 180 }]}>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={[styles.card, { width: device === "tablet" ? "95%" : "90%" }]}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="envelope-letter"
                size={24}
                color={COLORS.grey}
              />
            </View>
            <View>
              <View
                style={[
                  styles.infoContainer,
                  { width: device === "tablet" ? "95%" : "85%" },
                ]}
              >
                <Text style={styles.count}>{item.need_sign}</Text>
                <MaterialIcons name="call-made" size={24} color={COLORS.grey} />
              </View>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const getWidthCarousel = () => {
    return device === "tablet" ? screenWidth - 50 : screenWidth - 30;
  };

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        sliderHeight={150}
        itemWidth={getWidthCarousel()}
        itemHeight={screenHeight * 0.4}
        vertical={true}
        loop={true}
        windowSize={3}
        onSnapToItem={(index) => setActiveSlide(index)}
      />

      {/* Pagination di luar card */}
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDot}
          vertical={true}
        />
      </View>
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
  slide: {
    borderRadius: 10,
    padding: 10,
  },
  card: {
    backgroundColor: COLORS.ExtraDivinder,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    // width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.grey,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    color: COLORS.grey,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "85%",
  },
  count: {
    fontWeight: FONTWEIGHT.bold,
    fontSize: 30,
  },

  // Pagination Styles
  paginationContainer: {
    position: "absolute",
    right: 0, // Diletakkan di luar card
    top: "50%",
    zIndex: 10, // Memastikan pagination tampil di atas elemen lain
  },
  pagination: {
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: COLORS.grey,
  },
});

export default CardCounterApps;
