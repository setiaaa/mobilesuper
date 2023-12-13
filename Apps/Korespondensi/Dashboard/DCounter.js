import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, } from "react-native";
import CardDCounter from "../../../components/UI/CardDCounter";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import { setToken } from "../../../store/auth";

function DCounter() {
  const navigation = useNavigation();
  let [isCounter, setIsCounter] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const [inputToken, setInputToken] = useState("");
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
    dispatch(setToken({ token: inputToken }));
  }, [token, inputToken]);

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
  return (
    <View style={{ margin: 12 }}>
      <View>
        <TextInput
          editable
          multiline
          placeholder="Masukan Token"
          onChangeText={setInputToken}
          style={{ width: "100%" }}
        />
      </View>
      {/* {loadingOverlay} */}
      {isCounter?.length != 0 && (
        <>
          <View>
            <CardDCounter
              data={isCounter[0]}
              icon={icon[0]}
              navigation={navigation}
            />
            <CardDCounter
              data={isCounter[1]}
              icon={icon[1]}
              navigation={navigation}
            />
            <CardDCounter
              data={isCounter[2]}
              icon={icon[2]}
              navigation={navigation}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default DCounter;
