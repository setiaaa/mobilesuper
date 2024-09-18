import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import CardDCounter from "../../../components/UI/CardDCounter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrganization,
  setProfile,
  setSelectedAttr,
} from "../../../store/profile";
import { setProfile as setProfileBridge } from "../../../store/SuperApps";
import { Button, Card, Menu } from "react-native-paper";
import { COLORS } from "../../../config/SuperAppps";
import { Image } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { removeTokenValue } from "../../../service/session";
import { setLogout } from "../../../store/LoginAuth";
import * as Sentry from "@sentry/react-native";
import { setTypeLetter } from "../../../store/listBulk";

function DCounter() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let [isCounter, setIsCounter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { profile, selectedAttr } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const { device } = useSelector((state) => state.apps);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const icon = [
    {
      icon: "email-edit-outline",
      color: "rgba(73, 189, 101, 0.6)",
      navName: "NeedFollowUpList",
    },
    {
      icon: "email-edit",
      color: "#49b0aa",
      navName: "NeedSignList",
    },
    {
      icon: "inbox-arrow-down",
      color: "rgba(24, 104, 171, 0.6)",
      navName: "IncomingUnread",
    },
    {
      icon: "inbox",
      color: "rgba(236, 202, 12, 0.6)",
      navName: "InternalUnread",
    },
    {
      icon: "email-send-outline",
      color: "rgba(244, 32, 32, 0.6)",
      navName: "DispositionUnread",
    },
    {
      icon: "email-outline",
      color: "rgba(180, 179, 179, 0.6)",
      navName: "ConceptNumb",
    },
  ];
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
    setIsCounter([
      { count: 1, type: "onprogress", value: "-" },
      {
        count: 2,
        type: "sign",
        value: "-",
      },
      {
        count: 3,
        type: "agenda_in",
        value: "-",
      },
      {
        count: 4,
        type: "internal",
        value: "-",
      },
      {
        count: 5,
        type: "agenda_disposition",
        value: "-",
      },
    ]);
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
  // console.log(profile.attr);

  async function getisCounter() {
    setIsLoading(true);
    try {
      //get isCounter
      const response = await getHTTP(
        nde_api.dashboard + "?attr=" + selectedAttr?.code
      );
      // setIsCounter(response.data);
      setIsCounter([
        { count: 1, type: "onprogress", value: response.data[0].value },
        {
          count: 2,
          type: "sign",
          value: response.data[5].value,
        },
        {
          count: 3,
          type: "agenda_in",
          value: response.data[1].value,
        },
        {
          count: 4,
          type: "internal",
          value: response.data[4].value,
        },
        {
          count: 5,
          type: "agenda_disposition",
          value: response.data[2].value,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == null && error.status == null) {
        setIsCounter([
          { count: 1, type: "onprogress", value: "-" },
          {
            count: 2,
            type: "sign",
            value: "-",
          },
          {
            count: 3,
            type: "agenda_in",
            value: "-",
          },
          {
            count: 4,
            type: "internal",
            value: "-",
          },
          {
            count: 5,
            type: "agenda_disposition",
            value: "-",
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

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  const renderItem = ({ item, index }) => (
    <CardDCounter data={item} icon={icon[index]} navigation={navigation} />
  );

  // const [visible, setVisible] = useState(false);

  // const openMenu = () => setVisible(true);

  // const closeMenu = () => setVisible(false);
  // const { profile, selectedAttr } = useSelector((state) => state.profile);
  // const { device } = useSelector((state) => state.apps);
  // //const name = profile?.fullname?.split("/")[0];
  // const [labelName, setLabelName] = useState();
  return (
    <View style={{ flex: 1, padding: 12 }}>
      {/* {loadingOverlay} */}
      {/* {profile?.title?.length != 0 && (
        <Card
          style={{
            borderRadius: 10,
            marginTop: 16,
            backgroundColor: GlobalStyles.colors.textWhite,
            width: "98%",
            padding: 12,
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    source={require("../../../assets/superApp/userChange.png")}
                  />
                </TouchableOpacity>
              }
              contentStyle={{
                width: device == "tablet" ? 400 : 300,
                borderRadius: 12,
              }}
            >
              <Menu.Item
                onPress={() => {
                  dispatch(setSelectedAttr({ code: "", name: "" }));
                  closeMenu();
                }}
                title={<Text minimumFontScale={0.1}>SEMUA</Text>}
                titleStyle={{ fontSize: 10 }}
              />
              {profile?.attr?.map((data) => (
                <Menu.Item
                  onPress={() => {
                    dispatch(setSelectedAttr(data));
                    closeMenu();
                  }}
                  title={<Text minimumFontScale={0.1}>{data.name}</Text>}
                  titleStyle={{ fontSize: 10 }}
                />
              ))}
            </Menu>
            {selectedAttr?.code?.length == 0 && (
              <View style={{ width: "85%" }}>
                {profile?.attr?.map((data, index) => (
                  <Text
                    key={index}
                    style={[
                      { fontSize: 13, fontWeight: 400 },
                      index == 0 ? { fontWeight: "bold" } : {},
                    ]}
                  >
                    {data?.name}
                  </Text>
                ))}
              </View>
            )}
            {selectedAttr?.code?.length != 0 && (
              <View style={{ width: "85%" }}>
                <Text
                  style={{ fontSize: 13, fontWeight: 400, fontWeight: "bold" }}
                >
                  {selectedAttr?.name}
                </Text>
              </View>
            )}
          </View>
        </Card>
      )} */}
      {isCounter?.length != 0 && (
        <View style={{ height: "100%" }}>
          <FlatList
            keyExtractor={(item) => item.count}
            data={isCounter}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={getisCounter}
          />
        </View>
      )}
    </View>
  );
}

export default DCounter;
