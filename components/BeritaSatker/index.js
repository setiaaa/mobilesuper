import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { getOrientation } from "../../config/SuperAppps";

export const BannerBeritaSatker = ({ item, index, parallaxProps }) => {
    const { device } = useSelector((state) => state.apps);
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    const getWidthCarousel = () => {
      let tempWidth = 0;
      let orientation = getOrientation(screenWidth, screenHeight);
    }
    return (
      <View
        style={{
          width: getWidthCarousel(),
          // height: getHeightCarousel(),
        }}
      >
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
          <Text
            style={{ marginLeft: 10, color: "#6B7280", marginVertical: 10 }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
    galeri: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: "white",
      borderRadius: 8,
    },
    containerr: {
      flex: 1,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: "white",
      borderRadius: 8,
      // borderTopLeftRadius: 8,
      // borderTopRightRadius: 8
      resizeMode: "cover",
      aspectRatio: 16 / 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover",
      aspectRatio: 16 / 8,
    },
    images: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover",
      aspectRatio: 16 / 8,
    },
    cardListSatker: {
      backgroundColor: "#FFFFFF",
      flexDirection: "column",
      // width: "86%",
      // marginLeft: 25,
      opacity: 0.9,
      borderRadius: 5,
      marginVertical: 10,
      // marginHorizontal: 20,
    },
    vertical: {
      rotation: 12,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 8,
    },
  });