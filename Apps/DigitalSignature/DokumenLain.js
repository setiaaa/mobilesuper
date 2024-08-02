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
  getListRejected,
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
import { Config } from "../../constants/config";

const ListDokumenLain = ({ item, variant, token, device }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDigisign(params));
  };
  const BASE_URL = Config.base_url + "bridge";
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
          navigation.navigate("DetailDokumenLain", { variant: variant });
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
                  style={{ width: device === 'tablet'? 40: 20, height: device === 'tablet'? 40 : 20, borderRadius: 50 }}
                />
              ))}
            </View>
            {variant === "signed" ? (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H3", device),
                    width: 110,
                    textAlign: "auto",
                    paddingRight: 12,
                    fontWeight: FONTWEIGHT.normal,
                    width: "45%",
                  }}
                >
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H3", device),
                    width: 200,
                    textAlign: "auto",
                    fontWeight: FONTWEIGHT.normal,
                    width: "55%",
                  }}
                >
                  :{item.state === "in_progress" ? "In Progress" : "Done"}
                </Text>
              </View>
            ) : null}
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
  const filterHandlerRejected = () => {
    SetVariant("rejected");
    dispatch(getListRejected({ token: token }));
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
        if (variant === "rejected") {
          dispatch(getListRejected({ token: token, tipe: tipe }));
        }
        if (variant === "draft") {
          dispatch(getListDraft({ token: token, tipe: tipe }));
        }
        if (variant === "signed") {
          dispatch(getListSignedDigiSign({ token: token, tipe: tipe }));
        }
      }
    } catch (error) {}

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, tipe]);

  const { device } = useSelector((state) => state.apps);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
            marginHorizontal: "10%",
          }}
        >
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,
              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "composer" ? COLORS.primary : COLORS.input,
              borderRadius: 30,
              borderColor: variant === "composer" ? null : COLORS.ExtraDivinder,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => filterHandlerComposer()}
          >
            <Text
              style={{
                color:
                  variant === "composer" ? COLORS.white : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              List Saya
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "draft" ? COLORS.primary : COLORS.input,
              borderRadius: 30,
              borderColor: variant === "draft" ? null : COLORS.ExtraDivinder,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => filterHandlerDraft()}
          >
            <Text
              style={{
                color: variant === "draft" ? COLORS.white : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Draft
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

              paddingHorizontal: 6,
              paddingVertical: 6,
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
                  variant === "inprogress" ? COLORS.white : COLORS.foundation,
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
                variant === "rejected" ? COLORS.primary : COLORS.input,
              borderRadius: 30,
              borderColor: variant === "rejected" ? null : COLORS.ExtraDivinder,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => filterHandlerRejected()}
          >
            <Text
              style={{
                color:
                  variant === "rejected" ? COLORS.white : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Rejected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: device === "tablet" ? "19%" : null,

              paddingHorizontal: 6,
              paddingVertical: 6,
              borderWidth: 1,
              backgroundColor:
                variant === "signed" ? COLORS.primary : COLORS.input,
              borderRadius: 30,
              borderColor: variant === "signed" ? null : COLORS.ExtraDivinder,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => filterHandlerSigned()}
          >
            <Text
              style={{
                color: variant === "signed" ? COLORS.white : COLORS.foundation,
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Signed
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
        <View style={{flex: 1}}>
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
</View>

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
