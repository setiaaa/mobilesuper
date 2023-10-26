import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import CardDLetter from "../../../components/UI/CardDLetter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";

function DLetter() {
  const navigation = useNavigation();
  let [isCounter, setIsCounter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const icon = [
    {
      icon: "email-edit-outline",
      color: "rgba(24, 104, 171, 0.6)",
      navName: "NeedFollowUp",
    },
    {
      icon: "inbox-arrow-down",
      color: "rgba(73, 189, 101, 0.6)",
      navName: "IncomingUnread",
    },
    {
      icon: "email-send-outline",
      color: "rgba(244, 152, 32, 0.6)",
      navName: "DispositionUnread",
    },
  ];

  const willFocusSubscription = navigation.addListener("focus", () => {
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
    ]);
    getisCounter();
  });
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
    ]);
    // const response = getHTTP(nde_api.dashboard);
    getisCounter();
    return willFocusSubscription;
  }, []);

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
        ]);
      } else {
        handlerError(error, "Warning!", "Counter DLetter not working!");
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
      {isCounter.map((data, index) => (
        <CardDLetter
          key={data.count}
          data={data}
          icon={icon[index]}
          navigation={navigation}
        />
      ))}
    </View>
  );
}

export default DLetter;
