import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const DaftarKomentar = ({ items }) => {
  const [toggleComment, setToggleComment] = useState({
    toggle: false,
    id: items.id,
  });
  const clickBalas = (id, temp) => {
    setToggleComment({
      toggle: temp,
      id: id,
    });
  };

  return (
    <View
      key={items.id}
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          width: "90%",
          marginVertical: 5,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 3,
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
              style={{ width: 26, height: 26, borderRadius: 50 }}
              source={{ uri: items.creator_avatar }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: FONTSIZE.H2,
                fontWeight: FONTWEIGHT.bold,
                lineHeight: 20,
              }}
            >
              {items.creator}
            </Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  color: COLORS.lighter,
                  fontSize: FONTSIZE.H5,
                  fontWeight: FONTWEIGHT.normal,
                  lineHeight: 18,
                  marginBottom: 10,
                }}
              >
                {items.created_at}
              </Text>
            </View>
            <Text
              style={{
                color: COLORS.lighter,
                fontSize: FONTSIZE.H5,
                fontWeight: FONTWEIGHT.normal,
                lineHeight: 18,
              }}
            >
              {items.message}
            </Text>
            {items.child === "" ? null : (
              <View>
                {(!toggleComment.toggle && toggleComment.id === items.id) ||
                (toggleComment.id !== items.id && items.child > 0) ? (
                  <TouchableOpacity onPress={() => clickBalas(items.id, true)}>
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
                        }}
                      >
                        Tampilkan {items.child.length} Balasan
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {items.id === toggleComment.id && toggleComment.toggle
                  ? {
                      /* <View>
                    {items.child.map((listKomen, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          marginVertical: 10,
                          marginHorizontal: 20,
                        }}
                      >
                        <View>
                          <Image source={listKomen.avatarBalas} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: FONTSIZE.H2,
                              fontWeight: FONTWEIGHT.bold,
                              lineHeight: 20,
                            }}
                          >
                            {listKomen.nama}
                          </Text>
                          <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text
                              style={{
                                color: COLORS.lighter,
                                fontSize: FONTSIZE.H5,
                                fontWeight: FONTWEIGHT.normal,
                                lineHeight: 18,
                                marginBottom: 10,
                              }}
                            >
                              {listKomen.tanggal}
                            </Text>
                            <View
                              style={{
                                height: "70%",
                                width: 1,
                                backgroundColor: "#DBDADE",
                              }}
                            />
                            <Text
                              style={{
                                color: COLORS.lighter,
                                fontSize: FONTSIZE.H5,
                                fontWeight: FONTWEIGHT.normal,
                                lineHeight: 18,
                              }}
                            >
                              {listKomen.jam}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "#999999",
                              fontSize: FONTSIZE.H5,
                              fontWeight: FONTWEIGHT.normal,
                              lineHeight: 18,
                            }}
                          >
                            {listKomen.isi}
                          </Text>
                          {items.balas.length - 1 === index ? (
                            <TouchableOpacity
                              key={listKomen.id}
                              onPress={() => clickBalas(items.id, false)}
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
                                  }}
                                >
                                  Tutup {items.jmlhBalas} Balasan
                                </Text>
                              </View>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    ))}
                  </View> */
                    }
                  : null}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export const Komentar = () => {
  const navigation = useNavigation();
  const { dokumen } = useSelector((state) => state.repository);
  const detail = dokumen.detail;

  const comment = detail.comments;

  console.log(comment);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: "#800000",
          height: 80,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color={"#800000"} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text
            style={{
              fontSize: FONTSIZE.H1,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
            }}
          >
            Komentar
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 20, marginLeft: 20 }}>
        <Text>Komentar ({comment.length})</Text>
      </View>
      <FlatList
        data={comment}
        renderItem={({ item }) => (
          <View key={item.id}>
            <DaftarKomentar items={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
