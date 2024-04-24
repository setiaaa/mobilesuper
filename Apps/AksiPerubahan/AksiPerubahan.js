import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  PADDING,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { getAksiPerubahan } from "../../service/api";
import { CardAksiPerubahan } from "../../components/CardAksiPerubahan";
import ListEmpty from "../../components/ListEmpty";
import { Loading } from "../../components/Loading";

export const AksiPerubahan = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const { device } = useSelector((state) => state.apps);
  const { lists, loading } = useSelector((state) => state.aksiperubahan);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAksiPerubahan({ token: token, page: page }));
    }
  }, [token, page]);

  const loadMore = () => {
    if (lists.length !== 0) {
      if (lists.length % 5 === 0) {
        setPage(page + 1);
        if (scrollRef) {
          scrollRef.current.scrollToIndex({ animated: false, index: 0 });
        }
      }
    }
  };

  const onRefresh = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View>
      {loading ? <Loading /> : null}
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
              marginRight: 50,
            }}
          >
            Aksi Perubahan
          </Text>
        </View>
      </View>

      <View style={{ padding: PADDING.Page }}>
        <Text
          style={{
            fontSize: fontSizeResponsive("Judul", device),
          }}
        >
          Daftar Aksi Perubahan
        </Text>

        <View>
          <FlatList
            data={lists}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <CardAksiPerubahan item={item} device={device} />
            )}
            onEndReached={loadMore}
            ref={scrollRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => <ListEmpty />}
            style={{ height: 630 }}
          />
        </View>
      </View>
    </View>
  );
};
