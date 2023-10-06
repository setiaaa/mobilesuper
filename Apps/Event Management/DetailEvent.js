import React, { useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Video } from "expo-av";
import { FlatList } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import moment from "moment";

const CardLampiran = ({ lampiran, onClick, type }) => {
  const navigation = useNavigation();
  console.log(lampiran);
  return type === "png" || type === "jpg" || type === "jpeg" ? (
    <TouchableOpacity onPress={onClick}>
      <Image
        source={{ uri: lampiran }}
        style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10 }}
      />
    </TouchableOpacity>
  ) : type === "mp4" ? (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: 97,
        height: 97,
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/superApp/mp4.png")}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  ) : type === "doc" || type === "docx" ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
      style={{
        width: 97,
        height: 97,
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/superApp/word.png")}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  ) : type === "xls" || type === "xlsx" ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
      style={{
        width: 97,
        height: 97,
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/superApp/excel.png")}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  ) : type === "pdf" ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
      style={{
        width: 97,
        height: 97,
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/superApp/pdf.png")}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  ) : type === "ppt" || type === "pptx" ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
      style={{
        width: 97,
        height: 97,
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/superApp/ppt.png")}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  ) : null;
};

export const DetailEvent = () => {
  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [lampiranById, setLampiranById] = useState(null);

  const [document, setDocument] = useState([]);

  const getFileExtension = (type) => {
    let jenis = type.split(".");
    jenis = jenis[jenis.length - 1];
    return jenis;
  };
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const { event } = useSelector((state) => state.event);

  const data = event.detailEvent;

  console.log(data);

  return (
    <SafeAreaView>
      <ScrollView>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                fontSize: FONTSIZE.H1,
                fontWeight: FONTWEIGHT.bold,
                color: COLORS.white,
              }}
            >
              Detail Event
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: COLORS.white,
              padding: 16,
              borderRadius: 16,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: FONTSIZE.Judul,
                  fontWeight: FONTWEIGHT.bold,
                  width: 200,
                }}
              >
                {data.title}
              </Text>
              <View
                style={{
                  width: 90,
                  height: 24,
                  backgroundColor: COLORS.infoLight,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: COLORS.info }}>{data.status}</Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>{data.note}</Text>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Tanggal
              </Text>
              <Text>{moment(data.start_date).format("d MMM yyy")} - </Text>
              <Text>{moment(data.end_date).format("d MMM yyy")}</Text>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Tempat
              </Text>
              <Text style={{ width: 156 }}>{data.location}</Text>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Pimpinan Event
              </Text>
              <Text>{data.extra_attrs?.pic.title.name}</Text>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Peserta Event
              </Text>
              {data.extra_attrs?.members?.map((data, index) => (
                <View key={data.id} style={{ position: "relative" }}>
                  <Image
                    source={{ uri: data.avatar_url }}
                    style={{
                      width: 26,
                      height: 26,
                      marginLeft: index !== 0 ? -7 : 0,
                      borderRadius: 50,
                    }}
                  />
                </View>
              ))}
              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Peserta Event Eksternal
              </Text>
              {data.extra_attrs?.guest_external?.map((data, index) => (
                <View key={data.id} style={{ position: "relative" }}>
                  {/* <Image source={{ uri: data.avatar_url }} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0, borderRadius: 50 }} /> */}
                  <Text>{data.name}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Peserta Event
              </Text>
              {data.extra_attrs?.notulen?.map((data, index) => (
                <View key={data.id} style={{ position: "relative" }}>
                  <Image
                    source={{ uri: data.avatar_url }}
                    style={{
                      width: 26,
                      height: 26,
                      marginLeft: index !== 0 ? -7 : 0,
                      borderRadius: 50,
                    }}
                  />
                </View>
              ))}
              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
                Peserta Event
              </Text>
              {data.extra_attrs?.presensi?.map((data, index) => (
                <View key={data.id} style={{ position: "relative" }}>
                  <Image
                    source={{ uri: data.avatar_url }}
                    style={{
                      width: 26,
                      height: 26,
                      marginLeft: index !== 0 ? -7 : 0,
                      borderRadius: 50,
                    }}
                  />
                </View>
              ))}
              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={COLORS.lighter}
                />
              </TouchableOpacity>
            </View>

            {/* custom divider */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DBDADE",
                marginVertical: 10,
              }}
            />

            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>
              Lampiran
            </Text>

            <FlatList
              key={"*"}
              data={data.attachments}
              renderItem={({ item }) => (
                <View key={item.id}>
                  <CardLampiran
                    lampiran={item.file}
                    type={getFileExtension(item.name)}
                    onClick={() => {
                      setVisibleModal(true);
                      setLampiranById(item);
                    }}
                  />
                </View>
              )}
              scrollEnabled={false}
              style={{ marginTop: 10 }}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginHorizontal: 15,
                gap: 5,
              }}
              numColumns={3}
              keyExtractor={(item) => "*" + item.id}
            />

            {lampiranById !== null ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => {
                  setVisibleModal(false);
                  setLampiranById(null);
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
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisibleModal(false);
                      setLampiranById(null);
                    }}
                    style={{
                      position: "absolute",
                      top: "15%",
                      left: 20,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.primary,
                        width: 51,
                        height: 51,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                      }}
                    >
                      <Ionicons
                        name="close-outline"
                        color={COLORS.white}
                        size={24}
                      />
                    </View>
                  </TouchableOpacity>
                  {getFileExtension(lampiranById.name) === "png" ||
                  getFileExtension(lampiranById.name) === "jpg" ||
                  getFileExtension(lampiranById.name) === "jpeg" ? (
                    <View>
                      <Image
                        source={{ uri: lampiranById.file }}
                        style={{ width: 390, height: 283 }}
                      />
                    </View>
                  ) : getFileExtension(lampiranById.name) === "mp4" ? (
                    <Video
                      ref={video}
                      style={{ width: 390, height: 283 }}
                      source={lampiranById.gambar}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </Modal>
            ) : null}
          </View>
        </View>

        {data.user_role?.is_pic === true ||
        (data.user_role?.notulensi === false &&
          data.user_role?.presensi === false &&
          data.user_role?.member === false &&
          data.user_role?.is_pic === false) ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.info,
                  width: 134,
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    gap: 20,
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Persiapan</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightBrown,
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      flex: 1,
                      gap: 20,
                    }}
                  >
                    <Ionicons
                      name="pencil-outline"
                      size={20}
                      color={COLORS.white}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.infoDanger,
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      flex: 1,
                      gap: 20,
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={COLORS.white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.foundation,
                  width: Platform.OS === "ios" ? "90%" : "91%",
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    gap: 20,
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Kirim Notifikasi</Text>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
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
    width: 390,
    height: 260,
    resizeMode: "cover",
  },
  imageAndroid: {
    width: 420,
    height: 260,
    resizeMode: "cover",
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.7,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.7,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
