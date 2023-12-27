import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setFAB } from "../../store/snackbar";
import { initDownload } from "../../utils/agenda";

//toolbar custom
export const toolbarBack = ({ navigation, title, route, options, back }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{
        height: 55,
        backgroundColor: COLORS.white,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.containerHeaderLeft}>
          <TouchableOpacity
            onPress={() => {
              if (route?.params?.title == "Lihat Surat") {
                dispatch(setFAB(false));
              }
              navigation.goBack();
            }}
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
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={16}
              // color={COLORS.white}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/superApp/LogoKorespondensi.png")}
          />
        </View>

        <Text style={{ fontSize: 15, fontWeight: 600, textAlign: "right" }}>
          {title ? title : route?.params?.title}
        </Text>
        {route?.params?.title == "Lihat Surat" && (
          <TouchableOpacity
            onPress={() => {
              initDownload(route?.params?.selected);
            }}
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
            }}
          >
            <Ionicons name="share-social" size={16} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
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
    gap: 10,
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
