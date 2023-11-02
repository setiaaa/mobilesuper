import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { Config } from "../../constants/config";
import { GlobalStyles } from "../../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { useState } from "react";

//toolbar custom
export const toolbarBack = ({ navigation, title, route, options, back }) => {

  return (
    <SafeAreaView style={{ height: 95, backgroundColor: COLORS.white }}>
      <View style={{ paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={styles.containerHeaderLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}
            style={{
              backgroundColor: COLORS.white,
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}>
            <Ionicons
              name="chevron-back-outline"
              size={16}
            // color={COLORS.white} 
            />
          </TouchableOpacity>
          <Image source={require("../../assets/superApp/LogoKorespondensi.png")} />
        </View>

        <Text style={{ fontSize: 15, fontWeight: 600 }}>{title}</Text>
      </View>
    </SafeAreaView>
    // <View style={styles.containerHeader}>
    //   <View style={styles.containerHeaderLeft}>
    //     <IconButton
    //       icon="chevron-left"
    //       size={26}
    //       color="black"
    //       onPress={() => navigation.goBack()}
    //     />
    //     <Image style={styles.logoHeader} source={Config.logoHeader} />
    //   </View>
    //   <Text style={styles.titleHeader}>{route.params.title}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  containerHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  titleHeader: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 16,
  },
  logoHeader: {
    height: 30,
    width: 60,
  },
});
