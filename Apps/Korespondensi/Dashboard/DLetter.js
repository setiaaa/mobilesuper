import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CardDCounter from "../../../components/UI/CardDCounter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useSelector } from "react-redux";

function DLetter() {
  const navigation = useNavigation();
  let [isCounter, setIsCounter] = useState([]);
  let [isLetter, setIsLetter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
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
    {
      icon: "inbox-arrow-down",
      navName: "IncomingList",
    },
    {
      icon: "email-send-outline",
      navName: "DispositionList",
    },
    {
      icon: "email-edit-outline",
      navName: "NeedFollowUpList",
    },
    {
      icon: "email-search-outline",
      navName: "TrackingList",
    },
    {
      icon: "email-check-outline",
      navName: "SubmittedList",
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
      setIsLetter([
        { count: 1, type: "incoming", value: response.data[1].value },
        {
          count: 2,
          type: "disposition",
          value: response.data[2].value,
        },
        {
          count: 3,
          type: "onprogress",
          value: response.data[0].value,
        },
        {
          count: 4,
          type: "tracking",
          value: "",
        },
        {
          count: 5,
          type: "submitted",
          value: "",
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == null && error.status == null) {
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
    <View style={{ margin: 12 }}>
      {/* {loadingOverlay} */}
      {isCounter?.length != 0 && (
        <View>
          {isLetter?.map((item, index) => (
            <CardDCounter
              key={index}
              data={item}
              icon={icon[index + 4]}
              navigation={navigation}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default DLetter;
