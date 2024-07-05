import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getTokenValue } from "../../service/session";
import {
  getDataIPASN,
  getFilterUnitKerja,
  getNominatif,
} from "../../service/api";
import { CardListDataIPASN } from "../../components/CardListDataIPASN";
import ListEmpty from "../../components/ListEmpty";
import { Loading } from "../../components/Loading";
import { Dropdown } from "../../components/DropDown";
import { CardListNominatif } from "../../components/CardListNominatif";

export const Nominatif = () => {
  const { device } = useSelector((state) => state.apps);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [filterUnitKerja, setFilterUnitKerja] = useState("");
  const [firstGolongan, setFirstGolongan] = useState("");
  const [secondGolongan, setSecondGolongan] = useState("");
  const [firstEselon, setFirstEselon] = useState("");
  const [secondEselon, setSecondEselon] = useState("");
  const [statusPegawai, setStatusPegawai] = useState("");
  const [tahunTMT, setTahunTMT] = useState({
    key: "",
    value: "",
  });
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(
        getFilterUnitKerja({
          token,
        })
      );
    }
  }, [token]);

  const { unitKerja, loading, nominatif } = useSelector(
    (state) => state.kepegawaian
  );

  const loadMore = () => {
    if (nominatif.lists.length % 10 === 0) {
      //   if (DataIPASN.lists.length > page) {
      setPage(page + 1);
      //   }
    }
  };

  const pickUnitKerja = () => {
    let nama = [];
    unitKerja.map((item) => {
      nama.push({
        key: item.id,
        value: item.name,
      });
    });
    return nama;
  };

  const pickYears = () => {
    let years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 30; i++) {
      const year = currentYear - i;
      years.push({
        key: year,
        value: year.toString(),
      });
    }
    return years;
  };

  const golongan = [
    { key: "I/a", value: "I/A" },
    { key: "II/a", value: "II/A" },
    { key: "III/a", value: "III/A" },
    { key: "IV/a", value: "IV/A" },
    { key: "V/a", value: "V/A" },
    { key: "I/b", value: "I/B" },
    { key: "II/b", value: "II/B" },
    { key: "III/d", value: "III/B" },
    { key: "IV/d", value: "IV/B" },
    { key: "V/d", value: "V/B" },
    { key: "I/c", value: "I/C" },
    { key: "II/c", value: "II/C" },
    { key: "III/c", value: "III/C" },
    { key: "IV/c", value: "IV/C" },
    { key: "V/c", value: "V/C" },
    { key: "I/d", value: "I/D" },
    { key: "II/d", value: "II/D" },
    { key: "III/d", value: "III/D" },
    { key: "IV/d", value: "IV/D" },
    { key: "V/d", value: "V/D" },
  ];

  const eselon = [
    { key: "I.a", value: "Eselon I.a" },
    { key: "I.b", value: "Eselon I.b" },
    { key: "II.a", value: "Eselon II.a" },
    { key: "II.b", value: "Eselon II.b" },
    { key: "III.a", value: "Eselon III.a" },
    { key: "III.b", value: "Eselon III.b" },
    { key: "IV.a", value: "Eselon IV.a" },
    { key: "IV.b", value: "Eselon IV.b" },
    { key: "V", value: "Eselon V" },
  ];

  const status = [
    { key: "PNS", value: "PNS" },
    { key: "PJLP", value: "PJLP" },
    { key: "PPPK", value: "PPPK" },
    { key: "Kontrak", value: "Kontrak" },
  ];

  // console.log(page);

  return (
    <ScrollView>
      {loading ? <Loading /> : null}
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
            width: device === "tablet" ? 40 : 28,
            height: device === "tablet" ? 40 : 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text
            style={{
              color: "white",
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
            }}
          >
            Nominatif Pegawai
          </Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          padding: 10,
          backgroundColor: COLORS.white,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontWeight: FONTWEIGHT.bold,
            fontSize: fontSizeResponsive("Judul", device),
            marginBottom: 10,
          }}
        >
          Filter Nominatif
        </Text>

        <View>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.grey,
            }}
          >
            Unit Kerja
          </Text>
          <Dropdown
            data={pickUnitKerja()}
            setSelected={setFilterUnitKerja}
            selected={filterUnitKerja}
            borderWidth={1}
            borderwidthDrop={1}
            borderWidthValue={1}
            borderColor={COLORS.ExtraDivinder}
            borderColorDrop={COLORS.ExtraDivinder}
            borderColorValue={COLORS.ExtraDivinder}
            search={true}
          />
        </View>

        <View>
          <Text
            style={{
              marginVertical: 10,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.grey,
            }}
          >
            Golongan
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: "45%" }}>
              <Dropdown
                data={golongan}
                setSelected={setFirstGolongan}
                selected={firstGolongan}
                borderWidth={1}
                borderwidthDrop={1}
                borderWidthValue={1}
                borderColor={COLORS.ExtraDivinder}
                borderColorDrop={COLORS.ExtraDivinder}
                borderColorValue={COLORS.ExtraDivinder}
                search={true}
              />
            </View>
            <Text>s/d</Text>
            <View style={{ width: "45%" }}>
              <Dropdown
                data={golongan}
                setSelected={setSecondGolongan}
                selected={secondGolongan}
                borderWidth={1}
                borderwidthDrop={1}
                borderWidthValue={1}
                borderColor={COLORS.ExtraDivinder}
                borderColorDrop={COLORS.ExtraDivinder}
                borderColorValue={COLORS.ExtraDivinder}
                search={true}
              />
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              marginVertical: 10,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.grey,
            }}
          >
            Eselon
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: "45%" }}>
              <Dropdown
                data={eselon}
                setSelected={setFirstEselon}
                selected={firstEselon}
                borderWidth={1}
                borderwidthDrop={1}
                borderWidthValue={1}
                borderColor={COLORS.ExtraDivinder}
                borderColorDrop={COLORS.ExtraDivinder}
                borderColorValue={COLORS.ExtraDivinder}
                search={true}
              />
            </View>
            <Text>s/d</Text>
            <View style={{ width: "45%" }}>
              <Dropdown
                data={eselon}
                setSelected={setSecondEselon}
                selected={secondEselon}
                borderWidth={1}
                borderwidthDrop={1}
                borderWidthValue={1}
                borderColor={COLORS.ExtraDivinder}
                borderColorDrop={COLORS.ExtraDivinder}
                borderColorValue={COLORS.ExtraDivinder}
                search={true}
              />
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              marginVertical: 10,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.grey,
            }}
          >
            Status Kepegawaian
          </Text>
          <Dropdown
            data={status}
            setSelected={setStatusPegawai}
            selected={statusPegawai}
            borderWidth={1}
            borderwidthDrop={1}
            borderWidthValue={1}
            borderColor={COLORS.ExtraDivinder}
            borderColorDrop={COLORS.ExtraDivinder}
            borderColorValue={COLORS.ExtraDivinder}
            search={true}
          />
        </View>

        <View>
          <Text
            style={{
              marginVertical: 10,
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.grey,
            }}
          >
            Tahun TMT CPNS
          </Text>
          <Dropdown
            data={pickYears()}
            setSelected={setTahunTMT}
            selected={tahunTMT}
            borderWidth={1}
            borderwidthDrop={1}
            borderWidthValue={1}
            borderColor={COLORS.ExtraDivinder}
            borderColorDrop={COLORS.ExtraDivinder}
            borderColorValue={COLORS.ExtraDivinder}
            search={true}
          />
          <Text style={{ marginTop: 5, color: COLORS.grey }}>
            (dikosongkan bila tidak digunakan)
          </Text>
        </View>

        <TouchableOpacity
          style={{
            marginVertical: 10,
            backgroundColor: COLORS.primary,
            padding: 10,
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
          onPress={() => {
            navigation.navigate("NominatifList", {
              token,
              filterUnitKerja,
              firstGolongan,
              secondGolongan,
              firstEselon,
              secondEselon,
              statusPegawai,
              tahunTMT,
              page,
            });
          }}
        >
          <Text style={{ color: COLORS.white }}>Lihat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
