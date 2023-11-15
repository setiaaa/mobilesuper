import React, { useMemo, useRef } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text, Image } from "react-native";
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
} from "../../service/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getTokenValue } from "../../service/session";
import { setDigitalSignLists } from "../../store/DigitalSign";

const ListDokumenLain = ({ item, variant, token }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDigisign(params));
  };

  const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge";

  return (
    <View
      key={item.id}
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
        {variant === "inprogress" ? (
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            color={isSelected === true ? COLORS.lighter : null}
          />
        ) : null}
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 13,
              width: 300,
              textAlign: "justify",
              fontWeight: FONTWEIGHT.bold,
            }}
          >
            {item.subject}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.lighter,
              height: 1,
              marginVertical: 5,
            }}
          />
          <View style={{ gap: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 13,
                  width: 120,
                  textAlign: "justify",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.normal,
                }}
              >
                Penerima
              </Text>
              {/* <Text style={{ fontSize: 13, width: 200, textAlign: 'justify', fontWeight: FONTWEIGHT.normal, }}>: {item.composer?.nama}</Text> */}
              <Text
                style={{
                  fontSize: 13,
                  width: 200,
                  textAlign: "justify",
                  fontWeight: FONTWEIGHT.normal,
                }}
              >
                : {item.composer?.nama !== null ? item.composer?.nama : "-"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 13,
                  width: 120,
                  textAlign: "justify",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.normal,
                }}
              >
                Penandatangan
              </Text>
              <Text>: </Text>
              <Image
                source={{
                  uri:
                    item.approvers[1]?.avatar_url !== null
                      ? item.approvers[1]?.avatar_url
                      : "-",
                }}
                style={{ width: 20, height: 20, borderRadius: 50 }}
              />
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

  const { dokumenlain } = useSelector((state) => state.digitalsign);

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
        return item.subject.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(item);
    }
  }, [search]);

  // console.log(dokumenlain.lists)
  // console.log(filterData)
  return (
    <GestureHandlerRootView>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                fontSize: FONTSIZE.H1,
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.white,
              }}
            >
              Digital Signature
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "90%", marginLeft: 20, marginTop: 20 }}>
            <Search
              placeholder={"Cari"}
              iconColor={COLORS.primary}
              onSearch={filter}
            />
          </View>
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
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
                  variant === "draft" ? COLORS.infoDanger : COLORS.foundation,
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
              }}
            >
              Selesai
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
        <FlatList
          data={filterData}
          renderItem={({ item }) => (
            <View key={item.id}>
              <ListDokumenLain item={item} token={token} variant={variant} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <ListEmpty />}
          style={{ height: "73%" }}
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
