import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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
import { Button, Card, Menu } from "react-native-paper";
import { COLORS } from "../../../config/SuperAppps";
import { Image } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

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
      icon: "inbox-arrow-down",
      color: "rgba(24, 104, 171, 0.6)",
      navName: "IncomingUnread",
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
  useEffect(() => {
    setIsCounter([
      { count: 1, type: "onprogress", value: "-" },
      {
        count: 2,
        type: "agenda_in",
        value: "-",
      },
      {
        count: 3,
        type: "agenda_disposition",
        value: "-",
      },
      {
        count: 4,
        type: "draft",
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
      console.log(error.response);
    }
  }

  async function getisCounter() {
    setIsLoading(true);
    try {
      //get isCounter
      const response = await getHTTP(
        nde_api.dashboard + "?attr=" + selectedAttr?.code
      );
      setIsCounter(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == null && error.status == null) {
        setIsCounter([
          { count: 1, type: "onprogress", value: "-" },
          {
            count: 2,
            type: "agenda_in",
            value: "-",
          },
          {
            count: 3,
            type: "agenda_disposition",
            value: "-",
          },
          {
            count: 4,
            type: "tracking",
            value: "-",
          },
          {
            count: 5,
            type: "agenda_out",
            value: "-",
          },
        ]);
      } else {
        handlerError(error, "Peringatan!", "Couter tidak berfungsi!");
      }
      setIsLoading(false);
    }
  }

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  const renderItem = ({ item, index }) =>
    index != 3 && (
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
    <View style={{ margin: 12 }}>
      {/* {loadingOverlay} */}
      {profile?.title?.length != 0 && (
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
      )}
      {isCounter?.length != 0 && (
        <View style={{ height: "85%" }}>
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
