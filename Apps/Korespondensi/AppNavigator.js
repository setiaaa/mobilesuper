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

import { setToken, setValidVersion } from "../../store/auth";
import { GlobalStyles } from "../../constants/styles";
import { toolbarBack } from "../../components/UI/ToolbarBack";
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
import MainRepo from "../Repository/MainRepo";
import MainKeb from "../Kebijakan/MainKeb";
import { Tp } from "../SuperApps/Tp";
import { DetailActivity } from "../Repository/DetailActivity";
import { MainDetailRepo } from "../Repository/MainDetailRepo";
import { MainKalender } from "../Kalender/MainKalender";
import { GrupKalender } from "../Kalender/GrupKalender";
import { TambahGrup } from "../Kalender/TambahGrup";
import { TambahAgenda } from "../Kalender/TambahAgenda";
import { DetailAcara } from "../Kalender/DetailAcara";
import { ListSuka } from "../Kalender/ListSuka";
import { MyTask } from "../Task Management/MyTask";
import MainDetailTask from "../Task Management/DetailTask/MainDetailTask";
import { AddTask } from "../Task Management/AddTask";
import { ListGaleri } from "../SuperApps/ListGaleri";
import { Kepegawaian } from "../Dashboard/Kepegawaian";
import { DetailPengmuman } from "../Dashboard/DetailPengmuman";
import { ProduksiBudidaya } from "../Dashboard/ProduksiBudidaya";
import { DetailTeknologi } from "../Dashboard/DetailTeknologi";
import { DetailLinimasa } from "../Pengetahuan/DetailLinimasa";
import { JumlahPostingan } from "../Pengetahuan/JumlahPostingan";
import { PostinganBaru } from "../Pengetahuan/PostinganBaru";
import { DetailPostinganSaya } from "../Pengetahuan/DetailPostinganSaya";
import { ListPostinganPegawai } from "../Pengetahuan/ListPostinganPegawai";
import { DetailDokumenLain } from "../DigitalSignature/DetailDokumenLain";
import { LaporanDigitalSign } from "../DigitalSignature/LaporanDigitalSign";
import MainDigitalSign from "../DigitalSignature/MainDigitalSign";
import { DetailSertifikat } from "../DigitalSignature/DetailSertifikat";
import { TambahSertifikat } from "../DigitalSignature/TambahSertifikat";
import { TambahDokumenLain } from "../DigitalSignature/TambahDokumenLain";
import MainPengetahuan from "../Pengetahuan/MainPengetahuan";
import { DetailPenilaian } from "../Pengetahuan/DetailPenilaian";
import { ListSukaLinimasa } from "../Pengetahuan/ListSukaLinimasa";
import { FileViewer } from "../Pengetahuan/FileViewer";
import { ListPegawai } from "../Pegawai/ListPegawai";
import { DetailProfile } from "../Pegawai/DetailProfile";
import { Host } from "react-native-portalize";
import { HalamanUtama } from "../Event Management/HalamanUtama";
import { DetailEvent } from "../Event Management/DetailEvent";
import { MainDetailEvent } from "../Event Management/MainDetailEvent";
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
import { EditEvent } from "../Event Management/EditEvent";
import { TambahSubAgenda } from "../Event Management/TambahSubAgenda";
import { EditSubAgenda } from "../Event Management/EditSubAgenda";
import { EditTodo } from "../Event Management/EditTodo";
import { DetailAcaraAgenda } from "../Kalender/DetailAcaraAgenda";
import { AddCategory } from "../Task Management/AddCategory";
import { Penangkapan } from "../Dashboard/Penangkapan";
import { Keuangan } from "../Dashboard/Keuangan";
import { DetailGrup } from "../Kalender/DetailGrup";
import { EditTask } from "../Task Management/EditTask";
import { EditCategory } from "../Task Management/EditCategory";
import { EditGrup } from "../Kalender/EditGrup";
import { EditAgendaGrup } from "../Kalender/EditAgendaGrup";
import { ListBeritaSatker } from "../SuperApps/ListBeritaSatker";
import { DetailBeritaSatker } from "../SuperApps/DetailBeritaSatker";
import MainSPPD from "../SPPD/MainSPPD";
import { DetailDokumenSPPD } from "../SPPD/DetailDokumenSPPD";
import MainOutgoingDetail from "./Detail/Outgoing/MainOutgoingDetail";
import { DetailSuratDiunggah } from "./Detail/Outgoing/DetailSuratDiunggah";
import MainCuti from "../Cuti/MainCuti";
import { Libur } from "../Cuti/Libur";
import { TambahCutiBesar } from "../Cuti/TambahCutiBesar";
import { TambahCutiSakit } from "../Cuti/TambahCutiSakit";
import { TambahCutiMelahirkan } from "../Cuti/TambahCutiMelahirkan";
import { TambahCutiDiluarTanggungan } from "../Cuti/TambahCutiDiluarTanggungan";
import { TambahCutiTahunan } from "../Cuti/TambahCutiTahunan";
import { TambahCutiAlasanPenting } from "../Cuti/TambahCutiAlasanPenting";
import { DetailDokumenCuti } from "../Cuti/DetailDokumenCuti";
import { getTokenValue } from "../../service/session";
import { ListArsipCuti } from "../Cuti/ListArsipCuti";
import { PencarianKorespondensi } from "./Pencarian/PencarianKorespondensi";
import { KegiatanBaru } from "../SPPD/KegiatanBaru";
import LihatSuratSPPD from "../SPPD/LihatSuratSPPD";
import { Laporan } from "../Task Management/Dashboard/Laporan";
import { PdfPerisai } from "../DigitalSignature/PdfPerisai";
import MainKoresp from "./MainKoresp";
import IncomingList from "./List/IncomingList";
import DispositionList from "./List/DispositionList";
import TrackingList from "./List/TrackingList";
import SubmittedList from "./List/SubmittedList";
import NeedFollowUpList from "./List/NeedFollowUpList";
import { HDLaporanSaya } from "../SuperApps/HDLaporanSaya";
import { HDFormLaporan } from "../SuperApps/HDFormLaporan";
import { FileViewerRepo } from "../Repository/FileViewerRepo";

const Stack = createNativeStackNavigator();

function AuthenticatedStack(route) {
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
        <Stack.Navigator initialRouteName={route.route}>
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
            name="FileViewerRepo"
            component={FileViewerRepo}
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
            name="Laporan"
            component={Laporan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HDLaporanSaya"
            component={HDLaporanSaya}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HDFormLaporan"
            component={HDFormLaporan}
            options={{
              headerShown: false,
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
            name="DetailDokumenLain"
            component={DetailDokumenLain}
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
            name="PdfPerisai"
            component={PdfPerisai}
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
            name="TambahDokumenLain"
            component={TambahDokumenLain}
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
          <Stack.Screen
            name="MainOutgoingDetail"
            component={MainOutgoingDetail}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailSuratDiunggah"
            component={DetailSuratDiunggah}
            options={{
              header: toolbarBack,
              title: "Detail Surat Keluar",
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
          <Stack.Screen
            name="MainKoresp"
            component={MainKoresp}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="IncomingUnread"
            component={IncomingList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DispositionUnread"
            component={DispositionList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="IncomingList"
            component={IncomingList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="DispositionList"
            component={DispositionList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="NeedFollowUpList"
            component={NeedFollowUpList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="TrackingList"
            component={TrackingList}
            options={{ header: toolbarBack }}
          />
          <Stack.Screen
            name="SubmittedList"
            component={SubmittedList}
            options={{ header: toolbarBack }}
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
          <Stack.Screen
            name="MainSPPD"
            component={MainSPPD}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailDokumenSPPD"
            component={DetailDokumenSPPD}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainCuti"
            component={MainCuti}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Libur"
            component={Libur}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiBesar"
            component={TambahCutiBesar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiSakit"
            component={TambahCutiSakit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiMelahirkan"
            component={TambahCutiMelahirkan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiDiluarTanggungan"
            component={TambahCutiDiluarTanggungan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiTahunan"
            component={TambahCutiTahunan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TambahCutiAlasanPenting"
            component={TambahCutiAlasanPenting}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailDokumenCuti"
            component={DetailDokumenCuti}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListArsipCuti"
            component={ListArsipCuti}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="KegiatanBaru"
            component={KegiatanBaru}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Pencarian"
            component={PencarianKorespondensi}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LihatSuratSPPD"
            component={LihatSuratSPPD}
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
  const { token } = useSelector((state) => state.login);
  const [route, setRoute] = useState("");
  useEffect(() => {
    //checkversion
    // if (Platform.OS == "android") {
    //   checkVersionAndroid();
    // } else if (Platform.OS == "ios") {
    //   checkVersionIos();
    // }
    getTokenValue().then((val) => {
      if (val === null) {
        setRoute("LoginToken");
      } else {
        setRoute("Main");
      }
      setIsLoading(false);
    });
  }, [route]);

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
          {/* {!isLoading && isToken == null && <AuthStack />} */}
          {!isLoading && <AuthenticatedStack route={route} />}
        </NavigationContainer>
        {loadingOverlay}
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
