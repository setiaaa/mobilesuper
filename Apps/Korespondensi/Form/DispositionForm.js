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
  IconButton,
  Switch,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError, postHTTP } from "../../../utils/http";
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

function DispositionForm({ route, id, data, noAgenda, tipe }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  let dispoMulti = useSelector((state) => state.dispoMulti.data);
  const addressbook = useSelector((state) => state.addressbook.selected);
  const [selectedAddressbook, setSelectedAddressbook] = useState(addressbook);
  // const [id, setid] = useState();
  const [detail, setDetail] = useState();
  // const [noAgenda, setNoAgenda] = useState();
  // const [tipe, setTipe] = useState();
  const [tindakanList, setTindakanList] = useState();
  const [isFocusTindakan, setIsFocusTindakan] = useState();
  const [visibleDatePicker, setvisibleDatePicker] = useState();
  const [isFocusPrio, setIsFocusPrio] = useState();
  const [btnAdd, setbtnAdd] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const refresh = navigation.addListener("focus", () => {
    setSelectedAddressbook(addressbook);
  });
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  const priority = [
    { view: "High", value: "hi" },
    { view: "Normal", value: "nr" },
    { view: "Low", value: "lo" },
  ];

  useEffect(() => {
    // setid(route?.params?.id);
    // setDetail(route?.params?.data);
    // setNoAgenda(route?.params?.noAgenda);
    // setTipe(route?.params?.tipe);
    if (data == undefined) {
      setDetail(route?.params?.data);
    } else {
      setDetail(data);
    }
    if (dispoMulti.length === 5) {
      setbtnAdd(false);
    } else {
      setbtnAdd(true);
    }
    getTindakan();
    return refresh;
  }, [data]);

  async function getTindakan() {
    setIsLoading(true);
    try {
      const response = await getHTTP(nde_api.dispositionAction);
      setTindakanList(response.data);
      setIsLoading(false);
    } catch (error) {
      handlerError(error, "Warning!", "Nota Tindakan not working!");
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
        if (items.kepadaDispo == [] || items.kepadaDispo == "") {
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
            tindakan: items.tindakan1 ? "1" : "0",
            nota_tindakan: items.nota_tindakan1
              ? items.nota_tindakan1.name
              : "",
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
          items.kepadaDispo.map((item, j) => {
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
        let payload = {
          request: request,
          copy_log: "1",
        };
        //post api dispo
        const response = await postHTTP(
          nde_api.postDisposition.replace("{$type}", tipe).replace("{$id}", id),
          payload
        );
        // alert response
        if (response.data.status == "Error") {
          Alert.alert("Warning!", response.data.msg);
        } else {
          Alert.alert("Success!", "Disposition was successfull!");
          navigation.goBack();
          // navigation.goBack();
        }
      } else {
        Alert.alert("Warning!", "Please fill in the disposition form!");
      }
      setIsLoading(false);
    } catch (error) {
      handlerError(error, "Warning!", "Disposition not working!");
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      {loadingOverlay}
      <View style={styles.screen}>
        <View style={styles.containerLabel}>
          <Text style={styles.titleLabel}>Diteruskan Dari</Text>
        </View>
        <Card style={styles.containerProfile}>
          <Card.Title
            style={styles.containerProfileTitle}
            titleNumberOfLines={100}
            titleStyle={styles.titleProfile}
            title={<Text>{profile?.fullname}</Text>}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{
                  uri: `${profile && nde_api.baseurl + profile?.avatar}`,
                  method: "GET",
                }}
                theme={{
                  colors: {
                    primary: GlobalStyles.colors.textWhite,
                  },
                }}
              />
            )}
          />
        </Card>
        <View style={styles.containerLabel}>
          <Text style={styles.titleLabel}>Alamat Disposisi</Text>
        </View>
        {dispoMulti.map((item, index) => (
          <Card key={index} style={styles.containerCard}>
            {item.btnDel && (
              <View style={styles.headerCard}>
                <IconButton icon="close" onPress={() => delDispo(index)} />
              </View>
            )}
            <Card.Title
              style={styles.containerCardTitle}
              title={
                <>
                  <Text>{item.kepadaDispo.nik}</Text>
                  {item.kepadaDispo.map((items, index) => (
                    <Fragment key={index}>
                      <Text style={styles.title}>
                        {index + 1}.{" "}
                        {items.fullname ? items.fullname : items.title}
                        {"\n"}
                      </Text>
                    </Fragment>
                  ))}
                  {(item.kepadaDispo == undefined ||
                    item.kepadaDispo.length == 0) && (
                      <Text style={styles.titleName}>Name/NIK</Text>
                    )}
                </>
              }
              titleNumberOfLines={100}
              subtitleNumberOfLines={100}
              right={(props) => (
                <IconButton
                  style={styles.containerIcon}
                  {...props}
                  size={24}
                  icon="account-plus"
                  onPress={() => {
                    navigation.navigate("Addressbook", {
                      title: "Addressbook\nDisposition",
                      multiple: true,
                      indexDispo: index,
                      tipe: "receivers",
                    });
                  }}
                />
              )}
            />
            <View style={styles.containerTindakan}>
              {/* <Switch
                value={item.tindakan1}
                onValueChange={() => dispatch(switchTindakan(index))}
              /> */}
              <Text style={styles.titleTindakan}>Nota Tindakan</Text>
              <IconButton
                icon="swap-horizontal"
                onPress={() => dispatch(switchTindakan(index))}
              />
            </View>
            <View
              style={{
                paddingBottom: 16,
                paddingHorizontal: 12,
              }}
            >
              {!item.tindakan1 && (
                <TextInput
                  value={item.nota_tindakan_free1}
                  mode="outlined"
                  multiline={true}
                  theme={{ roundness: 6 }}
                  placeholder="Ketikkan nota tindakan manual"
                  onChangeText={(text) => {
                    dispatch(
                      setNotaTindakanFree({
                        index: index,
                        nota_tindakan_free1: text,
                      })
                    );
                  }}
                />
              )}
              {item.tindakan1 && (
                <Dropdown
                  style={[
                    styles.dropdownTindakan,
                    isFocusTindakan && {
                      borderColor: GlobalStyles.colors.tertiery50,
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  // inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={tindakanList}
                  // search
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocusTindakan ? "Pilih Nota Tindakan" : "..."}
                  // searchPlaceholder="Search..."
                  value={item.nota_tindakan1}
                  onFocus={() => setIsFocusTindakan(true)}
                  onBlur={() => setIsFocusTindakan(false)}
                  onChange={(item) => {
                    dispatch(
                      setNotaTindakan({
                        index: index,
                        nota_tindakan1: item,
                      })
                    );
                    setIsFocusTindakan(false);
                  }}
                />
              )}
            </View>

            {Config.todo && (
              <>
                <View style={styles.containerTodo}>
                  <Switch
                    value={item.create_todo1}
                    onValueChange={() => dispatch(switchTodo(index))}
                  />
                  <Text style={[styles.titleTodo, styles.switchLabel]}>
                    {Config.labelTodo}
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
                      <View style={{ width: "45%" }}>
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
                          placeholder={!isFocusPrio ? "Pilih Prioritas" : "..."}
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
                    <View style={styles.containerBetween}>
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
                    </View>
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
          <Text style={styles.titleLabel}>Informasi Surat</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <DetailAgenda
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: GlobalStyles.colors.tertiery50,
            }}
            showBody={false}
            noAgenda={noAgenda ? noAgenda : detail?.agenda_number}
            data={detail}
          />
        </View>
        <Button
          mode="contained"
          style={{ backgroundColor: GlobalStyles.colors.tertiery }}
          onPress={postDisposition}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}

export default DispositionForm;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.tertiery10,
  },
  containerLabel: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  titleLabel: {
    fontWeight: "bold",
    fontSize: GlobalStyles.font.md,
  },
  containerProfile: {
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.tertiery20,
  },
  containerProfileTitle: {
    padding: 12,
  },
  titleProfile: {
    fontWeight: "bold",
    color: GlobalStyles.colors.textBlack,
  },
  subtitleProfile: {
    color: GlobalStyles.colors.textBlack,
  },
  containerCard: {
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.tertiery10,
  },
  headerCard: {
    backgroundColor: GlobalStyles.colors.primary,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerCardTitle: {
    padding: 12,
    paddingBottom: 0,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleName: {
    fontWeight: "bold",
  },
  containerIcon: {},
  containerTindakan: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  titleTindakan: {
    marginBottom: 6,
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  dropdownTindakan: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: GlobalStyles.colors.tertiery50,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  containerTodo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  titleTodo: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 16,
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
  },
  containerRemind: {
    flexDirection: "row",
  },
  title: {
    marginBottom: 6,
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
});
