import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {} from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Search } from "../../components/Search";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { getDocumentListSPPD } from "../../service/api";
import { CardDokumenListSPPD } from "../../components/CardDokumenListSPPD";
import ListEmpty from "../../components/ListEmpty";
import { Loading } from "../../components/Loading";
import { RefreshControl } from "react-native";

export const DokumenSPPD = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getDocumentListSPPD(token));
    }
  }, [token]);

  const { dokumen, loading } = useSelector((state) => state.sppd);

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(dokumen.lists);
  }, [dokumen]);

  useEffect(() => {
    if (search !== "") {
      const data = dokumen.lists?.filter((item) => {
        return item.event.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(dokumen.lists);
    }
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
      try {
          if (token !== '') {
            dispatch(getDocumentListSPPD(token));
            console.log('Refresh Berhasil')
          }
      } catch (error) {
          console.log('Refresh gagal:', error)
      }

      setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      }, 2000);
  }, [token]);

  return (
    <>
    {loading ? (
      <Loading />
    ) : (
      null
    )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: COLORS.primary,
          height: 80,
          paddingBottom: 20,
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
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            Daftar Dokumen
          </Text>
        </View>
      </View>
      <View style={{ padding: 20, }}>
        <Search placeholder={"Cari"} onSearch={filter} />
        <FlatList
          data={filterData}
          renderItem={({ item }) => (
            <View key={item.id}>
              <CardDokumenListSPPD item={item} token={token} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <ListEmpty />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{height:"83%", marginTop:6}}
        />
      </View>
    </>
  );
};
