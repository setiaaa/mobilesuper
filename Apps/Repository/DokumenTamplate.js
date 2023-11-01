import React, { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '../../components/Search'
import { Dropdown } from '../../components/DropDown'
import ListEmpty from '../../components/ListEmpty'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { getTokenValue } from '../../service/session'
import { useEffect } from 'react'
import { getDetailDocument, getDocumentTamplate } from '../../service/api'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from 'react-native-portalize'
import { Divider } from 'react-native-paper'
import moment from 'moment'
import { Loading } from '../../components/Loading'

const DataList = ({ token, item, bottomSheetAttach }) => {
    const dispatch = useDispatch();

    const getDetailRepo = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDocument(params));
    };

    return (
        <BottomSheetModalProvider>
            <View
                key={item.id}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: 10,
                    marginHorizontal: 20,
                    backgroundColor: "white",
                    borderRadius: 8,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            display: "flex",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetAttach(item);
                                getDetailRepo(item.id);
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: FONTWEIGHT.bold,
                                    marginBottom: 10,
                                    width: 300
                                }}
                            >
                                {item.title}
                            </Text>


                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: 100
                                    }}
                                >
                                    Pembuat
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                    }}
                                >
                                    {item.creator}
                                </Text>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10,
                                    marginVertical: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: 100
                                    }}
                                >
                                    Deskripsi
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: 200
                                    }}
                                >
                                    {item.attributes.deskripsi}
                                </Text>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: 100
                                    }}
                                >
                                    Perubahan
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                    }}
                                >
                                    {moment(item.updated_at).format("DD MMMM yyyy")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={24}
                  color={COLORS.grey}
                />
              </View> */}
                    </View>
                </View>
            </View>
        </BottomSheetModalProvider>
    );
};


export const DokumenTamplate = () => {
    const [token, setToken] = useState("");
    const [dataM, setDataM] = useState([]);
    const [page, setPage] = useState(10);
    const [type, setType] = useState({
        key: 'false',
        value: 'Draft'
    });
    const dispatch = useDispatch();
    const navigation = useNavigation()

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        if (token !== "") {
            dispatch(getDocumentTamplate({ token: token, page: page }));
        }
    }, [token, page]);


    const { tamplate, loading, load } = useSelector((state) => state.repository);

    const loadMore = () => {
        if (tamplate.lists.length % 10 === 0) {
            setPage(page + 10)
        }
    }

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const bottomSheetAttach = (item) => {
        bottomSheetModalRef.current?.present();
        setDataM(item);
    };

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
    };

    console.log(tamplate)
    return (
        <GestureHandlerRootView>
            {loading === true && tamplate.lists.length === 0 ? (
                <Loading />
            ) : (
                null
            )}
            <SafeAreaView>
                <View style={{ marginBottom: 20 }}>
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
                                backgroundColor: "white",
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
                                    color={"#800000"}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
                                Dokumen Tamplate
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "90%", marginLeft: 20, marginVertical: 20 }}>
                        <Search
                            placeholder={"Cari"}
                        // onSearch={filter} 
                        />
                        <View style={{ marginTop: 20 }}>
                            {/* <Dropdown
                                data={dropdownFilter}
                                placeHolder={'Filter'}
                                backgroundColor={COLORS.white}
                                selected={type}
                                setSelected={setType}
                            /> */}
                        </View>
                    </View>
                    <View>
                        <FlatList
                            key={"_"}
                            data={tamplate.lists}
                            renderItem={({ item }) => (
                                <DataList
                                    bottomSheetAttach={bottomSheetAttach}
                                    item={item}
                                    token={token}
                                />
                            )}
                            ListFooterComponent={() => (
                                load === true ? (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                                        <ActivityIndicator size="large" color={COLORS.primary} />
                                    </View>
                                ) : (
                                    null
                                )
                            )}
                            keyExtractor={(item) => "_" + item.id}
                            style={{ height: 450 }}
                            ListEmptyComponent={() => <ListEmpty />}
                            onEndReached={() => {
                                if (tamplate.lists.length !== 0) {
                                    loadMore()
                                }
                            }}
                        />
                        <Portal>
                            <BottomSheetModalProvider>
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
                                    <BottomSheetView onLayout={handleContentLayout}>
                                        <View style={{ marginVertical: 20 }}>
                                            <View
                                                style={{
                                                    marginLeft: 30,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 10,
                                                }}
                                            >
                                                <Ionicons
                                                    name="document-outline"
                                                    size={32}
                                                    color={COLORS.primary}
                                                />
                                                <Text
                                                    style={{
                                                        fontSize: FONTSIZE.H2,
                                                        fontWeight: FONTWEIGHT.normal,
                                                        width: 300
                                                    }}
                                                >
                                                    {dataM.title}
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Divider bold />
                                            </View>
                                            <TouchableOpacity>
                                                <View
                                                    style={{
                                                        marginLeft: 30,
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: 10,
                                                        marginTop: 20,
                                                    }}
                                                >
                                                    <Ionicons
                                                        name="download-outline"
                                                        size={32}
                                                        color={"#6B7280"}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: FONTSIZE.H2,
                                                            fontWeight: FONTWEIGHT.normal,
                                                        }}
                                                    >
                                                        Download
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("MainDetailRepo");
                                                    bottomSheetAttachClose();
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        marginLeft: 30,
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: 10,
                                                        marginTop: 20,
                                                    }}
                                                >
                                                    <Ionicons
                                                        name="information-circle-outline"
                                                        size={32}
                                                        color={"#6B7280"}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: FONTSIZE.H2,
                                                            fontWeight: FONTWEIGHT.normal,
                                                        }}
                                                    >
                                                        Details & activity
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </BottomSheetView>
                                </BottomSheetModal>
                            </BottomSheetModalProvider>
                        </Portal>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
