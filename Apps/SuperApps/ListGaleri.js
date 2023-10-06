import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../config/SuperAppps";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Item = ({ image, deskripsi, onclick }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 0.5,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={onclick}>
          <Image
            source={{ uri: image }}
            style={
              Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid
            }
          />
          {/* <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
            <Text
              style={{
                color: COLORS.grey,
                marginVertical: 5,
                fontSize: 10,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              {deskripsi}
            </Text>
          </View> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ListGaleri = () => {
  const { galeri } = useSelector((state) => state.superApps);

  const navigation = useNavigation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [galeriById, setGaleriById] = useState({});
  // console.log(visibleModal);
  // console.log(galeri.lists);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#f7f7f7", flex: 1 }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: "10%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                styles.backIcon,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                  marginLeft: 20,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 40,
            }}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: 600 }}>
              Galeri
            </Text>
          </View>
        </View>
        <View style={{ width: "90%", marginLeft: 20, marginTop: 20 }}>
          <Search placeholder={"Cari"} />
        </View>
        <FlatList
          key={"#"}
          data={galeri.lists}
          renderItem={({ item }) => (
            <Item
              image={item.main_images?.image}
              // deskripsi={item.main_images.title}
              onclick={() => {
                setVisibleModal(true);
                setGaleriById(item);
              }}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => "#" + item.id}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          setVisibleModal(false);
          setGaleriById({});
        }}
      >
        {console.log(galeriById)}
        <TouchableOpacity
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
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
              setGaleriById(galeri.lists.id);
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
          <View>
            <Image
              source={!galeriById ? {} : { uri: galeriById.main_images?.image }}
              style={{ width: 390, height: 283 }}
            />
          </View>
        </View>
      </Modal>
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
    height: 193,
    width: 150,
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    width: 150,
    borderRadius: 16,
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
