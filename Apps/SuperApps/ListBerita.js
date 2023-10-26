import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTokenValue } from "../../service/session";
import { getBerita, getDetailBerita } from "../../service/api";
import { CardListBeritaHome } from "../../components/CardListBeritaHome";
import { ActivityIndicator } from "react-native";
import { setBerita } from "../../store/SuperApps";



export const ListBerita = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { berita, loading } = useSelector((state) => state.superApps);

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
    dispatch(setBerita([]))
    setPage(1)
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getBerita({ token, page }));
      console.log('page', page)
    }
  }, [token, page]);

  const loadMore = () => {
    if (berita.lists.length % 10 === 0) {
      setPage(page + 1)
    }
  }

  const [search, setSearch] = useState('')
  const [filterData, setFilterData] = useState([])


  const filter = (event) => {
    setSearch(event)
  }

  useEffect(() => {
    setFilterData(berita.lists)
  }, [berita])

  useEffect(() => {
    if (search !== '') {
      const data = berita.lists?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      })
      setFilterData(data)
    } else {
      setFilterData(berita.lists)
    }
  }, [search])

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
              Berita
            </Text>
          </View>
        </View>
        <View style={{ width: "90%", marginLeft: 20, marginTop: 20 }}>
          <Search
            placeholder={'Cari'}
            iconColor={COLORS.primary}
            onSearch={filter}
          />

        </View>
        <View style={{ flex: 1, paddingBottom: 24 }}>
          <FlatList
            data={filterData}
            renderItem={({ item, index }) => (
              <View key={index}>
                <CardListBeritaHome
                  image={item.image}
                  tanggal={item.updated_at}
                  // subtitle={item.subtitle}
                  title={item.title}
                  id={item.id}
                  item={item}
                  token={token}
                />
              </View>
            )}
            style={{ flex: 1 }}
            ListFooterComponent={() => (
              loading && (
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              )
            )}
            keyExtractor={(item) => item.id}
            onEndReached={loadMore}
          />
        </View>
        {/* <FlatList
          data={filterData}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Item
                image={item.image}
                tanggal={item.updated_at}
                // subtitle={item.subtitle}
                title={item.title}
                id={item.id}
                item={item}
                token={token}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
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
    width: 350,
    borderRadius: 16,
  },
  imageAndroid: {
    height: 193,
    width: 369,
    borderRadius: 16,
  },
});
