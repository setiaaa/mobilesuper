import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "../../components/Search";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../config/SuperAppps";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTokenValue } from "../../service/session";
import { getDetailBerita } from "../../service/api";
import { CardListBeritaHome } from "../../components/CardListBeritaHome";
import { CardListBeritaSatker } from "../../components/CardListBeritaSatker";



export const ListBeritaSatker = () => {
    const { berita } = useSelector(state => state.satker)
    const navigation = useNavigation();
    const [token, setToken] = useState("");

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#f7f7f7", flex: 1 }}>
                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        height: "10%",
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View
                            style={[
                                styles.backIcon,
                                {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 25,
                                    marginLeft: 20,
                                },
                            ]}
                        >
                            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 40,
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 15, fontWeight: 600 }}>
                            Berita
                        </Text>
                    </View>
                </View>
                <View style={{ width: "90%", marginLeft: 20, marginTop: 20 }}>
                    <Search placeholder={"Pencarian"} />
                </View>
                <FlatList
                    data={berita.lists}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <CardListBeritaSatker
                                image={item.image}
                                tanggal={item.updated_at}
                                // subtitle={item.subtitle}
                                title={item.title}
                                id={item.id}
                                item={item}
                                token={token}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: "white",
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193,
        width: 350,
        borderRadius: 16,
    },
    imageAndroid: {
        height: 193,
        width: 369,
        borderRadius: 16,
    },
});
