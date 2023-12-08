import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import CardDLetter from "../../../components/UI/CardDLetter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useSelector } from "react-redux";

function DLetter() {
  const navigation = useNavigation();
  let [isCounter, setIsCounter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const icon = [
    {
      icon: "email-edit-outline",
      color: "rgba(73, 189, 101, 0.6)",
      navName: "NeedFollowUp",
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
  }, [token]);

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
            type: "draft",
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
  return (
    <View>
      {/* {loadingOverlay} */}
      {isCounter?.length != 0 && (
        <>
          <CardDLetter
            key={3}
            data={isCounter[3]}
            icon={icon[3]}
            navigation={navigation}
          />
          <CardDLetter
            key={0}
            data={isCounter[0]}
            icon={icon[0]}
            navigation={navigation}
          />
          <CardDLetter
            key={1}
            data={isCounter[1]}
            icon={icon[1]}
            navigation={navigation}
          />
          <CardDLetter
            key={2}
            data={isCounter[2]}
            icon={icon[2]}
            navigation={navigation}
          />
        </>
      )}
    </View>
  );
}

export default DLetter;
