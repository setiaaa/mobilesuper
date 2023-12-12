import React from "react";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import {
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
  PADDING,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getArsipCuti } from "../../service/api";
import { useEffect } from "react";
import { FlatList } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import moment from "moment";
import { CardListDokumenTidakDisetujui } from "../../components/CardListDokumenTidakDisetujui";
import { CardListDokumenDisetujui } from "../../components/CardListDokumenDisetujui";
import { CardListDokumenOnProgress } from "../../components/CardListDokumenOnProgress";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";
import { CardListDokumenDraft } from "../../components/CardListDokumenDraft";

export const DokumenCuti = () => {
  const navigation = useNavigation();
  const [variant, SetVariant] = useState("Draft");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.superApps);
  useEffect(() => {
    if (profile.nip !== "") {
      dispatch(getArsipCuti(profile?.nip));
    }
  }, [profile?.nip]);
  const { arsip, loading } = useSelector((state) => state.cuti);
  const arsipLists = arsip.lists.data;

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(arsip.lists.data);
  }, [arsip]);

  useEffect(() => {
    if (search !== "") {
      const data = arsip.lists?.data.filter((item) => {
        return item.jenis_cuti.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(arsip.lists?.data);
    }
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (profile.nip !== "") {
        dispatch(getArsipCuti(profile?.nip));
        console.log("Refresh Berhasil");
      }
    } catch (error) {
      console.log("Refresh gagal:", error);
    }

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [profile?.nip]);

  const [ascending, setAscending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const asc = () => {
    const sortedAscending = filterData
      .slice()
      .sort((a, b) => a.member?.nama.localeCompare(b.member?.nama));
    setFilterData(sortedAscending);
    setAscending(true);
    setIsFiltered(true);
  };

  const desc = () => {
    const sortedDescending = filterData
      .slice()
      .sort((a, b) => b.member?.nama.localeCompare(a.member?.nama));
    setFilterData(sortedDescending);
    setAscending(false);
    setIsFiltered(true);
  };

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
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: FONTSIZE.H1,
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.white,
              }}
            >
              Cuti
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Libur")}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: PADDING.Page }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ width: "85%" }}>
              <Search
                placeholder={"Cari"}
                iconColor={COLORS.primary}
                onSearch={filter}
              />
            </View>
            <TouchableOpacity onPress={!ascending ? asc : desc}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: COLORS.secondaryLighter,
                  borderWidth: isFiltered ? 1 : 0,
                }}
              >
                <Ionicons name="filter-outline" size={24} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 10,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 30,
                }}
              >
                {/* <TouchableOpacity
                  style={{
                    maxWidth: 80,
                    borderColor:
                      variant === "Draft"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Draft")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.grey,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: 5,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Draft"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Draft
                  </Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                  style={{
                    maxWidth: 60,
                    borderColor:
                      variant === "Onprogress"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Onprogress")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.orange,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: 5,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Onprogress"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Sedang Proses
                  </Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                  style={{
                    maxWidth: 120,
                    borderColor:
                      variant === "Completed"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Completed")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.success,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: 5,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Completed"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Disetujui
                  </Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                  style={{
                    maxWidth: 60,
                    borderColor:
                      variant === "Rejected"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Rejected")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.danger,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: 5,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Rejected"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Tidak Disetujui
                  </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={{
                    maxWidth: 120,
                    borderColor:
                      variant === "Draft"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Draft")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.grey,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Draft"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                    }}
                  >
                    Draft
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    maxWidth: 120,
                    borderColor:
                      variant === "Onprogress"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Onprogress")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.orange,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Onprogress"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                    }}
                  >
                    Proses
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    maxWidth: 120,
                    borderColor:
                      variant === "Completed"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Completed")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.success,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Completed"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                    }}
                  >
                    Disetujui
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    maxWidth: 120,
                    borderColor:
                      variant === "Rejected"
                        ? COLORS.infoDangerLight
                        : COLORS.ExtraDivinder,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => SetVariant("Rejected")}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.danger,
                      borderRadius: 20,
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        variant === "Rejected"
                          ? COLORS.infoDanger
                          : COLORS.foundation,
                      textAlign: "center",
                    }}
                  >
                    Ditolak
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {variant === "Postponed" || variant === "Rejected" ? (
              <FlatList
                data={filterData}
                renderItem={({ item }) => (
                  <View key={item.id}>
                    <CardListDokumenTidakDisetujui
                      item={item}
                      nip={profile.nip}
                      variant={variant}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <ListEmpty />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{ height: "70%" }}
              />
            ) : variant === "Draft" ? (
              <FlatList
                data={filterData}
                renderItem={({ item }) => (
                  <View key={item.id}>
                    <CardListDokumenDraft
                      item={item}
                      variant={variant}
                      nip={profile.nip}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <ListEmpty />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{ height: "70%" }}
              />
            ) : variant === "Onprogress" ? (
              <FlatList
                data={filterData}
                renderItem={({ item }) => (
                  <View key={item.id}>
                    <CardListDokumenOnProgress
                      item={item}
                      variant={variant}
                      nip={profile.nip}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <ListEmpty />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{ height: "70%" }}
              />
            ) : variant === "Completed" ? (
              <FlatList
                data={filterData}
                renderItem={({ item }) => (
                  <View key={item.id}>
                    <CardListDokumenDisetujui
                      item={item}
                      variant={variant}
                      nip={profile.nip}
                      pembatalan={"pembatalan"}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <ListEmpty />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{ height: "70%" }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
