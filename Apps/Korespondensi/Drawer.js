import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert, SafeAreaView } from "react-native";
import { Avatar, Drawer, Text, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { DrawerActions } from "@react-navigation/native";

import { setProfile } from "../../store/profile";
import { logout, setFirstLogin } from "../../store/auth";
import { nde_api } from "../../utils/api.config";
import { getHTTP, postHTTP } from "../../utils/http";
import AlertConfirm from "../../components/UI/AlertConfirm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IncomingList from "./List/IncomingList";
import DispositionList from "./List/DispositionList";
import SubmittedList from "./List/SubmittedList";
import NeedFollowUpList from "./List/NeedFollowUpList";
import TrackingList from "./List/TrackingList";
import SecretaryList from "./List/SecretaryList";
import DelegationList from "./List/DelegationList";
import Dashboard from "./Dashboard/Dasboard";
import TermOfUse from "./TermOfUse";
import { Profile } from "./Profile";
import { Config } from "../../constants/config";
import MyDispositionList from "./List/MyDispositionList";
import ScanLogList from "./List/ScanLogList";
import SearchGlobalList from "./List/SearchGlobalList";
import { GlobalStyles } from "../../constants/styles";
import { androidId, getIosIdForVendorAsync } from "expo-application";
import { COLORS } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";

const DrawerItemsData = [
  {
    label: "Beranda", 
    name: "Dashboard",
    icon: "home",
    key: 1,
  },
  {
    label: "Buat Surat",
    name: "",
    icon: "file-plus",
    key: 2,
  },
  {
    label: "Surat Masuk",
    name: "Incoming",
    icon: "email",
    key: 3,
  },
  { 
    label: "Disposisi", 
    name: "Disposition", 
    icon: "chat-processing", 
    key: 4 },
  {
    label: "Surat Keluar",
    name: "",
    icon: "email-send",
    key: 5,
  },
  {
    label: "Arsip",
    name: "Submitted",
    icon: "file-multiple",
    key: 6,
  },
  {
    label: "Alat",
    name: "",
    icon: "toolbox",
    key: 7,
  },
];

// const DrawerItemsData = [
//   {
//     label: "Incoming Letter", 
//     name: "Incoming",
//     icon: "inbox-arrow-down",
//     key: 1,
//   },
//   {
//     label: "Disposition",
//     name: "Disposition",
//     icon: "email-send",
//     key: 2,
//   },
//   {
//     label: "My Disposition",
//     name: "MyDisposition",
//     icon: "share",
//     key: 3,
//   },
//   { 
//     label: "Need Follow Up", 
//     name: "NeedFollowUp", 
//     icon: "email-edit", 
//     key: 4 },
//   {
//     label: "Tracking Letter",
//     name: "Tracking",
//     icon: "email-search",
//     key: 5,
//   },
//   {
//     label: "Submitted Letter",
//     name: "Submitted",
//     icon: "email-check",
//     key: 6,
//   },
// ];

const DrawerNav = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [errorAvatarProfile, setErrorAvatarProfile] = useState(false);
  const dispatch = useDispatch();
  const [drawerItemIndex, setDrawerItemIndex] = useState(0);
  const profileLogin = useSelector((state) => state.profile.profile);
  const device_uuid = useSelector((state) => state.profile.device_uuid);
  const header = {};

  useEffect(() => {
    getProfile();
  }, [setProfile]);

  async function getProfile() {
    try {
      AsyncStorage.removeItem("profileLogin");
      //get profile login
      let data = await AsyncStorage.getItem("profileLogin");
      if (data === null || data === []) {
        let response = await getHTTP(nde_api.profile);
        dispatch(setProfile(response.data));

        let data2 = await AsyncStorage.getItem("token");
        if (data2 != null) {
          let token = JSON.parse(data2);
          header = {
            Authorization: "token " + token,
          };
        }
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        handlerLogout();
      }
      // Alert.alert("Warning!", "Profile not working!");
    }
  }
  async function offnotification() {
    try {
      data = {
        device_uuid: device_uuid,
      };
      //send data
      const response = await postHTTP(nde_api.switchoffdevice, data);
      // Alert.alert(
      //   "Info switchoff device",
      //   JSON.stringify(response?.data?.message)
      // );
    } catch (error) {
      // Alert.alert(
      //   "Warning!",
      //   "Switchoff push notification may not work" + error
      // );
    }
  }
  function handlerLogout() {
    //off notification
    offnotification();
    //set to login fingerprint
    dispatch(setFirstLogin(false));
    dispatch(logout());
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containerProfile}>
        {errorAvatarProfile && (
          <Avatar.Image
            {...props}
            source={Config.avatar}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        {!errorAvatarProfile && (
          <Avatar.Image
            source={{
              uri: `${nde_api.baseurl + profileLogin?.avatar}`,
              method: "GET",
              headers: header,
            }}
            style={styles.avatar}
            onError={(e) => setErrorAvatarProfile(true)}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        <Text style={styles.fullname}>{profileLogin?.fullname}</Text>
        {profileLogin?.title?.map((data) => (
          <Text key={data.code} style={styles.title}>
            {data.name}
          </Text>
        ))}
      </View>
      <Drawer.Section style={{ marginHorizontal: -5 }}>
        <Drawer.Item
          style={styles.drawerItem}
          label="Pencarian"
          icon={drawerItemIndex == 10 ? "magnify" : "magnify"}
          key="10"
          active={drawerItemIndex === 10}
          onPress={() => {
            setDrawerItemIndex(10);
            props.navigation.navigate("SearchGlobalList");
          }}
        />
      </Drawer.Section>
      {/* <Drawer.Section style={{ marginHorizontal: -5 }} showDivider={false}>
        <Drawer.Item
          style={styles.drawerItem}
          label="Dashboard"
          icon={drawerItemIndex == 0 ? "home" : "home-outline"}
          key="0"
          active={drawerItemIndex === 0}
          onPress={() => {
            setDrawerItemIndex(0);
            props.navigation.navigate("Dashboard");
          }}
        />
      </Drawer.Section> */}
      <Drawer.Section>
        {DrawerItemsData.map((data, index) => (
          <Drawer.Item
            style={styles.drawerItem}
            {...data}
            icon={
              drawerItemIndex == data.key ? data.icon : data.icon + "-outline"
            }
            key={data.key}
            active={drawerItemIndex === data.key}
            onPress={() => {
              setDrawerItemIndex(data.key);
              props.navigation.navigate(data.name, { unread: false });
            }}
          />
        ))}
        <Drawer.Item
          style={styles.drawerItem}
          label="Sign Out"
          icon="logout"
          key="8"
          active={drawerItemIndex === 8}
          onPress={() => {
            AlertConfirm("Confirm", "Are you sure to Sign Out?", () => {
              setDrawerItemIndex(8);
              handlerLogout();
            });
          }}
        />
      </Drawer.Section>
        <Drawer.Item
          style={styles.drawerItem}
          label="Profil"
          icon={drawerItemIndex == 9 ? "account-circle" : "account-circle-outline"}
          key="9"
          active={drawerItemIndex === 9}
          onPress={() => {
            setDrawerItemIndex(9);
            props.navigation.navigate("Profile");
          }}
        />
      {/* <Drawer.Section style={{ margin: -5 }} title="Tools">
        <Drawer.Item
          style={styles.drawerItem}
          label="Delegation"
          icon={drawerItemIndex == 7 ? "file-tree" : "file-tree-outline"}
          key="7"
          active={drawerItemIndex === 7}
          onPress={() => {
            setDrawerItemIndex(7);
            props.navigation.navigate("Delegation");
          }}
        />
        <Drawer.Item
          style={styles.drawerItem}
          label="Secretary"
          icon={
            drawerItemIndex == 8
              ? "card-account-details"
              : "card-account-details-outline"
          }
          key="8"
          active={drawerItemIndex === 8}
          onPress={() => {
            setDrawerItemIndex(8);
            props.navigation.navigate("Secretary");
          }}
        />
      </Drawer.Section>
      <Drawer.Section style={{ margin: -5 }} title="Scan Letter">
        <Drawer.Item
          style={styles.drawerItem}
          label="Scan Log Letter"
          icon={drawerItemIndex == 9 ? "line-scan" : "line-scan"}
          key="9"
          active={drawerItemIndex === 9}
          onPress={() => {
            setDrawerItemIndex(9);
            props.navigation.navigate("ScanLogList");
          }}
        />
      </Drawer.Section> */}
      {/* <Drawer.Section style={{ margin: -5 }} title="Info">
        {Config.termOfUse && (
          <Drawer.Item
            style={styles.drawerItem}
            label="Term of Use"
            icon={drawerItemIndex == 10 ? "information" : "information-outline"}
            key="10"
            active={drawerItemIndex === 10}
            onPress={() => {
              setDrawerItemIndex(10);
              props.navigation.navigate("TermOfUse");
            }}
          />
        )}
        <Drawer.Item
          style={styles.drawerItem}
          label="Sign Out"
          icon="logout"
          key="11"
          active={drawerItemIndex === 11}
          onPress={() => {
            AlertConfirm("Confirm", "Are you sure to Sign Out?", () => {
              setDrawerItemIndex(11);
              handlerLogout();
            });
          }}
        />
      </Drawer.Section> */}
    </DrawerContentScrollView>
  );
};

//toolbar custom
const defaultOptions = ({ title, navigation }) => ({
  title: title,
  headerTitleContainerStyle: {
    // flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "red",
    alignItems: "center",
    paddingRight: 10
    // marginTop: 40
  },
  headerTitleStyle: {
    fontSize: 16,
  },
  headerRightContainerStyle: {
    display: "none",
  },
  headerLeftContainerStyle: {
    width: "50%",
    // marginHorizontal: 0,
    // backgroundColor: "yellow",
    paddingLeft: 10
  },
  // headerStatusBarHeight: 0,
  headerLeft: () => (
    <SafeAreaView style={{ alignItems: "center" }}>
      {/* <View style={styles.containerHeader}> */}
      <View style={styles.containerHeaderLeft}>
        <View style={{ backgroundColor: "#752A2B", width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
          <IconButton
            icon="menu"
            size={16}
            color={COLORS.white}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </View>
        {/* <Image style={styles.logoHeader} source={Config.logoHeader} /> */}
      </View>
    {/* </View> */}
    </SafeAreaView>
  ),
});
function DrawerNavigator({ navigation }) {
  return (
    <DrawerNav.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNav.Screen
        name="Dashboard"
        component={Dashboard}
        options={defaultOptions({ title: "Dashboard", navigation: navigation })}
      />
      <DrawerNav.Screen
        name="SearchGlobalList"
        component={SearchGlobalList}
        options={defaultOptions({
          title: "Search Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Incoming"
        component={IncomingList}
        options={defaultOptions({
          title: "Incoming Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="IncomingUnread"
        component={IncomingList}
        options={defaultOptions({
          title: "Incoming Unread",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Disposition"
        component={DispositionList}
        options={defaultOptions({
          title: "Disposition Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="MyDisposition"
        component={MyDispositionList}
        options={defaultOptions({
          title: "My Disposition Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="DispositionUnread"
        component={DispositionList}
        options={defaultOptions({
          title: "Disposition Unread",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="NeedFollowUp"
        component={NeedFollowUpList}
        options={defaultOptions({
          title: "Need Follow Up Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Tracking"
        component={TrackingList}
        options={defaultOptions({
          title: "Tracking Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Submitted"
        component={SubmittedList}
        options={defaultOptions({
          title: "Submitted Letter",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Delegation"
        component={DelegationList}
        options={defaultOptions({
          title: "Delegation",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Secretary"
        component={SecretaryList}
        options={defaultOptions({ title: "Secretary", navigation: navigation })}
      />
      <DrawerNav.Screen
        name="ScanLogList"
        component={ScanLogList}
        options={defaultOptions({
          title: "Scan Log List",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={defaultOptions({
          title: "Term of Use",
          navigation: navigation,
        })}
      />
      <DrawerNav.Screen
        name="Profile"
        component={Profile}
        options={defaultOptions({
          title: "Profil",
          navigation: navigation,
        })}
      />
    </DrawerNav.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  containerHeader: {
    // backgroundColor: "red",
  },
  containerHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 15
  },
  logoHeader: {
    height: 30,
    width: 60,
  },
  drawerItem: {
    borderRadius: 0,
    marginLeft: -10,
    paddingLeft: 25,
    height: 40,
  },
  containerProfile: {
    // marginHorizontal: 24,
    alignItems: "center"
  },
  avatar: {
    marginBottom: 8,
  },
  fullname: {
    fontWeight: "bold",
  },
  title: {
    marginBottom: 16,
  },
});
