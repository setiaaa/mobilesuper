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
  getDokGeneral,
  getDokHukum,
  getUnitKerjaTematikId,
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
import { TextInput } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";

export const Pencarian = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState(false);
  const [page, setPage] = useState(5);

  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      const params = {
        token: token,
        search: search,
        page: page,
      };
      dispatch(getDokGeneral(params));
    }
  }, [token, search, page]);

  const { general, loading } = useSelector((state) => state.kebijakan);

  useEffect(() => {
    setFilterData(general);
  }, [general]);

  const asc = () => {
    const sortedAscending = filterData
      ?.slice()
      .sort((a, b) => a.nomor - b.nomor);
    setFilterData(sortedAscending);

    setAscending(true);
  };

  const desc = () => {
    const sortedDescending = filterData
      .slice()
      .sort((a, b) => b.nomor - a.nomor);

    setFilterData(sortedDescending);

    setAscending(false);
  };

  filter = () => {
    setSearch(inputValue);
  };

  const loadMore = () => {
    if (general?.length % 5 === 0) {
      setPage(page + 5);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        try {
          if (token !== "") {
            const params = {
              token: token,
              search: search,
              page: page,
            };
            dispatch(getDokGeneral(params));
            console.log('Refresh Berhasil')
          }
        } catch (error) {
            console.log('Refresh gagal:', error)
        }

        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, [token, search, page]);

  console.log(general);

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
              Pencarian
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
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
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                }}
              >
                <View style={styles.input}>
                  <Ionicons name="search" size={20} color={COLORS.primary} />
                  <TextInput
                    placeholder={"Cari..."}
                    style={{ fontSize: 16, flex: 1 }}
                    maxLength={30}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    onSubmitEditing={filter}
                    clearButtonMode="always"
                  />
                </View>
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
          </View>
        </View>
        <View style={{ height: "75%" }}>
          <FlatList
            data={filterData}
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
            onEndReached={general?.length === 0 ? null : loadMore}
            ListEmptyComponent={<ListEmpty />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.ExtraDivinder,
    borderRadius: 8,
  },
});
