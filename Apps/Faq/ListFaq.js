import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, fontSizeResponsive } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFaq } from "../../store/Faq";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { getTokenValue } from "../../service/session";
import { getFaq } from "../../service/api";
import { Loading } from "../../components/Loading";
import { CardListFaq } from "../../components/CardListFaq";

export const ListFaq = () => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState({
    id: "",
    toggle: false,
  });
  const [token, setToken] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(0);

  const { faq, loading } = useSelector((state) => state.Faq);
  const { device } = useSelector((state) => state.apps);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
    dispatch(setFaq([]));
    setPage(0);
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getFaq({ token, page, search }));
    }
  }, [token, search, page]);

  useEffect(() => {
    setFilterData(faq.lists);
  }, [faq]);

  useEffect(() => {
    if (search !== "") {
      const data = faq.lists?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
      if (data.length === 0) {
      }
    } else {
      setFilterData(faq.lists);
    }
  }, [search, faq]);

  const loadMore = () => {
    if (filterData.length !== 0 && inputValue === "") {
      if (filterData.length % 10 === 0) {
        setPage(page + 1);
      }
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      if (token !== "") {
        setSearch("");
        setInputValue("");
        dispatch(getFaq({ token, page, search }));
      }
    } catch (error) {}

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token, page]);

  const navigation = useNavigation();

  const filter = () => {
    setSearch(inputValue);
  };

  return (
    <>
      <>
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
              borderRadius: 50,
              width: device === "tablet" ? 40 : 24,
              height: device === "tablet" ? 40 : 24,
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
          <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
            <Text
              style={{
                fontSize: fontSizeResponsive("H1", device),
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              FAQ
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              alignItems: "center",
              marginHorizontal: "5%",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 8,
                backgroundColor: COLORS.white,
              }}
            >
              <View style={styles.input}>
                <Ionicons
                  name="search"
                  size={fontSizeResponsive("H3", device)}
                  color={COLORS.primary}
                />
                <TextInput
                  placeholder={"Cari..."}
                  style={{
                    fontSize: fontSizeResponsive("H4", device),
                    flex: 1,
                  }}
                  maxLength={30}
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  onEndEditing={filter}
                  clearButtonMode="always"
                />
              </View>
            </View>
          </View>
          <FlatList
            data={filterData}
            renderItem={({ item }) => (
              <CardListFaq
                item={item}
                collapse={collapse}
                setCollapse={setCollapse}
                navigation={navigation}
                token={token}
                loading={loading}
                device={device}
              />
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
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : null
            }
            keyExtractor={(item) => item.id}
            // scrollEnabled={true}
            onEndReached={filterData.length !== 0 ? loadMore : null}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => <ListEmpty />}
            style={{ height: "75%" }}
          />
          {/* {loading && <Loading />} */}
        </View>
      </>
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
  card: {
    marginHorizontal: 20,
    borderRadius: 8,
    width: 362,
  },
  cardCollapse: {
    backgroundColor: "#fff",
    width: 362,
  },
});
