import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import CardDCounter from "../../../components/UI/CardDCounter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization, setProfile } from "../../../store/profile";

function DCounter() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let [isCounter, setIsCounter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
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
  }, [token, isFocused]);
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
      const response = await getHTTP(nde_api.dashboard);
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
  return (
    <View style={{ margin: 12 }}>
      {/* {loadingOverlay} */}
      {isCounter?.length != 0 && (
        <View style={{ height: "85%" }}>
          <FlatList
            keyExtractor={(item) => item.id}
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
