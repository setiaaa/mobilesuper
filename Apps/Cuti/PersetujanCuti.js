import React, { useEffect } from "react";
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
import { FlatList } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { getDetailArsipCuti, getDokumenPersetujuan } from "../../service/api";
import moment from "moment";
import { CardListDokumenDisetujui } from "../../components/CardListDokumenDisetujui";
import {
  CardListDokumenTidakDisetujui,
  ListDokumenTidakDisetujui,
} from "../../components/CardListDokumenTidakDisetujui";
import { CardListDokumenDikembalikan } from "../../components/CardDokumenDikembalikan";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";
import { CardListDokumenPerluDisetujui } from "../../components/CardListDokumenPerluDisetujui";

export const PersetujanCuti = () => {
  const navigation = useNavigation();
  const [variant, SetVariant] = useState("Completed");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.superApps);

  useEffect(() => {
    if (profile.nip !== "") {
      dispatch(getDokumenPersetujuan(profile?.nip));
    }
  }, [profile?.nip]);

  const { persetujuan, loading } = useSelector((state) => state.cuti);

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(persetujuan.lists.data);
  }, [persetujuan]);

  useEffect(() => {
    if (search !== "") {
      const data = persetujuan.lists?.data.filter((item) => {
        return item.jenis_cuti.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(persetujuan.lists?.data);
    }
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (profile.nip !== "") {
        dispatch(getDokumenPersetujuan(profile?.nip));
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Search
                placeholder={"Cari"}
                iconColor={COLORS.primary}
                onSearch={filter}
              />
            </View>
          </View>

          <View style={{ gap: 10 }}>
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
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      maxWidth: 80,
                      borderColor:
                        variant === "On Progress"
                          ? COLORS.infoDangerLight
                          : COLORS.ExtraDivinder,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={() => {
                      SetVariant("On Progress");
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.info,
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
                          variant === "On Progress"
                            ? COLORS.infoDanger
                            : COLORS.foundation,
                        textAlign: "center",
                      }}
                    >
                      Butuh Persetujuan
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      maxWidth: 80,
                      borderColor:
                        variant === "Completed"
                          ? COLORS.infoDangerLight
                          : COLORS.ExtraDivinder,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={() => {
                      SetVariant("Completed");
                    }}
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
                      Disetujui Anda
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
                      Tidak Disetujui Anda
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      maxWidth: 98,
                      borderColor:
                        variant === "Returned"
                          ? COLORS.infoDangerLight
                          : COLORS.ExtraDivinder,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={() => SetVariant("Returned")}
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
                          variant === "Returned"
                            ? COLORS.infoDanger
                            : COLORS.foundation,
                        textAlign: "center",
                      }}
                    >
                      Dikembalikan Anda
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <TouchableOpacity onPress={onPress=()=>navigation.navigate('DetailDokumenCuti')}>
                        <View style={{backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15}}>
                                    <Text style={{fontSize: 12}}>Tanggal Pengajuan: 30 Sepember 2023 | 15:33:30</Text>
                                    <Text style={{fontSize: 12, color: COLORS.lighter}}>Jenis: Cuti Alasan Penting</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{fontSize: 12, color: COLORS.lighter}}>Tipe Dokumen: </Text>
                                        <View style={{backgroundColor: 'red', borderRadius: 10, padding: 5,}}>
                                            <Text style={{ fontSize: 12, color: COLORS.white}}>Pembatalan Cuti</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                            <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai: 01 Jan 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                            <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai: 01 Jan 2021</Text>
                                        </View>
                                    </View>
                            </View>
                    </TouchableOpacity> */}
              {variant === "Completed" ? (
                <FlatList
                  data={filterData}
                  renderItem={({ item }) => (
                    <View key={item.id}>
                      <CardListDokumenDisetujui
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
              ) : variant === "Rejected" ? (
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
              ) : variant === "Returned" ? (
                <FlatList
                  data={persetujuan.lists?.data}
                  renderItem={({ item }) => (
                    <View key={item.id}>
                      <CardListDokumenDikembalikan
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
              ) : variant === "On Progress" ? (
                <FlatList
                  data={persetujuan.lists?.data}
                  renderItem={({ item }) => (
                    <View key={item.id}>
                      <CardListDokumenPerluDisetujui
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
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
