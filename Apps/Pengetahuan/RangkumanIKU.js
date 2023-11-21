import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "../../components/DropDown";
import { Search } from "../../components/Search";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import {
  getListPegawai,
  getListPegawaiExport,
  getListPostPegawai,
  getListUnitKerja,
} from "../../service/api";
import { FlatList } from "react-native-gesture-handler";
import ListEmpty from "../../components/ListEmpty";
import { shareAsync } from "expo-sharing";
// import { FileSystem } from "expo";
import * as DocumentPicker from "expo-document-picker";
import { ActivityIndicator } from "react-native";
// import { shareAsync } from "expo-sharing";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";

const ListDaftarPegawai = ({ item, token }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const getDetail = (id) => {
    const param = { token, id };
    dispatch(getListPostPegawai(param));
  };
  return (
    <View>
      <TouchableOpacity
        key={item.id}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          padding: 20,
          marginHorizontal: 17,
          gap: 5,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("ListPostinganPegawai", item.nama);
        }}
      >
        <Text
          style={{
            fontSize: FONTSIZE.H1,
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          {item.nama}
        </Text>
        <Text>Jabatan: {item.jabatan}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: COLORS.lighter }}>
            Nilai Saat Ini: {item.score.nilai}
          </Text>
          <View
            style={{
              backgroundColor:
                item.score.status === "Tidak Memenuhi" ? "#EA5455" : "green",
              borderRadius: 10,
              padding: 3,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white" }}>{item.score.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const RangkumanIKU = () => {
  const navigation = useNavigation();

  const [switchView, setSwitchView] = useState(true);

  const switchRangkumanView = () => {
    setSwitchView(true);
  };
  const switchDaftarPegawaiView = () => {
    setSwitchView(false);
  };

  const initialSnapPoints = useMemo(() => ["90%", "90%"], []);
  const initialSnapPointsTambah = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPointsTambah);

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalSelectRef = useRef(null);
  const bottomSheetModalAddRef = useRef(null);

  const bottomSheetAttachSearch = () => {
    bottomSheetModalRef.current?.present();
  };
  const bottomSheetAttachSearchClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const [choiceTipe, setChoiceTipe] = useState({
    key: "1",
    value: "Dashboard",
  });

  const listYear = [
    { key: "year1", value: "2023" },
    { key: "year2", value: "2024" },
    { key: "year3", value: "2025" },
  ];

  const dataKuartal = [
    { key: "q1", value: "TW 1" },
    { key: "q2", value: "TW 2" },
    { key: "q3", value: "TW 3" },
    { key: "q4", value: "TW 4" },
  ];

  const [selectedYear, setSelectedYear] = useState({
    key: "",
    value: "",
  });
  const [selectedQuarter, setSelectedQuarter] = useState({
    key: "",
    value: "",
  });
  const [selectedUnitKerja, setSelectedUnitKerja] = useState({
    key: "",
    value: "",
  });

  const [choiceFilter, setChoiceFilter] = useState("semua");

  const bottomSheetAttachSelectClose = () => {
    if (bottomSheetModalSelectRef.current)
      bottomSheetModalSelectRef.current?.close();
  };

  const bottomSheetAttachSelect = () => {
    bottomSheetModalSelectRef.current?.present();
  };

  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getListUnitKerja(token));
    }
  }, [token]);

  const [savedYear, setSavedYear] = useState({ key: "year1", value: "2023" });
  const [savedQuarter, setSavedQuarter] = useState({ key: "q3", value: "TW 3" });
  const [savedUnitKerja, setSavedUnitKerja] = useState({ key: "", value: "" });

  const handlePilihSimpan = () => {
    setSavedYear(selectedYear);
    setSavedQuarter(selectedQuarter);
    setSavedUnitKerja(selectedUnitKerja);
  };

  const [page, setPage] = useState(10);

  useEffect(() => {
    const param = {
      token: token,
      page: page,
      year: savedYear.value,
      quarter: savedQuarter.key,
      unitKerja: savedUnitKerja.value,
    };
    if (token !== "") {
      dispatch(getListPegawai(param));
    }
  }, [token, savedYear, savedQuarter, savedUnitKerja, page]);
  
  const loadMore = () => {
    if ((filterData.length % 10 === 0) && (savedYear.value || savedQuarter.value || savedUnitKerja.value)) {
      if (filterData.length > page) {
        setPage(page + 10);
      }
    }
    console.log(page)
  }

  useEffect(() => {
    const param = {
      token: token,
      year: savedYear.value,
      quarter: savedQuarter.key,
      unitKerja: savedUnitKerja.value,
    };
    if (token !== "") {
      dispatch(getListPegawaiExport(param));
    }
  }, [token, savedYear, savedQuarter, savedUnitKerja, download]);

  const { pegawai, refresh, loading } = useSelector(
    (state) => state.pengetahuan
  );

  useEffect(() => {
    if (refresh) {
      dispatch(getListPegawai({ token: token }));
    }
  }, [refresh]);

  const { unitKerja } = useSelector((state) => state.pengetahuan);

  const { exportPegawai, download } = useSelector((state) => state.pengetahuan);

  const dataUnitKerja = () => {
    let valueUnitKerja = [];
    unitKerja?.lists?.map((item) => {
      valueUnitKerja.push({
        key: item.id,
        value: item.unit_kerja_nama,
      });
    });
    return valueUnitKerja;
  };

  useEffect(() => {
    setFilterData(pegawai?.lists);
  }, [pegawai]);

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const item = pegawai?.lists;
    if (search !== "") {
      const data = item.filter((item) => {
        return item.nama.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(item);
    }
  }, [search, isFiltered]);

  const filter = (event) => {
    setSearch(event);
  };

  const asc = () => {
    const sortedAscending = filterData
      ?.slice()
      .sort((a, b) => a.nama.localeCompare(b.nama));
    setFilterData(sortedAscending);
    setAscending(true);
    setIsFiltered(true);
  }

  const desc = () => {
    const sortedDescending = filterData
      ?.slice()
      .sort((a, b) => b.nama.localeCompare(a.nama));
    setFilterData(sortedDescending);
    setAscending(false);
    setIsFiltered(true);
  }

  // console.log(exportPegawai.lists.file)

  const openFile = () => {
    let remoteUrl = exportPegawai?.lists?.file;
    let localPath = `${FileSystem.documentDirectory}/samplee.xls`;
      FileSystem.downloadAsync(remoteUrl, localPath).then(async ({ uri }) => {
        const contentURL = await FileSystem.getContentUriAsync(uri);
        try {
          if (Platform.OS == 'android') {
            await IntentLauncher.startActivityAsync(
              "android.intent.action.VIEW",
              {
                data: contentURL,
                flags: 1,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              }
            );
          } else if (Platform.OS == 'ios') {
            Sharing.shareAsync(localPath);
          }
        } catch (error) {
          Alert.alert("INFO", JSON.stringify(error));
        }
      });
  };

  const downloadFromUrl = async () => {
    const url = exportPegawai?.lists?.file;
    const parts = url?.split("/");
    const fileName = parts[parts?.length - 1];
    console.log(fileName);

    //

    // const result = await FileSystem.downloadAsync(
    //   url,
    //   FileSystem.documentDirectory + fileName
    // );
    // console.log(result);

    // await AsyncStorage.setItem("downloadedFile", result.uri);

    // save(result.uri);

    // try {
    //   const document = await DocumentPicker.getDocumentAsync({
    //     type: "*/*", // Allow the user to pick any type of file
    //   });

    //   if (document.type === "success") {
    //     const directoryPath = document.uri; // Use this path to save the file
    //     console.log("Selected directory:", directoryPath);

    //     const url = exportPegawai?.lists?.file;
    //     if (url) {
    //       const parts = url.split("/");
    //       const fileName = parts[parts.length - 1];
    //       const filePath = `${directoryPath}/${fileName}`;

    //       const result = await FileSystem.downloadAsync(url, filePath);

    //       if (result.status === 200) {
    //         console.log("Downloaded file saved to:", filePath);
    //       } else {
    //         console.error("Download failed");
    //       }
    //     }
    //   } else {
    //     console.log("Document picker canceled or failed.");
    //   }
    // } catch (error) {
    //   console.error("Error selecting directory:", error);
    // }
  };
  // const save = (uri) => {
  //   shareAsync(uri);
  // };

  // const [ascending, setAscending] = useState(false);
  // const [isFiltered, setIsFiltered] = useState(false);


  // const asc = () => {
  //   const sortedAscending = filterData
  //     .slice()
  //     .sort((a, b) => a.nama.localeCompare(b.nama));
  //   setFilterData(sortedAscending);
  //   setAscending(true);
  //   setIsFiltered(true);
  // };

  // const desc = () => {
  //   const sortedDescending = filterData
  //     .slice()
  //     .sort((a, b) => b.nama.localeCompare(a.nama));
  //   setFilterData(sortedDescending);
  //   setAscending(false);
  //   setIsFiltered(true);
  // };

  console.log(filterData)


  return (
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
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            {switchView ? "Rangkuman IKU" : "Daftar Pegawai"}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 20,
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: switchView ? COLORS.primary : COLORS.white,
            padding: 10,
            width: "47%",
            borderRadius: 8,
            height: 45,
            justifyContent: "center",
            //shadow ios
            shadowOffset: switchView
              ? { width: -2, height: 4 }
              : { width: 0, height: 0 },
            shadowColor: switchView ? "#8E1414" : "FFFFFF",
            shadowOpacity: switchView ? 0.2 : 0,
            //shadow android
            elevation: switchView ? 2 : 0,
          }}
          onPress={switchRangkumanView}
        >
          <Text
            style={{
              color: switchView ? COLORS.white : COLORS.primary,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Rangkuman
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: !switchView ? COLORS.primary : COLORS.white,
            padding: 10,
            width: "47%",
            borderRadius: 8,
            height: 45,
            justifyContent: "center",
            //shadow ios
            shadowOffset: !switchView
              ? { width: -2, height: 4 }
              : { width: 0, height: 0 },
            shadowColor: !switchView ? "#8E1414" : "FFFFFF",
            shadowOpacity: !switchView ? 0.2 : 0,
            //shadow android
            elevation: !switchView ? 2 : 0,
          }}
          onPress={switchDaftarPegawaiView}
        >
          <Text
            style={{
              color: !switchView ? COLORS.white : COLORS.primary,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Daftar Pegawai
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 5 }}>
        {switchView ? (
          <View style={{ height: "85%", paddingHorizontal: 16 }}>
            <WebView
              originWhitelist={["*"]}
              source={{
                uri: "https://portal.kubekkp.coofis.com/assets/dashboardExt/DRangkumanIKU/DRangkumanIKU.html",
              }}
              style={{ flex: 1, borderRadius: 8 }}
              allowFileAccess={true}
              androidLayerType={"software"}
              mixedContentMode={"always"}
              allowUniversalAccessFromFileURLs={true}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "column",
                gap: 5,
                paddingHorizontal: 17,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={bottomSheetAttachSelect}
                // style={{ width: "46%" }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    marginVertical: 10,
                    height: 54,
                    justifyContent: "center",
                    borderRadius: 8,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: "#171717",
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,
                  }}
                >
                  <Text style={{ marginLeft: 20, color: COLORS.lighter }}>
                    Pilih Tahun dan Triwulan dan Unit Kerja
                  </Text>
                </View>
              </TouchableOpacity>

              <BottomSheetModal
                ref={bottomSheetModalSelectRef}
                snapPoints={initialSnapPoints}
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
                  <View style={{ flex: 1 }}>
                  <View
                      style={{
                        marginHorizontal: 20,
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 14,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: FONTWEIGHT.bold,
                          fontSize: FONTSIZE.H1,
                        }}
                      >
                        Pilih
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          console.log();
                          closeBottomSheet();
                        }}
                      >
                        <Ionicons
                          name="close-outline"
                          size={24}
                          color={COLORS.lighter}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 26,
                        paddingBottom: 15,
                      }}
                    >
                      <View style={{ width: "40%" }}>
                        {savedYear.key === "" ? (
                          <Dropdown
                            placeHolder={"Pilih Tahun"}
                            borderWidth={1}
                            data={listYear}
                            // selected={selectedYear}
                            setSelected={setSelectedYear}
                            borderColor={COLORS.ExtraDivinder}
                            borderwidthDrop={1}
                            borderColorDrop={COLORS.ExtraDivinder}
                            borderWidthValue={1}
                            borderColorValue={COLORS.ExtraDivinder}
                          />
                        ) : (
                          <Dropdown
                            // placeHolder={"Pilih Tahun"}
                            borderWidth={1}
                            data={listYear}
                            selected={savedYear}
                            setSelected={setSelectedYear}
                            borderColor={COLORS.ExtraDivinder}
                            borderwidthDrop={1}
                            borderColorDrop={COLORS.ExtraDivinder}
                            borderWidthValue={1}
                            borderColorValue={COLORS.ExtraDivinder}
                          />
                        )}
                      </View>

                      <View style={{ width: "40%" }}>
                        {savedQuarter.key === "" ? (
                          <Dropdown
                            placeHolder={"Pilih Triwulan"}
                            borderWidth={1}
                            data={dataKuartal}
                            // selected={selectedQuarter}
                            setSelected={setSelectedQuarter}
                            borderColor={COLORS.ExtraDivinder}
                            borderwidthDrop={1}
                            borderColorDrop={COLORS.ExtraDivinder}
                            borderWidthValue={1}
                            borderColorValue={COLORS.ExtraDivinder}
                          />
                        ) : (
                          <Dropdown
                            // placeHolder={"Pilih Triwulan"}
                            borderWidth={1}
                            data={dataKuartal}
                            selected={savedQuarter}
                            setSelected={setSelectedQuarter}
                            borderColor={COLORS.ExtraDivinder}
                            borderwidthDrop={1}
                            borderColorDrop={COLORS.ExtraDivinder}
                            borderWidthValue={1}
                            borderColorValue={COLORS.ExtraDivinder}
                          />
                        )}
                      </View>
                    </View>

                    <View style={{ width: "94%", paddingLeft: 25 }}>
                      {savedUnitKerja.key === "" ? (
                        <Dropdown
                          placeHolder={"Pilih Unit Kerja"}
                          borderWidth={1}
                          data={dataUnitKerja()}
                          setSelected={setSelectedUnitKerja}
                          borderColor={COLORS.ExtraDivinder}
                          borderwidthDrop={1}
                          borderColorDrop={COLORS.ExtraDivinder}
                          borderWidthValue={1}
                          borderColorValue={COLORS.ExtraDivinder}
                        />
                      ) : (
                        <Dropdown
                          borderWidth={1}
                          data={dataUnitKerja()}
                          selected={savedUnitKerja}
                          setSelected={setSelectedUnitKerja}
                          borderColor={COLORS.ExtraDivinder}
                          borderwidthDrop={1}
                          borderColorDrop={COLORS.ExtraDivinder}
                          borderWidthValue={1}
                          borderColorValue={COLORS.ExtraDivinder}
                        />
                      )}
                    </View>

                    {choiceTipe.key === "3" ||
                    choiceTipe.key === "4" ||
                    choiceTipe.key === "5" ? (
                      <></>
                    ) : null}

                    <View style={{ height: 190, paddingVertical: 20, justifyContent: "flex-end" }}>
                      <TouchableOpacity
                        style={{
                          width: "90%",
                          backgroundColor: COLORS.primary,
                          height: 50,
                          // marginTop: ,
                          borderRadius: 8,
                          alignItems: "center",
                          marginHorizontal: 20,
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          handlePilihSimpan();
                          bottomSheetAttachSelectClose();
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontSize: FONTSIZE.H1,
                            fontWeight: 500,
                          }}
                        >
                          Simpan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
              {/* 
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
                  <View style={{ marginHorizontal: 20 }}>
                    <View style={{ flexDirection: "row", gap: 16 }}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "#F0F0F0",
                          borderRadius: 8,
                          borderColor: COLORS.white,
                        }}
                      >
                        <Search
                          placeholder={"Cari"}
                          iconColor={COLORS.primary}
                          onSearch={filter}
                        />
                      </View>
                      <TouchableOpacity
                        style={{ justifyContent: "center" }}
                        onPress={() => {
                          bottomSheetAttachSearchClose();
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FONTSIZE.H1,
                            color: COLORS.infoDanger,
                            fontWeight: 500,
                          }}
                        >
                          Batal
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 500,
                      paddingTop: 15,
                    }}
                  >
                    <FlatList
                      data={filterData}
                      renderItem={({ item }) => (
                        <View key={item.id} style={{ marginBottom: 10 }}>
                          <ListDaftarPegawai item={item} token={token} />
                        </View>
                      )}
                      keyExtractor={(item) => item.id}
                      ListEmptyComponent={() => <ListEmpty />}
                    />
                  </View>
                </BottomSheetView>
              </BottomSheetModal> */}

              <View style={{ marginVertical: 10 }}>
                <Search
                  placeholder={"Cari..."}
                  iconColor={COLORS.primary}
                  onSearch={filter}
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{"*) Nilai Minimum = 3"}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {exportPegawai?.lists?.length !== 0 ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                      padding: 5,
                    }}
                    onPress={() => {openFile()}}
                  >
                    <Icon name="get-app" size={24} color={COLORS.grey} />
                  </TouchableOpacity>
                ) : null}

                  <TouchableOpacity
                  onPress={!ascending ? asc : desc}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                      padding: 5,
                    }}
                  >
                    <Ionicons
                      name="filter-outline"
                      size={24}
                      color={COLORS.grey}
                    />
                  </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 10, gap: 2 }}>
              <Text
                style={{ fontSize: 13, fontWeight: 500, color: COLORS.grey }}
              >
                Yang dipilih:
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 700 }}>
                {savedYear.value ? savedYear.value : "-"} /{" "}
                {savedQuarter.value ? savedQuarter.value : "-"} /{" "}
                {savedUnitKerja.value ? savedUnitKerja.value : "-"}
              </Text>
            </View>

            <View>
              <View
                style={{
                  marginTop: 10,
                  gap: 15,
                  marginBottom: "95%",
                }}
              >
                <FlatList
                  data={(filterData && filterData.length > 0) || isFiltered ? filterData : pegawai?.lists }
                  renderItem={({ item }) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <ListDaftarPegawai item={item} token={token} />
                    </View>
                  )}
                  ListFooterComponent={() =>
                    loading === true ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 24,
                        }}
                      >
                        <ActivityIndicator
                          size="large"
                          color={COLORS.primary}
                        />
                      </View>
                    ) : null
                  }
                  keyExtractor={(item) => item.id}
                  ListEmptyComponent={() => <ListEmpty />}
                  onEndReached={loadMore}
                  style={{ height: 320, }}
                />

                {/* {pegawai.lists.length !== 0
                  ? pegawai.lists.map((item, index) => {
                      const getDetail = (id) => {
                        const param = { token, id };
                        dispatch(getListPostPegawai(param));
                      };

                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            padding: 10,
                            gap: 5,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: "#171717",
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 2,
                          }}
                          onPress={() => {
                            getDetail(item.id);
                            navigation.navigate(
                              "ListPostinganPegawai",
                              item.nama
                            );
                          }}
                        >
                          <Text
                            style={{
                              fontSize: FONTSIZE.H1,
                              fontWeight: FONTWEIGHT.bold,
                            }}
                          >
                            {item.nama}
                          </Text>
                          <Text>Jabatan: {item.jabatan}</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: COLORS.lighter }}>
                              Nilai Saat Ini: {item.score.nilai}
                            </Text>
                            <View
                              style={{
                                backgroundColor:
                                  item.score.status === "Tidak Memenuhi"
                                    ? "#EA5455"
                                    : "green",
                                borderRadius: 10,
                                padding: 3,
                                paddingHorizontal: 10,
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {item.score.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                  : ""} */}
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};