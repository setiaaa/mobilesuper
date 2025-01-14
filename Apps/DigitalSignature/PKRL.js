import React, { useMemo, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Text, Image } from "react-native";
import {
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Search } from "../../components/Search";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useEffect } from "react";
import ListEmpty from "../../components/ListEmpty";
import {
  getDetailDigisign,
  getListRejected,
  getListComposer,
  getListDraft,
  getListInProgress,
  getListSignedDigiSign,
  tandaTanganMentri,
  getListRetry,
  getCounterPerizinanMenteri,
  getListTrack,
} from "../../service/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getTokenValue } from "../../service/session";
import { setDigitalSignLists, setStatus } from "../../store/DigitalSign";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";
import { Config } from "../../constants/config";
import { CardListPerizinanMenteri } from "../../components/CardlistPerizinanMenteri";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ModalSubmit } from "../../components/ModalSubmit";
import moment from "moment";
import * as LocalAuthentication from "expo-local-authentication";
import { CardListPKRL } from "../../components/CardListPKRL";

export const PKRL = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTab = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("dokumen_pkrl");
  const [variant, SetVariant] = useState("composer");
  const [filterData, setFilterData] = useState([]);
  const [isSelected, setSelection] = useState([]);
  const [page, setPage] = useState(10);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (currentTab === "PKRL") {
      dispatch(getListComposer({ token: token, tipe: tipe, search: search }));
    }
  }, [token, tipe, currentTab]);

  const { dokumenlain, loading, status, counter } = useSelector(
    (state) => state.digitalsign
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (token !== "" && currentTab === "PKRL") {
        if (variant === "inprogress") {
          dispatch(
            getListInProgress({ token: token, tipe: tipe, search: search })
          );
        } else if (variant === "signed") {
          dispatch(
            getListSignedDigiSign({ token: token, tipe: tipe, search: search })
          );
        } else if (variant === "composer") {
          dispatch(
            getListComposer({
              token: token,
              tipe: tipe,
              page: page,
              search: search,
            })
          );
        } else if (variant === "track") {
          dispatch(
            getListTrack({
              token: token,
              tipe: tipe,
              page: page,
              search: search,
            })
          );
        }
      }
    } catch (error) {}

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, tipe, currentTab]);

  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["25%"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = () => {
    bottomSheetModalRef.current?.present();
  };

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const currentDate = new Date();

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable) return bottomSheetModalRef.current?.present();

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) return bottomSheetModalRef?.current?.present();

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });
    // Log the user in on success
    if (biometricAuth.success) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const payload = {
      passphrase: "",
      id_documents: isSelected,
      sign_date: moment(currentDate, "YYYY-MM-DD HH:mm:ss").format(
        DATETIME.LONG_DATE
      ),
      comment: "Dokumen sudah di tanda tangan",
    };
    const data = {
      token: token,
      payload: payload,
    };
    dispatch(tandaTanganMentri(data));
  };

  const checkAll = () => {
    // Check If isSelected already exists (length !== 0)
    if (isSelected.length === dokumenlain.lists.length) {
      setSelection([]);
    }
    // If isSelected still empty or all data hasn't checked
    else {
      let tmp = [];
      dokumenlain.lists.map((item) => {
        tmp.push(item?.id);
      });
      setSelection(tmp);
    }
  };

  const filterHandlerInProgress = () => {
    SetVariant("inprogress");
    dispatch(getListInProgress({ token: token, tipe: tipe, search: search }));
  };

  const filterHandlerSigned = () => {
    SetVariant("signed");
    dispatch(
      getListSignedDigiSign({ token: token, tipe: tipe, search: search })
    );
  };

  const filterHandlerTrack = () => {
    SetVariant("track");
    dispatch(getListTrack({ token: token, tipe: tipe, search: search }));
  };

  const filterHandlerRetry = () => {
    SetVariant("composer");
    dispatch(
      getListComposer({ token: token, tipe: tipe, page: page, search: search })
    );
  };

  const { profile } = useSelector((state) => state.superApps);

  const { device } = useSelector((state) => state.apps);

  const loadMore = () => {
    if (dokumenlain?.lists?.length !== 0) {
      if (dokumenlain.lists.length % 5 === 0) {
        setPage((prevPage) => prevPage + 10);
      }
    }
  };

  useEffect(() => {
    if (variant === "inprogress" && currentTab === "PKRL") {
      dispatch(
        getListInProgress({
          token: token,
          tipe: tipe,
          page: page,
          search: search,
        })
      );
    } else if (variant === "signed" && currentTab === "PKRL") {
      dispatch(
        getListSignedDigiSign({
          token: token,
          tipe: tipe,
          page: page,
          search: search,
        })
      );
    } else if (variant === "composer" && currentTab === "PKRL") {
      dispatch(
        getListComposer({
          token: token,
          tipe: tipe,
          page: page,
          search: search,
        })
      );
    } else if (variant === "track" && currentTab === "PKRL") {
      dispatch(
        getListTrack({
          token: token,
          tipe: tipe,
          page: page,
          search: search,
        })
      );
    }
  }, [page, token, tipe, search, currentTab]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {loading ? <Loading /> : null}
        <View style={{ position: "relative", flex: 1 }}>
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
                width: device === "tablet" ? 40 : 28,
                height: device === "tablet" ? 40 : 28,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons
                  name="chevron-back-outline"
                  size={device === "tablet" ? 40 : 24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H1", device),
                  fontWeight: FONTWEIGHT.bold,
                  color: COLORS.white,
                }}
              >
                Perizinan Menteri
              </Text>
            </View>
            {/* {isSelected.length !== 0 ? (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 20,
                  width: 28,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetAttach();
                  }}
                >
                  <Ionicons
                    name="checkmark-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : null} */}
          </View>

          <View style={styles.input}>
            <Ionicons
              name="search"
              size={fontSizeResponsive("H3", device)}
              color={COLORS.primary}
            />
            <TextInput
              placeholder={"Cari"}
              placeholderTextColor={COLORS.tertiary}
              style={{
                fontSize: fontSizeResponsive("H2", device),
                flex: 1,
              }}
              maxLength={30}
              onSubmitEditing={(event) => setSearch(event.nativeEvent.text)}
              clearButtonMode="always"
              allowFontScaling={false}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              marginHorizontal: "5%",
              width: "90%",
              padding: 16,
              marginTop: 10,
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "composer" ? COLORS.primary : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "composer" ? null : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerRetry()}
              >
                <Text
                  style={{
                    color:
                      variant === "composer" ? COLORS.white : COLORS.foundation,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  List saya
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "track" ? COLORS.primary : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "track" ? null : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerTrack()}
              >
                <Text
                  style={{
                    color:
                      variant === "track" ? COLORS.white : COLORS.foundation,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  In Progress
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "inprogress" ? COLORS.primary : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "inprogress" ? null : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerInProgress()}
              >
                <Text
                  style={{
                    color:
                      variant === "inprogress"
                        ? COLORS.white
                        : COLORS.foundation,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Need Sign
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "signed" ? COLORS.primary : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "signed" ? null : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerSigned()}
              >
                <Text
                  style={{
                    color:
                      variant === "signed" ? COLORS.white : COLORS.foundation,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Signed
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={dokumenlain?.lists}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <View key={item.id}>
                  <CardListPKRL
                    item={item}
                    token={token}
                    variant={variant}
                    device={device}
                    isSelected={isSelected}
                    setSelection={setSelection}
                    nip={profile.nip}
                  />
                </View>
              )}
              ListEmptyComponent={() => <ListEmpty />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>

        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: "85%" }}
          onPress={() => navigation.navigate("TambahDokumenPerizinan")}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              width: 44,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.ExtraDivinder,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 10,
  },
});
