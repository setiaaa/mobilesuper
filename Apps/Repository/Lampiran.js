import React, { useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Modal } from "react-native-paper";

const DataLampiran = ({ lampiran, nama, size, onClick, type }) => {
  const navigation = useNavigation();
  // console.log(lampiran);
  return type === "png" || type === "jpg" || type === "jpeg" ? (
    <TouchableOpacity onPress={onClick}>
      <Image
        source={{ uri: lampiran }}
        style={{ width: 150, height: 150, borderRadius: 6, marginTop: 10 }}
      />
    </TouchableOpacity>
  ) : type === "mp4" ? (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: 150,
        height: 150,
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
        width: 150,
        height: 150,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/superApp/word.png")}
        style={{ width: 70, height: 70 }}
      />
      <View
        style={{
          marginTop: 10,
          rowGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
            maxWidth: 130,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          numberOfLines={1}
        >
          {nama}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1024)} MB
        </Text>
      </View>
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
        width: 150,
        height: 150,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/superApp/excel.png")}
        style={{ width: 70, height: 70 }}
      />
      <View
        style={{
          marginTop: 10,
          rowGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
            maxWidth: 130,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          numberOfLines={1}
        >
          {nama}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1024)} MB
        </Text>
      </View>
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
        width: 150,
        height: 150,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        backgroundColor: COLORS.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/superApp/pdf.png")}
        style={{ width: 70, height: 70 }}
      />
      <View
        style={{
          marginTop: 10,
          rowGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
            maxWidth: 130,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          numberOfLines={1}
        >
          {nama}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1024)} MB
        </Text>
      </View>
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
        width: 150,
        height: 150,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/superApp/ppt.png")}
        style={{ width: 70, height: 70 }}
      />
      <View
        style={{
          marginTop: 10,
          rowGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
            maxWidth: 130,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          numberOfLines={1}
        >
          {nama}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1024)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export const Lampiran = () => {
  const navigation = useNavigation();
  const { dokumen } = useSelector((state) => state.repository);
  const detail = dokumen.detail;

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

  console.log(detail.attachments);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            Lampiran
          </Text>
        </View>
      </View>
      <FlatList
        key={"#"}
        data={detail.attachments}
        renderItem={({ item }) => (
          <View key={item.id}>
            <DataLampiran
              lampiran={item.files}
              nama={item.name}
              size={item.file_size}
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
        numColumns={2}
        keyExtractor={(item) => "#" + item.id}
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
                <Ionicons name="close-outline" color={COLORS.white} size={24} />
              </View>
            </TouchableOpacity>
            {getFileExtension(lampiranById.name) === "png" ||
            getFileExtension(lampiranById.name) === "jpg" ||
            getFileExtension(lampiranById.name) === "jpeg" ? (
              <View>
                <Image
                  source={{ uri: lampiranById.files }}
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
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            ) : (
              <></>
            )}
          </View>
        </Modal>
      ) : null}
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
