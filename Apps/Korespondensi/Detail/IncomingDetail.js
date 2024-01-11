import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";
import FABactions from "../../../components/FABactions";
import TabViewBg from "../../../components/TabViewBg";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { getExtensionIcon, initAgenda } from "../../../utils/agenda";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DetailAgenda from "./Tab/DetailAgenda";
import { useSelector } from "react-redux";

function IncomingDetail({ route }) {
  let id = route?.params?.id;
  let hideForward = route?.params?.hideForward;
  const navigation = useNavigation();
  const profile = useSelector((state) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [preview, setPreview] = useState();

  const getAgendaInDetail = async () => {
    setIsLoading(true);
    try {
      let response = await getHTTP(nde_api.agendainbyid.replace("{$id}", id));
      if (response?.data?.status == "Error") {
        Alert.alert("Info", response.data.msg, [
          {
            text: "Ok",
            onPress: () => {
              navigation.goBack();
            },
            style: "cancel",
          },
        ]);
      } else {
        initAgenda(response?.data?.obj);
        response.data.obj.agenda_number = response?.data?.agenda_number;
        setDetail(response?.data?.obj);
        setPreview(response?.data?.preview);
        getAgendaInRead();
      }
      setIsLoading(false);
    } catch (error) {
      handlerError(error, "Warning", "Incoming detail not working");
      navigation.goBack();
      setIsLoading(false);
    }
  };

  const getAgendaInRead = async () => {
    try {
      let response = await getHTTP(nde_api.agendainread.replace("{$id}", id));
    } catch (error) {}
  };

  // let routes = [
  //   { key: "info", title: "Info", icon: "alert-circle-outline" },
  //   { key: "attachment", title: "Attachment", icon: "attachment" },
  //   { key: "dispo", title: "Disposition", icon: "share" },
  //   { key: "forward", title: "Forward", icon: "forward" },
  // ];

  useEffect(() => {
    getAgendaInDetail();
  }, [id]);

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  return (
    <ScrollView>
      {loadingOverlay}
      {detail && (
        <>
          <DetailAgenda data={detail} tipe="in" />
          <FABactions
            id={id}
            noAgenda={detail?.agenda_number}
            data={detail}
            hideForward={hideForward}
            tipe="in"
          />
        </>
      )}
    </ScrollView>
  );
}

export default IncomingDetail;
