import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { COLORS } from "../../config/SuperAppps";
import {} from "react-native";
import { Config } from "../../constants/config";

function MyTabKoresp({ props, navigation }) {
  const [tabItemIndex, setTabItemIndex] = useState(1);

  return (
    <>
      <BottomSheetModalProvider>
        <View
          style={{
            flexDirection: "row",
            height: 68,
            backgroundColor: COLORS.white,
            justifyContent: "space-around",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <TouchableOpacity
            key={1}
            onPress={() => {
              setTabItemIndex(1);
              navigation.navigate("DCounter");
              // props.navigation.navigate('Home', { unread: false })
            }}
          >
            {tabItemIndex === 1 ? (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    top: 0,
                    //shadow ios
                    shadowOffset: { width: -2, height: 5 },
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.4,
                    //shadow android
                    elevation: 2,
                  }}
                />
                <Ionicons name="home" color={COLORS.primary} size={24} />
                <Text style={{ color: COLORS.primary }}>Dashboard</Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <Ionicons name="home-outline" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>Dashboard</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            key={2}
            onPress={() => {
              setTabItemIndex(2);
              navigation.navigate("DLetter");
              // props.navigation.navigate('Home', { unread: false })
            }}
          >
            {tabItemIndex === 2 ? (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    top: 0,
                    //shadow ios
                    shadowOffset: { width: -2, height: 5 },
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.4,
                    //shadow android
                    elevation: 2,
                  }}
                />
                <Ionicons name="mail" color={COLORS.primary} size={24} />
                <Text style={{ color: COLORS.primary }}>Dokumen</Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <Ionicons name="mail-outline" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>Dokumen</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            key={3}
            onPress={() => {
              setTabItemIndex(3);
              navigation.navigate("DPencarian");
            }}
          >
            {tabItemIndex === 3 ? (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    top: 0,
                    //shadow ios
                    shadowOffset: { width: -2, height: 5 },
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.4,
                    //shadow android
                    elevation: 2,
                  }}
                />
                <Ionicons name="search" color={COLORS.primary} size={24} />
                <Text style={{ color: COLORS.primary }}>Pencarian</Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  height: 65,
                  justifyContent: "center",
                  width: 80,
                }}
              >
                <Ionicons name="search-outline" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>Pencarian</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({});
export default MyTabKoresp;
