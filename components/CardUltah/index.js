import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { FlatList } from 'react-native';
import { FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';

const CardLiniMasaSatker = ({ no, nama, unit }) => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 20, }}>
            <View style={styles.cardNo}>
                <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{no}.</Text>
            </View>
            <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{nama}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

export const CardUltah = ({ ultah }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center', flex: 1, marginVertical: 20 }}>
                    <Image source={require('../../assets/superApp/cake_24.png')} />
                    <Text style={{ textAlign: 'center', color: '#474747', fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H1, paddingTop: 10 }}>Selamat Ulang Tahun Bulan Juni</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Divider bold style={{ width: '75%', backgroundColor: '#999999' }} />
                </View>
                <View style={{ height: 368 }}>
                    <ScrollView>
                        {
                            ultah.map((item, index) => (
                                <View key={index}>
                                    <CardLiniMasaSatker
                                        no={item.no}
                                        nama={item.nama}
                                        unit={item.unit}
                                        item={item}
                                    />
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#EEF5D3",
        flexDirection: "column",
        width: '90%',
        marginLeft: 20,
        borderRadius: 16,
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    cardNo: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: 'white',
        marginLeft: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})