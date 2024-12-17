import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardDCounter from "../../../components/UI/CardDCounter";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization, setProfile } from "../../../store/profile";
import { setProfile as setProfileBridge } from "../../../store/SuperApps";
import { removeTokenValue } from "../../../service/session";
import { setLogout } from "../../../store/LoginAuth";
import * as Sentry from "@sentry/react-native";
import { setTypeLetter } from "../../../store/listBulk";
import CardDMenu from "../../../components/UI/CardDMenu";
import { PADDING } from "../../../config/SuperAppps";

function DCounter() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let [isCounter, setIsCounter] = useState([
    {
      count: 1,
      type: "onprogress",
      value: "-",
      icon: "email-edit-outline",
      color: "rgba(73, 189, 101, 0.6)",
      navName: "NeedFollowUpList",
    },
    {
      count: 2,
      type: "sign",
      value: "-",
      icon: "email-edit",
      color: "#49b0aa",
      navName: "NeedSignList",
    },
    {
      count: 3,
      type: "agenda_in",
      value: "-",
      icon: "inbox-arrow-down",
      color: "rgba(24, 104, 171, 0.6)",
      navName: "IncomingUnread",
    },
    {
      count: 4,
      type: "internal",
      value: "-",
      icon: "inbox",
      color: "rgba(236, 202, 12, 0.6)",
      navName: "InternalUnread",
    },
    {
      count: 5,
      type: "agenda_disposition",
      value: "-",
      icon: "email-send-outline",
      color: "rgba(244, 32, 32, 0.6)",
      navName: "DispositionUnread",
    },
  ]);
  let [isCounterMenuDefault, setIsCounterMenuDefault] = useState([
    {
      count: 1,
      type: "agenda_in",
      value: "-",
      icon: "inbox-arrow-down",
      navName: "IncomingList",
    },
    {
      count: 2,
      type: "agenda_in_dispo",
      value: "-",
      icon: "inbox-arrow-down-outline",
      navName: "IncomingList",
    },
    {
      count: 3,
      type: "internal",
      value: "-",
      icon: "inbox",
      navName: "InternalSatkerList",
    },
    {
      count: 4,
      type: "agenda_disposition",
      value: "-",
      icon: "email-send-outline",
      navName: "DispositionList",
    },
    {
      count: 5,
      type: "onprogress",
      value: "-",
      icon: "email-edit-outline",
      navName: "NeedFollowUpList",
    },
    {
      count: 6,
      type: "sign",
      value: "-",
      icon: "email-edit",
      navName: "NeedSignList",
    },
    {
      count: 7,
      type: "tracking",
      value: "-",
      icon: "email-search-outline",
      navName: "TrackingList",
    },
    {
      count: 8,
      type: "submitted",
      value: "-",
      icon: "email-check-outline",
      navName: "SubmittedList",
    },
  ]);
  let [isCounterMenu, setIsCounterMenu] = useState([
    {
      count: 1,
      type: "agenda_in",
      value: "-",
      icon: "inbox-arrow-down",
      navName: "IncomingList",
    },
    {
      count: 2,
      type: "agenda_in_dispo",
      value: "-",
      icon: "inbox-arrow-down-outline",
      navName: "IncomingList",
    },
    {
      count: 3,
      type: "agenda_in_eselon1",
      value: "-",
      icon: "mail-outline",
      navName: "IncomingList",
    },
    {
      count: 4,
      type: "internal",
      value: "-",
      icon: "inbox",
      navName: "InternalSatkerList",
    },
    {
      count: 5,
      type: "agenda_disposition",
      value: "-",
      icon: "email-send-outline",
      navName: "DispositionList",
    },
    {
      count: 6,
      type: "onprogress",
      value: "-",
      icon: "email-edit-outline",
      navName: "NeedFollowUpList",
    },
    {
      count: 7,
      type: "sign",
      value: "-",
      icon: "email-edit",
      navName: "NeedSignList",
    },
    {
      count: 8,
      type: "tracking",
      value: "-",
      icon: "email-search-outline",
      navName: "TrackingList",
    },
    {
      count: 9,
      type: "submitted",
      value: "-",
      icon: "email-check-outline",
      navName: "SubmittedList",
    },
  ]);
  let role_menu = ["88888", "197208122001121002"];
  let [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { selectedAttr, profile } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  async function getTypeLetter() {
    try {
      const response = await getHTTP(nde_api.typeletter);
      dispatch(setTypeLetter(response.data));
    } catch (error) {
      if (error?.response?.status == null && error?.status == null) {
        Alert.alert("Peringatan!", "Silakan cek koneksi anda");
      } else {
        handlerError(
          error,
          "Peringatan!",
          "Filter jenis surat tidak berfungsi!"
        );
      }
    }
  }
  useEffect(() => {
    getTypeLetter();
    // const response = getHTTP(nde_api.dashboard);
    getisCounter();
    getProfile();
  }, [token, isFocused, selectedAttr]);
  async function getProfile() {
    setIsLoading(true);
    try {
      //get isCounter
      const response = await getHTTP(nde_api.profile);
      dispatch(setProfile(response.data));
      dispatch(setOrganization(response.data));
      setIsLoading(false);
    } catch (error) {
      // console.log(error.response);
    }
  }
  async function getisCounter() {
    setIsLoading(true);
    try {
      //get isCounter
      const response = await getHTTP(
        nde_api.dashboard + "?attr=" + selectedAttr?.code
      );
      if (response?.data?.length != 0) {
        const updatedCounter = isCounter?.map((dashItem) => {
          const responseItem = response?.data?.find(
            (resItem) => resItem.type === dashItem.type
          );
          return {
            ...dashItem,
            value: responseItem ? responseItem.value : dashItem.value, // Gunakan value dari response atau tetap "-"
          };
        });
        setIsCounter(updatedCounter);
        const updatedMenu = isCounterMenu?.map((dashItem) => {
          const responseItem = response?.data?.find(
            (resItem) => resItem.type === dashItem.type
          );
          return {
            ...dashItem,
            value: responseItem ? responseItem.value : dashItem.value, // Gunakan value dari response atau tetap "-"
          };
        });
        setIsCounterMenu(updatedMenu);
      }
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.status == null && error?.status == null) {
        setIsCounter([
          {
            count: 1,
            type: "onprogress",
            value: "-",
            icon: "email-edit-outline",
            color: "rgba(73, 189, 101, 0.6)",
            navName: "NeedFollowUpList",
          },
          {
            count: 2,
            type: "sign",
            value: "-",
            icon: "email-edit",
            color: "#49b0aa",
            navName: "NeedSignList",
          },
          {
            count: 3,
            type: "agenda_in",
            value: "-",
            icon: "inbox-arrow-down",
            color: "rgba(24, 104, 171, 0.6)",
            navName: "IncomingUnread",
          },
          {
            count: 4,
            type: "internal",
            value: "-",
            icon: "inbox",
            color: "rgba(236, 202, 12, 0.6)",
            navName: "InternalUnread",
          },
          {
            count: 5,
            type: "agenda_disposition",
            value: "-",
            icon: "email-send-outline",
            color: "rgba(244, 32, 32, 0.6)",
            navName: "DispositionUnread",
          },
        ]);
        setIsCounterMenu([
          {
            count: 1,
            type: "agenda_in",
            value: "-",
            icon: "inbox-arrow-down",
            navName: "IncomingList",
          },
          {
            count: 2,
            type: "internal",
            value: "-",
            icon: "inbox",
            navName: "InternalSatkerList",
          },
          {
            count: 3,
            type: "agenda_disposition",
            value: "-",
            icon: "email-send-outline",
            navName: "DispositionList",
          },
          {
            count: 4,
            type: "onprogress",
            value: "-",
            icon: "email-edit-outline",
            navName: "NeedFollowUpList",
          },
          {
            count: 5,
            type: "sign",
            value: "-",
            icon: "email-edit",
            navName: "NeedSignList",
          },
          {
            count: 6,
            type: "tracking",
            value: "-",
            icon: "email-search-outline",
            navName: "TrackingList",
          },
          {
            count: 7,
            type: "submitted",
            value: "-",
            icon: "email-check-outline",
            navName: "SubmittedList",
          },
        ]);
      } else if (error?.status === 401 || error?.response?.status === 401) {
        Sentry.captureEvent(error?.response);
        removeTokenValue();
        dispatch(setLogout());
        dispatch(setProfileBridge({}));
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginToken" }],
        });
      } else {
        handlerError(error, "Peringatan!", "Counter tidak berfungsi!");
        console.log(error);
      }
      setIsLoading(false);
    }
  }
  const renderItem = ({ item }) => (
    <CardDCounter data={item} navigation={navigation} />
  );

  const [divisionList, setDivisionList] = useState([]);
  useEffect(() => {
    getDivisionList();
  }, []);
  async function getDivisionList() {
    try {
      let response = await getHTTP(nde_api.divisionList);
      let gabung = divisionList.concat(response.data);
      setDivisionList(gabung);
    } catch (error) {
      console.log(nde_api.divisionList);
      console.log(error);
      if (error?.response?.status == 401 || error?.status == 401) {
        Sentry.captureEvent(error?.response);
        dispatch(logout());
      } else {
        handlerError(
          error,
          "Peringatan!",
          "Daftar Surat Eselon I tidak berfungsi"
        );
      }
    }
  }
  return (
    <ScrollView nestedScrollEnabled>
      <View style={{ flex: 1, padding: PADDING.Page }}>
        {isCounter?.length != 0 && (
          <>
            <View style={styles.container}>
              <Text style={styles.title}>SURAT BELUM DIBUKA</Text>
              <FlatList
                keyExtractor={(item) => item.count}
                data={isCounter}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  margin: 5,
                }}
                refreshing={isLoading}
                onRefresh={getisCounter}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>MENU</Text>
              {!role_menu.includes(profile?.nik) &&
                isCounterMenuDefault?.map((item, index) => (
                  <CardDMenu
                    key={index}
                    data={item}
                    navigation={navigation}
                    divisionList={divisionList}
                  />
                ))}
              {role_menu.includes(profile?.nik) &&
                isCounterMenu?.map((item, index) => (
                  <CardDMenu
                    key={index}
                    data={item}
                    navigation={navigation}
                    divisionList={divisionList}
                  />
                ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default DCounter;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    gap: 5,
    borderRadius: 10,
    backgroundColor: "white",
    //shadow ios
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    //shadow android
    elevation: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
