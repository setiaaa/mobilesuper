import React, { useEffect, useState } from "react";
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
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import ListEmpty from "../../components/ListEmpty";
import { getTokenValue } from "../../service/session";
import { getListSertifikatEksternal } from "../../service/api";
import { Loading } from "../../components/Loading";
import { CardListSertifikatEksternal } from "../../components/CardListSertifikatEksternal.js";

export const SertifikatEksternal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { device } = useSelector((state) => state.apps);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    dispatch(getListSertifikatEksternal({ token: token, page: "1" }));
  }, [token]);

  const onRefresh = React.useCallback(() => {
    try {
      if (token !== "") {
        dispatch(getListSertifikatEksternal({ token: token, page: "1" }));
      }
    } catch (error) {}

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token]);

  const { eksternal, loading } = useSelector((state) => state.digitalsign);

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
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
            Sertifikat Eksternal
          </Text>
        </View>
      </View>

      <FlatList
        data={eksternal.lists}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <View key={item?.id}>
            <CardListSertifikatEksternal
              item={item}
              token={token}
              device={device}
            />
          </View>
        )}
        ListEmptyComponent={() => <ListEmpty />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: "70%" }}
      />
    </View>
  );
};
