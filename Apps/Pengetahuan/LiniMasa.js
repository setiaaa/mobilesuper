import React, { useMemo, useRef } from "react";
import { KeyboardAvoidingView, Modal, Text } from "react-native";
import { View } from "react-native";
import {} from "react-native-safe-area-context";
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
import { Search } from "../../components/Search";
import {
  getDetailLinimasa,
  getLinimasa,
  getListsLike,
  getViewLinimasa,
  patchLike,
  patchUnlike,
  postComment,
} from "../../service/api";
import { getTokenValue } from "../../service/session";
import moment from "moment";
import { ScrollView } from "react-native";
import { Loading } from "../../components/Loading";
import { ActivityIndicator } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

const CardKomen = ({ listData, inputRef, setParentId }) => {
  const [toggleComment, setToggleComment] = useState({
    toggle: false,
    // id: data[0].Komentar[0].id
  });
  const clickBalas = (id, temp) => {
    setToggleComment({
      toggle: temp,
      id: id,
    });
    // console.log(id);
    console.log(listData);
  };

  const handleClickBalas = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setParentId({ id: listData.id, creator: listData.creator });
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          width: "90%",
          marginVertical: 5,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <View>
            <Image
              source={{ uri: listData.creator_avatar }}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: FONTSIZE.H2,
                fontWeight: FONTWEIGHT.bold,
                lineHeight: 20,
                wordWrap: "break-word",
              }}
            >
              {listData.creator}
            </Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  color: COLORS.lighter,
                  fontSize: FONTSIZE.H5,
                  fontWeight: FONTWEIGHT.normal,
                  lineHeight: 18,
                  wordWrap: "break-word",
                  marginBottom: 10,
                }}
              >
                {listData.created_at}
              </Text>
            </View>
            <Text
              style={{
                color: COLORS.lighter,
                fontSize: FONTSIZE.H3,
                fontWeight: FONTWEIGHT.normal,
                wordWrap: "break-word",
              }}
            >
              {listData.message}
            </Text>

            <TouchableOpacity
              style={{
                color: COLORS.lighter,
                fontSize: FONTSIZE.H3,
                fontWeight: FONTWEIGHT.normal,
                wordWrap: "break-word",
                marginTop: 10,
              }}
              onPress={() => {
                handleClickBalas();
              }}
            >
              <Text
                style={{ color: COLORS.primary, fontWeight: FONTWEIGHT.bold }}
              >
                Balas
              </Text>
            </TouchableOpacity>

            {listData.child.length === 0 ? null : (
              <View>
                {(!toggleComment.toggle && toggleComment.id === listData.id) ||
                (toggleComment.id !== listData.id &&
                  listData.child.length > 0) ? (
                  <TouchableOpacity
                    key={listData.id}
                    onPress={() => clickBalas(listData.id, true)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 1,
                          width: 20,
                          backgroundColor: "#DBDADE",
                        }}
                      />
                      <Text
                        style={{
                          color: COLORS.lighter,
                          fontSize: FONTSIZE.H5,
                          fontWeight: FONTWEIGHT.normal,
                          lineHeight: 18,
                          wordWrap: "break-word",
                        }}
                      >
                        Tampilkan {listData.child?.length} Balasan
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {listData.id === toggleComment.id && toggleComment.toggle ? (
                  <View>
                    {listData.child?.map((listKomen, index) => (
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10,
                            marginHorizontal: 20,
                          }}
                        >
                          <View>
                            <Image
                              source={{ uri: listKomen.creator_avatar }}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 20,
                              }}
                            />
                          </View>
                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={{
                                fontSize: FONTSIZE.H2,
                                fontWeight: FONTWEIGHT.bold,
                                lineHeight: 20,
                                wordWrap: "break-word",
                              }}
                            >
                              {listKomen.creator}
                            </Text>
                            <View style={{ flexDirection: "row", gap: 5 }}>
                              <Text
                                style={{
                                  color: COLORS.lighter,
                                  fontSize: FONTSIZE.H5,
                                  fontWeight: FONTWEIGHT.normal,
                                  lineHeight: 18,
                                  wordWrap: "break-word",
                                  marginBottom: 10,
                                }}
                              >
                                {listKomen.created_at}
                              </Text>
                            </View>
                            <Text
                              style={{
                                color: "#999999",
                                fontSize: FONTSIZE.H3,
                                fontWeight: FONTWEIGHT.normal,
                                lineHeight: 18,
                                wordWrap: "break-word",
                              }}
                            >
                              {listKomen.message}
                            </Text>
                            {listData.child.length - 1 === index ? (
                              <TouchableOpacity
                                key={listKomen.id}
                                onPress={() => clickBalas(listData.id, false)}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5,
                                    marginTop: 10,
                                  }}
                                >
                                  <View
                                    style={{
                                      height: 1,
                                      width: 20,
                                      backgroundColor: "#DBDADE",
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: COLORS.lighter,
                                      fontSize: FONTSIZE.H5,
                                      fontWeight: FONTWEIGHT.normal,
                                      lineHeight: 18,
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    Tutup {listData.child.length} Balasan
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ) : null}
                          </View>
                        </View>
                      </>
                    ))}
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const CardLiniMasa = ({ item, token }) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalView, setVisibleModalView] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [parentId, setParentId] = useState({ id: "", creator: "" });
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

// console.log(item)

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

  const { linimasa, refresh } = useSelector((state) => state.pengetahuan);
  // console.log(linimasa?.detail);
  const detail = linimasa?.detail;
  console.log(item.like_list);

  const [komen, setKomen] = useState("");
  const [toggleComment, setToggleComment] = useState({
    toggle: false,
    id: "",
  });
  const handleComment = () => {
    const payload = {
      article_id: detail.id,
      parent_id: parentId.id !== "" ? parentId.id : "",
      message: komen,
    };
    const data = {
      token: token,
      payload: payload,
    };
    dispatch(postComment(data));
    setKomen("");
    setParentId({ id: "", creator: "" });
  };

  useEffect(() => {
    const data = {
      token: token,
      id: detail.id,
    };
    if (refresh) {
      console.log("masukkkkkkk");
      dispatch(getDetailLinimasa(data));
      dispatch(setRefresh(false));
    }
  }, [refresh]);
  const [visibleModalViewDisukai, setVisibleModalViewDisukai] = useState(false);



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
        marginBottom: 5,
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
                  width: "100%",
                  gap: 14,
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    marginVertical: 1,
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

      {/* Modal Informasi */}
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
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.grey,
              }}
            >
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Dashboard</Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setVisibleModal(false);
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
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
                {detail?.title !== "" && detail?.title !== null
                  ? detail.title
                  : "-"}
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
                  Anggota Agenda
                </Text>
                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>
                  [Who]
                </Text>
              </View>

              <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>
                {detail?.members_agenda !== "" &&
                detail?.members_agenda !== null
                  ? detail.members_agenda
                  : "-"}
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
                {detail?.summary !== "" && detail?.summary !== null
                  ? detail.summary
                  : "-"}
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
                {detail?.place_agenda !== "" && detail?.place_agenda !== null
                  ? detail.place_agenda
                  : "-"}
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
                {detail?.start_date_agenda !== "" &&
                detail?.start_date_agenda !== null
                  ? detail.start_date_agenda?.slice(0, -9)
                  : "-"}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Dilihat */}
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

            <ScrollView style={{ marginBottom: 20 }}>
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
          justifyContent: 'center', 
          gap: 40
          // paddingHorizontal: 16,
          // backgroundColor: "grey",
        }}
      >
        <View>
          <TouchableOpacity onPress={() => {
                      // bottomSheetAttachCommentClose();
                      // dispatch(
                      //   getListsLike({ token: token, id: detail.id })
                      // );
                      // navigation.navigate("ListSukaLinimasa");
                      setVisibleModalViewDisukai(true);
                    }}>
          <Text style={{ color: COLORS.lighter }}>
            {item.likes_count} Disukai
          </Text>
          </TouchableOpacity>
        </View>

        <Modal
                  animationType="fade"
                  transparent={true}
                  visible={visibleModalViewDisukai}
                  onRequestClose={() => {
                    setVisibleModalViewDisukai(!visibleModalViewDisukai);
                  }}
                >
                  <TouchableOpacity
                    style={[
                      Platform.OS === "ios"
                        ? styles.iOSBackdrop
                        : styles.androidBackdrop,
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
                            Disukai Oleh
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{}}
                          onPress={() => {
                            setVisibleModalViewDisukai(false);
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
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                        {item.like_list.map((data) => {
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
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 30,
                                }}
                              />
                              <Text>{data.name}</Text>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>



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
            onPress={() => {
              setVisibleModalView(true);
            }}
          >
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
            onPress={() => {
              setVisibleModalView(true);
            }}>
            {/* <Ionicons
              name="eye-outline"
              size={18}
              style={{ color: COLORS.lighter }}
            /> */}
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
          justifyContent: "center",
          gap: 30,
        }}
      >
        <View>
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
          color={detail.liked == true ? COLORS.primary : null}
        />
        <Text
          style={{
            color: detail.liked == true ? COLORS.primary : null,
          }}
        >
          Suka
        </Text>
        </TouchableOpacity>
        </View>

        
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
          onPress={bottomSheetAttachComment}
          >
            <Ionicons name="chatbox-outline" size={18} />
            <Text>Komentar</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
          onPress={() => {
            getDetail(item.id);
            bottomSheetAttachComment();
          }}
        >
          {/* <Ionicons name="chatbox-outline" size={18} /> */}
          {/* <Text>Komentar</Text> */}
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          index={0}
          style={{ borderRadius: 50 }}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjust"
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
          )}
        >
          <BottomSheetView onLayout={handleContentLayout} style={{}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "height" : "height"}
              keyboardVerticalOffset={parentId !== "" ? 80 : 70}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginLeft: 20,
                }}
              >
                <Ionicons
                  name="thumbs-up-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={{ color: COLORS.primary }}>
                  {detail.likes_count}
                </Text>
                <Text style={{ color: COLORS.primary }}>Disukai</Text>
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetAttachCommentClose();
                    dispatch(getListsLike({ token: token, id: detail.id }));
                    navigation.navigate("ListSukaLinimasa");
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 20, marginVertical: 20 }}>
                <Text style={{ color: COLORS.ExtraDivinder }}>
                  Komentar({detail.comment_count})
                </Text>
              </View>

              <FlatList
                data={detail.comments}
                renderItem={({ item }) => (
                  <CardKomen
                    listData={item}
                    inputRef={inputRef}
                    setParentId={setParentId}
                    toggleComment={toggleComment}
                    setToggleComment={setToggleComment}
                  />
                )}
                style={{ height: 370 }}
              />

              <View style={{ justifyContent: "flex-end", paddingTop: 10 }}>
                {parentId.id !== "" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text>Membalas {parentId.creator}</Text>
                    <TouchableOpacity>
                      <Ionicons
                        name="close"
                        size={20}
                        color={COLORS.primary}
                        onPress={() => setParentId({ id: "", creator: "" })}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View
                  style={{
                    height: 1,
                    width: "90%",
                    backgroundColor: COLORS.lighter,
                    opacity: 0.3,
                    marginTop: 10,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    borderWidth: 1,
                    width: "90%",
                    marginLeft: 17,
                    borderRadius: 16,
                    borderColor: COLORS.ExtraDivinder,
                    flexDirection: "row",
                    backgroundColor: COLORS.ExtraDivinder,
                    marginTop: 10,
                  }}
                >
                  <BottomSheetTextInput
                    numberOfLines={1}
                    maxLength={30}
                    placeholder="Ketik Komentar Disini"
                    ref={inputRef}
                    style={{ padding: 10 }}
                    onChangeText={setKomen}
                    value={komen}
                  />
                  <View
                    style={{
                      alignItems: "flex-end",
                      flex: 1,
                      marginRight: 10,
                      marginLeft: 50,
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleComment();
                      }}
                    >
                      <Ionicons
                        name="send-sharp"
                        size={20}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheetModal>
        
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
          onPress={() => {
            getDetail(item.id);
            setVisibleModal(true);
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
    // console.log(page);
  };

  // console.log(linimasa.listsLike)

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    setFilterData(linimasa.lists);
}, [linimasa]);

  useEffect(() => {
    if (search !== "") {
      const data = linimasa.lists?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
      if (data.length === 0) {
      }
    } else {
      setFilterData(linimasa.lists);
    }
  }, [search, linimasa]);

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);


  const asc = () => {
    const sortedAscending = filterData
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title.nama));
    setFilterData(sortedAscending);
    setAscending(true);
    setIsFiltered(true);
  };

  const desc = () => {
    const sortedDescending = filterData
      .slice()
      .sort((a, b) => b.title.localeCompare(a.title.nama));
    setFilterData(sortedDescending);
    setAscending(false);
    setIsFiltered(true);
  };




  // console.log(linimasa.lists.like_list[0])

  return (
    <>
      {linimasa.lists.length === 0 ? <Loading /> : null}
      <>
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

        <View style={{ padding: 20 }}>
          <View style={{ width: "100%", marginRight: 10, marginBottom: 15 }}>
            <Search
              placeholder={"Cari..."}
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
            // borderWidth: isFiltered ? 1 : 0,
          }}
          >
            <Ionicons name="filter-outline" size={24} />
          </View>
        </TouchableOpacity>
          </View>

        <FlatList
          data={filterData}
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
      </>
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
