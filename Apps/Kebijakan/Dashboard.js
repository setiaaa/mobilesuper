import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CardKebijakan } from "../../components/CardKebijakan/";
import {
  getCategory,
  getCategoryId,
  getCategoryIdPage,
  getDokHukum,
} from "../../service/api";
import { Search } from "../../components/Search";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Button } from "../../components/Button";
import { CardKebijakanCard } from "../../components/CardKebijkanCard";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { ActivityIndicator } from "react-native";
import { Loading } from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "../../components/DropDown";
import { setRefresh } from "../../store/Kebijakan";
import ListEmpty from "../../components/ListEmpty";
import { event } from "react-native-reanimated";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openTentang, setOpenTentang] = useState(false);
  const [openTahun, setOpenTahun] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [value, setValue] = useState();
  const [category, setCategory] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const [variant, setVariant] = useState("list");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [token, setToken] = useState("");
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }

  const handleVariant = (cekVariant) => {
    setVariant(cekVariant);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getCategory({ token: token, page: page }));
    }
  }, [token, page]);

  const [selectedList, setSelectedList] = useState({ key: "", value: "" });

  useEffect(() => {
    if (token !== "") {
      dispatch(getDokHukum({ token: token, id: selectedList.key, page: page }));
      // dispatch(setRefresh(false));
    }
  }, [token, selectedList.key, page]);

  const { dokumen, lists, dokumenList, refresh, loading } = useSelector(
    (state) => state.kebijakan
  );
  const [dataFilter, setFilterData] = useState([]);

  // useEffect(() => {
  //   if (refresh) {
  //     dispatch(getCategory({ token: token, page: page }));
  //   }
  // }, [refresh]);

  useEffect(() => {
    setCategory(dokumen);
    setValue(dokumen[0]?.value);
  }, [dokumen]);

  const listDokHukum = dokumen.slice(0, 34).map((item) => ({
    key: item.value,
    value: item.label,
  }));

  // useEffect(() => {
  //   if (lists.count > 5) {
  //     let mdl = parseInt(lists.count / 5);
  //     const modulus = lists.count % 5;
  //     if (modulus !== 0) {
  //       mdl += 1;
  //     }
  //     setCount(mdl);
  //   } else {
  //     setCount(1);
  //   }
  // }, [page]);

  // useEffect(() => {
  //   dispatch(getCategoryId(selectedList.key));
  // }, [selectedList.key]);

  // const filterData = (search) => {
  //   const filter =
  //     lists.results?.datas.length !== 0 &&
  //     lists.results?.datas.filter((item) => {
  //       return item.subjek.toLowerCase().includes(search.toLowerCase());
  //     });
  //   setFilterData(filter);
  // };
  useEffect(() => {
    console.log("key changed!");
    setPage(5);
  }, [selectedList.key]);

  useEffect(() => {
    console.log("setfilterdata");
    setFilterData(dokumenList);
  }, [dokumenList]);

  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const item = dokumenList;
    if (search !== "") {
      const data = item.filter((item) => {
        return item.subjek.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    }
  }, [search]);

  const filterData = (event) => {
    // console.log(event);
    setSearch(event);
  };

  const asc = () => {
    const sortedAscending = dataFilter
      ?.slice()
      .sort((a, b) => a.nomor - b.nomor);
    setFilterData(sortedAscending);
    setAscending(true);
    setIsFiltered(true);
  };

  const desc = () => {
    const sortedDescending = dataFilter
      ?.slice()
      .sort((a, b) => b.nomor - a.nomor);
    setFilterData(sortedDescending);
    setAscending(false);
    setIsFiltered(true);
  };

  const loadMore = () => {
    if (dokumenList.length % 5 === 0) {
      setPage(page + 5);
    }
    // console.log(page);
  };

  // console.log("ini page dari dashboarfd" + page);
  // console.log(lists?.results?.datas);
  const navigation = useNavigation();

  // console.log(lists.results?.datas);

  // console.log("page : " + page);
  // console.log(selectedList.key);
  // console.log("search value : (" + search + ")");
  // console.log(dokumenList[0]?.subjek);

  return (
    <>
      {loading ? <Loading /> : null}
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
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
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
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              Kebijakan
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.subJudul}>Dokumen Hukum</Text>
        </View>
        <View style={styles.dropdown}>
          {/* <DropDownPicker
              open={open}
              value={value}
              items={category}
              setOpen={setOpen}
              setValue={setValue}
              zIndex={5000}
              searchable={true}
              searchPlaceholder="Cari Kategori"
              containerStyle={{
                height: "30%",
                width: "90%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 18,
              }}
            /> */}
          {selectedList.key === "" ? (
            <Dropdown
              data={listDokHukum}
              setSelected={setSelectedList}
              placeHolder={"Pilih"}
              borderWidth={1}
              borderwidthDrop={1}
              borderWidthValue={1}
              borderColor={COLORS.ExtraDivinder}
              borderColorDrop={COLORS.ExtraDivinder}
              borderColorValue={COLORS.ExtraDivinder}
              heightValue={150}
              search={true}
            />
          ) : (
            <Dropdown
              data={listDokHukum}
              setSelected={setSelectedList}
              selected={selectedList}
              borderWidth={1}
              borderwidthDrop={1}
              borderWidthValue={1}
              borderColor={COLORS.ExtraDivinder}
              borderColorDrop={COLORS.ExtraDivinder}
              borderColorValue={COLORS.ExtraDivinder}
              heightValue={150}
              search={true}
            />
          )}
        </View>
        <View style={styles.ContainerCard}>
          <View
            style={{
              marginTop: 20,
              // flexDirection: "row",
              gap: 10,
              marginBottom: 20,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.white,
                borderRadius: 8,
              }}
            >
              <Search
                placeholder={"Cari..."}
                onSearch={filterData}
                iconColor={COLORS.primary}
              />
            </View>
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
            </View>
          </View>

          {/* <StatusBar style="auto" /> */}
        </View>
        {lists.results?.datas.length === 0 ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text>Tidak ada</Text>
          </View>
        ) : (
          <View style={{ height: "52%" }}>
            {variant === "list" ? (
              <FlatList
                data={dataFilter}
                // data={lists?.results?.datas}
                // data={
                //   (dataFilter && dataFilter.length > 0) || isFiltered
                //     ? dataFilter
                //     : dokumenList
                // }
                // data={dokumenList}
                renderItem={({ item }) => (
                  <CardKebijakan
                    subjek={item.subjek}
                    bentuk={item.bentuk}
                    id_peraturan={item.id_peraturan}
                    item={item}
                    nomor={item.nomor}
                    tahun={item.tahun}
                  />
                )}
                keyExtractor={(item) => item.id_peraturan}
                ListFooterComponent={() =>
                  loading === true ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 24,
                      }}
                    >
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : null
                }
                onEndReached={dokumenList.length === 0 ? null : loadMore}
                ListEmptyComponent={<ListEmpty />}
              />
            ) : (
              {
                /* <FlatList
                data={
                  (dataFilter && dataFilter.length > 0) || isFiltered
                    ? dataFilter
                    : lists.results?.datas
                }
                renderItem={({ item }) => (
                  <CardKebijakanCard
                    subjek={item.subjek}
                    bentuk={item.bentuk}
                    id_peraturan={item.id_peraturan}
                    item={item}
                    nomor={item.nomor}
                    tahun={item.tahun}
                    tgl_penetapan={item.tgl_penetapan}
                    tgl_diundangkan={item.tgl_diundangkan}
                    status={item.status}
                  />
                )}
                keyExtractor={(item) => item.id_peraturan}
              /> */
              }
            )}
            {/* {
                                    dataFilter.length >= 1 ? (
                                        <></>
                                    ) : (
                                        <View style={{ marginVertical: 10, marginBottom: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex', gap: 20, marginRight: 30 }}>
                                            <Text style={{ fontSize: FONTSIZE.H1, marginTop: 10 }}>{page} of {count}</Text>
                                            <TouchableOpacity onPress={() => setPage(page === 1 ? 1 : page - 1)} disabled={lists.previous === null ? true : false}>
                                                <Ionicons name='chevron-back-outline' size={30} color={lists.previous === null ? '#D0D5DD' : COLORS.grey} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setPage(page + 1)} disabled={lists.next === null ? true : false}>
                                                <Ionicons name='chevron-forward-outline' size={30} color={lists.next === null ? '#D0D5DD' : COLORS.grey} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                } */}
          </View>
        )}
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  ContainerCard: {
    zIndex: -1,
    width: "90%",
    marginLeft: 20,
    borderRadius: 12,
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    width: "90%",

    marginLeft: 20,
  },
  cardList: {
    backgroundColor: COLORS.white,
  },
  judul: {
    fontSize: 20,
    fontWeight: FONTWEIGHT.bold,
    textAlign: "left",
    paddingLeft: 20,
    paddingTop: 20,
  },
  subJudul: {
    fontSize: 16,
    fontWeight: FONTWEIGHT.bold,
    textAlign: "left",
    marginVertical: 20,
  },
  judulFilter: {
    fontSize: 16,
    fontWeight: FONTWEIGHT.bold,
    textAlign: "left",
    color: "#499CD7",
  },
  contentContainer: {
    paddingHorizontal: 16,
    margin: 0,
    marginTop: 40,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "#959CA9",
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#164B78",
    borderRadius: 6,
    marginTop: 20,
    marginBottom: 40,
    width: 360,
    marginLeft: 15,
  },
  circleList: {
    width: 35,
    height: 35,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
