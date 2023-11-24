import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../components/Search";
import { Dropdown } from "../../components/DropDown";
import ListEmpty from "../../components/ListEmpty";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../service/session";
import { useEffect } from "react";
import {
  getDetailDocument,
  getDivisionFilter,
  getDocumentTamplate,
  getSubDivisionFilter,
} from "../../service/api";
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
import { Divider } from "react-native-paper";
import moment from "moment";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";

const DataList = ({ token, item, bottomSheetAttach }) => {
  const dispatch = useDispatch();

  const getDetailRepo = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDocument(params));
  };

  return (
    <BottomSheetModalProvider>
      <View
        key={item.id}
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 20,
          backgroundColor: "white",
          borderRadius: 8,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                bottomSheetAttach(item);
                getDetailRepo(item.id);
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: FONTWEIGHT.bold,
                  marginBottom: 10,
                  width: 300,
                }}
              >
                {item.title}
              </Text>

              <View
                style={{
                  // backgroundColor: "brown",
                  display: "flex",
                  flexDirection: "row",
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                    width: 100,
                  }}
                >
                  Pembuat
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                  }}
                >
                  {item.creator}
                </Text>
              </View>

              <View
                style={{
                  // backgroundColor: "brown",
                  display: "flex",
                  flexDirection: "row",
                  paddingRight: 10,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                    width: 100,
                  }}
                >
                  Deskripsi
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                    width: 200,
                  }}
                >
                  {item.attributes.deskripsi}
                </Text>
              </View>

              <View
                style={{
                  // backgroundColor: "brown",
                  display: "flex",
                  flexDirection: "row",
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                    width: 100,
                  }}
                >
                  Perubahan
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: FONTWEIGHT.normal,
                    color: COLORS.lighter,
                  }}
                >
                  {moment(item.updated_at).format("DD MMMM yyyy")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={24}
                  color={COLORS.grey}
                />
              </View> */}
          </View>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

const dropdownFilter = [
  {
    key: "true",
    value: "Nama Template",
  },
  {
    key: "false",
    value: "Pembuat",
  },
];
export const DokumenTamplate = () => {
  const [token, setToken] = useState("");
  const [dataM, setDataM] = useState([]);
  const [page, setPage] = useState(10);
  const [type, setType] = useState({
    key: "true",
    value: "Nama Template",
  });
  const [search, setSearch] = useState("");
  const [filterUnker, setFilterUnker] = useState();
  const [filterSatker, setFilterSatker] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (filterUnker && filterUnker.key) {
      dispatch(getSubDivisionFilter({ token: token, id: filterUnker.key }));
    }
  }, [filterUnker]);

  useEffect(() => {
    if (token !== "") {
      dispatch(
        getDocumentTamplate({
          token: token,
          page: page,
          general: search,
          by_title: type.key,
          unker: filterUnker ? filterUnker.value : "",
          satker: filterSatker ? filterSatker.value : "",
        })
      );
    }
  }, [token, page, type, search, filterUnker, filterSatker]);

  const { tamplate, loading, load, filter } = useSelector(
    (state) => state.repository
  );

  const loadMore = () => {
    if (tamplate?.lists.length !== 0) {
      if (tamplate?.lists.length % 10 === 0) {
        setPage(page + 10);
      }
    }
  };

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalFilterRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = (item) => {
    bottomSheetModalRef.current?.present();
    setDataM(item);
  };

  const bottomSheetAttachFilter = (item) => {
    bottomSheetModalFilterRef.current?.present();
  };

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const bottomSheetAttachFilterClose = () => {
    if (bottomSheetModalFilterRef.current)
      bottomSheetModalFilterRef.current?.close();
  };

  const unker = () => {
    let judulUnker = [];
    filter.unker.map((item) => {
      judulUnker.push({
        key: item.id,
        value: item.name,
      });
    });
    return judulUnker;
  };

  const satker = () => {
    let judulSatker = [];
    filter.satker.map((item) => {
      judulSatker.push({
        key: item.id,
        value: item.name,
      });
    });
    return judulSatker;
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
      try {
          if (token !== '') {
            dispatch(
              getDocumentTamplate({
                token: token,
                page: page,
                general: search,
                by_title: type.key,
                unker: filterUnker ? filterUnker.value : "",
                satker: filterSatker ? filterSatker.value : "",
              })
            );
              console.log('Refresh Berhasil')
          }
      } catch (error) {
          console.log('Refresh gagal:', error)
      }

      setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      }, 2000);
  }, [token, page, type, search, filterUnker, filterSatker]);

  return (
    <GestureHandlerRootView>
      {loading === true && tamplate.lists.length === 0 ? <Loading /> : null}
      <>
        <View style={{ marginBottom: 20 }}>
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
                backgroundColor: "white",
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
                  color={"#800000"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
                Dokumen Tamplate
              </Text>
            </View>
          </View>
          <View style={{ width: "90%", marginLeft: 20, marginVertical: 20 }}>
            <Search placeholder={"Cari"} onSearch={setSearch} />
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "90%" }}>
                <Dropdown
                  data={dropdownFilter}
                  placeHolder={"Filter"}
                  backgroundColor={COLORS.white}
                  selected={type}
                  setSelected={setType}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetAttachFilter();
                  dispatch(getDivisionFilter({ token: token }));
                }}
              >
                <Ionicons
                  name="filter-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Portal>
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
                  <View
                    style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
                  />
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
                      <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                        Filter Satuan dan Unit Kerja
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
                        }}
                      >
                        Unit Kerja
                      </Text>
                      <Dropdown
                        data={unker()}
                        placeHolder={"Pilih Unit Kerja"}
                        backgroundColor={COLORS.white}
                        selected={filterUnker}
                        setSelected={setFilterUnker}
                        borderWidth={1}
                        borderWidthValue={1}
                        borderwidthDrop={1}
                        borderColor={COLORS.ExtraDivinder}
                        borderColorValue={COLORS.ExtraDivinder}
                        borderColorDrop={COLORS.ExtraDivinder}
                      />
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                      <Text
                        style={{
                          marginHorizontal: 10,
                          marginBottom: 10,
                          fontWeight: FONTWEIGHT.bold,
                        }}
                      >
                        Satuan Kerja
                      </Text>
                      {filterUnker && filterUnker.key ? (
                        <Dropdown
                          data={satker()}
                          placeHolder={"Pilih Satuan Kerja"}
                          backgroundColor={COLORS.white}
                          selected={filterSatker}
                          setSelected={setFilterSatker}
                          borderWidth={1}
                          borderWidthValue={1}
                          borderwidthDrop={1}
                          borderColor={COLORS.ExtraDivinder}
                          borderColorValue={COLORS.ExtraDivinder}
                          borderColorDrop={COLORS.ExtraDivinder}
                          heightValue={300}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 10,
                            marginBottom: 10,
                            gap: 5,
                          }}
                        >
                          <Text style={{ color: COLORS.infoDanger }}>*</Text>
                          <Text style={{ color: COLORS.lighter }}>
                            Daftar satuan kerja akan muncul setelah memilih unit
                            kerja
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </BottomSheetModalProvider>
          </Portal>

          <View>
            <FlatList
              key={"_"}
              data={tamplate.lists}
              renderItem={({ item }) => (
                <DataList
                  bottomSheetAttach={bottomSheetAttach}
                  item={item}
                  token={token}
                />
              )}
              ListFooterComponent={() =>
                load === true ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 24,
                    }}
                  >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : null
              }
              keyExtractor={(item) => "_" + item.id}
              style={{ height: 500 }}
              ListEmptyComponent={() => <ListEmpty />}
              onEndReached={() => {
                if (tamplate.lists.length !== 0) {
                  loadMore();
                }
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
            <Portal>
              <BottomSheetModalProvider>
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
                    <View style={{ marginVertical: 20 }}>
                      <View
                        style={{
                          marginLeft: 30,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Ionicons
                          name="document-outline"
                          size={32}
                          color={COLORS.primary}
                        />
                        <Text
                          style={{
                            fontSize: FONTSIZE.H2,
                            fontWeight: FONTWEIGHT.normal,
                            width: 300,
                          }}
                        >
                          {dataM.title}
                        </Text>
                      </View>
                      <View style={{ marginTop: 20 }}>
                        <Divider bold />
                      </View>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginLeft: 30,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 20,
                          }}
                        >
                          <Ionicons
                            name="download-outline"
                            size={32}
                            color={"#6B7280"}
                          />
                          <Text
                            style={{
                              fontSize: FONTSIZE.H2,
                              fontWeight: FONTWEIGHT.normal,
                            }}
                          >
                            Download
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("MainDetailRepo");
                          bottomSheetAttachClose();
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 30,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 20,
                          }}
                        >
                          <Ionicons
                            name="information-circle-outline"
                            size={32}
                            color={"#6B7280"}
                          />
                          <Text
                            style={{
                              fontSize: FONTSIZE.H2,
                              fontWeight: FONTWEIGHT.normal,
                            }}
                          >
                            Details & activity
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>
              </BottomSheetModalProvider>
            </Portal>
          </View>
        </View>
      </>
    </GestureHandlerRootView>
  );
};
