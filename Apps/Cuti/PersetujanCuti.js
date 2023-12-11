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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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


    const [ascending, setAscending] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    const asc = () => {
        const sortedAscending = filterData
          .slice()
          .sort((a, b) => a.jenis_cuti.localeCompare(b.jenis_cuti));
        setFilterData(sortedAscending);
        setAscending(true);
        setIsFiltered(true);
      };
    
      const desc = () => {
        const sortedDescending = filterData
          .slice()
          .sort((a, b) => b.jenis_cuti.localeCompare(a.jenis_cuti));
        setFilterData(sortedDescending);
        setAscending(false);
        setIsFiltered(true);
      };

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
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ width: '85%',  }}>
                    <Search
                        placeholder={'Cari'}
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
          <View>
            {/* <View
              style={{
                backgroundColor: "white",
                marginTop: 10,
                borderRadius: 8,
              }}
            > */}
              <View
                style={{
                  paddingVertical: 10,
                  marginTop:10,
                  borderRadius:8,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor:COLORS.white,
                  gap: wp(3),
                }}
              >
                <TouchableOpacity
                  style={{
                    maxWidth: wp(22),
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
                      fontSize:FONTSIZE.H4
                    }}
                  >
                    Butuh Persetujuan
                  </Text>
                </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      maxWidth: wp(22),
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
                        fontSize:FONTSIZE.H4,
                      }}
                    >
                      Disetujui Anda
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      maxWidth: wp(22),
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
                        fontSize:FONTSIZE.H4,
                      }}
                    >
                      Tidak Disetujui Anda
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      maxWidth: wp(22),
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
                        fontSize:FONTSIZE.H4,
                      }}
                    >
                      Dikembalikan Anda
                    </Text>
                  </TouchableOpacity>
                </View>
              {/* </View> */}
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
    </GestureHandlerRootView>
  );
};