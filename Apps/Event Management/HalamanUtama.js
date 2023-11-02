import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dropdown } from "../../components/DropDown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEventDetail, setEventLists } from "../../store/Event";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Search } from "../../components/Search";
import ListEmpty from "../../components/ListEmpty";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  getEvent,
  getEventDetail,
  getEventProgress,
  getEventToday,
} from "../../service/api";
import { getTokenValue } from "../../service/session";
import moment from "moment/moment";
import { CardListEvent } from "../../components/CardListEvent";
import { CardProgresEvent } from "../../components/CardProgresEvent";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const kategories = [
  { key: "q", value: "satu" },
  { key: "e", value: "dua" },
  { key: "r", value: "tiga" },
  { key: "t", value: "empat" },
];

const tahun = new Date().getFullYear();
const bulan = new Date().getMonth();
const tanggal = new Date().getDate();

const tanggalSekarang = new Date(`${tahun}-${bulan}-${tanggal}`).toDateString();
const tanggalBesok = new Date(
  `${tahun}-${bulan}-${tanggal + 1}`
).toDateString();

const CardTodoEvent = ({ item }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: 358,
          padding: 20,
          marginBottom: 10,
          borderRadius: 8,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <Text>PIC</Text>
          <Image
            source={item.pic}
            style={{ width: 26, height: 26, borderRadius: 30 }}
          />
          <Text>{item.nama}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="calendar-outline" size={24} />
            <Text>{item.tanggal}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="time-outline" size={24} />
            <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.progres}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const HalamanUtama = () => {
  const navigation = useNavigation();
  const [kategori, setKategori] = useState("");
  const [progres, setProgres] = useState([]);
  const [token, setToken] = useState("");
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //     dispatch(setEventLists(listsEvent))
  // }, [])
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getEventToday(token));
      dispatch(getEventProgress(token));
    }
  }, [token]);

  const { event, loading } = useSelector((state) => state.event);
  const list = event.lists;
  const progreslist = event.listsprogress;
  // const [loading, setLoading] = useState(true)

  const [variant, SetVariant] = useState("hariini");

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalAddRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = (data) => {
    setProgres(data);
    bottomSheetModalRef.current?.present();
  };

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const bottomSheetAttachAdd = () => {
    bottomSheetModalAddRef.current?.present();
  };

  const bottomSheetAttachAddClose = () => {
    if (bottomSheetModalAddRef.current) bottomSheetModalAddRef.current?.close();
  };

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(event.listsprogress);

  useEffect(() => {
    const item = event.listsprogress;
    if (search !== "") {
      const data = item.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(item);
    }
  }, [search]);

  const filter = (event) => {
    setSearch(event);
  };

  const [filterDataHariIni, setFilterDataHariIni] = useState(list);

  useEffect(() => {
    const item = event.lists;
    if (search !== "") {
      const data = item.filter((item) => {
        return item.judul.toLowerCase().includes(search.toLowerCase());
      });
      setFilterDataHariIni(data);
    } else {
      setFilterDataHariIni(item);
    }
  }, [search]);

  const filterHariIni = (event) => {
    setSearch(event);
  };

  const [ascending, setAscending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const asc = () => {
    const sortedAscending = filterData
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    setFilterData(sortedAscending);
    setAscending(true);
    setIsFiltered(true);
  };

  const desc = () => {
    const sortedDescending = filterData
      .slice()
      .sort((a, b) => b.title.localeCompare(a.title));
    setFilterData(sortedDescending);
    setAscending(false);
    setIsFiltered(true);
  };

  console.log(filterData);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
                Agenda Rapat
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            {variant === "hariini" ? (
              <Search placeholder={"Cari"} onSearch={filterHariIni} />
            ) : (
              <Search placeholder={"Cari"} onSearch={filter} />
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: 171,
                height: 41,
                borderWidth: 1,
                backgroundColor:
                  variant === "hariini" ? COLORS.primary : COLORS.white,
                borderRadius: 8,
                borderColor:
                  variant === "hariini" ? COLORS.white : COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => SetVariant("hariini")}
            >
              <Text
                style={{
                  color: variant === "hariini" ? COLORS.white : COLORS.primary,
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                Agenda Rapat Hari Ini
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 171,
                height: 41,
                borderWidth: 1,
                backgroundColor:
                  variant === "progres" ? COLORS.primary : COLORS.white,
                borderRadius: 8,
                borderColor:
                  variant === "progres" ? COLORS.white : COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => SetVariant("progres")}
            >
              <Text
                style={{
                  color: variant === "progres" ? COLORS.white : COLORS.primary,
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                Progres Agenda Rapat
              </Text>
            </TouchableOpacity>
          </View>
          {variant === "hariini" ? (
            <FlatList
              data={filterDataHariIni}
              renderItem={({ item }) => (
                <CardListEvent token={token} item={item} loading={loading} />
              )}
              keyExtractor={(item) => item.id}
              style={{ marginBottom: 300 }}
              ListEmptyComponent={() => <ListEmpty />}
            />
          ) : (
            <View>
              <View style={{ padding: 25 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      color: COLORS.lighter,
                    }}
                  >
                    Event
                  </Text>

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity onPress={!ascending ? asc : desc}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 30,
                          backgroundColor: COLORS.white,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons name="filter-outline" size={24} />
                      </View>
                    </TouchableOpacity>

                    {/* <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="menu-outline" size={24} />
                    </View> */}
                  </View>
                </View>
              </View>
              <FlatList
                data={filterData}
                renderItem={({ item }) => (
                  <CardProgresEvent
                    token={token}
                    item={item}
                    bottomSheetAttach={bottomSheetAttach}
                    loading={loading}
                  />
                )}
                keyExtractor={(item) => item.id}
                style={{ marginBottom: 300 }}
                ListEmptyComponent={() => <ListEmpty />}
              />
            </View>
          )}

          {/* <TouchableOpacity style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.infoDanger,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 100,
            right: 20
          }}
            onPress={() => {
              navigation.navigate("TambahEvent");
            }}
          >
            <Ionicons name="add-outline" size={24} color={COLORS.white} />
          </TouchableOpacity> */}

          <BottomSheetModal
            ref={bottomSheetModalAddRef}
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
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahEvent");
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah Event</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahAgendaEvent");
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 40,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahTodo", { item: event.lists });
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah ToDo</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

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
              <FlatList
                data={progres}
                renderItem={({ item }) => <CardTodoEvent item={item} />}
                style={{ marginBottom: 40 }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
