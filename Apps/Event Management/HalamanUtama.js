<<<<<<< HEAD
import React, { useMemo, useRef } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Dropdown } from '../../components/DropDown'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventDetail, setEventLists } from '../../store/Event'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
=======
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "../../components/DropDown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEventDetail, setEventLists } from "../../store/Event";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Search } from "../../components/Search";
import ListEmpty from "../../components/ListEmpty";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  getEvent,
  getEventDetail,
  getEventProgress,
  getEventToday,
} from "../../service/api";
import { getTokenValue } from "../../service/session";
import moment from "moment/moment";

const kategories = [
  { key: "q", value: "satu" },
  { key: "e", value: "dua" },
  { key: "r", value: "tiga" },
  { key: "t", value: "empat" },
];

const tahun = new Date().getFullYear();
const bulan = new Date().getMonth();
const tanggal = new Date().getDate();

const tanggalSekarang = new Date(`${tahun}-${bulan}-${tanggal}`).toDateString();
const tanggalBesok = new Date(
  `${tahun}-${bulan}-${tanggal + 1}`
).toDateString();

const CardListEvent = ({ token, item }) => {
  const navigation = useNavigation();
  // const { event } = useSelector(state => state.event)
  const dispatch = useDispatch();

  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getEventDetail(params));
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          width: "90%",
          padding: 20,
          borderRadius: 8,
        }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("MainDetailEvent");
        }}
      >
        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.title}</Text>

<<<<<<< HEAD
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                width: '90%',
                padding: 20,
                borderRadius: 8,
                marginTop: 20
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailEvent')
                }
                }
            >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text>Departemen:</Text>
                    <Text style={{ marginVertical: 10, width: 200 }}>{item.pic.title.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>PIC</Text>
                        <Image source={{ uri: item.pic.avatar_url }} style={{ width: 26, height: 26, borderRadius: 30 }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>Status</Text>
                        <View style={{
                            width: 100,
                            height: 24,
                            backgroundColor: COLORS.infoLight,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.info }}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
=======
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text>Departemen:</Text>
          <Text style={{ marginVertical: 10 }}>{item.pic.title.name}</Text>
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text>PIC</Text>
            <Image
              source={{ uri: item.pic.avatar_url }}
              style={{ width: 26, height: 26, borderRadius: 30 }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text>Status</Text>
            <View
              style={{
                width: 100,
                height: 24,
                backgroundColor: COLORS.infoLight,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.info }}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CardProgresEvent = ({ token, item, bottomSheetAttach }) => {
  const navigation = useNavigation();
  // const { event } = useSelector(state => state.event)
  const dispatch = useDispatch();

<<<<<<< HEAD
    const getDetail = (id) => {
        const params = { token, id }
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getEventDetail(params))
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                width: '90%',
                padding: 20,
                marginBottom: 10,
                borderRadius: 8
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailEvent')
                }
                }
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold, width: '80%' }}>{item.title}</Text>
                    <Text>{item.agenda_count} Todo</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginVertical: 10 }}>{moment(item.start_date).format('d MMM yyy')} - </Text>
                        <Text style={{ marginVertical: 10 }}>{moment(item.end_date).format('d MMM yyy')}</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => bottomSheetAttach(item.todo)}>
                        <Ionicons name='chevron-down-outline' size={20} />
                    </TouchableOpacity> */}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>PIC</Text>
                        <Image source={{ uri: item.pic.avatar_url }} style={{ width: 26, height: 26, borderRadius: 30 }} />
                        <Text style={{ width: 150 }}>{item.pic.nama}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <View style={{
                            width: 50,
                            height: 24,
                            backgroundColor: COLORS.infoDangerLight,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.infoDanger }}>{item.progress}%</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
=======
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getEventDetail(params));
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          width: "90%",
          padding: 20,
          marginBottom: 10,
          borderRadius: 8,
        }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("MainDetailEvent");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: FONTWEIGHT.bold, width: "80%" }}>
            {item.title}
          </Text>
          <Text>{item.agenda_count} Todo</Text>
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginVertical: 10 }}>
              {moment(item.start_date).format("d MMM yyy")} -{" "}
            </Text>
            <Text style={{ marginVertical: 10 }}>
              {moment(item.end_date).format("d MMM yyy")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => bottomSheetAttach(item.todo)}>
            <Ionicons name="chevron-down-outline" size={20} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text>PIC</Text>
            <Image
              source={{ uri: item.pic.avatar_url }}
              style={{ width: 26, height: 26, borderRadius: 30 }}
            />
            <Text>{item.pic.nama}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View
              style={{
                width: 50,
                height: 24,
                backgroundColor: COLORS.infoDangerLight,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.infoDanger }}>{item.progress}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CardTodoEvent = ({ item }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: 358,
          padding: 20,
          marginBottom: 10,
          borderRadius: 8,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <Text>PIC</Text>
          <Image
            source={item.pic}
            style={{ width: 26, height: 26, borderRadius: 30 }}
          />
          <Text>{item.nama}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="calendar-outline" size={24} />
            <Text>{item.tanggal}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="time-outline" size={24} />
            <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.progres}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const HalamanUtama = () => {
  const navigation = useNavigation();
  const [kategori, setKategori] = useState("");
  const [progres, setProgres] = useState([]);
  const [token, setToken] = useState("");

<<<<<<< HEAD
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
=======
  const dispatch = useDispatch();
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e

  // useEffect(() => {
  //     dispatch(setEventLists(listsEvent))
  // }, [])
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

<<<<<<< HEAD
    useEffect(() => {
        if (token !== '' && isFocused) {
            dispatch(getEventToday(token))
            dispatch(getEventProgress(token))
        }
    }, [token])

    const { event } = useSelector(state => state.event)
    const list = event.lists
    const progreslist = event.listsprogress


    const [variant, SetVariant] = useState('hariini')

    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalAddRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = (data) => {
        setProgres(data)
        bottomSheetModalRef.current?.present()
=======
  useEffect(() => {
    if (token !== "") {
      dispatch(getEventToday(token));
      dispatch(getEventProgress(token));
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e
    }
  }, [token]);

  const { event } = useSelector((state) => state.event);
  const list = event.lists;
  const progreslist = event.listsprogress;

  const [variant, SetVariant] = useState("hariini");

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalAddRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttach = (data) => {
    setProgres(data);
    bottomSheetModalRef.current?.present();
  };

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const bottomSheetAttachAdd = () => {
    bottomSheetModalAddRef.current?.present();
  };

  const bottomSheetAttachAddClose = () => {
    if (bottomSheetModalAddRef.current) bottomSheetModalAddRef.current?.close();
  };

<<<<<<< HEAD
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 20,
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 20
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Agenda Rapat</Text>
                        </View>
                    </View>

                    {/* <View style={{ width: '90%', marginHorizontal: 20, marginVertical: 20 }}>
                        <Search
                            placeholder={'Cari'}
                            onSearch={filter}
                        />
                    </View> */}
=======
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const filter = (event) => {
    setSearch(event);
  };
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e

  // useEffect(() => {
  //     if (variant === 'hariini') {
  //         const data = event.lists.filter((item) => {
  //             return item.tanggal === tanggalSekarang
  //         })
  //         setFilterData(data)
  //     } else {
  //         const data = event.lists.filter((item) => {
  //             return item.tanggal !== tanggalSekarang
  //         })
  //         setFilterData(data)
  //     }
  // }, [variant])

<<<<<<< HEAD
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40 }}>

                        <TouchableOpacity style={{
                            width: 171,
                            height: 41,
                            borderWidth: 1,
                            backgroundColor: variant === 'hariini' ? COLORS.infoDanger : COLORS.white,
                            borderRadius: 30,
                            borderColor: variant === 'hariini' ? COLORS.white : COLORS.ExtraDivinder,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => SetVariant('hariini')}
                        >
                            <Text style={{ color: variant === 'hariini' ? COLORS.white : null }}>Agenda Rapat Hari Ini</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 171,
                            height: 41,
                            borderWidth: 1,
                            backgroundColor: variant === 'progres' ? COLORS.infoDanger : COLORS.white,
                            borderRadius: 30,
                            borderColor: variant === 'progres' ? COLORS.white : COLORS.ExtraDivinder,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => SetVariant('progres')}
                        >
                            <Text style={{ color: variant === 'progres' ? COLORS.white : null }}>Progres Agenda Rapat</Text>
                        </TouchableOpacity>
                    </View>
                    {variant === 'hariini' ? (
                        <FlatList
                            data={list}
                            renderItem={({ item }) => <CardListEvent
                                token={token}
                                item={item}
                            />
                            }
                            keyExtractor={item => item.id}
                            style={{ height: 440 }}
                            ListEmptyComponent={() => <ListEmpty />}
                        />
                    ) : (
                        <View>
                            <View style={{ padding: 25 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Event</Text>

                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        {/* <View style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 30,
                                            backgroundColor: COLORS.white,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Ionicons name='filter-outline' size={24} />
                                        </View>

                                        <View style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 30,
                                            backgroundColor: COLORS.white,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Ionicons name='menu-outline' size={24} />
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={progreslist}
                                renderItem={({ item }) => <CardProgresEvent
                                    token={token}
                                    item={item}
                                    bottomSheetAttach={bottomSheetAttach}
                                />
                                }
                                keyExtractor={item => item.id}
                                style={{ height: 440 }}
                                ListEmptyComponent={() => <ListEmpty />}
                            />
                        </View>

                    )}

                    <TouchableOpacity style={{
                        width: 50,
                        height: 50,
                        backgroundColor: COLORS.infoDanger,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 100,
                        right: 20
=======
  // useEffect(() => {
  //     if (search !== '') {
  //         const data = event.lists.filter((item) => {
  //             return item.judul.toLowerCase().includes(search.toLowerCase()) && (variant === 'hariini' ? item.tanggal === tanggalSekarang : item.tanggal !== tanggalSekarang)
  //         })
  //         setFilterData(data)
  //     } else {
  //         if (variant === 'hariini') {
  //             const data = event.lists.filter((item) => {
  //                 return item.tanggal === tanggalSekarang
  //             })
  //             setFilterData(data)
  //         } else {
  //             const data = event.lists.filter((item) => {
  //                 return item.tanggal !== tanggalSekarang
  //             })
  //             setFilterData(data)
  //         }
  //     }
  // }, [search])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
                Event Management
              </Text>
            </View>
          </View>

          <View
            style={{ width: "90%", marginHorizontal: 20, marginVertical: 20 }}
          >
            <Search placeholder={"Cari"} onSearch={filter} />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 171,
                height: 41,
                borderWidth: 1,
                backgroundColor:
                  variant === "hariini" ? COLORS.infoDanger : COLORS.white,
                borderRadius: 30,
                borderColor:
                  variant === "hariini" ? COLORS.white : COLORS.ExtraDivinder,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => SetVariant("hariini")}
            >
              <Text
                style={{ color: variant === "hariini" ? COLORS.white : null }}
              >
                Event Hari Ini
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 171,
                height: 41,
                borderWidth: 1,
                backgroundColor:
                  variant === "progres" ? COLORS.infoDanger : COLORS.white,
                borderRadius: 30,
                borderColor:
                  variant === "progres" ? COLORS.white : COLORS.ExtraDivinder,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => SetVariant("progres")}
            >
              <Text
                style={{ color: variant === "progres" ? COLORS.white : null }}
              >
                Progres Event
              </Text>
            </TouchableOpacity>
          </View>
          {variant === "hariini" ? (
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <CardListEvent token={token} item={item} />
              )}
              keyExtractor={(item) => item.id}
              style={{ height: 440 }}
              ListEmptyComponent={() => <ListEmpty />}
            />
          ) : (
            <View>
              <View style={{ padding: 25 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      color: COLORS.lighter,
>>>>>>> 97230e3a96eda0ed1c12fb17cdc08db2c5d5a06e
                    }}
                  >
                    Event
                  </Text>

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="filter-outline" size={24} />
                    </View>

                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="menu-outline" size={24} />
                    </View>
                  </View>
                </View>
              </View>
              <FlatList
                data={progreslist}
                renderItem={({ item }) => (
                  <CardProgresEvent
                    token={token}
                    item={item}
                    bottomSheetAttach={bottomSheetAttach}
                  />
                )}
                keyExtractor={(item) => item.id}
                style={{ height: 440 }}
                ListEmptyComponent={() => <ListEmpty />}
              />
            </View>
          )}

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.infoDanger,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 100,
              right: 20,
            }}
            onPress={() => {
              navigation.navigate("TambahEvent");
            }}
          >
            <Ionicons name="add-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetModalAddRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            index={0}
            style={{ borderRadius: 50 }}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjust"
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView onLayout={handleContentLayout}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahEvent");
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah Event</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahAgendaEvent");
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 331,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 40,
                  }}
                  onPress={() => {
                    navigation.navigate("TambahTodo", { item: event.lists });
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Tambah ToDo</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

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
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView onLayout={handleContentLayout}>
              <FlatList
                data={progres}
                renderItem={({ item }) => <CardTodoEvent item={item} />}
                style={{ marginBottom: 40 }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
