import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import {
  COLORS,
  DATETIME,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import moment from "moment";
import { FlatList } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import { postApproval } from "../../service/api";
import { ModalSubmit } from "../../components/ModalSubmit";
import { setStatus } from "../../store/Cuti";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CardLampiran = ({ lampiran, onClick, type, id, name, size }) => {
  const navigation = useNavigation();
  console.log(lampiran);

  // console.log(name);
  // console.log(size);
  return type === "png" || type === "jpg" || type === "jpeg" ? (
    <TouchableOpacity key={id} onPress={onClick}>
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={{ uri: lampiran }}
          style={{ width: 90, height: 90, borderRadius: 8 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : type === "mp4" ? (
    <TouchableOpacity key={id} onPress={onClick}>
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../assets/superApp/mp4.png")}
          style={{ width: 90, height: 90 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : type === "doc" || type === "docx" ? (
    <TouchableOpacity
      key={id}
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
    >
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../assets/superApp/word.png")}
          style={{ width: 90, height: 90 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : type === "xls" || type === "xlsx" ? (
    <TouchableOpacity
      key={id}
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
    >
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../assets/superApp/excel.png")}
          style={{ width: 90, height: 90 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : type === "pdf" ? (
    <TouchableOpacity
      key={id}
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: "https://" + lampiran,
          type: "pdf",
        })
      }
    >
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../assets/superApp/pdf.png")}
          style={{ width: 90, height: 90 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : type === "ppt" || type === "pptx" ? (
    <TouchableOpacity
      key={id}
      onPress={() =>
        navigation.navigate("FileViewer", {
          lampiran: lampiran,
          type: type,
        })
      }
    >
      <View
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.secondaryLighter,
          alignItems: "center",
          width: 110,
          rowGap: 5,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../assets/superApp/ppt.png")}
          style={{ width: 70, height: 70 }}
        />
        <Text style={{ fontWeight: FONTWEIGHT.bold }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: COLORS.lighter }}>
          {Math.floor(size / 1000)} MB
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

const CardKomen = ({
  listData,
  inputRef,
  setParentId,
  bottomSheetAttachCommentClose,
}) => {
  const [toggleComment, setToggleComment] = useState({
    toggle: false,
    // id: data[0].Komentar[0].id
  });
  const clickBalas = (id, temp) => {
    setToggleComment({
      toggle: temp,
      id: id,
    });
    console.log(id);
  };

  const handleClickBalas = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setParentId(listData.id);
    }
  };
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          width: "90%",
          marginVertical: 5,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <View>
            <Image
              source={{ uri: listData.foto }}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
          </View>
          <View style={{ marginLeft: 10, width: "90%" }}>
            <Text
              style={{
                fontSize: FONTSIZE.H2,
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              {listData.nama}
            </Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  color: COLORS.lighter,
                  fontSize: FONTSIZE.H5,
                  fontWeight: FONTWEIGHT.normal,
                }}
              >
                {listData.nip}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.danger,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "25%",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: FONTSIZE.H5,
                    fontWeight: FONTWEIGHT.normal,
                  }}
                >
                  {listData.aksi}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  marginLeft: 60,
                }}
                onPress={() => {
                  navigation.navigate("FileViewer", {
                    lampiran: "https://" + listData.pdf,
                    type: "pdf",
                  });
                  bottomSheetAttachCommentClose();
                }}
              >
                <Ionicons name="documents-outline" size={10} />
                <Text
                  style={{
                    color: COLORS.info,
                    fontSize: FONTSIZE.H5,
                    fontWeight: FONTWEIGHT.normal,
                  }}
                >
                  (Lihat Dokumen)
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  fontSize: FONTSIZE.H5,
                  fontWeight: FONTWEIGHT.normal,
                  marginBottom: 5,
                }}
              >
                {moment(listData.tanggal, DATETIME.LONG_DATETIME).format(
                  DATETIME.LONG_DATETIME
                )}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  color: COLORS.lighter,
                  fontSize: FONTSIZE.H5,
                  fontWeight: FONTWEIGHT.normal,
                  marginBottom: 5,
                }}
              >
                {listData.teks}
              </Text>
            </View>

            {/* <TouchableOpacity
                            style={{
                                color: COLORS.lighter,
                                fontSize: FONTSIZE.H3,
                                fontWeight: FONTWEIGHT.normal,
                                wordWrap: "break-word",
                                marginTop: 10,
                            }}
                            onPress={() => {
                                handleClickBalas();
                            }}
                        >
                            <Text
                                style={{ color: COLORS.primary, fontWeight: FONTWEIGHT.bold }}
                            >
                                Balas
                            </Text>
                        </TouchableOpacity> */}
            {/* 
                        {listData.child.length === 0 ? null : (
                            <View>
                                {(!toggleComment.toggle && toggleComment.id === listData.id) ||
                                    (toggleComment.id !== listData.id &&
                                        listData.child.length > 0) ? (
                                    <TouchableOpacity
                                        key={listData.id}
                                        onPress={() => clickBalas(listData.id, true)}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 5,
                                                marginTop: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 1,
                                                    width: 20,
                                                    backgroundColor: "#DBDADE",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    color: COLORS.lighter,
                                                    fontSize: FONTSIZE.H5,
                                                    fontWeight: FONTWEIGHT.normal,
                                                    lineHeight: 18,
                                                    wordWrap: "break-word",
                                                }}
                                            >
                                                Tampilkan {listData.child?.length} Balasan
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : null}

                                {listData.id === toggleComment.id && toggleComment.toggle ? (
                                    <View>
                                        {listData.child?.map((listKomen, index) => (
                                            <>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        marginVertical: 10,
                                                        marginHorizontal: 20,
                                                    }}
                                                >
                                                    <View>
                                                        <Image
                                                            source={{ uri: listData.creator_avatar }}
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 20,
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text
                                                            style={{
                                                                fontSize: FONTSIZE.H2,
                                                                fontWeight: FONTWEIGHT.bold,
                                                                lineHeight: 20,
                                                                wordWrap: "break-word",
                                                            }}
                                                        >
                                                            {listKomen.creator}
                                                        </Text>
                                                        <View style={{ flexDirection: "row", gap: 5 }}>
                                                            <Text
                                                                style={{
                                                                    color: COLORS.lighter,
                                                                    fontSize: FONTSIZE.H5,
                                                                    fontWeight: FONTWEIGHT.normal,
                                                                    lineHeight: 18,
                                                                    wordWrap: "break-word",
                                                                    marginBottom: 10,
                                                                }}
                                                            >
                                                                {listKomen.created_at}
                                                            </Text>
                                                        </View>
                                                        <Text
                                                            style={{
                                                                color: "#999999",
                                                                fontSize: FONTSIZE.H3,
                                                                fontWeight: FONTWEIGHT.normal,
                                                                lineHeight: 18,
                                                                wordWrap: "break-word",
                                                            }}
                                                        >
                                                            {listKomen.message}
                                                        </Text>
                                                        {listData.child.length - 1 === index ? (
                                                            <TouchableOpacity
                                                                key={listKomen.id}
                                                                onPress={() => clickBalas(listData.id, false)}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        gap: 5,
                                                                        marginTop: 10,
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            height: 1,
                                                                            width: 20,
                                                                            backgroundColor: "#DBDADE",
                                                                        }}
                                                                    />
                                                                    <Text
                                                                        style={{
                                                                            color: COLORS.lighter,
                                                                            fontSize: FONTSIZE.H5,
                                                                            fontWeight: FONTWEIGHT.normal,
                                                                            lineHeight: 18,
                                                                            wordWrap: "break-word",
                                                                        }}
                                                                    >
                                                                        Tutup {listData.child.length} Balasan
                                                                    </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) : null}
                                                    </View>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                ) : null}
                            </View>
                        )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export const DetailDokumenCuti = ({ route }) => {
  const approval = route.params;
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.superApps);
  const { arsip, status } = useSelector((state) => state.cuti);
  const arsipDetail = arsip.detail;

  const [collapse, setCollapse] = useState({
    nip: "",
    toggle: false,
  });
  const navigation = useNavigation();
  const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge";
  console.log(arsipDetail);

  const selisih = () => {
    let tanggalMulaiStr = moment(
      arsipDetail.detail_dokumen?.dokumen?.mulai_cuti,
      DATETIME.LONG_DATETIME
    ).format(DATETIME.LONG_DATE);
    let tanggalAkhirStr = moment(
      arsipDetail.detail_dokumen?.dokumen?.akhir_cuti,
      DATETIME.LONG_DATETIME
    ).format(DATETIME.LONG_DATE);

    let tanggalMulai = new Date(tanggalMulaiStr);
    let tanggalAkhir = new Date(tanggalAkhirStr);

    let selisih = (tanggalAkhir - tanggalMulai) / (1000 * 60 * 60 * 24);
    console.log(tanggalMulai);
    return selisih;
  };

  const [visibleModal, setVisibleModal] = useState(false);
  const [lampiranById, setLampiranById] = useState(null);
  const [komentarApproval, setKomentarApproval] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const getFileExtension = (lampiran) => {
    let jenis = lampiran?.split(".");
    jenis = jenis[jenis?.length - 1];
    return jenis;
  };

  const inputRef = useRef(null);
  const [parentId, setParentId] = useState("");
  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["95%"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetAttachComment = () => {
    bottomSheetModalRef.current?.present();
  };
  const bottomSheetAttachCommentClose = () => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
  };

  const [komen, setKomen] = useState("");

  let maxDay = arsipDetail.detail_dokumen?.jenis_cuti?.max_day?.toString();
  let durasiCuti = arsipDetail.detail_dokumen?.dokumen?.jumlah_cuti?.toString();
  let durasiBatal =
    arsipDetail.detail_dokumen?.dokumen?.jumlah_pembatalan?.toString();

  const handleSubmit = ({ status_approval }) => {
    const payload = {
      id_dokumen: arsipDetail.detail_dokumen?.dokumen?.id,
      nip_approval: profile?.nip,
      status_approval: status_approval,
      komentar: komentarApproval,
      passphrase: passphrase,
    };
    const data = {
      // token: token,
      payload: payload,
    };
    dispatch(postApproval(data));
  };

  // console.log(approval);
  return (
    <GestureHandlerRootView>
      <View style={{ position: "relative" }}>
        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              backgroundColor: COLORS.primary,
              height: 80,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text
                style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
              >
                Detail Cuti
              </Text>
            </View>
          </View>
          <View style={{ padding: 20, gap: 10 }}>
            <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
              <Ionicons
                name="document-outline"
                size={18}
                color={COLORS.primary}
              />
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>Jenis Cuti</Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 20,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "#DBDADE",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Jenis Cuti
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    width: "60%",
                    paddingRight: 20,
                  }}
                >
                  {arsipDetail.detail_dokumen?.jenis_cuti.nama}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "#DBDADE",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Tipe Hari
                </Text>
                {/* <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Hari Kalender</Text> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "#DBDADE",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Sub Jenis Cuti
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    width: "60%",
                    paddingRight: 20,
                    color: COLORS.info,
                  }}
                >
                  {arsipDetail.detail_dokumen?.jenis_cuti?.definition}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "#DBDADE",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Maksimal Hari
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    width: "60%",
                    paddingRight: 20,
                  }}
                >
                  {maxDay === undefined ? "-" : maxDay}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "#DBDADE",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Status Dokumen
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    width: "60%",
                    paddingRight: 20,
                  }}
                >
                  {arsipDetail.detail_dokumen?.dokumen?.status === "On Progress"
                    ? "Sedang Proses"
                    : "Disetujui"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    width: "40%",
                    paddingRight: 20,
                  }}
                >
                  Tipe Dokumen
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    width: "60%",
                    paddingRight: 20,
                    color: COLORS.danger,
                  }}
                >
                  {arsipDetail.detail_dokumen?.dokumen?.jenis_dokumen}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                paddingBottom: 15,
                columnGap: 10,
              }}
            >
              <Ionicons
                name="person-outline"
                size={18}
                color={COLORS.primary}
              />
              <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                Status Dokumen Cuti
              </Text>
            </View>
            <View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 15,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setCollapse({ nip: profile.nip, toggle: true })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "90%" }}>
                      <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                        {arsipDetail.detail_dokumen?.dokumen?.nama_pengaju}
                      </Text>
                      <Text>
                        NIP. {arsipDetail.detail_dokumen?.dokumen?.nip_pengaju}
                      </Text>
                    </View>
                    {collapse.nip === profile.nip &&
                    collapse.toggle === true ? (
                      <TouchableOpacity
                        onPress={() => setCollapse({ nip: "", toggle: false })}
                      >
                        <Ionicons name="chevron-up" size={24} />
                      </TouchableOpacity>
                    ) : (
                      <Ionicons name="chevron-down" size={24} />
                    )}
                  </View>
                </TouchableOpacity>

                {collapse.nip === profile.nip && collapse.toggle === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => setCollapse({ nip: "", toggle: false })}
                    >
                      <Text
                        style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}
                      >
                        Golongan
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {arsipDetail.detail_dokumen?.dokumen?.golongan_pengaju}
                      </Text>

                      <Text
                        style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}
                      >
                        Jabatan
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {arsipDetail.detail_dokumen?.dokumen?.posisi_pengaju}
                      </Text>

                      <Text
                        style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}
                      >
                        Unit Kerja
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {arsipDetail.detail_dokumen?.dokumen?.unit_kerja}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View style={{ paddingTop: 10, gap: 10 }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 20,
                    borderRadius: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 2,
                      borderBottomColor: "#DBDADE",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        width: "40%",
                        paddingRight: 20,
                      }}
                    >
                      Periode Cuti
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        width: "60%",
                        paddingRight: 20,
                      }}
                    >
                      {moment(
                        arsipDetail.detail_dokumen?.dokumen?.mulai_cuti,
                        DATETIME.LONG_DATETIME
                      ).format(DATETIME.LONG_DATE)}{" "}
                      -{" "}
                      {moment(
                        arsipDetail.detail_dokumen?.dokumen?.akhir_cuti,
                        DATETIME.LONG_DATETIME
                      ).format(DATETIME.LONG_DATE)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 2,
                      borderBottomColor: "#DBDADE",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        width: "40%",
                        paddingRight: 20,
                      }}
                    >
                      Durasi Cuti
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        width: "60%",
                        paddingRight: 20,
                      }}
                    >
                      {durasiCuti}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 2,
                      borderBottomColor: "#DBDADE",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        width: "40%",
                        paddingRight: 20,
                      }}
                    >
                      Alamat Cuti
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        width: "60%",
                        paddingRight: 20,
                      }}
                    >
                      {arsipDetail.detail_dokumen?.dokumen?.alamat_cuti}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 2,
                      borderBottomColor: "#DBDADE",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        width: "40%",
                        paddingRight: 20,
                      }}
                    >
                      No Telepon
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        width: "60%",
                        paddingRight: 20,
                      }}
                    >
                      {arsipDetail.detail_dokumen?.dokumen?.nomor_telpon}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        width: "40%",
                        paddingRight: 20,
                      }}
                    >
                      Alasan Cuti
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        width: "60%",
                        paddingRight: 20,
                      }}
                    >
                      {arsipDetail.detail_dokumen?.dokumen?.alasan_cuti}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    paddingBottom: 10,
                    paddingTop: 20,
                    columnGap: 10,
                  }}
                >
                  <Ionicons
                    name="attach-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={{ fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
                </View>

                {arsipDetail.detail_dokumen?.attachment?.length !== 0 ? (
                  <View
                    style={{
                      height: 184,
                      borderRadius: 16,
                      backgroundColor: "white",
                      paddingVertical: 16,
                      //shadow ios
                      shadowOffset: { width: -2, height: 4 },
                      shadowColor: "#171717",
                      shadowOpacity: 0.2,
                      //shadow android
                      elevation: 2,
                      paddingHorizontal: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FONTSIZE.Judul,
                        fontWeight: FONTWEIGHT.bold,
                      }}
                    >
                      <FlatList
                        key={"#"}
                        data={arsipDetail.detail_dokumen?.attachment}
                        renderItem={({ item }) => (
                          <View key={item.id}>
                            <CardLampiran
                              lampiran={item.attachment}
                              id={item.id}
                              name={item.name}
                              size={item.file_size}
                              type={getFileExtension(item.attachment)}
                              onClick={() => {
                                setVisibleModal(true);
                                setLampiranById(item);
                              }}
                            />
                          </View>
                        )}
                        scrollEnabled={true}
                        horizontal={true}
                        style={{ marginTop: 20 }}
                        // columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        // numColumns={2}
                        keyExtractor={(item) => "#" + item.id}
                      />
                    </Text>
                  </View>
                ) : (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.cardStatus}>
                        <View
                          style={{
                            width: "30%",
                            alignItems: "center",
                            rowGap: 20,
                          }}
                        >
                          <Text>-</Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                )}

                {lampiranById !== null ? (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visibleModal}
                    onRequestClose={() => {
                      setVisibleModal(false);
                      setLampiranById(null);
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        Platform.OS === "ios"
                          ? styles.iOSBackdrop
                          : styles.androidBackdrop,
                        styles.backdrop,
                      ]}
                    />
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setVisibleModal(false);
                          setLampiranById(null);
                        }}
                        style={{
                          position: "absolute",
                          top: "15%",
                          left: 20,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: COLORS.primary,
                            width: 51,
                            height: 51,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50,
                          }}
                        >
                          <Ionicons
                            name="close-outline"
                            color={COLORS.white}
                            size={24}
                          />
                        </View>
                      </TouchableOpacity>
                      {getFileExtension(lampiranById.name) === "png" ||
                      getFileExtension(lampiranById.name) === "jpg" ||
                      getFileExtension(lampiranById.name) === "jpeg" ? (
                        <View>
                          <Image
                            source={{ uri: lampiranById.file }}
                            style={{ width: 390, height: 283 }}
                          />
                        </View>
                      ) : getFileExtension(lampiranById.name) === "mp4" ? (
                        <Video
                          ref={video}
                          style={{ width: 390, height: 283 }}
                          source={{ uri: lampiranById.file }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                          onPlaybackStatusUpdate={(status) =>
                            setStatus(() => status)
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                  </Modal>
                ) : null}
              </View>
            </View>
          </View>
          <View>
            <View style={{ padding: 20, gap: 10 }}>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Yang Menyetujui
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 20,
                  borderRadius: 16,
                }}
              >
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      width: "40%",
                      paddingRight: 20,
                    }}
                  >
                    Yang Menyetujui
                  </Text>
                  <View style={{ gap: 10, width: "60%", paddingRight: 20 }}>
                    {arsipDetail.detail_dokumen?.approver?.length !== 0 ? (
                      arsipDetail.detail_dokumen?.approver.map((item) => {
                        return (
                          <Text>
                            - {item.nama_approver} / {item.nip_approver}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>-</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            {/* <View style={{ padding: 20, gap: 10 }}>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Periode Pembatalan
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 20,
                  borderRadius: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "#DBDADE",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      width: "50%",
                      paddingRight: 20,
                    }}
                  >
                    Periode Pembatalan
                  </Text>
                  <View style={{ gap: 1, width: "50%", paddingRight: 1 }}>
                    <Text style={{ fontSize: 12.5, fontWeight: 400 }}>
                      {moment(
                        arsipDetail.detail_dokumen?.dokumen?.mulai_pembatalan,
                        DATETIME.LONG_DATETIME
                      ).format(DATETIME.LONG_DATETIME)}{" "}
                      -{" "}
                      {moment(
                        arsipDetail.detail_dokumen?.dokumen?.akhir_pembatalan,
                        DATETIME.LONG_DATETIME
                      ).format(DATETIME.LONG_DATETIME)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      width: "50%",
                      paddingRight: 20,
                    }}
                  >
                    Durasi Pembatalan
                  </Text>
                  <View style={{ gap: 10, width: "50%", paddingRight: 20 }}>
                    <Text style={{ fontSize: 13, fontWeight: 400 }}>
                      {durasiBatal}
                    </Text>
                  </View>
                </View>
              </View>
            </View> */}
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
                <Ionicons
                  name="chatbox-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Histori Komentar
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  padding: 10,
                  paddingHorizontal: 20,
                  //shadow ios
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: "#171717",
                  //shadow android
                  elevation: 2,
                  width: "40%",
                  alignItems: "center",
                }}
                onPress={() => {
                  bottomSheetAttachComment();
                }}
              >
                <Text style={{ color: COLORS.primary }}>Lihat Komentar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            index={0}
            style={{ borderRadius: 50 }}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjust"
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView onLayout={handleContentLayout} style={{}}>
              {/* <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "height" : "height"}
                            > */}
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey,
                }}
              >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                  Histori Komentar
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetAttachCommentClose();
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={COLORS.lighter}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={arsipDetail?.komentar_dokumen}
                renderItem={({ item }) => (
                  <CardKomen
                    listData={item}
                    inputRef={inputRef}
                    setParentId={setParentId}
                    bottomSheetAttachCommentClose={
                      bottomSheetAttachCommentClose
                    }
                  />
                )}
                style={{ height: 500 }}
              />

              {/* <View style={{ justifyContent: "flex-end" }}>
                                <View
                                    style={{
                                        height: 1,
                                        width: "90%",
                                        backgroundColor: COLORS.lighter,
                                        opacity: 0.3,
                                        marginTop: 10,
                                        marginHorizontal: 20,
                                    }}
                                />
                                <View
                                    style={{
                                        borderWidth: 1,
                                        width: "90%",
                                        marginLeft: 17,
                                        borderRadius: 16,
                                        borderColor: COLORS.ExtraDivinder,
                                        flexDirection: "row",
                                        backgroundColor: COLORS.ExtraDivinder,
                                        marginTop: 10,
                                        marginBottom: 40,
                                    }}
                                >
                                    <BottomSheetTextInput
                                        numberOfLines={1}
                                        maxLength={40}
                                        placeholder="Ketik Komentar Disini"
                                        ref={inputRef}
                                        style={{ padding: 10 }}
                                        onChangeText={setKomen}
                                        value={komen}
                                    />
                                    <View
                                        style={{
                                            alignItems: "flex-end",
                                            flex: 1,
                                            marginRight: 10,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleComment();
                                            }}
                                        >
                                            <Ionicons
                                                name="send-sharp"
                                                size={20}
                                                color={COLORS.primary}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> */}
              {/* </KeyboardAvoidingView> */}
            </BottomSheetView>
          </BottomSheetModal>
          {/* <View style={{ padding: 20, gap: 10 }}>
            <View style={{}}>
              <View style={{ alignItems: "center", gap: 10 }}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("TambahCutiTahunan")}
                  style={{
                    backgroundColor: COLORS.infoDanger,
                    padding: 15,
                    borderRadius: 5,
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="print-outline"
                    size={18}
                    color={COLORS.white}
                    paddingRight={10}
                  />
                  <Text style={{ color: COLORS.white }}>Cetak PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
          {arsipDetail.detail_dokumen?.dokumen?.status === "On Progress" &&
          approval.approval === true ? (
            <>
              <View style={{ paddingHorizontal: 20, paddingTop: 10, gap: 10 }}>
                <View
                  style={{ flexDirection: "row", padding: 5, columnGap: 10 }}
                >
                  <Ionicons
                    name="chatbox-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={{ fontWeight: FONTWEIGHT.bold }}>
                    Komentar Yang Menyetujui
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 20,
                    borderRadius: 16,
                  }}
                >
                  <Text>Komentar</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: COLORS.ExtraDivinder,
                      borderRadius: 16,
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder="Masukan Komentar"
                      onChangeText={setKomentarApproval}
                      style={{ padding: 10, height: 40 }}
                    />
                  </View>

                  <Text style={{ marginTop: 10 }}>Passphrase</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: COLORS.ExtraDivinder,
                      borderRadius: 16,
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder="Masukan Passphrase"
                      onChangeText={setPassphrase}
                      style={{ padding: 10, height: 40 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ padding: 20, gap: 10 }}>
                <View style={{}}>
                  <View style={{ alignItems: "center", gap: 10 }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleSubmit({ status_approval: "approve" })
                      }
                      style={{
                        backgroundColor: COLORS.success,
                        padding: 15,
                        borderRadius: 5,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons
                        name="checkmark-outline"
                        size={18}
                        color={COLORS.white}
                        paddingRight={10}
                      />
                      <Text style={{ color: COLORS.white }}>Disetujui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleSubmit({ status_approval: "returned" })
                      }
                      style={{
                        backgroundColor: COLORS.info,
                        padding: 15,
                        borderRadius: 5,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons
                        name="arrow-undo-outline"
                        size={18}
                        color={COLORS.white}
                        paddingRight={10}
                      />
                      <Text style={{ color: COLORS.white }}>Perubahan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleSubmit({ status_approval: "postponed" })
                      }
                      style={{
                        backgroundColor: COLORS.foundation,
                        padding: 15,
                        borderRadius: 5,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons
                        name="alert-outline"
                        size={18}
                        color={COLORS.white}
                        paddingRight={10}
                      />
                      <Text style={{ color: COLORS.white }}>Ditangguhkan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleSubmit({ status_approval: "rejected" })
                      }
                      style={{
                        backgroundColor: COLORS.infoDanger,
                        padding: 15,
                        borderRadius: 5,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons
                        name="close-outline"
                        size={18}
                        color={COLORS.white}
                        paddingRight={10}
                      />
                      <Text style={{ color: COLORS.white }}>
                        Tidak Disetujui
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : null}

          <ModalSubmit
            status={status}
            setStatus={setStatus}
            navigate={"MainCuti"}
          />
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  cardStatus: {
    width: 175,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  cardKouta: {
    width: 360,
    // padding: 1,
    borderRadius: 8,
    // marginHorizontal: 5,
    // margin:10,
    marginVertical: 10,
    flexDirection: "row",
  },
});
