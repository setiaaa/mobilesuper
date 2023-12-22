import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, PADDING, fontSizeResponsive } from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { getDetailBerita, getSatkerNews } from "../../service/api";
import { CardListBeritaHome } from "../../components/CardListBeritaHome";
import { CardListBeritaSatker } from "../../components/CardListBeritaSatker";
import { setBeritaSatker } from "../../store/Satker";
import { ActivityIndicator } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { RefreshControl } from "react-native";

export const ListBeritaSatker = () => {
  const { berita, loading } = useSelector((state) => state.satker);
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState([]);
  const { device } = useSelector((state) => state.apps);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });

    dispatch(setBeritaSatker([]));
    setPage(1);
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getSatkerNews({ token, page }));
    }
  }, [token, page]);

  const loadMore = () => {
    if (berita.lists.length !== 0) {
      if (berita.lists.length % 10 === 0) {
        setPage(page + 1);
      }
    }
  };

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(berita.lists);
  }, [berita]);

  useEffect(() => {
    const item = berita.lists;
    if (search !== "") {
      const data = item.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(item);
    }
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (token !== "") {
        dispatch(getSatkerNews({ token, page }));
      }
    } catch (error) {
    }

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, page]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#f7f7f7", flex: 1 }}>
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
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              Berita
            </Text>
          </View>
        </View>
        <View style={{ padding: PADDING.Page, alignItems: "center" }}>
          <Search
            placeholder={"Cari"}
            iconColor={COLORS.primary}
            onSearch={filter}
          />
        </View>
        <FlatList
          data={filterData}
          renderItem={({ item, index }) => (
            <View key={index}>
              <CardListBeritaSatker
                image={item.image}
                tanggal={item.updated_at}
                // subtitle={item.subtitle}
                title={item.title}
                id={item.id}
                item={item}
                token={token}
                device={device}
              />
            </View>
          )}
          ListEmptyComponent={() => <ListEmpty />}
          ListFooterComponent={() =>
            loading && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 24,
                }}
              >
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            )
          }
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: "white",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  imageIos: {
    height: 193,
    width: 350,
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    width: 369,
    borderRadius: 16,
  },
});
