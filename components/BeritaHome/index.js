import React from "react";
import { View } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
export const BeritaHome = ({ item, index }, parallaxProps) => {
  {
    console.log("lalala", item);
  }
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item.image }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <View
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: COLORS.grey,
              marginVertical: 5,
              fontSize: 10,
              fontWeight: 400,
            }}
          >
            {item.updated_at}
          </Text>
          <Text style={{ fontSize: 15, marginVertical: 10, fontWeight: 600 }}>
            {item.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  containerCard: {
    backgroundColor: "#F4F7FE",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 36,
    marginLeft: 20,
  },
  containerr: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  items: {
    width: screenWidth - 60,
    height: screenWidth - 170,
  },
  imageContainer: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    // borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  images: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  galeri: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
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
  cardVisiMisi: {
    backgroundColor: COLORS.primary,
    width: 77,
    height: 30,
    marginHorizontal: 15,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
