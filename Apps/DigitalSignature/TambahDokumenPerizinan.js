import React, { useEffect, useState } from "react";
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Dropdown } from "../../components/DropDown";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { postAttachment } from "../../service/api";
import { setAddressbookSelected } from "../../store/AddressbookKKP";
import { jenisPerizinan, kategoriPerizinan, jenisPermohonan, listParaf } from "./dataDokPerizinan";

export default TambahDokumenPerizinan = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { profile } = useSelector((state) => state.superApps);
    const { attachment } = useSelector((state) => state.event);
    const { status } = useSelector((state) => state.digitalsign);
    const { addressbook } = useSelector((state) => state.addressBookKKP);

    const [type, setType] = useState([]);
    const [token, setToken] = useState("");
    const [stateConfig, setStateConfig] = useState({});
    const [data, setData] = useState({
        jenisPerizinan: {
            key: '',
            value: '',
        },
        kategoriPerizinan: {
            key: '',
            value: '',
        },
        jenisPermohonan: {
            key: '',
            value: '',
        },
        perihal: '',
        nomorPerizinan: '',
        paraf: [],
        lampiran: [],
    })

    const handleSetData = (name, value) => {
        if (name === 'jenisPerizinan') {
            setData({
                ...data,
                [name]: value,
                kategoriPerizinan: { key: '', value: '' }
            })
        }
        if (name === 'kategoriPerizinan') {
            setData({
                ...data,
                [name]: value,
                paraf: listParaf
            })
        } else {
            setData({
                ...data,
                [name]: value
            })
        }
    }

    const pickDocument = async () => {
        let doc = [...data.lampiran]
        let result = await DocumentPicker.getDocumentAsync({});

        // Sementara masih tes di android
        // let tipe = result.uri.split("/");
        // tipe = tipe[tipe.length - 1];
        // tipe = tipe.split(".");
        // tipe = tipe[tipe.length - 1];
        // doc.push(result)
        let tipe = result.assets[0].uri.split('/');
        tipe = tipe[tipe.length - 1];
        tipe = tipe.split('.');
        tipe = tipe[tipe.length - 1];
        doc.push(result.assets[0])

        const dataPayload = {
            token: token,
            result: result.assets[0],
        };

        setType([...type, tipe]);
        dispatch(postAttachment(dataPayload));
        handleSetData('lampiran', doc)
    };

    const handleSubmit = () => {
        const idAtt = [];
        const approvers = [];

        data.paraf?.map((item) => {
            approvers.push(item.nip);
        });
        attachment?.map((item) => {
            idAtt.push(item.id);
        });

        const payload = {
            subject: data.perihal,
            senders: [profile.nip],
            approvers: approvers,
            action: 'submit',
            id_attachments: idAtt,
            extra_attributes: {
                jenis_perizinan: data.jenisPerizinan.value,
                kategori_perizinan: data.kategoriPerizinan.value,
                jenis_permohonan: data.jenisPermohonan.value,
                no_perizinan: data.nomorPerizinan,
            },
            comment: 'comment',
            tipe_dokumen: 'dokumen_pkrl',
        };

        const dataPayload = {
            token: token,
            payload: payload,
        };

        console.log(dataPayload)
    };

    const handleGetKategoriPerizinan = () => {
        if (data.jenisPerizinan.key !== '') {
            return kategoriPerizinan.filter(x => x.group === data.jenisPerizinan?.group)
        }
        return []
    }

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        if (stateConfig.title === "Paraf") {
            handleSetData('paraf', addressbook.selected);
        }
    }, [addressbook]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ScrollView>
                    {/* Header Section */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: COLORS.primary,
                            height: 80,
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
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons
                                    name="chevron-back-outline"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: "center", marginRight: 50 }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: COLORS.white,
                                }}
                            >
                                Tambah Data Perizinan
                            </Text>
                        </View>
                    </View>
                    {/* Form Data */}
                    <View style={styles.Card}>
                        {/* Jenis Perizinan */}
                        <View
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Jenis Perizinan
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View style={{ marginHorizontal: 17 }}>
                            <Dropdown
                                data={jenisPerizinan}
                                borderWidth={1}
                                borderwidthDrop={1}
                                borderWidthValue={1}
                                borderColor={COLORS.ExtraDivinder}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderColorValue={COLORS.ExtraDivinder}
                                setSelected={(item) => handleSetData('jenisPerizinan', item)}
                            />
                        </View>

                        {/* Kategori Perizinan */}
                        <View
                            style={{
                                marginTop: 20,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Kategori Perizinan
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View style={{ marginHorizontal: 17 }}>
                            <Dropdown
                                data={handleGetKategoriPerizinan()}
                                borderWidth={1}
                                borderwidthDrop={1}
                                borderWidthValue={1}
                                borderColor={COLORS.ExtraDivinder}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderColorValue={COLORS.ExtraDivinder}
                                setSelected={(item) => handleSetData('kategoriPerizinan', item)}
                            />
                        </View>

                        {/* Jenis Permohonan */}
                        <View
                            style={{
                                marginTop: 20,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Jenis Permohonan
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View style={{ marginHorizontal: 17 }}>
                            <Dropdown
                                data={jenisPermohonan}
                                borderWidth={1}
                                borderwidthDrop={1}
                                borderWidthValue={1}
                                borderColor={COLORS.ExtraDivinder}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderColorValue={COLORS.ExtraDivinder}
                                setSelected={(item) => handleSetData('jenisPermohonan', item)}
                            />
                        </View>

                        {/* Perihal Perizinan */}
                        <View
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Perihal Perizinan
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                width: "90%",
                                marginLeft: 17,
                                borderRadius: 4,
                                borderColor: COLORS.ExtraDivinder,
                            }}
                        >
                            <TextInput
                                editable
                                multiline
                                maxLength={100}
                                numberOfLines={4}
                                value={data.perihal}
                                style={{ padding: 10 }}
                                allowFontScaling={false}
                                placeholder="Masukan Perihal Perizinan"
                                onChangeText={(value) => handleSetData('perihal', value)}
                            />
                        </View>

                        {/* Nomor Perizinan */}
                        <View
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Nomor Perizinan
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                width: "90%",
                                marginLeft: 17,
                                borderRadius: 4,
                                borderColor: COLORS.ExtraDivinder,
                            }}
                        >
                            <TextInput
                                editable
                                multiline
                                maxLength={40}
                                numberOfLines={4}
                                style={{ padding: 10 }}
                                allowFontScaling={false}
                                value={data.nomorPerizinan}
                                placeholder="Masukan Nomor Perizinan"
                                onChangeText={(value) => handleSetData('nomorPerizinan', value)}
                            />
                        </View>

                        {/* Paraf */}
                        <View
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Paraf
                            </Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                marginHorizontal: 17,
                                borderRadius: 4,
                                borderColor: COLORS.ExtraDivinder,
                                flexDirection: "row",
                            }}
                        >
                            <TextInput
                                editable
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                                placeholder="Pilih dari Addressbook"
                                style={{ padding: 10, width: "80%" }}
                                value={data.paraf}
                                allowFontScaling={false}
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
                                        const config = {
                                            title: "Paraf",
                                            tabs: {
                                                jabatan: true,
                                                pegawai: false,
                                            },
                                            multiselect: true,
                                            payload: data.paraf,
                                        };
                                        setStateConfig(config);
                                        navigation.navigate("AddressBook", { config: config });
                                    }}
                                >
                                    <Ionicons
                                        name="people-outline"
                                        size={24}
                                        color={COLORS.grey}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* List Paraf */}
                        {data.paraf.length > 0 && <Text>Adaa</Text>}
                        <FlatList
                            data={data.paraf}
                            renderItem={({ item }) => (
                                <CardListPeserta item={item} addressbook={addressbook} />
                            )}
                            scrollEnabled={false}
                            keyExtractor={(index) => index}
                        />

                        {/* Lampiran */}
                        <View
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 17,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: FONTWEIGHT.bold,
                                    fontSize: FONTSIZE.H3,
                                }}
                            >
                                Lampiran
                            </Text>
                        </View>
                        <Pressable onPress={pickDocument}>
                            <View
                                style={{
                                    borderWidth: 1,
                                    width: "90%",
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    height: 250,
                                    marginBottom: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 5,
                                }}
                            >
                                <View style={{ marginBottom: 10 }}>
                                    <Ionicons
                                        name="md-cloud-upload-outline"
                                        size={30}
                                        color={"#66656C"}
                                    />
                                </View>
                                <Text style={{ color: "#66656C" }}>Klik Untuk Unggah</Text>
                            </View>
                        </Pressable>
                        {data.lampiran.length < 1 ? null : (
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginHorizontal: 20,
                                    marginVertical: 10,
                                    flexWrap: "wrap",
                                    gap: 10,
                                }}
                            >
                                {data?.lampiran?.map((doc, i) => (
                                    <>
                                        {type[i] === "doc" || type[i] === "docx" ? (
                                            <View
                                                style={{
                                                    width: 97,
                                                    height: 97,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: COLORS.ExtraDivinder,
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/superApp/word.png")}
                                                />
                                            </View>
                                        ) : type[i] === "pdf" ? (
                                            <View
                                                style={{
                                                    width: 97,
                                                    height: 97,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: COLORS.ExtraDivinder,
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/superApp/pdf.png")}
                                                />
                                            </View>
                                        ) : type[i] === "ppt" || type[i] === "pptx" ? (
                                            <View
                                                style={{
                                                    width: 97,
                                                    height: 97,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: COLORS.ExtraDivinder,
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/superApp/ppt.png")}
                                                />
                                            </View>
                                        ) : type[i] === "xls" || type[i] === "xlsx" ? (
                                            <View
                                                style={{
                                                    width: 97,
                                                    height: 97,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: COLORS.ExtraDivinder,
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/superApp/excel.png")}
                                                />
                                            </View>
                                        ) : (
                                            <Image
                                                key={doc.uri}
                                                source={{ uri: doc.uri }}
                                                style={{ width: 97, height: 97, borderRadius: 8 }}
                                            />
                                        )}
                                    </>
                                ))}
                            </View>
                        )}
                        <View style={{ marginVertical: 10, marginHorizontal: 17 }}>
                            <Text style={{ color: COLORS.lighter }}>
                                *) Hanya png, jpg, jpeg, pdf, doc, docx, ppt, pptx, xls,
                                xlsx yang akan diterima dan ukuran file maks 100 MB
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* FAB */}
                <TouchableOpacity
                    style={{ position: "absolute", right: 20, bottom: 100 }}
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.infoDanger,
                            borderRadius: 50,
                            width: 44,
                            height: 44,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="checkmark-outline"
                            size={24}
                            color={COLORS.white}
                        />
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={status === "" ? false : true}
                    onRequestClose={() => {
                        dispatch(setStatus(""));
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
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.white,
                                alignItems: "center",
                                justifyContent: "center",
                                width: 325,
                                height: 350,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => dispatch(setStatus(""))}
                                style={{ marginTop: 5, paddingRight: "80%" }}
                            >
                                <Ionicons name="close-outline" size={24} />
                            </TouchableOpacity>
                            {status === "berhasil" ? (
                                <>
                                    <View style={{ marginBottom: 40 }}>
                                        <Image
                                            source={require("../../assets/superApp/alertBerhasil.png")}
                                        />
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 20,
                                            }}
                                        >
                                            <Text>Berhasil Ditambahkan!</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                dispatch(setStatus(""));
                                                navigation.navigate("HalamanUtama");
                                            }}
                                            style={{
                                                marginTop: 20,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: COLORS.success,
                                                    width: 217,
                                                    height: 39,
                                                    borderRadius: 8,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text style={{ color: COLORS.white }}>Ok</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) : (
                                <View style={{ marginBottom: 40 }}>
                                    <Image
                                        source={require("../../assets/superApp/alertGagal.png")}
                                    />
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text>Terjadi Kesalahan!</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setStatus(""))}
                                        style={{
                                            marginTop: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: COLORS.danger,
                                                width: 217,
                                                height: 39,
                                                borderRadius: 8,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text style={{ color: COLORS.white }}>Ok</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};
const styles = StyleSheet.create({
    Card: {
        backgroundColor: COLORS.white,
        width: "90%",
        marginVertical: 20,
        marginLeft: 20,
        borderRadius: 16,
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3,
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const CardListPeserta = ({ item, addressbook }) => {
    const dispatch = useDispatch();
    const deleteItem = (id, state) => {
        let data;
        if (state === "jabatan") {
            data = addressbook.selected.filter((data) => data.id !== id);
            dispatch(setAddressbookSelected(data));
        } else {
            data = addressbook.selected.filter((data) => data.nip !== id);
            dispatch(setAddressbookSelected(data));
        }
    };
    return (
        <View>
            {item.title === undefined ? null : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: "5%",
                        gap: 10,
                    }}
                >
                    <Text>-</Text>
                    <Text style={{ width: "80%" }}>{item.title}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(item.id, "jabatan");
                        }}
                    >
                        <Ionicons name="trash-outline" size={24} />
                    </TouchableOpacity>
                </View>
            )}
            {item.fullname === undefined ? null : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: "5%",
                        gap: 10,
                    }}
                >
                    <Text>-</Text>
                    <Text style={{ width: "80%" }}>{item.fullname}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(item.nip, "pegawai");
                        }}
                    >
                        <Ionicons name="trash-outline" size={24} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
