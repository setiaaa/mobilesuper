import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { } from "react-native";
import { useSelector } from "react-redux";

function MyTabBarPengetahuan({ props, navigation }) {
  const bottomSheetModalAddRef = useRef(null);
  const [tabItemIndex, setTabItemIndex] = useState(1);
  const { profile } = useSelector(state => state.superApps);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAdd = () => {
    bottomSheetModalAddRef.current?.present();
  };

  const roleIku = ['MP.PNL', 'PNL.SES.BKIPMKHP', 'PNL.SES.BRSDM', 'PNL.SES.DJPB', 'PNL.SES.DJPDSPKP', 'PNL.SESDJPT', 'PNL.SES.IJ', 'PNL.SES.PSD', 'PNL.SES.SEKJEN'];
  const roleLaporanPenilaian = ['MP.PNL', 'PNL.SES.BKIPMKHP', 'PNL.SES.BRSDM', 'PNL.SES.DJPB', 'PNL.SES.DJPDSPKP', 'PN.SES.DJPRL', 'PNL.SES.DJPSDKP', 'PNL.SES.DJPT', 'PNL.SES.IJ', 'PNL.SES.PSD', 'PNL.SES.SEKJEN'];

  const hasRequiredRoles = (userRoles, appRoles) => {
    return appRoles.some(role => userRoles.includes(role));
  };

  return (
    < >
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
              navigation.navigate("LiniMasa", { unread: false });
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
                <Ionicons
                  name="school-outline"
                  color={COLORS.primary}
                  size={24}
                  style={{ position: "absolute", top: 5 }}
                />
                <Text style={{ color: COLORS.primary, position: "absolute", bottom: 15, fontSize:FONTSIZE.H3 }}>Linimasa</Text>
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
                <Ionicons name="school-outline" color={COLORS.grey} size={24} style={{ position: "absolute", top: 5 }} />
                <Text style={{ color: COLORS.grey, position: "absolute", bottom: 15,fontSize:FONTSIZE.H3 }}>Linimasa</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            key={2}
            onPress={() => {
              setTabItemIndex(2);
              navigation.navigate("PostinganSaya", { unread: false });
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
                <Ionicons
                  name="home-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={{ color: COLORS.primary, textAlign: "center",fontSize:FONTSIZE.H3 }}>
                  Postingan Saya
                </Text>
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
                <Text style={{ color: COLORS.grey, textAlign: "center",fontSize:FONTSIZE.H3 }}>
                  Postingan Saya
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {hasRequiredRoles(profile?.roles_access, roleIku) ? (
            <TouchableOpacity
              key={3}
              onPress={() => {
                setTabItemIndex(3);
                navigation.navigate("RangkumanIKU", { unread: false });
                // props.navigation.navigate('Home', { unread: false })
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
                  <Ionicons
                    name="document-text-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={{ color: COLORS.primary, textAlign: "center",fontSize:FONTSIZE.H3 }}>
                    Rangkuman IKU
                  </Text>
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
                  <Ionicons
                    name="document-text-outline"
                    color={COLORS.grey}
                    size={24}
                  />
                  <Text style={{ color: COLORS.grey, textAlign: "center",fontSize:FONTSIZE.H3 }}>
                    Rangkuman IKU
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : null}

          {hasRequiredRoles(profile?.roles_access, roleLaporanPenilaian) ? (
            <TouchableOpacity
              key={4}
              onPress={() => {
                setTabItemIndex(4);
                navigation.navigate("LaporanPengetahuan", { unread: false });
                // props.navigation.navigate('Home', { unread: false })
              }}
            >
              {tabItemIndex === 4 ? (
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
                  <Ionicons
                    name="chatbubbles-outline"
                    color={COLORS.primary}
                    size={24}
                    style={{ position: "absolute", top: 5 }}
                  />
                  <Text style={{ color: COLORS.primary, position: "absolute", bottom: 20,fontSize:FONTSIZE.H3 }}>Laporan</Text>
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
                  <Ionicons
                    name="chatbubbles-outline"
                    color={COLORS.grey}
                    size={24}
                    style={{ position: "absolute", top: 5 }}
                  />
                  <Text style={{ color: COLORS.grey, position: "absolute", bottom: 15,fontSize:FONTSIZE.H3 }}>Laporan</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : null}

          {hasRequiredRoles(profile?.roles_access, roleLaporanPenilaian) ? (
            <TouchableOpacity
              key={5}
              onPress={() => {
                setTabItemIndex(5);
                navigation.navigate("PenilaianPenggetahaun", { unread: false });
                // props.navigation.navigate('Home', { unread: false })
              }}
            >
              {tabItemIndex === 5 ? (
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
                  <Ionicons
                    name="document-text-outline"
                    color={COLORS.primary}
                    size={24}
                    style={{ position: "absolute", top: 5 }}
                  />
                  <Text style={{ color: COLORS.primary, position: "absolute", bottom: 15,fontSize:FONTSIZE.H3 }}>Penilaian</Text>
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
                  <Ionicons
                    name="document-text-outline"
                    color={COLORS.grey}
                    size={24}
                    style={{ position: "absolute", top: 5 }}
                  />
                  <Text style={{ color: COLORS.grey, position: "absolute", bottom: 15,fontSize:FONTSIZE.H3 }}>Penilaian</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </BottomSheetModalProvider>
    </ >
  );
}

const styles = StyleSheet.create({});
export default MyTabBarPengetahuan;
