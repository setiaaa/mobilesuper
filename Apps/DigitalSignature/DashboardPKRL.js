import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTokenValue } from "../../service/session";
import { getCounterPKRL, getDasboardListPKRL } from "../../service/api";
import { jenisPerizinan, kategoriPerizinan } from "./dataDokPerizinan";
import { BarChart } from "react-native-gifted-charts";
import { CardListPKRL } from "../../components/CardListPKRL";
import { CardListDashboardPKRL } from "../../components/CardListDashboardPKRL";
import ListEmpty from "../../components/ListEmpty";

export const DashboardPKRL = () => {
  const { device } = useSelector((state) => state.apps);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState("laporan");
  const [token, setToken] = useState("");
  const [dataChart, setDataChart] = useState([]);
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("dokumen_pkrl");
  const [page, setPage] = useState(10);
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [ListTitle, setListTitle] = useState("");
  const currentTab = useNavigationState(
    (state) => state.routes[state.index].name
  );
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (currentTab === "DashboardPKRL") {
      dispatch(getCounterPKRL({ token: token, dashboard: dashboard }));
    }
  }, [token, dashboard, currentTab]);

  const { counterPKRL, listDashboard } = useSelector(
    (state) => state.digitalsign
  );

  const handleGetAllCountDirektorat = (data) => {
    if (data !== null && data !== undefined) {
      const total_done = data.total_done !== undefined ? data?.total_done : 0;
      const total_in_progress =
        data.total_in_progress !== undefined ? data?.total_in_progress : 0;
      let count = total_done + total_in_progress;
      return count;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (counterPKRL?.data !== null) {
      setDataChart(() => {
        let newData = {};
        jenisPerizinan?.map((item) => {
          newData[item.value] = [];
          let alias = 65;
          kategoriPerizinan.map((value) => {
            if (value.group === item.group) {
              newData[item.value].push(
                {
                  label: String.fromCharCode(alias),
                  value: 0,
                  spacing: 10,
                  labelWidth: 60,
                  labelTextStyle: {
                    color: "gray",
                  },
                  frontColor: COLORS.success,
                  alias: value.value,
                  isSigned: true,
                },
                {
                  value: 0,
                  frontColor: "red",
                  alias: value.value,
                }
              );
              alias++;
            } else {
              alias = 65;
            }
          });

          let updatedList = [...newData[item.value]];

          if (counterPKRL?.data?.[item?.value] !== undefined) {
            counterPKRL?.data?.[item?.value]?.data !== undefined &&
              counterPKRL?.data?.[item?.value]?.data.forEach((x) => {
                const checkIndex = updatedList?.findIndex(
                  (y) => y.alias === x.kategori_perizinan
                );

                if (checkIndex > -1) {
                  updatedList[checkIndex] = {
                    ...updatedList[checkIndex],
                    value: updatedList[checkIndex].value + x.done_count,
                  };

                  updatedList[checkIndex + 1] = {
                    ...updatedList[checkIndex + 1],
                    value:
                      updatedList[checkIndex + 1].value + x.in_progress_count,
                  };
                }
              });
          }

          newData[item.value] = updatedList;
        });
        return newData;
      });
    }
  }, [counterPKRL?.data]);

  const handleMaxValue = (tipe) => {
    if (!Array.isArray(dataChart)) {
      let max = Math?.max(...dataChart?.[tipe]?.map((obj) => obj.value));
      if (max === 0) {
        max = 100;
      }
      return max;
    } else {
      return 100;
    }
  };

  const loadMore = () => {
    if (listDashboard?.data?.length !== 0) {
      if (listDashboard?.data?.length % 5 === 0) {
        setPage((prevPage) => prevPage + 10);
      }
    }
  };

  useEffect(() => {
    dispatch(
      getDasboardListPKRL({
        token: token,
        tipe: tipe,
        page: page,
        search: search,
        kategori: ListTitle,
      })
    );
  }, [page]);

  const renderTitle = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: device === "tablet" ? 24 : 12,
                width: device === "tablet" ? 24 : 12,
                borderRadius: device === "tablet" ? 24 : 6,
                backgroundColor: COLORS.success,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: "lightgray",
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Done
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: device === "tablet" ? 24 : 12,
                width: device === "tablet" ? 24 : 12,
                borderRadius: device === "tablet" ? 24 : 6,
                backgroundColor: "red",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: "lightgray",
                fontSize: fontSizeResponsive("H4", device),
              }}
            >
              Need Sign
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView>
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
              Perizinan Menteri
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 10,
            gap: 10,
            marginHorizontal: "5%",
            width: "90%",
          }}
        >
          {jenisPerizinan.map((item, index) => (
            <View
              key={index}
              style={{
                width: device === "tablet" ? "49%" : "48%",
                height: "50%",
              }}
            >
              <View
                style={{
                  borderRadius: 8,
                  shadowOffset: { width: -2, height: 4 }, // shadow iOS
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  elevation: 2, // shadow Android
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "white", // Tambahkan warna background biar lebih jelas
                  minHeight: device === "tablet" ? 150 : 120, // Samakan tinggi minimum
                  borderWidth: 2,
                  borderColor:
                    item?.value ===
                    "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
                      ? COLORS.successLight
                      : item?.value === "Direktorat Jaskel - Jasa Kelautan"
                      ? COLORS.infoLight
                      : item?.value ===
                        "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
                      ? COLORS.warningLight
                      : item?.value === "Direktorat PRL"
                      ? "#e0bee6"
                      : null,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      padding: 5,
                      backgroundColor:
                        item?.value ===
                        "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
                          ? COLORS.successLight
                          : item?.value === "Direktorat Jaskel - Jasa Kelautan"
                          ? COLORS.infoLight
                          : item?.value ===
                            "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
                          ? COLORS.warningLight
                          : item?.value === "Direktorat PRL"
                          ? "#e0bee6"
                          : null,
                      borderRadius: 50,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"file-document"}
                      size={device === "tablet" ? 40 : 30}
                      color={
                        item?.value ===
                        "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
                          ? COLORS.success
                          : item?.value === "Direktorat Jaskel - Jasa Kelautan"
                          ? COLORS.info
                          : item?.value ===
                            "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
                          ? COLORS.warning
                          : item?.value === "Direktorat PRL"
                          ? "#794795"
                          : null
                      }
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      fontSize: 40,
                    }}
                  >
                    {handleGetAllCountDirektorat(
                      counterPKRL.data !== undefined &&
                        counterPKRL.data !== null
                        ? counterPKRL?.data[item?.value]
                        : null
                    )}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: fontSizeResponsive("H5", device),
                    color: COLORS.grey,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  {item?.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ ...styles.card, marginTop: 20, marginHorizontal: "5%" }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H2", device),
                fontWeight: 600,
              }}
            >
              Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan
            </Text>
          </View>

          {renderTitle()}

          <BarChart
            data={
              dataChart[
                "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
              ]
            }
            lab
            barWidth={24}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            // hideAxesAndRules
            // showReferenceLine1
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "gray" }}
            noOfSections={3}
            autoShiftLabels
            onPress={(e) => {
              dispatch(
                getDasboardListPKRL({
                  token: token,
                  tipe: tipe,
                  page: page,
                  search: search,
                  kategori: e.alias,
                })
              );
              setModal(true);
              setListTitle(e.alias);
            }}
            maxValue={handleMaxValue(
              "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
            )}
            renderLabel={({ label, alias }) => (
              <Text style={{ color: "red", fontSize: 20 }}>
                {label}{" "}
                {/* Gunakan alias jika ada, jika tidak, gunakan label */}
              </Text>
            )}
          />
          <View style={{ marginTop: 20 }}>
            {dataChart?.[
              "Direktorat KEBP - Konservasi Ekosistem dan Biota Perairan"
            ]?.map((item, index) => {
              return (
                item.isSigned !== undefined && (
                  <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.label} :
                    </Text>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.alias}
                    </Text>
                  </View>
                )
              );
            })}
          </View>
        </View>

        <View style={{ ...styles.card, marginTop: 20, marginHorizontal: "5%" }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H2", device),
                fontWeight: 600,
              }}
            >
              Direktorat Jaskel - Jasa Kelautan
            </Text>
          </View>
          {renderTitle()}
          <BarChart
            data={dataChart["Direktorat Jaskel - Jasa Kelautan"]}
            barWidth={24}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            // hideAxesAndRules
            // showReferenceLine1
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "gray" }}
            noOfSections={3}
            maxValue={handleMaxValue("Direktorat Jaskel - Jasa Kelautan")}
            onPress={(e) => {
              dispatch(
                getDasboardListPKRL({
                  token: token,
                  tipe: tipe,
                  page: page,
                  search: search,
                  kategori: e.alias,
                })
              );
              setModal(true);
              setListTitle(e.alias);
            }}
          />
          <View style={{ marginTop: 20 }}>
            {dataChart?.["Direktorat Jaskel - Jasa Kelautan"]?.map(
              (item, index) => {
                return (
                  item.isSigned !== undefined && (
                    <View
                      style={{ marginTop: 10, flexDirection: "row", gap: 5 }}
                    >
                      <Text
                        style={{ fontSize: fontSizeResponsive("H4", device) }}
                      >
                        {item.label} :
                      </Text>
                      <Text
                        style={{ fontSize: fontSizeResponsive("H4", device) }}
                      >
                        {item.alias}
                      </Text>
                    </View>
                  )
                );
              }
            )}
          </View>
        </View>

        <View style={{ ...styles.card, marginTop: 20, marginHorizontal: "5%" }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H2", device),
                fontWeight: 600,
              }}
            >
              Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil
            </Text>
          </View>
          {renderTitle()}
          <BarChart
            data={
              dataChart[
                "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
              ]
            }
            barWidth={24}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            // hideAxesAndRules
            // showReferenceLine1
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "gray" }}
            noOfSections={3}
            maxValue={handleMaxValue(
              "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
            )}
            onPress={(e) => {
              dispatch(
                getDasboardListPKRL({
                  token: token,
                  tipe: tipe,
                  page: page,
                  search: search,
                  kategori: e.alias,
                })
              );
              setModal(true);
              setListTitle(e.alias);
            }}
          />
          <View style={{ marginTop: 20 }}>
            {dataChart?.[
              "Direktorat Pendayagunaan Pesisir dan Pulau-Pulau Kecil"
            ]?.map((item, index) => {
              return (
                item.isSigned !== undefined && (
                  <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.label} :
                    </Text>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.alias}
                    </Text>
                  </View>
                )
              );
            })}
          </View>
        </View>

        <View
          style={{ ...styles.card, marginVertical: 20, marginHorizontal: "5%" }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H2", device),
                fontWeight: 600,
              }}
            >
              Direktorat PRL
            </Text>
          </View>
          {renderTitle()}
          <BarChart
            data={dataChart["Direktorat PRL"]}
            barWidth={24}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            // hideAxesAndRules
            // showReferenceLine1
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "gray" }}
            noOfSections={3}
            maxValue={handleMaxValue("Direktorat PRL")}
            onPress={(e) => {
              dispatch(
                getDasboardListPKRL({
                  token: token,
                  tipe: tipe,
                  page: page,
                  search: search,
                  kategori: e.alias,
                })
              );
              setModal(true);
              setListTitle(e.alias);
            }}
          />
          <View style={{ marginTop: 10 }}>
            {dataChart?.["Direktorat PRL"]?.map((item, index) => {
              return (
                item.isSigned !== undefined && (
                  <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.label} :
                    </Text>
                    <Text
                      style={{ fontSize: fontSizeResponsive("H4", device) }}
                    >
                      {item.alias}
                    </Text>
                  </View>
                )
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <TouchableOpacity
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
        />
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.grey,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: FONTWEIGHT.bold,
                  fontSize: fontSizeResponsive("H4", device),
                  width: "95%",
                }}
              >
                List Dokumen {ListTitle}
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setModal(false);
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={device === "tablet" ? 42 : 24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={listDashboard.data}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <CardListDashboardPKRL
                  item={item}
                  token={token}
                  device={device}
                />
              )}
              ListEmptyComponent={() => <ListEmpty />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              style={{ height: "50%", marginVertical: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    //shadow ios
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    //shadow android
    elevation: 2,
  },
  iOSBackdrop: {
    backgroundColor: "#000",
    opacity: 0.5,
  },
  androidBackdrop: {
    backgroundColor: "#000",
    opacity: 0.7,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
