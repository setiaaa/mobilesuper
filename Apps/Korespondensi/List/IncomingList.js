import { useNavigation } from "@react-navigation/native";
import { useMemo, useRef, useState, useSelector } from "react";
import { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal
} from "react-native";
import { Button, Chip, Divider, IconButton } from "react-native-paper";
import CardList from "../../../components/UI/CardList";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { initData } from "../../../utils/list";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import SearchFilter from "../../../components/UI/SearchFilter";
import { Config } from "../../../constants/config";
import LottieView from "lottie-react-native";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from 'react-native-modern-datepicker'

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

function IncomingList({ route }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDateVisible, setStartDateVisibility] = useState(false);
  const [isEndDateVisible, setEndDateVisibility] = useState(false);
  const [isSearchFilter, setIsSearchFilter] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const unread = route.params.unread;
  const animation = useRef(null);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  // const snapPoints = useMemo(() => [50, "100%"], []);
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  const bottomSheetAttach = () => {
    bottomSheetModalRef.current?.present()
  }

  const bottomSheetAttachClose = () => {
    if (bottomSheetModalRef.current)
         bottomSheetModalRef.current?.close()
  }

  //Pilih Tanggal
  const [modalVisiblePicker, setModalVisiblePicker] = useState('');
  const [TanggalMulai, setTanggalMulai] = useState('');
  const [TanggalSelesai, setTanggalSelsai] = useState('');
  // const handleSubmit = () => {
  //   const payload = {
  //     calendar_id: kategori.key === undefined ? '' : kategori.key,
  //     start_date: TanggalMulai,
  //     end_date: TanggalSelesai,
  //   }
  //   const data = {
  //     token: token,
  //     payload: payload
  //   }
  //   dispatch(postEvent(data))
  // }

  const willFocusSubscription = navigation.addListener("focus", () => {
    filter(1);
  });

  useEffect(() => {
    filter(1);
    return willFocusSubscription;
  }, [startDate, endDate, isSearchQuery, isSearchFilter]);

  async function getAgendaIn(page) {
    setIsLoading(true);
    try {
      let response;
      if (unread) {
        response = await getHTTP(
          nde_api.agendainunread.replace("{$page}", page)
        );
      } else {
        response = await getHTTP(nde_api.agendain.replace("{$page}", page));
      }
      let data = initData(list, response.data);
      setList(data);
      setIsLoading(false);
    } catch (error) {
      handlerError(error, "Warning!", "Incoming List not working");
      setIsLoading(false);
    }
  }

  async function filter(page) {
    setIsLoading(true);
    try {
      if (startDate == null && endDate == null && searchQuery.length == 0) {
        getAgendaIn(1);
      } else if (
        !isSearchFilter &&
        (startDate != null || endDate != null || searchQuery.length != 0)
      ) {
      } else {
        let start;
        let end;
        let word;
        if (startDate == undefined || startDate == null) {
          start = "";
        } else {
          start = moment(startDate).format("DD/MM/YYYY");
        }
        if (endDate == undefined || endDate == null) {
          if (startDate == undefined || startDate == null) {
            end = "";
          } else {
            end = moment(new Date()).format("DD/MM/YYYY");
            setEndDate(new Date());
          }
        } else {
          end = moment(endDate).format("DD/MM/YYYY");
        }
        if (isSearchQuery.length == 0) {
          word = "";
        } else {
          word = isSearchQuery;
        }
        let url;
        if (unread) {
          url = nde_api.agendainunread;
        } else {
          url = nde_api.agendain;
        }
        url =
          url + "&start_date=" + start + "&end_date=" + end + "&query=" + word;
        let response = await getHTTP(url.replace("{$page}", page));
        if (response) {
          setIsSearchFilter(true);
          let data = initData(list, response.data);
          setList(data);
          bottomSheetModalRef.current?.dismiss();
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsSearchFilter(false);
      bottomSheetModalRef.current?.dismiss();
      console.log(JSON.stringify(error.response));
      setIsLoading(false);
    }
  }

  const renderItem = ({ item }) => (
    <>
      <Text style={styles.headerList}>{item.date}</Text>
      <View style={{ marginBottom: 16 }}>
        {item.children.map((data) => (
          <CardList
            key={data.id}
            data={data}
            tipe="agendain"
            onPress={() => {
              navigation.navigate("IncomingDetail", {
                id: data.id,
                title: "Incoming\nDetail",
              });
            }}
          />
        ))}
      </View>
    </>
  );

  // const skeleton = () => {
  //   for (let i = 0; i <= 4; i++) {
  //     return (
  //       <>
  //         <View key={i} style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
  //           <ShimmerPlaceholder width={400} height={20} />
  //           <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
  //             <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
  //             <View>
  //               <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
  //               <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
  //             </View>
  //             <View style={{ marginLeft: 70 }}>
  //               <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
  //               <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
  //             </View>
  //           </View>
  //           <Divider bold style={{ marginTop: 10 }} />
  //         </View>

  //         <View key={i} style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
  //           <ShimmerPlaceholder width={400} height={20} />
  //           <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
  //             <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
  //             <View>
  //               <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
  //               <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
  //             </View>
  //             <View style={{ marginLeft: 70 }}>
  //               <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
  //               <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
  //             </View>
  //           </View>
  //           <Divider bold style={{ marginTop: 10 }} />
  //         </View>
  //       </>
  //     )
  //   }
  // }

  const listEmpty = (
    <View style={styles.notFound}>
      {/* <LottieView
        autoPlay
        ref={animation}
        style={[styles.titleNotFound, { width: "100%", height: 200 }]}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={Config.notFound}
      /> */}
      <View style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
        <ShimmerPlaceholder width={400} height={20} />
        <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
          <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
          <View>
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
          </View>
          <View style={{ marginLeft: 70 }}>
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
          </View>
        </View>
        <Divider bold style={{ marginTop: 10 }} />
      </View>

      <View style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
        <ShimmerPlaceholder width={400} height={20} />
        <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
          <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
          <View>
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
          </View>
          <View style={{ marginLeft: 70 }}>
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
          </View>
        </View>
        <Divider bold style={{ marginTop: 10 }} />
      </View>

      <View style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
        <ShimmerPlaceholder width={400} height={20} />
        <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
          <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
          <View>
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
          </View>
          <View style={{ marginLeft: 70 }}>
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
          </View>
        </View>
        <Divider bold style={{ marginTop: 10 }} />
      </View>

      <View style={{ backgroundColor: '#f0f0f0', height: 100, width: '100%' }}>
        <ShimmerPlaceholder width={400} height={20} />
        <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
          <ShimmerPlaceholder width={40} height={40} shimmerStyle={{ marginTop: 5, borderRadius: 40 }} />
          <View>
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
            <ShimmerPlaceholder width={200} height={15} shimmerStyle={{ marginVertical: 5, marginLeft: 10 }} />
          </View>
          <View style={{ marginLeft: 70 }}>
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
            <ShimmerPlaceholder width={30} height={15} shimmerStyle={{ marginVertical: 5 }} />
          </View>
        </View>
        <Divider bold style={{ marginTop: 10 }} />
      </View>
      {/* <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

        {skeleton()}
      </View> */}
      <Text style={styles.titleNotFound}>
        {isLoading
          ? "Loading..."
          : isSearchFilter && unread
            ? "Incoming Unread not found"
            : isSearchFilter && !unread
              ? "Incoming Letter not found"
              : list?.count == 0 && unread
                ? "You don't have Incoming Unread"
                : list?.count == 0 && !unread
                  ? "You don't have Incoming Letter"
                  : "Loading..."}
      </Text>
    </View>
  );

  function loadMore() {
    if (list?.next != null) {
      if (isSearchFilter) {
        filter(list?.next);
      } else {
        getAgendaIn(list?.next);
      }
    }
  }
  function refresh() {
    setIsLoading(true);
    setStartDate();
    setEndDate();
    setSearchQuery("");
    setIsSearchFilter(false);
    bottomSheetModalRef.current?.dismiss();
    setIsLoading(false);
  }

  const showBottomFilter = () => {
    bottomSheetModalRef.current?.present();
  };

  const clearSearch = () => (
    <>
      {searchQuery.length > 0 && (
        <IconButton
          icon="close"
          onPress={() => {
            setSearchQuery("");
            setIsSearchQuery("");
            setIsSearchFilter(false);
            if (startDate == null && endDate == null) {
              setList([]);
            }
          }}
        />
      )}
    </>
  );
  const showStartDate = () => {
    setStartDateVisibility(true);
  };

  const hideStartDate = () => {
    setStartDateVisibility(false);
  };

  const handleConfirmStart = (date) => {
    setStartDate(date);
    hideStartDate();
  };
  const showEndDate = () => {
    setEndDateVisibility(!isEndDateVisible);
  };

  const hideEndDate = () => {
    setEndDateVisibility(false);
  };

  const handleConfirmEnd = (date) => {
    setEndDate(date);
    hideEndDate();
  };

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  return (
    <>
    <BottomSheetModalProvider>
    <View style={{ paddingHorizontal: 20, }}>
    <View
          style={{
            marginVertical: 15,
            borderRadius: 8,
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Cari..."
            style={{
              width: "85%",
              backgroundColor: "#FFFFFF",
              marginRight: 10,
              borderRadius: 8,
              paddingStart: 10,
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => bottomSheetAttach()}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 8,
              height: 54,
              width: "12%",
              justifyContent: "center",
              alignItems: "center",
              //shadow ios
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              //shadow android
              elevation: 2,
            }}
            // onPress={() => navigation.navigate("PostinganBaru")}
          >
            <Ionicons name="filter-outline" size={24} color={COLORS.lighter} />
          </TouchableOpacity>
        </View>
    </View>

    <ScrollView style={{ marginBottom: "5%", }}>
      <View>
        <View style={{ flexDirection: "row", gap: 10, }}>
          <View style={{ backgroundColor: "#5C5E61", height: 25, width: 5, borderBottomRightRadius: 2, borderTopRightRadius: 2 }} />
          <View style={{ backgroundColor: "#5C5E61", width: "100%", paddingVertical: 3, paddingHorizontal: 10, borderBottomLeftRadius: 2, borderTopLeftRadius: 2 }}>
            <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>July - 2020</Text>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20 }}>
          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }} onPress={() => navigation.navigate("IncomingDetail")} >
            <Image source={require("../../../assets/superApp/AvatarKepBiroSDMA.png")} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.warning }} />
                  <Text style={{ fontSize: 13, fontWeight: 700 }}>KEPALA BIRO SDM APARATUR</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }}>
            <Image source={require("../../../assets/superApp/AvatarA.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>SEKRETARIS JENDERAL</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
                <View style={{ paddingLeft: 10, paddingVertical: 5 }}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }}>
            <Image source={require("../../../assets/superApp/AvatarA.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>SEKRETARIS JENDERAL</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: "row", gap: 10, }}>
          <View style={{ backgroundColor: "#5C5E61", height: 25, width: 5, borderBottomRightRadius: 2, borderTopRightRadius: 2 }} />
          <View style={{ backgroundColor: "#5C5E61", width: "100%", paddingVertical: 3, paddingHorizontal: 10, borderBottomLeftRadius: 2, borderTopLeftRadius: 2 }}>
            <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>June - 2020</Text>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20 }}>
          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }}>
            <Image source={require("../../../assets/superApp/AvatarKepBiroSDMA.png")} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.warning }} />
                  <Text style={{ fontSize: 13, fontWeight: 700 }}>KEPALA BIRO SDM APARATUR</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }}>
            <Image source={require("../../../assets/superApp/AvatarA.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>SEKRETARIS JENDERAL</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
                <View style={{ paddingLeft: 10, paddingVertical: 5 }}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 15, }}>
            <Image source={require("../../../assets/superApp/AvatarA.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 250, gap: 5 }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>SEKRETARIS JENDERAL</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>Undangan Diskusi Pembahasan Requirement Dashboard</Text>
              </View>
              <View style={{ alignItems: "flex-end", width: 55 }}>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>08 Jul</Text>
                <Text style={{ fontSize: 10, fontWeight: 400 }}>10:23</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: "row", gap: 10, }}>
          <View style={{ backgroundColor: "#5C5E61", height: 25, width: 5, borderBottomRightRadius: 2, borderTopRightRadius: 2 }} />
          <View style={{ backgroundColor: "#5C5E61", width: "100%", paddingVertical: 3, paddingHorizontal: 10, borderBottomLeftRadius: 2, borderTopLeftRadius: 2 }}>
            <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>May - 2020</Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ backgroundColor: COLORS.white, height: 80, justifyContent: "center", gap: 5, borderRadius: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.lighter, textAlign: "center" }}>Hasil Tidak Ditemukan</Text>
            <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.info, textAlign: "center" }}>Segarkan</Text>
          </View>
        </View>
      </View>
    </ScrollView>

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
        <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
      )}>
        <BottomSheetView onLayout={handleContentLayout} >
          <View style={{ flex: 1, padding: 25 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "space-between", }}>
              <Text style={{ fontSize: 15, fontWeight: 500 }}>Menyaring Surat Masuk</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.danger }}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10, flex: 1, marginTop: 20, gap: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.lighter, }}>Rentang Tanggal</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <View style={{
                    borderWidth: 1,
                    width: 155,
                    borderRadius: 4,
                    borderColor: COLORS.ExtraDivinder,
                    flexDirection: 'row'
                  }}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder='Mulai'
                      style={{ padding: 10, height: 40 }}
                      value={TanggalMulai}
                    />
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                      <TouchableOpacity onPress={() => setModalVisiblePicker('mulai')}>
                        <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <View style={{
                    borderWidth: 1,
                    width: 155,
                    borderRadius: 4,
                    borderColor: COLORS.ExtraDivinder,
                    flexDirection: 'row'
                  }}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder='Selesai'
                      style={{ padding: 10, height: 40 }}
                      value={TanggalSelesai}
                    />
                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                      <TouchableOpacity onPress={() => setModalVisiblePicker('selesai')}>
                        <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblePicker === 'mulai' || modalVisiblePicker === 'selesai' ? true : false}
                onRequestClose={() => {
                setModalVisiblePicker(!modalVisiblePicker);
              }}>
                <TouchableOpacity/>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: '90%', height: 500, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisiblePicker('')} style={{ paddingRight: '85%', marginBottom: 3, marginLeft: 20 }}>
                      <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='close-outline' size={24} color={COLORS.white} />
                      </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%' }}>
                      <DatePicker
                        options={{
                        backgroundColor: COLORS.white,
                        textHeaderColor: COLORS.primary,
                        textDefaultColor: COLORS.primary,
                        selectedTextColor: '#fff',
                        mainColor: COLORS.primary,
                        textSecondaryColor: COLORS.primary,
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        current={moment(Date.now()).format('YYYY-MM-DD')}
                        mode="calendar"
                        minuteInterval={30}
                        style={{ borderRadius: 10 }}
                        onSelectedChange={date => {
                        const [year, month, day] = date.split('/').map(Number)
                        const formattedDate = new Date(year, month - 1, day)
                        if (modalVisiblePicker === 'mulai') {
                          setTanggalMulai(moment(formattedDate).format('YYYY-MM-DD'))
                        } else if (modalVisiblePicker === 'selesai') {
                          setTanggalSelsai(moment(formattedDate).format('YYYY-MM-DD'))
                        }}}
                      />
                      <TouchableOpacity onPress={() => setModalVisiblePicker('')} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ backgroundColor: COLORS.primary, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                          <Text style={{ color: COLORS.white }}>Ok</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> 
            </View>

            <View style={{ marginBottom: 10, flex: 1, marginTop: 10, gap: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.lighter, }}>Perihal</Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                placeholder='Masukan Perihal'
                style={{ borderWidth: 1, height: 40, width: "100%", paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD', }}
              />
            </View>

            <TouchableOpacity style={{
              backgroundColor: COLORS.infoDanger,
              height: 50,
              marginVertical: 20,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center'
              }}
              onPress={() => {bottomSheetAttachClose()}}
            >
              <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: 500 }}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
    </>



    // // <>
    //   {/* <View
    //     style={{ flex: 1, backgroundColor: GlobalStyles.colors.tertiery10 }}
    //   >
    //     <SearchFilter
    //       searchQuery={searchQuery}
    //       setSearchQuery={setSearchQuery}
    //       clearSearch={clearSearch}
    //       showBottomFilter={showBottomFilter}
    //       getSearch={() => {
    //         setList([]);
    //         setIsSearchQuery(searchQuery);
    //         setIsSearchFilter(true);
    //       }}
    //     />
    //     {isSearchFilter && (
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           backgroundColor: GlobalStyles.colors.tertiery10,
    //         }}
    //       >
    //         <Text
    //           style={[
    //             styles.headerList,
    //             {
    //               backgroundColor: GlobalStyles.colors.textWhite,
    //               color: GlobalStyles.colors.textBlack,
    //               marginBottom: 8,
    //             },
    //           ]}
    //         >
    //           {isSearchQuery.length != 0 && startDate == null
    //             ? "Search: "
    //             : "Filter : "}
    //         </Text>
    //         <View style={styles.filter}>
    //           {startDate && (
    //             <Chip
    //               style={styles.badge}
    //               onClose={() => {
    //                 setStartDate(null);
    //                 setEndDate(null);
    //                 if (searchQuery.length == 0) {
    //                   setIsSearchFilter(false);
    //                   setIsLoading(true);
    //                 }
    //                 setList([]);
    //               }}
    //               closeIcon="close"
    //             >
    //               {moment(startDate).format("DD/MM/YYYY")} -{" "}
    //               {moment(endDate).format("DD/MM/YYYY")}
    //             </Chip>
    //           )}
    //           {isSearchQuery && (
    //             <Chip
    //               style={styles.badge}
    //               onClose={() => {
    //                 setSearchQuery("");
    //                 setIsSearchQuery("");
    //                 if (startDate == null && endDate == null) {
    //                   setIsSearchFilter(false);
    //                   setIsLoading(true);
    //                 }
    //                 setList([]);
    //               }}
    //               closeIcon="close"
    //             >
    //               {isSearchQuery}
    //             </Chip>
    //           )}
    //         </View>
    //       </View>
    //     )}
    //     <FlatList
    //       keyExtractor={(item) => item.date}
    //       data={list?.results}
    //       renderItem={renderItem}
    //       ListEmptyComponent={listEmpty}
    //       refreshing={isLoading}
    //       onRefresh={refresh}
    //       onEndReached={loadMore}
    //     />
    //   </View>

    //   <BottomSheetModalProvider>
    //     <SafeAreaView>
    //       <BottomSheetModal
    //         name="filter"
    //         ref={bottomSheetModalRef}
    //         index={1}
    //         snapPoints={snapPoints}
    //         keyboardBehavior={
    //           Platform?.OS == "android" ? "fillParent" : "interactive"
    //         }
    //         keyboardBlurBehavior="restore"
    //         android_keyboardInputMode="adjust"
    //       >
    //         <View style={styles.contentContainer}>
    //           <View style={[styles.containerRow]}>
    //             <Text style={styles.titleFilter}>Filter</Text>
    //             <TouchableOpacity onPress={refresh}>
    //               <Text style={styles.titleReset}>Reset</Text>
    //             </TouchableOpacity>
    //           </View>
    //           <View style={styles.bottomsheetContent}>
    //             <Text style={styles.bottomsheetLabel}>Subject</Text>
    //             <BottomSheetTextInput
    //               value={searchQuery}
    //               onChangeText={setSearchQuery}
    //               style={styles.bottomsheetInput}
    //             />
    //           </View>
    //           <View style={styles.bottomsheetContent}>
    //             <Text style={styles.bottomsheetLabel}>Tanggal Mulai</Text>
    //             <Button
    //               mode="outlined"
    //               textColor={GlobalStyles.colors.tertiery80}
    //               onPress={showStartDate}
    //             >
    //               {startDate
    //                 ? moment(startDate).format("DD/MM/YYYY")
    //                 : "Pilih Tanggal Mulai"}
    //             </Button>
    //             <DateTimePickerModal
    //               isVisible={isStartDateVisible}
    //               mode="date"
    //               display={Platform.OS == "android" ? "inline" : "spinner"}
    //               style={{ width: "100%", height: 300 }}
    //               onConfirm={handleConfirmStart}
    //               onCancel={hideStartDate}
    //               maximumDate={new Date()}
    //             />
    //           </View>
    //           <View style={styles.bottomsheetContent}>
    //             <Text style={styles.bottomsheetLabel}>Tanggal Selesai</Text>
    //             <Button mode="outlined" textColor="black" onPress={showEndDate}>
    //               {endDate
    //                 ? moment(endDate).format("DD/MM/YYYY")
    //                 : "Pilih Tanggal Selesai"}
    //             </Button>
    //             <DateTimePickerModal
    //               isVisible={isEndDateVisible}
    //               mode="date"
    //               display={Platform.OS == "android" ? "inline" : "spinner"}
    //               style={{ width: "100%", height: 300 }}
    //               onConfirm={handleConfirmEnd}
    //               onCancel={hideEndDate}
    //               minimumDate={startDate ? startDate : new Date()}
    //               maximumDate={new Date()}
    //             />
    //           </View>
    //           <View style={styles.buttonContainer}>
    //             <Button
    //               mode="contained"
    //               style={styles.button}
    //               onPress={() => {
    //                 setIsSearchQuery(searchQuery);
    //                 if (!isSearchFilter) {
    //                   setList([]);
    //                 }
    //                 setIsSearchFilter(true);
    //                 bottomSheetModalRef.current?.dismiss();
    //               }}
    //             >
    //               <Text style={styles.buttonText}>Apply</Text>
    //             </Button>
    //             <Button
    //               mode="outline"
    //               textColor={GlobalStyles.colors.tertiery80}
    //               onPress={() => {
    //                 bottomSheetModalRef.current?.dismiss();
    //               }}
    //             >
    //               <Text style={styles.buttonText}>Cancel</Text>
    //             </Button>
    //           </View>
    //         </View>
    //       </BottomSheetModal>
    //     </SafeAreaView>
    //   </BottomSheetModalProvider> */}
    // // </>
  );
}

export default IncomingList;

const styles = StyleSheet.create({
  notFound: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  titleNotFound: {
    textAlign: "center",
    paddingVertical: 32,
    color: GlobalStyles.colors.primary,
  },
  containerRow: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.tertiery20,
  },
  titleFilter: {
    fontSize: GlobalStyles.font.xl,
    fontWeight: "bold",
  },
  titleReset: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
    color: GlobalStyles.colors.error80,
  },
  bottomsheetContent: {
    marginBottom: 12,
  },
  bottomsheetLabel: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomsheetInput: {
    borderRadius: 10,
    fontSize: 16,
    borderColor: GlobalStyles.colors.black50,
    borderWidth: 1,
    padding: 12,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.tertiery20,
    paddingTop: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.approve,
    marginBottom: 16,
    borderTopWidth: 1,
  },
  buttonText: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
  },
  headerList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.tertiery70,
    color: GlobalStyles.colors.textWhite,
    borderRadius: 0,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
