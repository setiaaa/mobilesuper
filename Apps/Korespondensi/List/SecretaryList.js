import { useNavigation } from "@react-navigation/native";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Chip, IconButton, Searchbar } from "react-native-paper";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import CardSecretary from "../../../components/UI/CardSecretary";
import { useDispatch } from "react-redux";
import { removeAll } from "../../../store/addressbook";

function SecretaryList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDateVisible, setStartDateVisibility] = useState(false);
  const [isEndDateVisible, setEndDateVisibility] = useState(false);
  const [isSearchFilter, setIsSearchFilter] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [add, setAdd] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [50, 450], []);

  const willFocusSubscription = navigation.addListener("focus", () => {
    if (isSearchFilter && searchQuery.length != 0) {
      filter();
    } else {
      getProfileTitle();
      getSecretary();
    }
  });

  useEffect(() => {
    if (isSearchFilter && (searchQuery.length != 0 || startDate != null)) {
      filter();
    } else {
      getProfileTitle();
      getSecretary();
    }
    return willFocusSubscription;
  }, [startDate, endDate, isSearchQuery, isSearchFilter]);

  async function getSecretary() {
    setIsLoading(true);
    try {
      setIsSearchFilter(false);
      let response;
      response = await getHTTP(nde_api.secretary);
      setList(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsSearchFilter(false);
      handlerError(error, "Warning!", "Secretary List not working");
      setIsLoading(false);
    }
  }
  async function getProfileTitle() {
    setIsLoading(true);
    try {
      //get profile title: untuk cek punya jabatan atau hanya poh, untuk add delegasi dan sekretaris
      const response = await getHTTP(nde_api.profiletitle);
      if (response.data.status) {
        response?.data?.title.forEach((e) => {
          if (e.poh == false) {
            setAdd(true);
          }
        });
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Info!", "User title data not working!");
      setIsLoading(false);
    }
  }

  const renderItem = ({ item }) => (
    <>
      {/* <Text style={styles.headerList}>{item.date}</Text> */}
      {item.children.map((data) => (
        <CardSecretary
          key={data.id}
          data={data}
          onPress={() => {
            navigation.navigate("SecretaryDetail", {
              id: data.id,
              title: "Secretary\nDetail",
            });
          }}
        />
      ))}
    </>
  );

  async function filter() {
    setIsLoading(true);
    try {
      if (startDate == null && endDate == null && searchQuery.length == 0) {
        setIsSearchFilter(false);
        getSecretary();
      } else {
        setIsSearchQuery(searchQuery);
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
        let url = nde_api.secretary + "?";
        url =
          url + "start_date=" + start + "&end_date=" + end + "&search=" + word;
        let response;
        response = await getHTTP(url);
        if (response) {
          setIsSearchFilter(true);
          setList(response.data.results);
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
            getSecretary();
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
      {loadingOverlay}
      <View style={{ flex: 1 }}>
        {/* <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
          showBottomFilter={showBottomFilter}
          getSearch={filter}
        /> */}
        <Searchbar
          placeholder="Cari..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={filter}
          onSubmitEditing={filter}
          clearIcon={clearSearch}
        />
        {isSearchFilter && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: GlobalStyles.colors.textWhite,
            }}
          >
            <Text style={styles.headerList}>Filter : </Text>
            <View>
              {startDate && (
                <Chip
                  mode="outlined"
                  onClose={() => {
                    setStartDate(null);
                    setEndDate(null);
                    filter();
                  }}
                  closeIcon="close"
                >
                  {moment(startDate).format("DD/MM/YYYY")} -{" "}
                  {moment(endDate).format("DD/MM/YYYY")}
                </Chip>
              )}
              {searchQuery && (
                <Chip
                  mode="outlined"
                  onClose={() => {
                    setSearchQuery("");
                    setIsSearchQuery("");
                  }}
                  closeIcon="close"
                >
                  {searchQuery}
                </Chip>
              )}
            </View>
          </View>
        )}
        {list?.length == 0 && isSearchFilter && (
          <Text style={styles.titleNotFound}>Secretary not found</Text>
        )}
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.type + index}
          style={[
            { paddingHorizontal: 16, marginTop: 8 },
            add ? { marginBottom: 65 } : {},
          ]}
        />

        {add && (
          <View style={styles.footer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                dispatch(removeAll());
                navigation.navigate("SecretaryForm", {
                  title: "Secretary\nForm",
                });
              }}
            >
              Add Secretary
            </Button>
          </View>
        )}
      </View>

      <BottomSheetModalProvider>
        < >
          <View>
            <BottomSheetModal
              name="filter"
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              keyboardBehavior={
                Platform?.OS == "android" ? "fillParent" : "interactive"
              }
              keyboardBlurBehavior="restore"
              android_keyboardInputMode="adjust"
            >
              <View style={styles.contentContainer}>
                <View
                  style={[
                    styles.containerRow,
                    { marginBottom: 8, justifyContent: "space-between" },
                  ]}
                >
                  <Text>Filter</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setStartDate();
                      setEndDate();
                      setSearchQuery("");
                      getSecretary();
                      bottomSheetModalRef.current?.dismiss();
                    }}
                  >
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <View style={{ marginBottom: 8 }}>
                    <Text>Tgl Mulai</Text>
                  </View>
                  <Button
                    mode="outlined"
                    textColor="black"
                    onPress={showStartDate}
                  >
                    {startDate
                      ? moment(startDate).format("DD/MM/YYYY")
                      : "Pilih Tgl Mulai"}
                  </Button>
                  <DateTimePickerModal
                    isVisible={isStartDateVisible}
                    mode="date"
                    display={Platform.OS == "android" ? "inline" : "spinner"}
                    style={{ width: "100%", height: 300 }}
                    onConfirm={handleConfirmStart}
                    onCancel={hideStartDate}
                  />
                </View>
                <View style={{ marginBottom: 8 }}>
                  <View style={{ marginBottom: 8 }}>
                    <Text>Tgl Selesai</Text>
                  </View>
                  <Button
                    mode="outlined"
                    textColor="black"
                    onPress={showEndDate}
                  >
                    {endDate
                      ? moment(endDate).format("DD/MM/YYYY")
                      : "Pilih Tgl Selesai"}
                  </Button>
                  <DateTimePickerModal
                    isVisible={isEndDateVisible}
                    mode="date"
                    display={Platform.OS == "android" ? "inline" : "spinner"}
                    style={{ width: "100%", height: 300 }}
                    onConfirm={handleConfirmEnd}
                    onCancel={hideEndDate}
                    minimumDate={startDate ? startDate : new Date()}
                  />
                </View>

                <View style={{ marginBottom: 8 }}>
                  <Text>Keyword</Text>
                </View>
                <BottomSheetTextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.input}
                />
                <Button
                  mode="contained"
                  style={[
                    {
                      marginBottom: 16,
                      backgroundColor: GlobalStyles.colors.approve,
                    },
                  ]}
                  onPress={() => filter()}
                >
                  Apply
                </Button>
                <Button
                  mode="contained"
                  style={[
                    {
                      backgroundColor: GlobalStyles.colors.gray500,
                      marginBottom: 16,
                    },
                  ]}
                  onPress={() => {
                    bottomSheetModalRef.current?.dismiss();
                  }}
                >
                  Cancel
                </Button>
              </View>
            </BottomSheetModal>
          </View>
        </ >
      </BottomSheetModalProvider>
    </>
  );
}

export default SecretaryList;

const styles = StyleSheet.create({
  titleNotFound: {
    textAlign: "center",
    paddingVertical: 32,
  },
  containerRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  headerList: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  button: {
    backgroundColor: GlobalStyles.colors.dSecretary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 16,
    paddingBottom: 16,
    backgroundColor: "white",
  },
});
