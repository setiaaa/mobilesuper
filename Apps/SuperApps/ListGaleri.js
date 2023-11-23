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
import { useDispatch, useSelector } from "react-redux";
import { CardListGaleriHome } from "../../components/CardListGaleriHome";
import { getTokenValue } from "../../service/session";
import { setGaleri } from "../../store/SuperApps";
import { getGaleri } from "../../service/api";
import { ActivityIndicator } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { RefreshControl } from "react-native";



export const ListGaleri = () => {
  const { galeri, loading } = useSelector((state) => state.superApps);

  const navigation = useNavigation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [galeriById, setGaleriById] = useState({});
  const [page, setPage] = useState(1)
  const [token, setToken] = useState("");
  const [filterData, setFilterData] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
    dispatch(setGaleri([]))
    setPage(1)
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getGaleri({ token, page }));
      console.log('page', page)
    }
  }, [token, page]);

  const loadMore = () => {
    if (galeri.lists.length % 10 === 0) {
      setPage(page + 1)
    }
  }

  const filter = (event) => {
    setSearch(event)
  }

  useEffect(() => {
    setFilterData(galeri.lists)
  }, [galeri])

  useEffect(() => {
    const item = galeri.lists
    if (search !== '') {
      const data = item.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      })
      setFilterData(data)
    } else {
      setFilterData(item)
    }
  }, [search])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
      try {
          if (token !== '') {
            dispatch(getGaleri({ token, page }));
            console.log(page, 'page')
            console.log('Refresh Berhasil')
          }
      } catch (error) {
          console.log('Refresh gagal:', error)
      }

      setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      }, 2000);
  }, [token, page]);

  // console.log(visibleModal);
  console.log(galeri.lists);
  return (
    <View style={{ flex: 1 }}>
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
        <View style={{ width: "90%", marginLeft: 20, marginVertical: 20 }}>
          <Search
            placeholder={'Cari'}
            iconColor={COLORS.primary}
            onSearch={filter}
          />
        </View>
        <FlatList
          key={"#"}
          data={filterData}
          renderItem={({ item }) => (
            <CardListGaleriHome
              image={item.main_images?.image}
              deskripsi={item.main_images.title}
              onclick={() => {
                setVisibleModal(true);
                setGaleriById(item);
              }}
            />
          )}
          ListEmptyComponent={() => <ListEmpty />}
          ListFooterComponent={() => (
            loading && (
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            )
          )}
          numColumns={2}
          keyExtractor={(item) => "#" + item.id}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    </View>
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
