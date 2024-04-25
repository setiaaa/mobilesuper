import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  PADDING,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons as Icon } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { getAksiPerubahan, getFilterAksiPerubahan } from "../../service/api";
import { CardAksiPerubahan } from "../../components/CardAksiPerubahan";
import ListEmpty from "../../components/ListEmpty";
import { Loading } from "../../components/Loading";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dropdown } from "../../components/DropDown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { StyleSheet } from "react-native";

export const AksiPerubahan = () => {
  const dataKategori = [
    {
      id: 1,
      name: "LATIHAN DASAR",
    },
    {
      id: 2,
      name: "PELATIHAN KEPEMIMPINAN PENGAWAS",
    },
    {
      id: 3,
      name: "PELATIHAN KEPEMIMPINAN ADMINISTRATOR",
    },
    {
      id: 4,
      name: "PELATIHAN KEPEMIMPINAN NASIONAL TINGKAT I",
    },
    {
      id: 5,
      name: "PELATIHAN KEPEMIMPINAN NASIONAL TINGKAT II",
    },
  ];
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [filterTahun, setFilterTahun] = useState([]);
  const [filterKategori, setFilterKategori] = useState([]);
  const [listAngkatan, setListAngkatan] = useState([]);
  const [filterAngkatan, setFilterAngkatan] = useState([]);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const { device } = useSelector((state) => state.apps);
  const { lists, loading, filter } = useSelector(
    (state) => state.aksiperubahan
  );

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAksiPerubahan({ token: token, page: page, search: search }));
    }
  }, [token, page, search]);

  const loadMore = () => {
    if (lists.length !== 0) {
      if (lists.length % 5 === 0) {
        setPage(page + 1);
        if (scrollRef) {
          scrollRef.current.scrollToIndex({ animated: false, index: 0 });
        }
      }
    }
  };

  const onRefresh = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filterSearch = () => {
    setSearch(inputValue);
  };

  const bottomSheetModalFilterRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT", "90%"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttachFilter = (item) => {
    bottomSheetModalFilterRef.current?.present();
  };

  const bottomSheetAttachFilterClose = () => {
    if (bottomSheetModalFilterRef.current)
      bottomSheetModalFilterRef.current?.close();
  };

  // const tahun = () => {
  //   let tahun = [];
  //   filter.map((item) => {
  //     tahun.push({
  //       key: item.id,
  //       value: item.year,
  //     });
  //   });
  //   return tahun;
  // };

  const tahun = () => {
    let tahunMap = {};

    filter.forEach((item) => {
      // Memeriksa apakah nilai value sudah ada dalam objek tahunMap
      if (!tahunMap[item.year]) {
        // Jika belum ada, maka tambahkan entri baru
        tahunMap[item.year] = {
          id: item.id,
          name: item.year,
        };
      }
    });

    // Mengonversi objek menjadi array hasil
    const hasil = Object.keys(tahunMap).map((key) => tahunMap[key]);
    return hasil;
  };

  useEffect(() => {
    let arr = [];
    filterKategori.map((item) => {
      filter.map((value) => {
        if (value.name.includes(item)) {
          let result = value.name.split("ANGKATAN ");
          let angkatan = result[result.length - 1];

          let check = arr.some((x) => x.id === angkatan);

          if (!check) {
            arr.push({
              id: angkatan,
              name: angkatan,
            });
          }
        }
      });
    });
    setListAngkatan(arr);
  }, [filterKategori]);

  return (
    <GestureHandlerRootView>
      {loading ? <Loading /> : null}
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
              marginRight: 50,
            }}
          >
            Aksi Perubahan
          </Text>
        </View>
      </View>

      <View style={{ padding: PADDING.Page }}>
        <Text
          style={{
            fontSize: fontSizeResponsive("Judul", device),
            marginBottom: 10,
          }}
        >
          Daftar Aksi Perubahan
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // alignContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: COLORS.ExtraDivinder,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              width: "85%",
            }}
          >
            <Ionicons
              name="search"
              size={fontSizeResponsive("H3", device)}
              color={COLORS.primary}
            />
            <TextInput
              placeholder={"Cari..."}
              style={{
                fontSize: fontSizeResponsive("H4", device),
                flex: 1,
              }}
              maxLength={30}
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              onEndEditing={filterSearch}
              clearButtonMode="always"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              bottomSheetAttachFilter();
              dispatch(getFilterAksiPerubahan(token));
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                borderColor: COLORS.secondaryLighter,
                // borderWidth: isFiltered ? 1 : 0,
              }}
            >
              <Ionicons name="filter-outline" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={lists}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <CardAksiPerubahan item={item} device={device} />
            )}
            onEndReached={loadMore}
            ref={scrollRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => <ListEmpty />}
            style={{ height: 630 }}
          />
        </View>
      </View>

      {/* <Portal> */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalFilterRef}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          index={0}
          style={{ borderRadius: 50 }}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjust"
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
          )}
        >
          <BottomSheetView onLayout={handleContentLayout}>
            <View style={{ marginVertical: 20 }}>
              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey,
                }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Filter Aksi Perubahan
                </Text>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    bottomSheetAttachFilterClose();
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={COLORS.lighter}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Tahun
                </Text>
                <SectionedMultiSelect
                  items={tahun()}
                  IconRenderer={Icon}
                  uniqueKey="name"
                  onSelectedItemsChange={setFilterTahun}
                  selectedItems={filterTahun}
                  modalWithSafeAreaView={true}
                  confirmText="Simpan"
                  searchPlaceholderText="Cari"
                  selectText="Pilih Tahun"
                  showChips
                  styles={{
                    backdrop: styles.multiSelectBackdrop,
                    selectToggle: styles.multiSelectChipContainer,
                    chipContainer: styles.multiSelectChipText,
                    chipText: styles.multiSelectChipText,
                    button: styles.button,
                    confirmText: styles.confirmText,
                    itemText: styles.confirmText,
                    selectToggleText: styles.selectToggleText,
                  }}
                />
              </View>

              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Jenis Kategori
                </Text>
                <SectionedMultiSelect
                  items={dataKategori}
                  IconRenderer={Icon}
                  uniqueKey="name"
                  onSelectedItemsChange={setFilterKategori}
                  selectedItems={filterKategori}
                  modalWithSafeAreaView={true}
                  confirmText="Simpan"
                  searchPlaceholderText="Cari"
                  selectText="Pilih Kategori"
                  showChips
                  styles={{
                    backdrop: styles.multiSelectBackdrop,
                    selectToggle: styles.multiSelectChipContainer,
                    chipContainer: styles.multiSelectChipText,
                    chipText: styles.multiSelectChipText,
                    button: styles.button,
                    confirmText: styles.confirmText,
                    itemText: styles.confirmText,
                    selectToggleText: styles.selectToggleText,
                  }}
                />
              </View>

              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    fontWeight: FONTWEIGHT.bold,
                    fontSize: fontSizeResponsive("H4", device),
                  }}
                >
                  Angkatan
                </Text>
                <SectionedMultiSelect
                  items={listAngkatan}
                  IconRenderer={Icon}
                  uniqueKey="name"
                  onSelectedItemsChange={setFilterAngkatan}
                  selectedItems={filterAngkatan}
                  modalWithSafeAreaView={true}
                  confirmText="Simpan"
                  searchPlaceholderText="Cari"
                  selectText="Pilih Angkatan"
                  showChips
                  styles={{
                    backdrop: styles.multiSelectBackdrop,
                    selectToggle: styles.multiSelectChipContainer,
                    chipContainer: styles.multiSelectChipText,
                    chipText: styles.multiSelectChipText,
                    button: styles.button,
                    confirmText: styles.confirmText,
                    itemText: styles.confirmText,
                    selectToggleText: styles.selectToggleText,
                  }}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      {/* </Portal> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  multiSelectChipContainer: {
    borderWidth: 1,
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  multiSelectChipText: {
    color: "#222",
    fontSize: 12,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  container: {
    height: "10%",
  },
  button: {
    backgroundColor: COLORS.primary,
  },
  confirmText: {
    fontSize: 15,
  },
  selectToggleText: {
    fontSize: 12,
  },
  chipsWrapper: {
    backgroundColor: "red",
  },
});
