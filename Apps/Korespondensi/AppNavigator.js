import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
  useWindowDimensions,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { setToken, setValidVersion } from "../../store/auth";
import { GlobalStyles } from "../../constants/styles";
import { toolbarBack } from "../../components/UI/ToolbarBack";
import Login from "../Login";
import DrawerNavigator from "./Drawer";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import DispositionDetail from "./Detail/DispositionDetail";
import SubmittedDetail from "./Detail/SubmittedDetail";
import AgendaDetail from "./Detail/Tab/AgendaDetail";
import IncomingDetail from "./Detail/IncomingDetail";
import NeedFollowUpDetail from "./Detail/NeedFollowUpDetail";
import TrackingDetail from "./Detail/TrackingDetail";
import DelegationDetail from "./Detail/DelegationDetail";
import SecretaryDetail from "./Detail/SecretaryDetail";
import TodoDetail from "./Detail/TodoDetail";
import DelegationForm from "./Form/DelegationForm";
import DetailAttachment from "./Detail/Tab/DetailAttachment";
import DetailComment from "./Detail/Tab/DetailComment";
import DetailPreview from "./Detail/Tab/DetailPreview";
import DetailLog from "./Detail/Tab/DetailLog";
import SecretaryForm from "./Form/SecretaryForm";
import AddressbookEmployee from "./Addressbook/AddressEmployee";
import DispositionForm from "./Form/DispositionForm";
import ForwardForm from "./Form/ForwardForm";
import AddressbookTitle from "./Addressbook/AddressTitle";
import Addressbook from "./Addressbook/Addressbook";
import { setDeviceUUID, setProfile } from "../../store/profile";
import AddressbookKM from "./Addressbook/AddressbookKM";
import DetailDispo from "./Detail/Tab/DetailDispo";
import LetterDetail from "./Detail/LetterDetail";
import TermOfUse from "./TermOfUse";
import { getHTTP, handleUpgradeLink, postHTTP } from "../../utils/http";
import { nde_api } from "../../utils/api.config";
import ViewAttachment from "./Detail/ViewAttachment";
import ReferenceDetail from "./Detail/ReferenceDetail";
import { Config } from "../../constants/config";
import TrackingLogDetail from "./Detail/TrackingLogDetail";
import ScanLogDetail from "./Detail/ScanLogDetail";
import DigisignSearchEmail from "./Detail/DigisignSearchEmail";
import { androidId } from "expo-application";
import * as Device from "expo-device";
import { setDataNotif } from "../../store/pushnotif";
import * as Application from 'expo-application';
import { Home } from "../SuperApps/Home";
import { Satker } from "../SuperApps/Satker";
import { FAQ } from '../SuperApps/FAQ'
import { Profile } from '../SuperApps/Profile'
import Main from "../SuperApps/Main";
import DetailDashboard from '../../Apps/Kebijakan/DetailDashboard'
import PdfViewer from '../../Apps/Kebijakan/PdfViewer'
import { DrawerNavigation } from '../Kebijakan/Drawer'
import MyTabBar from "../SuperApps/BottomTabs";
import { Onboarding } from "../Onboarding";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ListBerita } from "../SuperApps/ListBerita";
import { DetailBerita } from "../SuperApps/DetailBerita";
import { Dokumen } from "../Repository/Dokumen";
import MyTabBarRepo from "../Repository/BottomTabsRepo";
import { Dibagikan } from "../Repository/Dibagikan";
import MainRepo from "../Repository/MainRepo";
import MyTabBarKeb from "../Kebijakan/BottomtabsKeb";
import MainKeb from "../Kebijakan/MainKeb";
import Dashboard from "../Kebijakan/Dashboard";
import { Tematik } from "../Kebijakan/Tematik";
import { Tp } from "../SuperApps/Tp";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTopBar from "../SuperApps/TopTabs";
import { KRT } from "../SuperApps/KRT";
import { Pengawasan } from "../SuperApps/Pengawasan";
import { KPP } from "../SuperApps/KPP";
import { DetailActivity } from "../Repository/DetailActivity";
import MyTabBarDetailRepo from "../Repository/BottomTabsDetailRepo";
import { MainDetailRepo } from "../Repository/MainDetailRepo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

function AuthStack() {
  const showBg = useSelector((state) => state.auth.showbg);
  const { width, height } = useWindowDimensions();
  return (
    <>
      <SafeAreaView style={styles.rootScreen}>
        <ImageBackground
          source={Config.backgroundLogin}
          style={[
            styles.container,
            { flex: 1, height: height, width: width },
            showBg ? { top: 0 } : { top: 25 },
          ]}
          imageStyle={styles.backgroundImage}
        >
          <StatusBar
            barStyle={
              showBg ? Config.statusbarAuth : Config.statusbarAuthenticated
            }
            backgroundColor="transparent"
            translucent
          />
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            /> */}
            {/* <Stack.Screen
              name="Kebijakan"
              component={DrawerNavigation}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            /> */}
            <Stack.Screen
              name="DetailDashboard"
              component={DetailDashboard}
              options={{
                headerTitle: ''
              }}
            />
            <Stack.Screen
              name="PdfViewer"
              component={PdfViewer}
              options={{
                headerTitle: ''
              }}
            />

            <Stack.Screen
              name="TermOfUse"
              component={TermOfUse}
              options={{
                header: toolbarBack,
              }}
            />
          </Stack.Navigator>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export const BottomTabs = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName='Home'>
        <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Tab.Screen name='Satker' component={Satker} options={{ headerShown: false }} />
        <Tab.Screen name='FAQ' component={FAQ} options={{ headerShown: false }} />
        <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        {/* <Tab.Screen name='Tp' component={Tp} options={{ headerShown: false }} /> */}
        {/* <Tab.Screen name='Kebijakan' component={DrawerNavigation}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' }
        }}
      /> */}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  )
}

export const BottomTabsRepo = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator tabBar={props => <MyTabBarRepo {...props} />} initialRouteName='Dokumen'>
        <Tab.Screen name='Dokumen' component={Dokumen} options={{ headerShown: false }} />
        <Tab.Screen name='Dibagikan' component={Dibagikan} options={{ headerShown: false }} />
        {/* <Tab.Screen name='Kebijakan' component={DrawerNavigation}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' }
        }}
      /> */}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  )
}

export const BottomTabsKeb = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator tabBar={props => <MyTabBarKeb {...props} />} initialRouteName='Dashboard'>
        <Tab.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
        <Tab.Screen name='Tematik' component={Tematik} options={{ headerShown: false }} />
        {/* <Tab.Screen name='Kebijakan' component={DrawerNavigation}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' }
        }}
      /> */}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  )
}

export const BottomTabsDetailRepo = () => {

  return (
    <BottomSheetModalProvider>
      <Tab.Navigator tabBar={props => <MyTabBarDetailRepo {...props} />} initialRouteName='DetailActivity'>
        <Stack.Screen name="DetailActivity" component={DetailActivity} options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  )
}

export const TopsTP = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator initialRouteName='KRT'
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#800000' },
          tabBarLabelStyle: { fontSize: 10, textTransform: 'none' },
        }}
      >
        <Top.Screen name='KRT' component={KRT}
          options={{
            title: 'Kerumahtanggaan',
          }} />
        <Top.Screen name='Pengawasan' component={Pengawasan}
          options={{
            title: 'Pengawasan'
          }} />
        <Top.Screen name='KPP' component={KPP}
          options={{
            title: 'Kinerja dan Pengembangan Pegawai'
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  )
}


function AuthenticatedStack() {
  const profile = useSelector((state) => state.profile.profile);
  const deviceNIK = profile?.nik;
  const [deviceName, setDeviceName] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [deviceUUID, set_deviceUUID] = useState(null);
  const [deviceOS, setDeviceOS] = useState(null);
  let data;
  const dispatch = useDispatch();

  const getDeviceUUIDiOS = async () => {
    set_deviceUUID(await Application.getIosIdForVendorAsync());
    if (deviceUUID != undefined && deviceUUID != null) {
      dispatch(setDeviceUUID(deviceUUID));
    }
  };

  const getDeviceId = async () => {
  };
  async function checkDevice() {
    try {
      if (
        deviceNIK != undefined &&
        deviceNIK != null &&
        deviceUUID != undefined &&
        deviceUUID != null &&
        deviceId != undefined &&
        deviceId != null &&
        deviceName != null &&
        deviceName != undefined &&
        deviceOS != null &&
        deviceOS != undefined
      ) {
        data = {
          fullname: deviceNIK,
          device_id: deviceId,
          device_uuid: deviceUUID,
          device_name: deviceName,
          os: deviceOS,
        };
        //send data
        const response = await postHTTP(nde_api.checkdevice, data);
        // Alert.alert(
        //   "Info check device",
        //   JSON.stringify(response?.data?.message)
        // );
      } else {
        // Alert.alert("Warning!", "Push notification may not work"+deviceNIK+"-"+deviceId+"-"+deviceUUID+"-"+deviceName+"-"+deviceOS);
      }
    } catch (error) {
      // Alert.alert("Warning!", "Push notification may not work" + error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getDeviceId(); //get player id device id
    setDeviceName(Device.modelName);
    setDeviceOS(Device.osName + " " + Device.osVersion);
    if (Platform.OS == "android") {
      set_deviceUUID(androidId);
      dispatch(setDeviceUUID(androidId));
    } else {
      getDeviceUUIDiOS();
    }
    checkDevice();
  }, [profile, deviceUUID, deviceId, deviceName, deviceOS]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.rootScreen}>
        <StatusBar
          barStyle={Config.statusbarAuthenticated}
          backgroundColor={GlobalStyles.colors.secondary}
        />
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainRepo"
            component={MainRepo}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="MainKeb"
            component={MainKeb}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="MainDetailRepo"
            component={MainDetailRepo}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          {/* <Stack.Screen
            name="Kebijakan"
            component={DrawerNavigation}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          /> */}
          <Stack.Screen
            name="ListBerita"
            component={ListBerita}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Tp"
            component={Tp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailBerita"
            component={DetailBerita}
            options={{
              headerShown: false,
            }}
          />
          {/* DETAIL LETTER */}
          <Stack.Screen
            name="IncomingDetail"
            component={IncomingDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DispositionDetail"
            component={DispositionDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="SubmittedDetail"
            component={SubmittedDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="NeedFollowUpDetail"
            component={NeedFollowUpDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="TrackingDetail"
            component={TrackingDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DelegationDetail"
            component={DelegationDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="SecretaryDetail"
            component={SecretaryDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="TodoDetail"
            component={TodoDetail}
            options={{ header: toolbarBack }}
          />
          {/* TAB DETAIL LETTER */}
          <Stack.Screen
            name="AgendaDetail"
            component={AgendaDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailAttachment"
            component={DetailAttachment}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DetailComment"
            component={DetailComment}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DetailLog"
            component={DetailLog}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DetailDispo"
            component={DetailDispo}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="LetterDetail"
            component={LetterDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DetailPreview"
            component={DetailPreview}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="ViewAttachment"
            component={ViewAttachment}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="ReferenceDetail"
            component={ReferenceDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="TrackingLogDetail"
            component={TrackingLogDetail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="ScanLogDetail"
            component={ScanLogDetail}
            options={{ header: toolbarBack }}
          />
          {/* FORM */}
          <Stack.Screen
            name="DelegationForm"
            component={DelegationForm}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="SecretaryForm"
            component={SecretaryForm}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DispositionForm"
            component={DispositionForm}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="ForwardForm"
            component={ForwardForm}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="AddressbookEmployee"
            component={AddressbookEmployee}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="AddressbookTitle"
            component={AddressbookTitle}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="Addressbook"
            component={Addressbook}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="AddressbookKM"
            component={AddressbookKM}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DigisignSearchEmail"
            component={DigisignSearchEmail}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="Dokumen"
            component={Dokumen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailActivity"
            component={DetailActivity}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

function AppNavigator() {
  const app_name = Config.app_name;
  const app_version = Config.app_version;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    //checkversion
    if (Platform.OS == "android") {
      checkVersionAndroid();
    } else if (Platform.OS == "ios") {
      checkVersionIos();
    }
  }, []);

  async function getToken() {
    setIsLoading(true);
    //get token
    let token;
    await AsyncStorage.getItem("token").then((data) => {
      token = JSON.parse(data);
    });
    if (token != null) {
      // setIsAuthenticated(true);
      let data = { token: token };
      dispatch(setToken(data));
    }
    setIsLoading(false);
  }
  async function getProfile() {
    setIsLoading(true);
    let profile;
    await AsyncStorage.getItem("profileLogin").then((data) => {
      profile = JSON.parse(data);
    });
    if (profile != null) {
      dispatch(setProfile(profile));
    }
    setIsLoading(false);
  }

  async function checkVersionAndroid() {
    try {
      const response = await getHTTP(nde_api.getVersionAndroid);
      cekValidVersion(response.data.version);
    } catch (error) {
      if (error.status == null) {
        Alert.alert("Warning!", "Please check your connection");
      } else {
        handlerError(error, "Warning!", "Check Version Android not working!");
      }
    }
  }
  async function checkVersionIos() {
    try {
      const response = await getHTTP(nde_api.getVersionIos);
      cekValidVersion(response.data.version);
    } catch (error) {
      if (error.status == null) {
        Alert.alert("Warning!", "Please check your connection");
      } else {
        handlerError(error, "Warning!", "Check Version Ios not working!");
      }
    }
  }
  function cekValidVersion(server_version) {
    if (server_version != app_version) {
      Alert.alert(
        "Warning!",
        "You are using an old version of the " +
        app_name +
        ". Do you want to upgrade?",
        [
          {
            text: "Upgrade",
            onPress: () => {
              getToken();
              getProfile();
              handleUpgradeLink();
            },
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            getToken();
            getProfile();
          },
        }
      );
      AsyncStorage.removeItem("token");
      dispatch(setValidVersion(false));
    } else {
      dispatch(setValidVersion(true));
      getToken();
      getProfile();
    }
  }

  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  return (
    <>
      <NavigationContainer>
        <BottomSheetModalProvider>
          {!isLoading && !isAuthenticated && <AuthStack />}
          {!isLoading && isAuthenticated && <AuthenticatedStack />}
        </BottomSheetModalProvider>
      </NavigationContainer>
      {loadingOverlay}
    </>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 350,
  },
  backgroundImage: {
    resizeMode: "cover",
    alignSelf: "flex-start",
  },
});
