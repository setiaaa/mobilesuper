import React from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { COLORS } from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CardVideo = ({ setModalVisibleVideo }) => {
  return (
    <View style={{ alignItems: "center", height: "15%" }}>
      <Image
        source={require("../../assets/superApp/hq720.webp")}
        style={{ width: "90%", height: "90%", borderRadius: 16 }}
      />
      <View
        style={{
          backgroundColor: COLORS.white,
          width: "80%",
          borderRadius: 16,
          position: "absolute",
          bottom: 0,
          padding: 5,
        }}
      >
        <View
          key={4}
          style={{
            top: -20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                width: 41,
                height: 41,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
              onPress={() => setModalVisibleVideo(true)}
            >
              <Ionicons name="play-outline" color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: "center", color: COLORS.lighter }}>
            Menteri Trenggono Melakukan Panen Parsial Kedua di BUBK Kebumen
          </Text>
        </View>
      </View>
    </View>
  );
};
