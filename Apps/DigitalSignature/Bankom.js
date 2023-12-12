import React, { useMemo, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { Text } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
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
  getListCompleted,
  getListComposer,
  getListDraft,
  getListInProgress,
  getListSignedDigiSign,
  putTandaTangan,
} from "../../service/api";
import Icon from "react-native-vector-icons/MaterialIcons";

import { getTokenValue } from "../../service/session";
import { setDigitalSignLists, setStatus } from "../../store/DigitalSign";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ModalSubmit } from "../../components/ModalSubmit";

const ListBankom = ({ item, variant, token, isSelected, setSelection }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDigisign(params));
  };
  return (
    <View
      key={item?.id}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        width: "90%",
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
        padding: 20,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        //shadow android
        elevation: 2,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={(e) => {
          getDetail(item?.id);
          navigation.navigate("DetailSertifikat");
        }}
      >
        {variant === "inprogress" ? (
          <Checkbox
            value={isSelected.includes(item?.id) ? true : false}
            onValueChange={() => {
              if (isSelected.includes(item?.id)) {
                const ids = [...isSelected];
                const newIds = ids.filter((id) => id !== item?.id);
              } else {
                setSelection((prev) => [...prev, item?.id]);
              }
            }}
            color={isSelected === true ? COLORS.lighter : null}
          />
        ) : null}
        <View style={{ flexDirection: "column", width:(variant === "inprogress" ? "90%" : "100%"),}}>
          <Text
            style={{
              fontSize: 16,
              width: 300,
              textAlign: "justify",
              fontWeight: FONTWEIGHT.bold,
              width:"100%",
            }}
          >
            {item?.subject}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.lighter,
              height: 1,
              marginVertical: 5,
              width: "100%",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 13,
                width: 110,
                textAlign: "justify",
                paddingRight: 12,
                fontWeight: FONTWEIGHT.normal,
                width:"45%",
              }}
            >
              Penerima
            </Text>
            {item?.receivers[0]?.display_title !== undefined ? (
              <Text style={{ fontWeight: FONTWEIGHT.normal, width: "55%"}}>
                : {item?.receivers[0]?.officer?.nama !== undefined
                  ? item?.receivers[0]?.officer?.nama
                  : null}
              </Text>
            ) : (
              <Text style={{ fontWeight: FONTWEIGHT.normal, width: "55%" }}>
                : {item?.receivers[0]?.nama !== undefined
                  ? item?.receivers[0]?.nama
                  : "-"}
              </Text>
            )}
            <Text
              style={{
                fontSize: 13,
                width: 200,
                textAlign: "justify",
                fontWeight: FONTWEIGHT.normal,
              }}
            >
              {/* {item?.receivers[0]?.nama} */}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 13,
                width: 110,
                textAlign: "auto",
                paddingRight: 12,
                fontWeight: FONTWEIGHT.normal,
                width:"45%"
              }}
            >
              Penandatangan
            </Text>
            <Text
              style={{
                fontSize: 13,
                width: 200,
                textAlign: "auto",
                fontWeight: FONTWEIGHT.normal,
                width:"55%"
              }}
            >
              : 
              {item?.approvers[1]?.officer !== undefined
                ? item?.approvers[1]?.officer?.nama
                : item?.approvers[1]?.nama}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Bankom = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("bankom");
  const [variant, SetVariant] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isSelected, setSelection] = useState([]);
  const [paraphrase, setParaphrase] = useState("");

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    SetVariant("composer");
    dispatch(getListComposer({ token: token, tipe: tipe }));
  }, [token, tipe]);

  const filterHandlerComposer = () => {
    SetVariant("composer");
    dispatch(getListComposer({ token: token, tipe: tipe }));
  };
  const filterHandlerInProgress = () => {
    SetVariant("inprogress");
    dispatch(getListInProgress({ token: token, tipe: tipe }));
  };
  const filterHandlerCompleted = () => {
    SetVariant("completed");
    dispatch(getListCompleted({ token: token, tipe: tipe }));
  };
  const filterHandlerDraft = () => {
    SetVariant("draft");
    dispatch(getListDraft({ token: token, tipe: tipe }));
  };
  const filterHandlerSigned = () => {
    SetVariant("signed");
    dispatch(getListSignedDigiSign({ token: token, tipe: tipe }));
  };

  const { digitalsign, loading, status } = useSelector(
    (state) => state.digitalsign
  );

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(digitalsign.lists);
  }, [digitalsign]);

  useEffect(() => {
    const item = digitalsign.lists;
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
        if (variant === " composer") {
          dispatch(getListComposer({ token: token, tipe: tipe }));
        }
        if (variant === "inprogress") {
          dispatch(getListInProgress({ token: token, tipe: tipe }));
        }
        if (variant === "completed") {
          dispatch(getListCompleted({ token: token, tipe: tipe }));
        }
        if (variant === "draft") {
          dispatch(getListDraft({ token: token, tipe: tipe }));
        }
        if (variant === "signed") {
          dispatch(getListSignedDigiSign({ token: token, tipe: tipe }));
        }
        console.log("Refresh Berhasil");
      }
    } catch (error) {
      console.log("Refresh gagal:", error);
    }

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, tipe]);

  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
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
      passphrase: paraphrase,
      id_documents: isSelected,
      array_of_sign: [
        {
          kanan_atas_y: "163.0982523076924",
          kanan_atas_x: "781.2408256615383",
          kiri_bawah_x: "522.1515948923077",
          kiri_bawah_y: "100.91683692307703",
          halaman: "1",
        },
        {
          kanan_atas_y: "163.0982523076924",
          kanan_atas_x: "781.2408256615383",
          kiri_bawah_x: "522.1515948923077",
          kiri_bawah_y: "100.91683692307703",
          halaman: "2",
        },
      ],
    };
    const data = {
      token: token,
      payload: payload,
    };
    dispatch(putTandaTangan(data));
    // console.log(data);
  };

  // console.log(digitalsign.lists)

  return (
    <GestureHandlerRootView>
      {loading ? <Loading /> : null}
      <View style={{ position: "relative" }}>
        {filterData !== null ? (
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H1,
                    fontWeight: FONTWEIGHT.bold,
                    color: COLORS.white,
                    marginRight: isSelected.length === 0 ? 50 : null,
                  }}
                >
                  Digital Signature
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
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "90%", marginLeft: 20, marginTop: 20 }}>
                <Search placeholder={"Cari"} onSearch={filter} />
              </View>
            </View>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor: "yellow", }}> */}
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 6,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "composer"
                      ? COLORS.infoDangerLight
                      : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "composer"
                      ? COLORS.infoDangerLight
                      : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerComposer()}
              >
                <Text
                  style={{
                    color:
                      variant === "composer"
                        ? COLORS.infoDanger
                        : COLORS.foundation,
                  }}
                >
                  List Saya
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 6,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "draft" ? COLORS.infoDangerLight : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "draft"
                      ? COLORS.infoDangerLight
                      : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerDraft()}
              >
                <Text
                  style={{
                    color:
                      variant === "draft"
                        ? COLORS.infoDanger
                        : COLORS.foundation,
                  }}
                >
                  Draft
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 6,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "inprogress"
                      ? COLORS.infoDangerLight
                      : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "inprogress"
                      ? COLORS.infoDangerLight
                      : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerInProgress()}
              >
                <Text
                  style={{
                    color:
                      variant === "inprogress"
                        ? COLORS.infoDanger
                        : COLORS.foundation,
                  }}
                >
                  Need Sign
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 6,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "signed"
                      ? COLORS.infoDangerLight
                      : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "signed"
                      ? COLORS.infoDangerLight
                      : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerSigned()}
              >
                <Text
                  style={{
                    color:
                      variant === "signed"
                        ? COLORS.infoDanger
                        : COLORS.foundation,
                  }}
                >
                  Signed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 6,
                  borderWidth: 1,
                  backgroundColor:
                    variant === "completed"
                      ? COLORS.infoDangerLight
                      : COLORS.input,
                  borderRadius: 30,
                  borderColor:
                    variant === "completed"
                      ? COLORS.infoDangerLight
                      : COLORS.ExtraDivinder,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => filterHandlerCompleted()}
              >
                <Text
                  style={{
                    color:
                      variant === "completed"
                        ? COLORS.infoDanger
                        : COLORS.foundation,
                  }}
                >
                  Selesai
                </Text>
              </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
            <FlatList
              data={filterData}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <View key={item?.id}>
                  <ListBankom
                    item={item}
                    token={token}
                    variant={variant}
                    isSelected={isSelected}
                    setSelection={setSelection}
                  />
                </View>
              )}
              ListEmptyComponent={() => <ListEmpty />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{ height: "70%" }}
            />
            {/* <TouchableOpacity onPress={() => { navigation.navigate('TambahSertifikat')}}
                            style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 99 }}
                        >
                            <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='add-outline' size={24} color={COLORS.white} />
                            </View>
                        </TouchableOpacity> */}

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
                      <TouchableOpacity
                        onPress={() => bottomSheetAttachClose()}
                      >
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
                          style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}
                        >
                          Tanda Tangan Sertifikat
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        marginTop: 20,
                      }}
                    >
                      <BottomSheetTextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        placeholder="Masukan Passphrase"
                        style={{
                          borderWidth: 1,
                          width: "90%",
                          height: 40,
                          paddingHorizontal: 10,
                          paddingTop: 10,
                          borderRadius: 6,
                          borderColor: "#D0D5DD",
                        }}
                        onChangeText={setParaphrase}
                      />
                    </View>

                    {/* <View
                  style={{
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder="Masukan Komentar"
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      height: 40,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      borderRadius: 6,
                      borderColor: "#D0D5DD",
                    }}
                  />
                </View> */}

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
                        SetVariant("signed");
                        setParaphrase("");
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: FONTSIZE.H1,
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

            <ModalSubmit
              status={status}
              setStatus={setStatus}
              navigate={"MainDigitalSign"}
            />
          </>
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
};
