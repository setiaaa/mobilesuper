import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../service/session";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getEmployee } from "../service/api";
import { COLORS, FONTWEIGHT } from "../config/SuperAppps";
import { setAddressbookSelected } from "../store/AddressbookKKP";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../components/Search";

const CardPegawai = ({ data, addressbook, config }) => {
  const dispatch = useDispatch();

  const checkedNodeRadio = () => {
    const checkNode = addressbook.selected.filter(
      (item) => item.nip === data.nip
    );
    if (checkNode.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={{
          marginHorizontal: 15,
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderRadius: 8,
          backgroundColor: COLORS.white,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => {
          const checkNode = addressbook.selected.filter(
            (item) => item.nip === data.nip
          );
          if (checkNode.length > 0) {
            alert("Data tidak boleh sama");
          } else {
            if (config.multiselect) {
              dispatch(setAddressbookSelected([...addressbook.selected, data]));
            } else {
              dispatch(setAddressbookSelected([data]));
            }
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {checkedNodeRadio() ? (
            <Ionicons name="ellipse" size={24} color={COLORS.primary} />
          ) : (
            <Ionicons name="ellipse-outline" size={24} />
          )}
          <View style={{ flexDirection: "column" }}>
            <Text>{data.nama}</Text>
            <Text style={{ color: COLORS.lighter }}>{data.nip}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export const AddressBookPegawai = ({ route }) => {
  const [token, setToken] = useState("");
  const { config } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getEmployee(token));
      // dispatch(getDivisionTree({ token: token, id: kategori.key }))
    }
  }, [token]);

  const { addressbook } = useSelector((state) => state.addressBookKKP);

  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilterData(addressbook.employee);
  }, [addressbook]);

  filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    if (search !== "") {
      const data = addressbook.employee?.filter((item) => {
        return item.nama.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(addressbook.employee);
    }
  }, [search]);

  // console.log(addressbook?.employee);
  return (
    <View style={{ height: "95%", paddingVertical: 10 }}>
      {/* <View style={{ flexDirection: "row", backgroundColor: COLORS.infoLight }}>
        <Text
          style={{
            width: "49%",
            marginHorizontal: 20,
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          Nama
        </Text>
        <Text style={{ fontWeight: FONTWEIGHT.bold }}>NIP</Text>
      </View> */}
      <View
        style={{
          marginHorizontal: 15,
          paddingBottom: 20,
        }}
      >
        <Search
          placeholder={"Cari..."}
          iconColor={COLORS.primary}
          onSearch={filter}
        />
      </View>
      <FlatList
        data={filterData}
        renderItem={({ item }) => (
          <CardPegawai data={item} addressbook={addressbook} config={config} />
        )}
        style={{ marginBottom: 40 }}
        keyExtractor={(item) => item.nip}
      />
    </View>
  );
};
