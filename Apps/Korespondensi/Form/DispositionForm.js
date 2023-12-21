import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  Switch,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import {
  getHTTP,
  handlerError,
  headerToken,
  postHTTP,
} from "../../../utils/http";
import DetailAgenda from "../Detail/Tab/DetailAgenda";
import moment from "moment";
import {
  addDispoMulti,
  removeDispoMulti,
  setNotaTindakan,
  setNotaTindakanFree,
  setTodoDuedate,
  setTodoPriority,
  setTodoRemind,
  setTodoRemindCount,
  switchTindakan,
  switchTodo,
} from "../../../store/dispoMulti";
import { Config } from "../../../constants/config";
import { FlatList, Image } from "react-native";
import { COLORS } from "../../../config/SuperAppps";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native";
import { useRef } from "react";
import { useMemo } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function DispositionForm({ route, id, data, noAgenda, tipe, title }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  let dispoMulti = useSelector((state) => state.dispoMulti.data);
  // const addressbook = useSelector((state) => state.addressbook.selected);
  const [stateConfig, setStateConfig] = useState({});
  const { addressbook } = useSelector((state) => state.addressBookKKP);
  const [selectedAddressbook, setSelectedAddressbook] = useState(addressbook);
  const [ids, setid] = useState();
  const [detail, setDetail] = useState();
  // const [noAgenda, setNoAgenda] = useState();
  const [tipes, setTipe] = useState();
  const [tindakanList, setTindakanList] = useState();
  const [isFocusTindakan, setIsFocusTindakan] = useState();
  const [visibleDatePicker, setvisibleDatePicker] = useState();
  const [isFocusPrio, setIsFocusPrio] = useState();
  const [errorAvatar, setErrorAvatar] = useState();
  let header = {};
  const [btnAdd, setbtnAdd] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const refresh = navigation.addListener("focus", () => {
    setSelectedAddressbook(addressbook);
  });
  const [selectedTindakan, setSelectedTindakan] = useState([]);
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  const priority = [
    { view: "Tinggi", value: "hi" },
    { view: "Normal", value: "nr" },
    { view: "Rendah", value: "lo" },
  ];

  const bottomSheetRefNotaTindakan = useRef(null);
  const snapPoint = useMemo(() => [50, "100%"], []);

  const [pilihanKepada, setPilihanKepada] = useState([]);

  useEffect(() => {
    if (stateConfig.title === "Addressbook\nDisposition") {
      setPilihanKepada(addressbook.selected);
    }
    // console.log("addressbook", pilihanKepada);
  }, [addressbook.selected]);

  useEffect(() => {
    setid(route?.params?.id);
    // setDetail(route?.params?.data);
    // setNoAgenda(route?.params?.noAgenda);
    setTipe(route?.params?.tipe);
    if (data == undefined) {
      setDetail(route?.params?.data);
    } else {
      setDetail(data);
    }
    // if (dispoMulti.length === 5) {
    //   setbtnAdd(false);
    // } else {
    //   setbtnAdd(true);
    // }
    // getTindakan();
    setTindakanList([
      { name: "Info" },
      { name: "Aksi" },
      { name: "Jadwalkan/agendakan" },
      { name: "Siapkan bahan" },
      { name: "Beri saran" },
      { name: "Harap mewakili" },
      { name: "Hadir bersama saya" },
      { name: "Untuk dipelajari" },
      { name: "Tanggapan" },
      { name: "Bahas" },
      { name: "Dijawab/dibalas" },
      { name: "Dilaksanakan" },
      { name: "Ditindaklanjuti" },
      { name: "Untuk diketahui" },
      { name: "File" },
      { name: "Bicarakan dengan saya" },
    ]);
    getHeader();
    return refresh;
  }, [data, selectedTindakan]);

  async function getHeader() {
    header = await headerToken();
  }
  const renderItem = ({ item, index }) => (
    <View style={{ alignItems: "flex-start" }} key={index}>
      <Checkbox.Item
        mode="android"
        label={item.name}
        status={
          selectedTindakan?.findIndex((data) => data == item.name) != -1
            ? "checked"
            : "unchecked"
        }
        color={COLORS.primary}
        onPress={() => {
          dispatch(
            setNotaTindakan({
              index: 0,
              nota_tindakan1: item,
            })
          );
          selectedTindakan?.findIndex((data) => data == item.name) == -1
            ? setSelectedTindakan([...selectedTindakan, item.name])
            : setSelectedTindakan(
                selectedTindakan.filter(
                  (tind, i) =>
                    i !==
                    selectedTindakan?.findIndex((data) => data == item.name)
                )
              );
        }}
        position="trailing"
        labelStyle={styles.labelCheckbox}
        style={{ color: GlobalStyles.colors.primary }}
      />
    </View>
  );
  async function getTindakan() {
    setIsLoading(true);
    try {
      const response = await getHTTP(nde_api.dispositionAction);
      response.data = response?.data?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setTindakanList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handlerError(error, "Peringatan!", "Nota Tindakan tidak berfungsi!");
      setIsLoading(false);
    }
  }
  //menambah form disposisi
  function addDispo() {
    let payload = {
      kepadaDispo: [],
      btnDel: true,
      tindakan1: true,
      nota_tindakan1: "",
      nota_tindakan_free1: "",
      create_todo1: false,
      duedate_todo1: "",
      send_priority_todo1: "",
      remind_todo1: false,
      remind_count_todo1: 0,
    };
    dispatch(addDispoMulti(payload));
  }
  //menghapus form disposisi
  function delDispo(i) {
    dispatch(removeDispoMulti(i));
  }

  async function postDisposition() {
    setIsLoading(true);
    try {
      let status = 1;
      // validasi
      dispoMulti.map((items) => {
        if (pilihanKepada.length == 0 || pilihanKepada == "") {
          status = 0;
        } else if (
          items.tindakan1 &&
          (items.nota_tindakan1 == undefined || items.nota_tindakan1 == "")
        ) {
          status = 0;
        } else if (
          !items.tindakan1 &&
          (items.nota_tindakan_free1 == undefined ||
            items.nota_tindakan_free1 == "")
        ) {
          status = 0;
        } else if (
          items.create_todo1 &&
          (items.duedate_todo1 == undefined ||
            items.duedate_todo1 == "" ||
            items.send_priority_todo1 == "")
        ) {
          status = 0;
        } else if (items.create_todo1 && items.remind_todo1) {
          if (
            items.remind_count_todo1 == undefined ||
            items.remind_count_todo1 == 0
          ) {
            status = 0;
          }
        }
      });
      if (status == 1) {
        //prep-data
        let request = [];
        dispoMulti.map((items, i) => {
          request.push({
            kepada: "",
            kepada_ids: "",
            tindakan: "0",
            nota_tindakan:
              selectedTindakan.length != 0 ? selectedTindakan.join("\n") : "",
            nota_tindakan_free: items.nota_tindakan_free1
              ? items.nota_tindakan_free1
              : "",
            create_todo: items.create_todo1 ? "on" : "off",
            duedate_todo: "",
            send_priority_todo: "",
            remind_todo: items.remind_todo1 ? "on" : "off",
            remind_count_todo: parseInt(items.remind_count_todo1),
          });
          let temp = [];
          let temp_ids = [];
          pilihanKepada.map((item, j) => {
            temp.push(item.fullname ? item.fullname : item.title);
            temp_ids.push(item.nik ? item.nik : item.code);
          });
          request[i].kepada = temp.join(",");
          request[i].kepada_ids = temp_ids.join(",");

          if (items.create_todo1) {
            request[i].duedate_todo = moment(items.duedate_todo1).format(
              "DD/MM/YYYY"
            );
            request[i].send_priority_todo = items.send_priority_todo1.value;
          }
        });
        // console.log(request);
        let payload = {
          request: request,
          copy_log: "1",
        };
        // console.log("payload", payload);
        //post api dispo
        const response = await postHTTP(
          nde_api.postDisposition
            .replace("{$type}", tipes)
            .replace("{$id}", ids),
          payload
        );
        // alert response
        if (response.data.status == "Error") {
          Alert.alert("Peringatan!", response.data.msg);
        } else {
          Alert.alert("Berhasil!", "Disposisi berhasil terkirim!");
          navigation.goBack();
          // navigation.goBack();
        }
      } else {
        Alert.alert("Peringatan!", "Silakan isi lembar disposisi!");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handlerError(error, "Peringatan!", "Disposisi tidak berfungsi!");
      setIsLoading(false);
    }
  }

  function confirmRemoveAll() {
    if (selectedTindakan?.length == 0) {
      Alert.alert("Info", "Catatan kosong");
    } else {
      Alert.alert(
        "Konfirmasi",
        "Anda yakin untuk menghapus semua catatan?",
        [
          { text: "Batal", onPress: () => {} },
          {
            text: "Ya",
            onPress: () => setSelectedTindakan([]),
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }
  return (
    <>
      <ScrollView>
        {loadingOverlay}
        <View style={styles.screen}>
          <View style={styles.containerLabel}>
            <Text style={styles.title}>Disposisi</Text>
          </View>
          {dispoMulti.map((item, index) => (
            <Card key={index} style={styles.containerCard}>
              {item.btnDel && (
                <View style={styles.headerCard}>
                  <IconButton icon="close" onPress={() => delDispo(index)} />
                </View>
              )}

              <View style={styles.containerTitle}>
                <Text style={styles.title}>Disposisi Kepada</Text>
                {pilihanKepada != undefined && pilihanKepada.length != 0 && (
                  <IconButton
                    icon="plus"
                    // onPress={() => {
                    //   navigation.navigate("Addressbook", {
                    //     title: "Addressbook\nDisposition",
                    //     multiple: true,
                    //     indexDispo: index,
                    //     tipe: "receivers",
                    //   });
                    // }}
                    onPress={() => {
                      const config = {
                        title: "Addressbook\nDisposition",
                        tipeAddress: "korespodensi",
                        tabs: {
                          jabatan: true,
                          pegawai: true,
                        },
                        multiselect: true,
                        payload: pilihanKepada,
                      };
                      setStateConfig(config);
                      navigation.navigate("AddressBook", { config: config });
                    }}
                  />
                )}
              </View>
              <View>
                {pilihanKepada != undefined &&
                  pilihanKepada.map((items, index) => (
                    <Fragment key={index}>
                      <Text style={styles.titleLabel}>
                        {index + 1}.{" "}
                        {items.fullname ? items.fullname : items.title}
                      </Text>
                    </Fragment>
                  ))}

                {(pilihanKepada == undefined || pilihanKepada.length == 0) && (
                  <TextInput
                    mode="outlined"
                    theme={{ roundness: 6 }}
                    placeholder="Pilih Kepada"
                    right={
                      <TextInput.Icon
                        size={24}
                        icon="account-plus"
                        // onPress={() => {
                        //   navigation.navigate("Addressbook", {
                        //     title: "Addressbook\nDisposition",
                        //     multiple: true,
                        //     indexDispo: index,
                        //     tipe: "receivers",
                        //   });
                        // }}
                        onPress={() => {
                          const config = {
                            title: "Addressbook\nDisposition",
                            tipeAddress: "korespodensi",
                            tabs: {
                              jabatan: true,
                              pegawai: true,
                            },
                            multiselect: true,
                            payload: pilihanKepada,
                          };
                          setStateConfig(config);
                          navigation.navigate("AddressBook", {
                            config: config,
                          });
                        }}
                      />
                    }
                    editable={false}
                    style={styles.titleLabel}
                  />
                )}
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>Untuk</Text>
                {selectedTindakan.length != 0 && (
                  <IconButton
                    icon="plus"
                    onPress={() => {
                      dispatch(switchTindakan(index));
                      bottomSheetRefNotaTindakan?.current?.present();
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  paddingBottom: 12,
                }}
              >
                <View style={styles.titleLabel}>
                  {selectedTindakan.length == 0 && (
                    <TextInput
                      mode="outlined"
                      theme={{ roundness: 6 }}
                      placeholder="Pilih Untuk"
                      right={
                        <TextInput.Icon
                          size={24}
                          icon="menu-down"
                          onPress={() => {
                            dispatch(switchTindakan(index));
                            bottomSheetRefNotaTindakan?.current?.present();
                          }}
                        />
                      }
                      editable={false}
                      style={styles.titleLabel}
                    />
                  )}
                  {selectedTindakan.length != 0 &&
                    selectedTindakan.map((item, index) => (
                      <Text key={index}>- {item}</Text>
                    ))}
                </View>
              </View>

              <View style={styles.containerTitle}>
                <Text style={styles.title}>Catatan</Text>
              </View>
              <TextInput
                value={item.nota_tindakan_free1}
                mode="outlined"
                multiline={true}
                theme={{ roundness: 6 }}
                placeholder="Masukkan catatan..."
                onChangeText={(text) => {
                  dispatch(
                    setNotaTindakanFree({
                      index: index,
                      nota_tindakan_free1: text,
                    })
                  );
                }}
                style={[styles.titleLabel, { paddingVertical: 12 }]}
              />

              {Config.todo && (
                <>
                  <View style={styles.containerTitleLeft}>
                    <Switch
                      value={item.create_todo1}
                      onValueChange={() => dispatch(switchTodo(index))}
                    />
                    <Text style={[styles.titleTodo, styles.switchLabel]}>
                      Aktifkan {Config.labelTodo}
                    </Text>
                  </View>

                  {item.create_todo1 && (
                    <>
                      <View style={styles.containerTanggalPrioritas}>
                        <View style={{ width: "45%" }}>
                          <Text style={styles.titleLabelTodo}>Tanggal</Text>
                          <Button
                            style={{
                              borderColor: GlobalStyles.colors.tertiery50,
                              borderRadius: 6,
                            }}
                            mode="outlined"
                            textColor="black"
                            onPress={() => {
                              setvisibleDatePicker(!visibleDatePicker);
                            }}
                          >
                            {item.duedate_todo1 != ""
                              ? moment(new Date(item.duedate_todo1)).format(
                                  "DD/MM/YYYY"
                                )
                              : "Tgl Duedate"}
                          </Button>
                          <DateTimePickerModal
                            isVisible={visibleDatePicker}
                            mode="date"
                            display={
                              Platform.OS == "android" ? "inline" : "spinner"
                            }
                            style={{ width: "100%", height: 300 }}
                            onConfirm={(date) => {
                              dispatch(
                                setTodoDuedate({
                                  index: index,
                                  duedate_todo1: date.toDateString(),
                                })
                              );
                              setvisibleDatePicker(false);
                            }}
                            onCancel={() => {
                              setvisibleDatePicker(false);
                            }}
                            minimumDate={new Date()}
                          />
                        </View>
                        <View style={{ width: "47%" }}>
                          <Text style={styles.titleLabelTodo}>Prioritas</Text>
                          <Dropdown
                            style={[
                              styles.dropdownTodo,
                              isFocusPrio && {
                                borderColor: GlobalStyles.colors.tertiery50,
                              },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={priority}
                            // search
                            maxHeight={300}
                            labelField="view"
                            valueField="value"
                            placeholder={
                              !isFocusPrio ? "Pilih Prioritas" : "..."
                            }
                            // searchPlaceholder="Search..."
                            value={item.send_priority_todo1}
                            onFocus={() => setIsFocusPrio(true)}
                            onBlur={() => setIsFocusPrio(false)}
                            onChange={(item) => {
                              dispatch(
                                setTodoPriority({
                                  index: index,
                                  send_priority_todo1: item,
                                })
                              );
                              setIsFocusPrio(false);
                            }}
                          />
                        </View>
                      </View>
                      {/* <View style={styles.containerBetween}>
                      <View>
                        <Checkbox.Item
                          style={{ paddingLeft: -12 }}
                          mode="android"
                          label="Remind Todo"
                          status={item.remind_todo1 ? "checked" : "unchecked"}
                          color={GlobalStyles.colors.tertiery}
                          onPress={() => {
                            dispatch(setTodoRemind(index));
                          }}
                          position="leading"
                          labelStyle={styles.labelRemind}
                        />
                        <View
                          style={[
                            styles.containerRemind,
                            { alignItems: "center" },
                          ]}
                        >
                          <TextInput
                            style={{ marginRight: 8 }}
                            mode="outlined"
                            theme={{ roundness: 6 }}
                            keyboardType="numeric"
                            value={item.remind_count_todo1}
                            onChangeText={(text) =>
                              dispatch(
                                setTodoRemindCount({
                                  index: index,
                                  remind_count_todo1: text,
                                })
                              )
                            }
                            disabled={!item.remind_todo1}
                          />
                          <Text>day(s) before</Text>
                        </View>
                      </View>
                    </View> */}
                    </>
                  )}
                </>
              )}
            </Card>
          ))}
          {btnAdd && (
            <Button
              onPress={addDispo}
              mode="contained"
              style={{
                marginBottom: 16,
                backgroundColor: GlobalStyles.colors.tertiery,
              }}
            >
              Add Disposition
            </Button>
          )}
          <View style={styles.containerLabel}>
            <Text style={styles.title}>Informasi Surat</Text>
          </View>
          <View style={{ marginBottom: 16 }}>
            <DetailAgenda
              style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: GlobalStyles.colors.tertiery50,
                backgroundColor: GlobalStyles.colors.tertiery20,
              }}
              showBody={false}
              noAgenda={noAgenda ? noAgenda : detail?.agenda_number}
              data={detail}
              tipe={tipe ? tipe : route?.params?.tipe}
              title={title ? title : route?.params?.title}
            />
          </View>
          <Button
            mode="contained"
            style={{ backgroundColor: GlobalStyles.colors.tertiery }}
            onPress={postDisposition}
          >
            Kirim
          </Button>
        </View>
      </ScrollView>

      <BottomSheetModalProvider>
        <SafeAreaView>
          <View>
            <BottomSheetModal
              name="download"
              ref={bottomSheetRefNotaTindakan}
              index={1}
              snapPoints={snapPoint}
              keyboardBehavior={
                Platform?.OS == "android" ? "fillParent" : "interactive"
              }
              keyboardBlurBehavior="restore"
              android_keyboardInputMode="adjust"
              backgroundStyle={{
                backgroundColor: COLORS.primary,
              }}
              handleIndicatorStyle={{
                backgroundColor: COLORS.white,
              }}
            >
              <View style={styles.containerRow}>
                <Text
                  style={[
                    styles.titleLabel,
                    { color: GlobalStyles.colors.textWhite },
                  ]}
                >
                  Catatan
                </Text>
                <TouchableOpacity onPress={confirmRemoveAll}>
                  <Text style={{ color: GlobalStyles.colors.textWhite }}>
                    Hapus Semua
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerTindakanChecked}>
                <FlatList
                  data={tindakanList}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  mode="contained"
                  style={[
                    {
                      backgroundColor: COLORS.primary,
                      marginBottom: 16,
                    },
                  ]}
                  onPress={() => bottomSheetRefNotaTindakan?.current?.dismiss()}
                >
                  Simpan
                </Button>
              </View>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </>
  );
}

export default DispositionForm;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.tertiery20,
  },
  containerCard: {
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.tertiery10,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  containerLabel: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 6,
    fontSize: GlobalStyles.font.md,
  },
  titleLabel: {
    fontSize: GlobalStyles.font.md,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  containerTindakanChecked: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.textWhite,
    paddingHorizontal: 12,
  },
  containerTitleLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
  },
  titleTodo: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  containerBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  switchLabel: {
    paddingLeft: 8,
  },
  titleLabelTodo: {
    marginBottom: 12,
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  dropdownTodo: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: GlobalStyles.colors.tertiery50,
    paddingHorizontal: 12,
  },
  containerTanggalPrioritas: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  containerRemind: {
    flexDirection: "row",
  },
  title: {
    marginBottom: 6,
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  labelRemind: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  labelCheckbox: {
    width: "95%",
    textAlign: "left",
    fontSize: GlobalStyles.font.md,
  },
});
