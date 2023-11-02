import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { } from "react-native-safe-area-context";
import {
  AVATAR,
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { getTokenValue } from "../../service/session";
import { TabView, SceneMap } from "react-native-tab-view";
import { Search } from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailLinimasa,
  getMyPostDetail,
  getMyPostList,
  getViewLinimasa,
} from "../../service/api";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment/moment";
import ListEmpty from "../../components/ListEmpty";
import { setRefresh } from "../../store/Pengetahuan";
import { Loading } from "../../components/Loading";
import { ActivityIndicator } from "react-native";

const CardPostinganSaya = ({ item, token }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailLinimasa(params));
    dispatch(getViewLinimasa(params));
  };

  return (
    <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
      <TouchableOpacity
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("DetailLinimasa");
        }}
      >
        <View
          key={item.id}
          style={{
            backgroundColor: "#FFFFFF",
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            elevation: 2,
            borderRadius: 8,
            // height: 130,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 2,
                  borderRadius: 6,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  shadowOpacity: 0.2,
                  //shadow android
                  elevation: 2,
                }}
              >
                <Image
                  source={{ uri: item?.cover }}
                  style={{ height: 38, width: 70, borderRadius: 6 }}
                />
              </View>
            </View>
            <View style={{ marginHorizontal: 10, width: "75%", }}>
              <Text
                style={{
                  // width: 270,
                  fontSize: 13,
                  textAlign: "justify",
                  marginBottom: 5,
                  maxWidth: 250,
                }}
                numberOfLines={3} // Limit the number of lines to 1
                ellipsizeMode="tail" // Display "..." at the end if text overflows
              >
                {item.title}
              </Text>
              <View
                style={{
                  marginVertical: 15,
                }}
              >
                <Text style={{ color: "#6B7280", fontSize: 13 }}>
                  Tanggal :{" "}
                  {moment(item.created_at, "HH:mm:ss").format(
                    DATETIME.LONG_DATE
                  )}
                </Text>
              </View>
              <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ color: "#6B7280", fontSize: 13, marginEnd: 5 }}
                  >
                    Poin :
                  </Text>
                  <View
                    style={{
                      backgroundColor: COLORS.success,
                      borderRadius: 8,
                      width: 30,
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                      {item.score}
                    </Text>
                  </View>
                </View>

                {item?.state === "publish" ? (
                  <View
                    style={{
                      backgroundColor: COLORS.successLight,
                      borderRadius: 20,
                      width: 79,
                      height: 24,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ color: COLORS.success, textAlign: "center" }}
                    >
                      Publish
                    </Text>
                  </View>
                ) : item?.state === "draft" ? (
                  <View
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 20,
                      width: 79,
                      height: 24,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.grey, textAlign: "center" }}>
                      Draft
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: COLORS.infoDangerLight,
                      borderRadius: 20,
                      width: 79,
                      height: 24,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ color: COLORS.infoDanger, textAlign: "center" }}
                    >
                      Canceled
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 50,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderColor: "#E0E0E0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 8,
                  width: 33,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="thumbs-up-outline" size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.primary,
                  marginStart: 5,
                }}
              >
                {item.likes_count}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={18}
                color={COLORS.grey}
              />
              <Text style={{ fontSize: 13, marginStart: 5 }}>
                {item.comment_count}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="eye-outline" size={18} color={COLORS.grey} />
              <Text style={{ fontSize: 13, marginStart: 5 }}>
                {item.views_count}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const PostinganSaya = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  const dispatch = useDispatch();

  const [page, setPage] = useState(5);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getMyPostList({ token: token, page: page }));
    }
  }, [token, page]);

  const { postinganSaya, loading } = useSelector((state) => state.pengetahuan);

  const loadMore = () => {
    if (postinganSaya.lists.length % 5 === 0) {
      setPage(page + 5);
    }
    console.log(page);
  };

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(postinganSaya.lists);
  }, [postinganSaya]);

  useEffect(() => {
    if (search !== "") {
      const data = postinganSaya.lists?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(postinganSaya.lists);
    }
  }, [search]);

  // console.log(postinganSaya.lists);

  return (
    <>
      {postinganSaya.lists.length === 0 ? <Loading /> : null}
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
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
          >
            Postingan Saya
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
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("JumlahPostingan")}
          >
            <Ionicons
              name="document-text-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
        <View
          style={{
            marginTop: 15,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", marginRight: 10, marginBottom: 15 }}>
            <Search
              placeholder={"Cari..."}
              iconColor={COLORS.primary}
              onSearch={filter}
            />
          </View>
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#C34647",
              borderRadius: 8,
              height: 54,
              width: "12%",
              justifyContent: "center",
              alignItems: "center",
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
            onPress={() => navigation.navigate("PostinganBaru")}
          >
            <Ionicons name="add-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity> */}
        </View>
      </View>

      <FlatList
        data={filterData}
        renderItem={({ item }) => (
          <View key={item.id}>
            <CardPostinganSaya
              item={item}
              token={token}
            />
          </View>
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
        ListEmptyComponent={() => <ListEmpty />}
        onEndReached={loadMore}
      />
    </>
  );
};
