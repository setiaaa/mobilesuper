import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import RenderHTML from "react-native-render-html";

export const DetailBerita = () => {
  // const { item } = params;
  const navigation = useNavigation();

  const { berita } = useSelector((state) => state.superApps);

  const detail = berita.detail;
  const source = {
    html: detail.content,
  };
  const { width } = useWindowDimensions();

  const tagsStyles = {
    body: {
      whiteSpace: "normal",
      color: "black",
      fontSize: 18,
    },
    img: {
      width: 300,
      marginVertical: 40,
    },
    p: {
      fontSize: 14,
    },
    h5: {
      fontSize: 18,
    },
  };

  const classesStyles = {
    content: {
      padding: 30,
    },
    "news-title": {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    // description: {
    //   backgroundColor: "red",
    // },
    media: {
      fontSize: 16,
    },
  };

  const baseStyles = {};

  console.log(berita.detail);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: COLORS.primary }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", zIndex: 1 }}
          >
            <View
              style={[
                styles.backIcon,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                  marginLeft: 20,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.white,
              height: "100%",
              paddingTop: 50,
            }}
          >
            <RenderHTML
              source={source}
              contentWidth={width}
              tagsStyles={tagsStyles}
              classesStyles={classesStyles}
              baseStyle={baseStyles}
            />
          </View>
        </View>
      </ScrollView>
    </View  >
  );
};

const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: "white",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  imageIos: {
    width: "100%",
    height: 260,
  },
  imageAndroid: {
    width: "100%",
    height: 260,
  },
});
