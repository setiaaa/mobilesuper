import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TabViewBg from "../../../components/TabViewBg";
import { Config } from "../../../constants/config";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";

function Dashboard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todoConfig = Config.todo;
  const profile = useSelector((state) => state.profile.profile);
  const dataNotif = useSelector((state) => state.pushnotif.dataNotif);
  let [addDeleSekre, setAddDeleSekre] = useState(false);
  let routes;
  const [listMySecre, setMySecre] = useState([]);
  const willFocusSubscription = navigation.addListener("focus", () => {
    getMySecretary();
    getProfileTitle("return");
  });

  useEffect(() => {
    getMySecretary();
    getProfileTitle("init");
    return willFocusSubscription;
  }, [dataNotif]);
  async function getMySecretary() {
    try {
      //get secretary actived: untuk memunculkan tab sekretaris, jika user tanpa jabatan di-assign menjadi sekretaris
      const response = await getHTTP(nde_api.secretaryassigned);
      setMySecre(response.data);
    } catch (error) {
      if (error.response.status == null && error.status == null) {
        Alert.alert("Warning!", "Please check your connection");
      } else {
        handlerError(error, "Warning!", "Secretary list not working!");
      }
    }
  }
  async function getProfileTitle(action) {
    try {
      //get profile title: untuk cek punya jabatan atau hanya poh, untuk add delegasi dan sekretaris
      const response = await getHTTP(nde_api.profiletitle);
      if (response.data.status) {
        response?.data?.title.forEach((e) => {
          if (e.poh == false) {
            setAddDeleSekre(true);
          }
        });
      }
      if (action == "init") {
        if (dataNotif.id != undefined) {
          if (dataNotif.action == "incoming-detail") {
            navigation.navigate("IncomingDetail", {
              id: dataNotif.id,
              title: "Incoming\nDetail",
            });
          } else if (dataNotif.action == "disposition-detail") {
            navigation.navigate("DispositionDetail", {
              id: dataNotif.id,
              title: "Disposition\nDetail",
            });
          } else if (dataNotif.action == "outgoing-detail") {
            navigation.navigate("SubmittedDetail", {
              id: dataNotif.id,
              title: "Submitted\nDetail",
            });
          } else if (dataNotif.action == "draft-detail") {
            navigation.navigate("NeedFollowUpDetail", {
              id: dataNotif.id,
              title: "Need Follow Up\nDetail",
            });
          }
        }
      }
    } catch (error) {
      if (error.response.status == null && error.status == null) {
      } else {
        handlerError(error, "Warning!", "Profile Title not working!");
        // Alert.alert("Warning!", "Profile Title not working!");
      }
    }
  }
  if (todoConfig) {
    //todoConfig true
    if (profile?.is_pejabat == "true") {
      //jika punya jabatan
      routes = [
        { key: "dletter", title: "Letter" },
        { key: "dtodo", title: Config.labelTodo },
        {
          key: "dsecretary",
          title: "Secretary",
          data: listMySecre,
          add: addDeleSekre,
        },
        { key: "ddelegation", title: "Delegation", add: addDeleSekre },
      ];
    } else if (listMySecre.results?.length != 0) {
      //jika tidak punya jabatan, namun di-assign sebagai sekretaris
      routes = [
        { key: "dletter", title: "Letter" },
        { key: "dtodo", title: Config.labelTodo },
        { key: "dsecretary", title: "Secretary", data: listMySecre },
        { key: "ddelegation", title: "Delegation", add: addDeleSekre },
      ];
    } else {
      //jika tidak punya jabatan
      routes = [
        { key: "dletter", title: "Letter" },
        { key: "dtodo", title: Config.labelTodo },
      ];
    }
  } else {
    //todoCongif false
    if (profile?.is_pejabat == "true") {
      //jika punya jabatan
      routes = [
        { key: "dletter", title: "Letter" },
        { key: "dsecretary", title: "Secretary" },
        { key: "ddelegation", title: "Delegation" },
      ];
    } else {
      //jika tidak punya jabatan
      routes = [{ key: "dletter", title: "Letter" }];
    }
  }
  return (
      <TabViewBg
        tipe="dashboard"
        title="Dashboard"
        position="top"
        routes={routes}
      />
  );
}

export default Dashboard;
