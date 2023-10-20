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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import * as Application from "expo-application";
import { Home } from "../SuperApps/Home";
import { Satker } from "../SuperApps/Satker";
import { FAQ } from "../SuperApps/FAQ";
import { Profile } from "../SuperApps/Profile";
import Main from "../SuperApps/Main";
import DetailDashboard from "../../Apps/Kebijakan/DetailDashboard";
import PdfViewer from "../../Apps/Kebijakan/PdfViewer";
import { DrawerNavigation } from "../Kebijakan/Drawer";
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
import { Lampiran } from "../Repository/Lampiran";
import { Komentar } from "../Repository/Komentar";
import MyTabBarKal from "../Kalender/BottomTabsKal";
import { Agenda } from "../Kalender/Agenda";
import { MainKalender } from "../Kalender/MainKalender";
import { GrupKalender } from "../Kalender/GrupKalender";
import { TambahGrup } from "../Kalender/TambahGrup";
import { TambahAgenda } from "../Kalender/TambahAgenda";
import { DetailAcara } from "../Kalender/DetailAcara";
import { ListSuka } from "../Kalender/ListSuka";
import { MyTask } from "../Task Management/MyTask";
import { InProgres } from "../Task Management/Task/InProgres";
import { Pending } from "../Task Management/Task/Pending";
import { BackLog } from "../Task Management/Task/BackLog";
import { HariIni } from "../Task Management/Dashboard/HariIni";
import { MingguIni } from "../Task Management/Dashboard/MingguIni";
import { Terlewat } from "../Task Management/Dashboard/Terlewat";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import { Complete } from "../Task Management/Task/Complete";
import MyTabBarDetailTask from "../Task Management/DetailTask/BottmTabsDetailTask";
import { DetailTask } from "../Task Management/DetailTask/DetailTask";
import { LampiranTask } from "../Task Management/DetailTask/LampiranTask";
import MainDetailTask from "../Task Management/DetailTask/MainDetailTask";
import { AddTask } from "../Task Management/AddTask";
import { ListGaleri } from "../SuperApps/ListGaleri";
import { Kepegawaian } from "../Dashboard/Kepegawaian";
import { Demografi } from "../Dashboard/Demografi";
import { Penilaian } from "../Dashboard/Penilaian";
import { Pelatihan } from "../Dashboard/Pelatihan";
import { Absensi } from "../Dashboard/Absensi";
import { Kesejahteraan } from "../Dashboard/Kesejahteraan";
import { Perencanaan } from "../Dashboard/Perencanaan";
import { DetailPengmuman } from "../Dashboard/DetailPengmuman";
import { ProduksiBudidaya } from "../Dashboard/ProduksiBudidaya";
import { Produksi } from "../Dashboard/Produksi";
import { TeknologiTerbaru } from "../Dashboard/TeknologiTerbaru";
import { DetailTeknologi } from "../Dashboard/DetailTeknologi";
import { LiniMasa } from "../Pengetahuan/LiniMasa";
import { DetailLinimasa } from "../Pengetahuan/DetailLinimasa";
import { PostinganSaya } from "../Pengetahuan/PostinganSaya";
import { JumlahPostingan } from "../Pengetahuan/JumlahPostingan";
import { PostinganBaru } from "../Pengetahuan/PostinganBaru";
import { DetailPostinganSaya } from "../Pengetahuan/DetailPostinganSaya";
import { RangkumanIKU } from "../Pengetahuan/RangkumanIKU";
import { ListPostinganPegawai } from "../Pengetahuan/ListPostinganPegawai";
import { LaporanPengetahuan } from "../Pengetahuan/LaporanPengetahuan";
import MyTabDigitalSign from "../DigitalSignature/BottomTabsDigitalSign";
import { Bankom } from "../DigitalSignature/Bankom";
import { DokumenLain } from "../DigitalSignature/DokumenLain";
import MainDigitalSign from "../DigitalSignature/MainDigitalSign";
import { DetailSertifikat } from "../DigitalSignature/DetailSertifikat";
import { TambahSertifikat } from "../DigitalSignature/TambahSertifikat";
import MainPengetahuan from "../Pengetahuan/MainPengetahuan";
import MyTabBarPengetahuan from "../Pengetahuan/BottomTabsPengetahuan";
import { PenilaianPenggetahaun } from "../Pengetahuan/PenilaianPengetahuan";
import { DetailPenilaian } from "../Pengetahuan/DetailPenilaian";
import { ListSukaLinimasa } from "../Pengetahuan/ListSukaLinimasa";
import { FileViewer } from "../Pengetahuan/FileViewer";
import { ListPegawai } from "../Pegawai/ListPegawai";
import { DetailProfile } from "../Pegawai/DetailProfile";
import { Host } from "react-native-portalize";
import { HalamanUtama } from "../Event Management/HalamanUtama";
import { DetailEvent } from "../Event Management/DetailEvent";
import MyTabDetailEvent from "../Event Management/BottomTabsDetailEvent";
import { AgendaEvent } from "../Event Management/AgendaEvent";
import { MainDetailEvent } from "../Event Management/MainDetailEvent";
import { DetailAgenda } from "../Event Management/DetailAgenda";
import { Todo } from "../Event Management/Todo";
import { Absen } from "../Event Management/Absen";
import MyTabDetailAgenda from "../Event Management/BottomTabsDetailAgenda";
import { MainDetailAgenda } from "../Event Management/MainDetailAgenda";
import { Notulensi } from "../Event Management/Notulensi";
import { DetailTodo } from "../Event Management/DetailTodo";
import { TambahEvent } from "../Event Management/TambahEvent";
import { TambahAgendaEvent } from "../Event Management/TambahAgendaEvent";
import { TambahTodo } from "../Event Management/TambahTodo";
import { LoginToken } from "../LoginToken";
import { DetailAbsen } from "../Event Management/DetailAbsen";
import { ScannerBarCode } from "../Event Management/ScannerBarCode";
import { AddressBook } from "../AddressBook";
import { AddressBookJabatan } from "../AddressBookJabatan";
import { AddressBookPegawai } from "../AddressBookPegawai";
import { EditEvent } from "../Event Management/EditEvent";
import { TambahSubAgenda } from "../Event Management/TambahSubAgenda";
import { EditSubAgenda } from "../Event Management/EditSubAgenda";
import { EditTodo } from "../Event Management/EditTodo";
import { DetailAcaraAgenda } from "../Kalender/DetailAcaraAgenda";
import { AddCategory } from "../Task Management/AddCategory";
import { Penangkapan } from "../Dashboard/Penangkapan";
import { Keuangan } from "../Dashboard/Keuangan";
import { APBN } from "../Dashboard/APBN";
import { PNBP } from "../Dashboard/PNPB";
import { IKU } from "../Dashboard/IKU";
import { DetailGrup } from "../Kalender/DetailGrup";
import { EditTask } from "../Task Management/EditTask";
import { EditCategory } from "../Task Management/EditCategory";
import { EditGrup } from "../Kalender/EditGrup";
import { EditAgendaGrup } from "../Kalender/EditAgendaGrup";
import { ListBeritaSatker } from "../SuperApps/ListBeritaSatker";
import { DetailBeritaSatker } from "../SuperApps/DetailBeritaSatker";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

function AuthStack() {
  const showBg = useSelector((state) => state.auth.showbg);
  const { width, height } = useWindowDimensions();
  return (
    <>
      <StatusBar
        barStyle={showBg ? Config.statusbarAuth : Config.statusbarAuthenticated}
        backgroundColor="transparent"
        translucent
      />
      <Stack.Navigator>
        {/* <Stack.Screen
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
            /> */}
        <Stack.Screen
          name="LoginToken"
          component={LoginToken}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MainRepo"
          component={MainRepo}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MainKeb"
          component={MainKeb}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MainDetailRepo"
          component={MainDetailRepo}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        {/* <Stack.Screen
              name="MainKalender"
              component={MainKalender}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            /> */}
        <Stack.Screen
          name="GrupKalender"
          component={GrupKalender}
          options={{
            headerShown: false,
            // gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="ListBerita"
          component={ListBerita}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListBeritaSatker"
          component={ListBeritaSatker}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailBeritaSatker"
          component={DetailBeritaSatker}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListGaleri"
          component={ListGaleri}
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
        <Stack.Screen
          name="TambahGrup"
          component={TambahGrup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditGrup"
          component={EditGrup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditAgendaGrup"
          component={EditAgendaGrup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailGrup"
          component={DetailGrup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahAgenda"
          component={TambahAgenda}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailAcara"
          component={DetailAcara}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailAcaraAgenda"
          component={DetailAcaraAgenda}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListSuka"
          component={ListSuka}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyTask"
          component={MyTask}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditCategory"
          component={EditCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetailTask"
          component={MainDetailTask}
          options={{
            headerShown: false,
          }}
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
        <Stack.Screen
          name="Kepegawaian"
          component={Kepegawaian}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailPengumuman"
          component={DetailPengmuman}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProduksiBudidaya"
          component={ProduksiBudidaya}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailTeknologi"
          component={DetailTeknologi}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainPengetahuan"
          component={MainPengetahuan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailLinimasa"
          component={DetailLinimasa}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListSukaLinimasa"
          component={ListSukaLinimasa}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JumlahPostingan"
          component={JumlahPostingan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostinganBaru"
          component={PostinganBaru}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailPostinganSaya"
          component={DetailPostinganSaya}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListPostinganPegawai"
          component={ListPostinganPegawai}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FileViewer"
          component={FileViewer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListPegawai"
          component={ListPegawai}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailProfile"
          component={DetailProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDigitalSign"
          component={MainDigitalSign}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailSertifikat"
          component={DetailSertifikat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahSertifikat"
          component={TambahSertifikat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailPenilain"
          component={DetailPenilaian}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HalamanUtama"
          component={HalamanUtama}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailEvent"
          component={DetailEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetailEvent"
          component={MainDetailEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetailAgenda"
          component={MainDetailAgenda}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notulensi"
          component={Notulensi}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailTodo"
          component={DetailTodo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahEvent"
          component={TambahEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahAgendaEvent"
          component={TambahAgendaEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahTodo"
          component={TambahTodo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailAbsen"
          component={DetailAbsen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScannerBarCode"
          component={ScannerBarCode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TambahSubAgenda"
          component={TambahSubAgenda}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditSubAgenda"
          component={EditSubAgenda}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditTodo"
          component={EditTodo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Penangkapan"
          component={Penangkapan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Keuangan"
          component={Keuangan}
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
            headerTitle: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PdfViewer"
          component={PdfViewer}
          options={{
            headerTitle: "",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TermOfUse"
          component={TermOfUse}
          options={{
            header: toolbarBack,
          }}
        />
        <Stack.Screen
          name="AddressBook"
          component={AddressBook}
          options={{
            headerTitle: "",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export const BottomTabs = () => {
  return (
    <Host>
      <BottomSheetModalProvider>
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Satker"
            component={Satker}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="FAQ"
            component={FAQ}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
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
    </Host>
  );
};

export const BottomTabsRepo = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarRepo {...props} />}
        initialRouteName="Dokumen"
      >
        <Tab.Screen
          name="Dokumen"
          component={Dokumen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Dibagikan"
          component={Dibagikan}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen name='Kebijakan' component={DrawerNavigation}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' }
        }}
      /> */}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsKeb = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarKeb {...props} />}
        initialRouteName="Dashboard"
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tematik"
          component={Tematik}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen name='Kebijakan' component={DrawerNavigation}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' }
        }}
      /> */}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsDetailRepo = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarDetailRepo {...props} />}
        initialRouteName="DetailActivity"
      >
        <Stack.Screen
          name="DetailActivity"
          component={DetailActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lampiran"
          component={Lampiran}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Komentar"
          component={Komentar}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsKalender = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarKal {...props} />}
        initialRouteName="GrupKalender"
      >
        <Tab.Screen
          name="GrupKalender"
          component={GrupKalender}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Agenda"
          component={Agenda}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsDetailTask = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarDetailTask {...props} />}
        initialRouteName="DetailTask"
      >
        <Tab.Screen
          name="DetailTask"
          component={DetailTask}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="LampiranTask"
          component={LampiranTask}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsDigitalSign = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabDigitalSign {...props} />}
        initialRouteName="Bankom"
      >
        <Tab.Screen
          name="Bankom"
          component={Bankom}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="DokumenLain"
          component={DokumenLain}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsPengetahuan = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabBarPengetahuan {...props} />}
        initialRouteName="LiniMasa"
      >
        <Tab.Screen
          name="LiniMasa"
          component={LiniMasa}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="PostinganSaya"
          component={PostinganSaya}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="RangkumanIKU"
          component={RangkumanIKU}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="PenilaianPenggetahaun"
          component={PenilaianPenggetahaun}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="LaporanPengetahuan"
          component={LaporanPengetahuan}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsDetailEvent = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabDetailEvent {...props} />}
        initialRouteName="DetailEvent"
      >
        <Tab.Screen
          name="DetailEvent"
          component={DetailEvent}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AgendaEvent"
          component={AgendaEvent}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const BottomTabsDetailAgenda = () => {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={(props) => <MyTabDetailAgenda {...props} />}
        initialRouteName="DetailAgenda"
      >
        <Tab.Screen
          name="DetailAgenda"
          component={DetailAgenda}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Todo"
          component={Todo}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Absen"
          component={Absen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsTP = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName="KRT"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "#800000" },
          tabBarLabelStyle: { fontSize: 10, textTransform: "none" },
        }}
      >
        <Top.Screen
          name="KRT"
          component={KRT}
          options={{
            title: "Kerumahtanggaan",
          }}
        />
        <Top.Screen
          name="Pengawasan"
          component={Pengawasan}
          options={{
            title: "Pengawasan",
          }}
        />
        <Top.Screen
          name="KPP"
          component={KPP}
          options={{
            title: "Kinerja dan Pengembangan Pegawai",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsTask = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName={"InProgres"}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: "none",
            fontWeight: FONTWEIGHT.bold,
          },
        }}
      >
        <Top.Screen
          name="BackLog"
          component={BackLog}
          options={{
            title: "Back Log",
          }}
        />
        <Top.Screen
          name="Inprogres"
          component={InProgres}
          options={{
            title: "In Progress",
          }}
        />
        <Top.Screen
          name="Pending"
          component={Pending}
          options={{
            title: "Pending",
          }}
        />
        <Top.Screen
          name="Complete"
          component={Complete}
          options={{
            title: "Complete",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsTaskDashboard = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName={"HariIni"}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: "none",
            fontWeight: FONTWEIGHT.bold,
          },
        }}
      >
        <Top.Screen
          name="HariIni"
          component={HariIni}
          options={{
            title: "Hari Ini",
          }}
        />
        <Top.Screen
          name="MingguIni"
          component={MingguIni}
          options={{
            title: "Minggu Ini",
          }}
        />
        <Top.Screen
          name="Terlewat"
          component={Terlewat}
          options={{
            title: "Terlewat",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsTaskKorespondensi = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName={"Arsip"}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: "none",
            fontWeight: FONTWEIGHT.bold,
          },
        }}
      >
        <Top.Screen
          name="Arsip"
          component={InProgres}
          options={{
            title: "Arsip",
          }}
        />
        <Top.Screen
          name="Terlewat"
          component={Pending}
          options={{
            title: "Terlewat",
          }}
        />
        <Top.Screen
          name="HariIni"
          component={Complete}
          options={{
            title: "Hari Ini",
          }}
        />
        <Top.Screen
          name="MingguDepan"
          component={BackLog}
          options={{
            title: "Minggu Depan",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsDash = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName="Demografi"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: "auto" },
        }}
      >
        <Top.Screen
          name="Demografi"
          component={Demografi}
          options={{
            title: "Demografi",
          }}
        />
        <Top.Screen
          name="Penilaian"
          component={Penilaian}
          options={{
            title: "Penilaian",
          }}
        />
        <Top.Screen
          name="Pelatihan"
          component={Pelatihan}
          options={{
            title: "Pelatihan",
          }}
        />
        <Top.Screen
          name="Absensi"
          component={Absensi}
          options={{
            title: "Absensi",
          }}
        />
        <Top.Screen
          name="Kesejahteraan"
          component={Kesejahteraan}
          options={{
            title: "Kesejahteraan",
          }}
        />
        <Top.Screen
          name="Perencanaan"
          component={Perencanaan}
          options={{
            title: "Perencanaan",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsProduksiBudidaya = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName="Produksi"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: "auto" },
        }}
      >
        <Top.Screen
          name="Produksi"
          component={Produksi}
          options={{
            title: "Produksi",
          }}
        />
        <Top.Screen
          name="TeknologiTerbaru"
          component={TeknologiTerbaru}
          options={{
            title: "Teknologi Terbaru",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopsKeuanganKinerja = () => {
  return (
    <BottomSheetModalProvider>
      <Top.Navigator
        initialRouteName="APBN"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
          tabBarActiveTintColor: "#C34647",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: "auto" },
        }}
      >
        <Top.Screen
          name="APBN"
          component={APBN}
          options={{
            title: "APBN",
          }}
        />
        <Top.Screen
          name="PNBP"
          component={PNBP}
          options={{
            title: "PNBP",
          }}
        />
        <Top.Screen
          name="IKU"
          component={IKU}
          options={{
            title: "IKU",
          }}
        />
      </Top.Navigator>
    </BottomSheetModalProvider>
  );
};

export const TopAddressBook = ({ config }) => {
  return (
    <Host>
      <BottomSheetModalProvider>
        <Top.Navigator
          initialRouteName={"AddressBookJabatan"}
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: COLORS.infoDanger },
            tabBarActiveTintColor: "#C34647",
            tabBarInactiveTintColor: "black",
            tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: "auto" },
          }}
        >
          {config.tabs.jabatan && config.tabs.pegawai ? (
            <>
              <Top.Screen
                name="AddressBookJabatan"
                component={AddressBookJabatan}
                options={{
                  title: "Jabatan",
                  tabBarItemStyle: { width: "50%" },
                  tabBarLabelStyle: {
                    width: 200,
                    fontSize: 13,
                    textTransform: "none",
                    paddingLeft: 80,
                  },
                }}
                initialParams={{ config: config }}
              />
              <Top.Screen
                name="AddressBookPegawai"
                component={AddressBookPegawai}
                options={{
                  title: "Pegawai",
                  tabBarItemStyle: { width: "50%" },
                  tabBarLabelStyle: {
                    width: 200,
                    fontSize: 13,
                    textTransform: "none",
                    paddingLeft: 50,
                  },
                }}
                initialParams={{ config: config }}
              />
            </>
          ) : config.tabs.jabatan ? (
            <Top.Screen
              name="AddressBookJabatan"
              component={AddressBookJabatan}
              options={{
                title: "Jabatan",
                tabBarItemStyle: { width: "50%" },
                tabBarLabelStyle: {
                  width: 200,
                  fontSize: 13,
                  textTransform: "none",
                  paddingLeft: 80,
                },
              }}
              initialParams={{ config: config }}
            />
          ) : config.tabs.pegawai ? (
            <Top.Screen
              name="AddressBookPegawai"
              component={AddressBookPegawai}
              options={{
                title: "Pegawai",
                tabBarItemStyle: { width: "50%" },
                tabBarLabelStyle: {
                  width: 200,
                  fontSize: 13,
                  textTransform: "none",
                  paddingLeft: 50,
                },
              }}
              initialParams={{ config: config }}
            />
          ) : null}
        </Top.Navigator>
      </BottomSheetModalProvider>
    </Host>
  );
};

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

  const getDeviceId = async () => {};
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
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="MainKeb"
            component={MainKeb}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="MainDetailRepo"
            component={MainDetailRepo}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="MainKalender"
            component={MainKalender}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false,
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
            name="ListBeritaSatker"
            component={ListBeritaSatker}
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
          <Stack.Screen
            name="TambahGrup"
            component={TambahGrup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahAgenda"
            component={TambahAgenda}
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
          <Stack.Screen
            name="MyTask"
            component={MyTask}
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
        console.log("cek", error);
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
              // handleUpgradeLink();
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
      <Host>
        {/* awas lupa */}
        <NavigationContainer>
          {/* {!isLoading && !isAuthenticated && <AuthStack />} */}
          {<AuthStack />}
          {!isLoading && isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
        {/* {loadingOverlay} */}
      </Host>
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
