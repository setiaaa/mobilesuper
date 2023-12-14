import React, { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { COLORS, FONTSIZE } from "../../config/SuperAppps";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CardTautan = ({ setModalVisible }) => {
  return (
    <View style={styles.card}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Linking.openURL("https://halo-bupbj.com/");
            }}
          >
            <Image
              source={require("../../assets/superApp/BUPBJ.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ fontSize: FONTSIZE.H4 }}>Halo-BUPBJ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Linking.openURL("https://www.lapor.go.id/");
            }}
          >
            <Image
              source={require("../../assets/superApp/lapor.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}>
              Lapor.go.id
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Linking.openURL("https://wbs.kkp.go.id/registration");
            }}
          >
            <Image
              source={require("../../assets/superApp/wbs.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}>
              WBS KKP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Linking.openURL("https://sidak.kkp.go.id/login");
            }}
          >
            <Image
              source={require("../../assets/superApp/sidak.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}>
              Sidak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Linking.openURL("https://jdih.kkp.go.id/");
            }}
          >
            <Image
              source={require("../../assets/superApp/JDIH.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}>
              JDIH
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../../assets/superApp/white.png")}
              style={{ width: 48, height: 48 }}
            />
            <View style={{ position: "absolute", top: 11, right: 13 }}>
              <Ionicons
                size={20}
                name="ellipsis-horizontal"
                color={COLORS.grey}
              />
            </View>
            <Text style={{ textAlign: "center", fontSize: FONTSIZE.H4 }}>
              More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    borderRadius: 12,
  },
});
