import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import {} from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

const dataRoleDashboard = ["D_KK", "D_KP", "D_BD", "D_PK"];
const dataRoleDashboardKeuangan = ["D_KK"];
const dataRoleDashboardkepegawaian = ["D_KP"];
const dataRoleDashboardbudidaya = ["D_BD"];
const dataRoleDashboardpenangkapan = ["D_PK"];

function MyTabBar({ props, navigation }) {
  const [tabItemIndex, setTabItemIndex] = useState(1);

  const [visibleModal, setVisibleModal] = useState(false);

  const { profile } = useSelector((state) => state.superApps);
  console.log(profile);
  const isRole = profile.roles_access.some((item) =>
    dataRoleDashboard.includes(item)
  );
  const isRoleKeuangan = profile.roles_access.some((item) =>
    dataRoleDashboardKeuangan.includes(item)
  );
  const isRoleKepegawaian = profile.roles_access.some((item) =>
    dataRoleDashboardkepegawaian.includes(item)
  );
  const isRoleBudidaya = profile.roles_access.some((item) =>
    dataRoleDashboardbudidaya.includes(item)
  );
  const isRolePenangkapan = profile.roles_access.some((item) =>
    dataRoleDashboardpenangkapan.includes(item)
  );
  return (
    <BottomSheetModalProvider>
      <>
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
              navigation.navigate("Home", { unread: false });
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
                <Text style={{ color: COLORS.primary }}>Home</Text>
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
                <Ionicons name="home" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>Home</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            key={2}
            onPress={() => {
              setTabItemIndex(2);
              navigation.navigate("Satker", { unread: false });
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
                  name="business-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={{ color: COLORS.primary }}>Satker</Text>
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
                  name="business-outline"
                  color={COLORS.grey}
                  size={24}
                />
                <Text style={{ color: COLORS.grey }}>Satker</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity
                            key={4}
                            onPress={() => {
                                setTabItemIndex(4)
                                // navigation.navigate('Tp', { unread: false })
                                setVisibleModal(true)
                            }}
                            style={{
                                top: -35,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                height: 70,
                                width: 70,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <View style={{
                                    backgroundColor: COLORS.primary,
                                    width: 51,
                                    height: 51,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Ionicons name='grid-outline' color={COLORS.white} size={24} />
                                </View>
                            </View>
                        </TouchableOpacity> */}

          {isRole ? (
            <TouchableOpacity
              key={3}
              onPress={() => {
                setTabItemIndex(3);
                setVisibleModal(true);
                // navigation.navigate('FAQ', { unread: false })
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
                    name="grid-outline"
                    color={COLORS.primary}
                    size={24}
                  />
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
                  <Ionicons name="grid-outline" color={COLORS.grey} size={24} />
                  <Text style={{ color: COLORS.grey }}>Dashboard</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            key={5}
            onPress={() => {
              setTabItemIndex(5);
              navigation.navigate("FAQ", { unread: false });
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
                <Ionicons name="reader" color={COLORS.primary} size={24} />
                <Text style={{ color: COLORS.primary }}>FAQ</Text>
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
                <Ionicons name="reader" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>FAQ</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            key={6}
            onPress={() => {
              setTabItemIndex(6);
              navigation.navigate("Profile", { unread: false });
              // props.navigation.navigate('Home', { unread: false })
            }}
          >
            {tabItemIndex === 6 ? (
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
                <Ionicons name="person" color={COLORS.primary} size={24} />
                <Text style={{ color: COLORS.primary }}>Profile</Text>
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
                <Ionicons name="person" color={COLORS.grey} size={24} />
                <Text style={{ color: COLORS.grey }}>Profile</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* 
                
                
                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'flex-end', flex: 1, marginRight: 20 }}>
                
                
                
            </View> */}

        <Modal
          animationType="fade"
          transparent={true}
          visible={visibleModal}
          onRequestClose={() => {
            setVisibleModal(!visibleModal);
          }}
        >
          <TouchableOpacity
            style={[
              Platform.OS === "ios"
                ? styles.iOSBackdrop
                : styles.androidBackdrop,
              styles.backdrop,
            ]}
          />
          <View style={{ alignItems: "center", flex: 1 }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                height: "40%",
                borderRadius: 10,
                marginTop: "70%",
              }}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Dashboard</Text>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    setVisibleModal(false);
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={COLORS.lighter}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                {isRoleKeuangan ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Keuangan");
                        setVisibleModal(false);
                      }}
                    >
                      <View
                        style={[
                          styles.cardApps,
                          {
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../assets/superApp/ikon-keuangan.png")}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: FONTSIZE.H4,
                        height: 40,
                      }}
                    >
                      Keuangan & Kinerja
                    </Text>
                  </View>
                ) : null}

                {isRoleKepegawaian ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Kepegawaian");
                        setVisibleModal(false);
                      }}
                    >
                      <View
                        style={[
                          styles.cardApps,
                          {
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../assets/superApp/ikon-kepagawaian.png")}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: FONTSIZE.H4,
                        height: 40,
                      }}
                    >
                      Kepegawaian
                    </Text>
                  </View>
                ) : null}

                {isRoleBudidaya ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ProduksiBudidaya");
                        setVisibleModal(false);
                      }}
                    >
                      <View
                        style={[
                          styles.cardApps,
                          {
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../assets/superApp/ikon-budidaya.png")}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontSize: FONTSIZE.H4,
                        height: 40,
                      }}
                    >
                      Produksi{"\n"}Budidaya
                    </Text>
                  </View>
                ) : null}
              </View>
              {isRolePenangkapan ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 10,
                    marginTop: 30,
                    marginHorizontal: 15,
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Penangkapan");
                        setVisibleModal(false);
                      }}
                    >
                      <View
                        style={[
                          styles.cardApps,
                          {
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../assets/superApp/ikon-penangkapan.png")}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        fontSize: FONTSIZE.H4,
                      }}
                    >
                      Produk Penangkapan
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          {/* <TouchableOpacity
                        onPress={() => {
                            setVisibleModal(false)
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '9%',
                            left: '40%'
                        }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            height: 70,
                            width: 70,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                            <View style={{
                                backgroundColor: COLORS.primary,
                                width: 51,
                                height: 51,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <Ionicons name='close-outline' color={COLORS.white} size={24} />
                            </View>
                        </View>
                    </TouchableOpacity> */}
        </Modal>
      </>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
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
  cardApps: {
    width: 48,
    height: 48,
    borderRadius: 50,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    //shadow android
    elevation: 5,
  },
});
export default MyTabBar;
