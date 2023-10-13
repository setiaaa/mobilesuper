import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { FlatList } from 'react-native';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import moment from 'moment';
import 'moment/locale/id'
moment.locale('id')

const CardLiniMasaSatker = ({ no, nama, nama_jabatan }) => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 20, }}>
            <View style={styles.cardNo}>
                <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>{no + 1}.</Text>
            </View>
            <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>{nama}</Text>
                <Text style={{ color: COLORS.white }}>{nama_jabatan}</Text>
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
                    <View style={{ backgroundColor: COLORS.white, width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/cake_24.png')} />
                    </View>
                    <Text style={{ textAlign: 'center', color: COLORS.white, fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H1 }}>Selamat Ulang Tahun Bulan {moment(ultah.date_birth).format('MMMM')}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Divider bold style={{ width: '75%', backgroundColor: COLORS.white }} />
                </View>
                <View style={{ height: 368 }}>
                    <ScrollView>
                        {
                            ultah.map((item, index) => (
                                <View key={index}>
                                    <CardLiniMasaSatker
                                        no={index}
                                        nama={item.nama}
                                        nama_jabatan={item.nama_jabatan}
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
        backgroundColor: COLORS.info,
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