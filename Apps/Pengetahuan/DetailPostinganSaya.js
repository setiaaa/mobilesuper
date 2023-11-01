import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import RenderHTML from "react-native-render-html";

export const DetailPostinganSaya = () => {
  const navigation = useNavigation();

  const { postinganSaya } = useSelector((state) => state.pengetahuan);

  const detail = postinganSaya?.detail;
  const source = {
    html: detail?.content,
  };
  const { width } = useWindowDimensions();

  console.log(postinganSaya?.detail);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: detail.cover }}
            style={{ width: "100%", height: 260 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              width: "100%",
              marginTop: 20,
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
                onPress={() => navigation.navigate("PostinganBaru")}
              >
                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            marginTop: -40,
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              position: "absolute",
              alignItems: "flex-end",
              marginTop: -20,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 20,
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.foundation,
              }}
            >
              {detail.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Image
                source={{ uri: detail.creator_avatar }}
                style={{ width: 36, height: 36, borderRadius: 18 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: 600 }}>
                  {detail?.creator?.name}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: COLORS.grey }}
                >
                  {detail?.published_date}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.warningLight,
                flexDirection: "row",
                paddingVertical: 5,
                paddingHorizontal: 10,
                width: 95,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Ionicons
                name="clipboard-outline"
                size={16}
                color={COLORS.warning}
              />
              <Text
                style={{ color: COLORS.warning, fontSize: 14, fontWeight: 400 }}
              >
                Penelitian
              </Text>
            </View>
            {detail?.summary ? (
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.danger,
                    width: 4,
                    height: 40,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.info,
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: "justify",
                    marginRight: 20,
                  }}
                >
                  {detail?.summary}
                </Text>
              </View>
            ) : (
              ""
            )}
            <View style={{ marginTop: 30 }}>
              <RenderHTML source={source} contentWidth={width} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
              <Image
                source={require("../../assets/superApp/detailPostinganSaya.png")}
                style={{ width: 180, height: 97, borderRadius: 6 }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', marginTop: 20}}>
              <View style={{ flexDirection: 'row', gap: 5}}>
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>{detail?.likes_count}</Text>
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>Disukai</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 5}}>
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>{detail?.comment_count}</Text>
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>Komentar</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 5}}>
                <Ionicons name="eye-outline" size={18} color={COLORS.grey} />
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>{detail?.views_count}</Text>
                <Text style={{ color: COLORS.lighter, fontSize: 13}}>Dilihat</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#DBDADE",
                width: "100%",
                height: 2,
                marginTop: 20,
              }}
            />
            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    width: 33,
                    height: 26,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="thumbs-up-outline"
                    size={18}
                    color={COLORS.grey}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  Suka
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={18}
                  color={COLORS.grey}
                />
                <Text style={{ fontSize: 13, marginStart: 5 }}>
                  Komen
                </Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <Ionicons name="information-circle-outline" size={18} color={COLORS.grey} />
                  <Text style={{ fontSize: 13, marginStart: 5 }}>
                    Info
                  </Text>
                </View>
              </TouchableOpacity>
              
              {/* <TouchableOpacity
                style={{
                  borderRadius: 8,
                  width: 100,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Ionicons name="information-circle-outline" size={18} />
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                width: "100%",
                height: 105,
                backgroundColor: COLORS.danger,
                borderRadius: 8,
                marginVertical: 20,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 8,
                padding: 20,
                height: 96,
                marginTop: -116,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 600 }}>Selanjutnya</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    width: 280,
                    marginTop: 10,
                    marginRight: 20,
                  }}
                >
                  KementBlog Kedua dari Penulis Sepenuh Hati Untuk Pembaca
                  penulis sepe..
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color={COLORS.grey}
                />
                
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
