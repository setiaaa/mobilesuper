import React, { useMemo, useRef } from "react";
import { FlatList, ScrollView, View } from "react-native";
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
  getListCompleted,
  getListComposer,
  getListDraft,
  getListInProgress,
  getListSignedDigiSign,
} from "../../service/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getTokenValue } from "../../service/session";
import { setDigitalSignLists } from "../../store/DigitalSign";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";

const ListDokumenLain = ({ item, variant, token, device }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDigisign(params));
  };
  const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge";
  console.log(item);
  return (
    <View
      key={item.id}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        width: "90%",
        flex: 1,
        marginTop: 10,
        marginHorizontal: "5%",
        padding: 20,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        // //shadow android
        elevation: 2,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("DetailDokumenLain");
        }}
      >
        {/* {variant === "inprogress" ? (
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            color={isSelected === true ? COLORS.lighter : null}
          />
        ) : null} */}
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H3", device),
              textAlign: "justify",
              fontWeight: FONTWEIGHT.bold,
              width: "100%",
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
          <View style={{ gap: 5, width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  width: 120,
                  textAlign: "auto",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.normal,
                  width: "45%",
                }}
              >
                Penerima
              </Text>
              {item?.composer?.display_title !== undefined ? (
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    width: "55%",
                    textAlign: "auto",

                    fontSize: fontSizeResponsive("H3", device),
                  }}
                >
                  :{" "}
                  {item?.composer?.officer?.nama !== undefined
                    ? item?.receivers[0]?.officer?.nama
                    : "-"}
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    width: "55%",
                    textAlign: "auto",
                    fontSize: fontSizeResponsive("H3", device),
                  }}
                >
                  :{" "}
                  {item?.composer?.nama !== undefined
                    ? item?.composer?.nama
                    : "-"}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  width: 120,
                  textAlign: "auto",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.normal,
                  width: "45%",
                }}
              >
                Penandatangan
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                :{" "}
              </Text>
              {item?.approvers.slice(1).map((data) => (
                <Image
                  source={{ uri: data.avatar_url }}
                  style={{ width: 20, height: 20, borderRadius: 50 }}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const DokumenLain = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("dokumen_lain");
  const [variant, SetVariant] = useState("");
  const [filterData, setFilterData] = useState([]);

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

  const { dokumenlain, loading } = useSelector((state) => state.digitalsign);

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

  // console.log(dokumenlain.lists)
  // console.log(filterData)

  const { device } = useSelector((state) => state.apps);

  return (
    <GestureHandlerRootView>
      {loading ? <Loading /> : null}
      <View style={{ position: "relative" }}>
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
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.white,
              }}
            >
              Digital Signature
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "90%", marginHorizontal: "5%", marginTop: 20 }}>
            <Search placeholder={"Cari"} onSearch={filter} />
          </View>
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,
              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "composer" ? COLORS.infoDangerLight : COLORS.input,
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
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              List Saya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

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
                  variant === "draft" ? COLORS.infoDanger : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Draft
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

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
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Need Sign
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "signed" ? COLORS.infoDangerLight : COLORS.input,
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
                  variant === "signed" ? COLORS.infoDanger : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Signed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "completed" ? COLORS.infoDangerLight : COLORS.input,
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
                fontSize: fontSizeResponsive("H4", device),
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
            <View key={item.id}>
              <ListDokumenLain
                item={item}
                token={token}
                variant={variant}
                device={device}
              />
            </View>
          )}
          ListEmptyComponent={() => <ListEmpty />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ height: "69%" }}
        />

        {/* <TouchableOpacity onPress={() => {
                        navigation.navigate('TambahDokumenLain')
                    }}
                        style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 99 }}
                    >
                        <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='add-outline' size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity> */}
      </View>
    </GestureHandlerRootView>
  );
};
