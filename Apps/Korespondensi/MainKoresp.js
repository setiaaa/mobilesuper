import { View } from "react-native";
import { BottomTabsKoresp } from "../../utils/menutab";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { COLORS, fontSizeResponsive } from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

export default function MainKoresp() {
  const navigation = useNavigation();

  const { device } = useSelector((state) => state.apps);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          height: 80,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: 600,
              color: COLORS.white,
            }}
          >
            Korespondensi
          </Text>
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomTabsKoresp />
      </BottomSheetModalProvider>
    </>
  );
}
