import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";
// import FABactions from "../../components/FABactions";
import TabViewBg from "../../../components/TabViewBg";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { initAgenda } from "../../../utils/agenda";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../../config/SuperAppps";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


function IncomingDetail({ route }) {
  // let id = route.params.id;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [preview, setPreview] = useState();
  const [showButtons, setShowButtons] = useState(false);
  // const getAgendaInDetail = async () => {
  //   setIsLoading(true);
  //   try {
  //     let response = await getHTTP(nde_api.agendainbyid.replace("{$id}", id));
  //     if (response?.data?.status == "Error") {
  //       Alert.alert("Info", response.data.msg, [
  //         {
  //           text: "Ok",
  //           onPress: () => {
  //             navigation.goBack();
  //           },
  //           style: "cancel",
  //         },
  //       ]);
  //     } else {
  //       initAgenda(response?.data?.obj);
  //       response.data.obj.agenda_number = response.data.agenda_number;
  //       setDetail(response?.data?.obj);
  //       setPreview(response?.data?.preview);
  //       getAgendaInRead();
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     handlerError(error, "Warning", "Incoming detail not working");
  //     navigation.goBack();
  //     setIsLoading(false);
  //   }
  // };

  // const getAgendaInRead = async () => {
  //   try {
  //     let response = await getHTTP(nde_api.agendainread.replace("{$id}", id));
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // let routes = [
  //   { key: "info", title: "Info", icon: "alert-circle-outline" },
  //   { key: "attachment", title: "Attachment", icon: "attachment" },
  //   { key: "dispo", title: "Disposition", icon: "share" },
  //   { key: "forward", title: "Forward", icon: "forward" },
  // ];

  // useEffect(() => {
  //   getAgendaInDetail();
  // }, [id]);

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );

  console.log(detail)
  return (
    <ScrollView>
      <View style={{ padding: 20, gap: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 600 }}>Form Persetujuan Surat Dinas</Text>

        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
          <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Nomor Surat</Text>
            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>B.28/SJ.7/PRL.110/IX/2023</Text>
          </View>

          <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tanggal Surat</Text>
            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>24 September 2023</Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 10, }}>
            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Penanda Tangan</Text>
            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>PLT KEPALA PUSAT DATA STATISIK DAN INFORMASI</Text>
          </View>
        </View>

        <Text style={{ fontSize: 15, fontWeight: 600 }}>Perihal</Text>

        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
          <Text>Test Surat</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.info }}>Kepada</Text>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.danger }}>*</Text>
        </View>

        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
          <Text>PT. PSI</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.info }}>Tembusan</Text>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.danger }}>*</Text>
        </View>

        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
          <Text>1. Kepala Biro SDM</Text>
          <Text>2. Sekretaris Jenderal</Text>
        </View>

        <View style={{ alignItems: "flex-end", marginTop: 50 }}>
          {showButtons && (
            <View style={{ gap: 10 }}>
              <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.primary, borderRadius: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Ionicons name="arrow-redo" size={24} color={COLORS.white} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: COLORS.white }}>Forward</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.primary, borderRadius: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Ionicons name="mail-outline" size={24} color={COLORS.white} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: COLORS.white }}>Disposition</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={() => setShowButtons(!showButtons)} style={{ backgroundColor: COLORS.primary, width: 50, height: 50, borderRadius: 25, marginTop: 10, justifyContent: "center", alignItems: "center", }}>
            <Ionicons 
              name="add-outline" 
              size={24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
    // <>
    //   {loadingOverlay}
    //   <TabViewBg
    //     id={id}
    //     data={detail}
    //     preview={preview}
    //     tipe="in"
    //     position="bottom"
    //     routes={routes}
    //   />
    // </>
  );
}

export default IncomingDetail;
