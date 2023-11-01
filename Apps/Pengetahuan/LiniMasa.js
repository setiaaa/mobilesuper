import React, { useMemo, useRef } from "react";
import { Modal, Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AVATAR,
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLiniMasa, setRefresh } from "../../store/Pengetahuan";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  getDetailLinimasa,
  getLinimasa,
  getViewLinimasa,
  patchLike,
  patchUnlike,
} from "../../service/api";
import { getTokenValue } from "../../service/session";
import moment from "moment";
import { ScrollView } from "react-native";
import { Loading } from "../../components/Loading";
import { ActivityIndicator } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";

const CardLiniMasa = ({ item, token }) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalView, setVisibleModalView] = useState(false);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["95%"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttachComment = () => {
    bottomSheetModalRef.current?.present();
  };
  const bottomSheetAttachCommentClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const handleLike = () => {
    const data = {
      token: token,
      id: item.id,
    };
    if (item.liked == false) {
      dispatch(patchLike(data));
    } else {
      dispatch(patchUnlike(data));
    }
  };

  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailLinimasa(params));
    dispatch(getViewLinimasa(params));
  };

  // console.log(item);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        width: "90%",
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        //shadow android
        elevation: 2,
        alignContent: "center",
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          getDetail(item.id);
          navigation.navigate("DetailLinimasa");
        }}
      >
        <View
          style={{
            marginTop: 30,
            marginHorizontal: 15,
          }}
        >
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View>
              <Image
                source={{ uri: item.avatar_url }}
                style={{ borderRadius: 50, width: 50, height: 50 }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                {item.creator.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: 14,
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    marginVertical: 5,
                    fontSize: 13,
                  }}
                >
                  {item?.published_date?.slice(0, -9)}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      item.category === "Video / Jurnal"
                        ? COLORS.successLight
                        : item.category === "Infografis"
                          ? COLORS.warningLight
                          : COLORS.infoLight,
                    height: 30,
                    width: 120,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  {item.category === "Infografis" ? (
                    <Ionicons
                      name="document-outline"
                      color={"#F6AD1D"}
                      style={{ marginTop: 2 }}
                    />
                  ) : item.category === "Kegiatan" ? (
                    <Ionicons
                      name="analytics-outline"
                      color={"#1868AB"}
                      style={{ marginTop: 3 }}
                    />
                  ) : (
                    <Ionicons
                      name="videocam-outline"
                      color={"#11C15B"}
                      style={{ marginTop: 2 }}
                    />
                  )}
                  <Text
                    style={{
                      color:
                        item.category === "Infografis"
                          ? COLORS.warning
                          : item.category === "Kegiatan"
                            ? COLORS.info
                            : COLORS.success,
                    }}
                  >
                    {item.category}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Image
              source={{ uri: item.cover }}
              style={{ width: "100%", height: 160, borderRadius: 8 }}
            />
          </View>

          <Text
            style={{
              textAlign: "justify",
              color: COLORS.lighter,
              fontSize: FONTSIZE.H3,
            }}
          >
            {item.title}
          </Text>

          {/* <View
            style={{
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
              onPress={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <Ionicons
                name="thumbs-up-outline"
                size={18}
                color={item.liked == true ? COLORS.primary : null}
              />
              <Text
                style={{ color: item.liked == true ? COLORS.primary : null }}
              >
                {item.likes_count}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Ionicons name="chatbox-outline" size={18} />
              <Text>{item.comment_count}</Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              onPress={(e) => {
                e.stopPropagation();
                setVisibleModalView(true);
              }}
            >
              <Ionicons name="eye-outline" size={18} />
              <Text>{item.views_count}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              onPress={(e) => {
                e.stopPropagation();
                setVisibleModal(true);
              }}
            >
              <Ionicons name="information-circle-outline" size={18} />
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          setVisibleModal(!visibleModal);
        }}
      >
        <TouchableOpacity
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              borderRadius: 10,
              marginTop: "40%",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                marginHorizontal: 20,
                marginTop: 20,
              }}
              onPress={() => {
                setVisibleModal(false);
              }}
            >
              <Ionicons name="close-outline" size={24} color={COLORS.lighter} />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                width: 179,
                height: 40,
                marginHorizontal: 20,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 4,
              }}
            >
              <Text style={{ color: COLORS.white }}>Informasi Pengetahuan</Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  marginHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>
                  Judul
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [What]
                </Text>
              </View>

              <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>
                {item.title}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  marginHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>
                  Anggota Angenda
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [Who]
                </Text>
              </View>

              <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>
                {item.anggota}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  marginHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>
                  Rangkuman
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [Why]
                </Text>
              </View>

              <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>
                {item.summary}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  marginHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>
                  Tempat Agenda
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [Where]
                </Text>
              </View>

              <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>
                {item.tempat}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  marginHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>
                  Waktu Mulai
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [When]
                </Text>
              </View>

              <Text
                style={{
                  width: 260,
                  marginHorizontal: 60,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                {item.kapan}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModalView}
        onRequestClose={() => {
          setVisibleModalView(!visibleModalView);
        }}
      >
        <TouchableOpacity
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              borderRadius: 10,
              marginTop: "40%",
            }}
          >
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: FONTSIZE.Judul,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Dilihat Oleh
                </Text>
              </View>

              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setVisibleModalView(false);
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>
            {/* custom divider */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  height: 1,
                  width: "90%",
                  backgroundColor: "#DBDADE",
                  marginVertical: 10,
                }}
              />
            </View>

            <ScrollView style={{ marginBottom: 40 }}>
              {item.view_list.map((data) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={{ uri: data.avatar_url }}
                      style={{ width: 50, height: 50, borderRadius: 30 }}
                    />
                    <Text>{data.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 20,
          // paddingHorizontal: 16,
          // backgroundColor: "grey",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: COLORS.lighter }}>
            {item.likes_count} Disukai
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ color: COLORS.lighter }}>
            {item.comment_count} Komentar
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
            onPress={(e) => {
              e.stopPropagation();
              getDetail(item.id);
              navigation.navigate("DetailLinimasa");
            }}
          >
            <Ionicons
              name="eye-outline"
              size={18}
              style={{ color: COLORS.lighter }}
            />
            <Text style={{ color: COLORS.lighter }}>
              {item.views_count} Dilihat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* divider custom */}
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#DBDADE",
          // marginTop: 20,
          marginHorizontal: 20,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginVertical: 20,
          marginHorizontal: 20,
          paddingHorizontal: 16,
          // backgroundColor: "grey",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 3,
            alignItems: "center",
          }}
          onPress={handleLike}
        >
          <Ionicons
            name="thumbs-up-outline"
            size={18}
            color={item.liked == true ? COLORS.primary : null}
          />
          <Text
            style={{
              color: item.liked == true ? COLORS.primary : null,
            }}
          >
            Suka
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
          onPress={(e) => {
            e.stopPropagation();
            getDetail(item.id);
            navigation.navigate("DetailLinimasa");
          }}
        >
          <Ionicons name="chatbox-outline" size={18} />
          <Text>Komen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
          onPress={(e) => {
            e.stopPropagation();
            getDetail(item.id);
            navigation.navigate("DetailLinimasa");
          }}
        >
          <Ionicons name="information-circle-outline" size={18} />
          <Text>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const LiniMasa = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [page, setPage] = useState(5);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getLinimasa({ token: token, page: page }));
      dispatch(setRefresh(false));
    }
  }, [token, page]);

  const { linimasa, refresh, loading } = useSelector(
    (state) => state.pengetahuan
  );

  useEffect(() => {
    if (refresh) {
      dispatch(getLinimasa({ token: token, page: page }));
    }
  }, [refresh]);

  const loadMore = () => {
    if (linimasa.lists.length % 5 === 0) {
      setPage(page + 5);
    }
    console.log(page);
  };

  // console.log(linimasa.lists)

  return (
    <>
      {linimasa.lists.length === 0 ? <Loading /> : null}
      <SafeAreaView>
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
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
            <Text
              style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
            >
              Linimasa Pengetahuan
            </Text>
          </View>
        </View>

        <FlatList
          data={linimasa.lists}
          renderItem={({ item }) => (
            <View key={item.id}>
              <CardLiniMasa
                item={item}
                token={token}
              // setVisibleModal={setVisibleModal}
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageIos: {
    width: "100%",
  },
  imageAndroid: {
    width: "100%",
  },
});
