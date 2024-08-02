import React, { useMemo, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Text, Image } from "react-native";
import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

export const PerizinanMenteri = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("perizinan-mentri");
  const [variant, SetVariant] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isSelected, setSelection] = useState([]);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    SetVariant("inprogress");
    dispatch(getListInProgress({ token: token, tipe: tipe }));
  }, [token, tipe]);

  const { dokumenlain, loading, status } = useSelector(
    (state) => state.digitalsign
  );

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(dokumenlain.lists);
  }, [dokumenlain]);

  useEffect(() => {
    const item = dokumenlain.lists;
    if (search !== "") {
      const data = item.filter((item) => {
        return item?.subject.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(item);
    }
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (token !== "") {
        if (variant === "inprogress") {
          dispatch(getListInProgress({ token: token, tipe: tipe }));
        }
      }
    } catch (error) {}

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, tipe]);

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

  const handleSubmit = () => {
    const payload = {
      passphrase: "",
      id_documents: isSelected,
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
    dispatch(getListInProgress({ token: token, tipe: tipe }));
  };

  const filterHandlerSigned = () => {
    SetVariant("signed");
    dispatch(getListSignedDigiSign({ token: token, tipe: tipe }));
  };

  const { profile } = useSelector((state) => state.superApps);
  console.log(isSelected);

  const { device } = useSelector((state) => state.apps);
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
                  marginLeft: isSelected.length === 0 ? null : 50,
                }}
              >
                Perizinan Menteri
              </Text>
            </View>
            {isSelected.length !== 0 ? (
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
            ) : null}
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{ width: "90%", marginHorizontal: "5%", marginTop: 20 }}
            >
              <Search placeholder={"Cari"} onSearch={filter} />
            </View>
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
            }}
          >
            {variant === "inprogress" &&
              profile.nip !== "197208122001121002" && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {/* Checkbox All */}
                  <Checkbox
                    value={dokumenlain.lists.length === isSelected.length}
                    onValueChange={() => checkAll()}
                    color={isSelected === true ? COLORS.lighter : null}
                  />
                  <Text style={{ fontSize: fontSizeResponsive("H4", device) }}>
                    Pilih Semua
                  </Text>
                </View>
              )}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
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
                  padding: 10,
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
          {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}

          {/* </ScrollView> */}
          <View style={{ flex: 1 }}>
            <FlatList
              data={filterData}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <View key={item.id}>
                  <CardListPerizinanMenteri
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            index={0}
            style={{ borderRadius: 50 }}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjust"
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView onLayout={handleContentLayout}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity onPress={() => bottomSheetAttachClose()}>
                      <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSizeResponsive("H1", device),
                          fontWeight: 500,
                        }}
                      >
                        Tanda Tangan Dokumen
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: "90%",
                      backgroundColor: COLORS.danger,
                      height: 50,
                      borderRadius: 6,
                      alignItems: "center",
                      marginHorizontal: 20,
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                    onPress={() => {
                      bottomSheetAttachClose();
                      {
                        setTimeout(() => {
                          handleSubmit();
                        }, 2000);
                      }
                      setSelection([]);
                      // SetVariant("signed");
                      // setParaphrase("");
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: fontSizeResponsive("H1", device),
                        fontWeight: 500,
                      }}
                    >
                      Tanda Tangan
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </BottomSheetView>
          </BottomSheetModal>

          {/* <TouchableOpacity onPress={() => {
                      navigation.navigate('TambahDokumenLain')
                  }}
                      style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 99 }}
                  >
                      <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                          <Ionicons name='add-outline' size={24} color={COLORS.white} />
                      </View>
                  </TouchableOpacity> */}

          <ModalSubmit
            status={status}
            setStatus={setStatus}
            navigate={"PerizinanMenteri"}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
