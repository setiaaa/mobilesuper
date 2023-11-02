import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export const CardKebijakan = ({ subjek, bentuk, id_peraturan, item, route, nomor, tahun }) => {
    const navigation = useNavigation()
    const title = subjek
    return (
        <View key={id_peraturan}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailDashboard', {
                data: item
            })}>
                <View style={styles.card}>
                    <Text numberOfLines={3} style={styles.nama}>{title}</Text>
                    <Text style={styles.deskripsi}>No. {nomor} / {tahun}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nama: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        // paddingHorizontal:20,
        paddingTop: 10
    },
    deskripsi: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        fontWeight: '600',
        // paddingHorizontal:20,
    },
    tanggal: {
        fontSize: 14,
        color: 'grey',
        marginTop: 10
    },
    card: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        width: '100%',
        height: 110,
        borderBottomWidth: 1,
        borderBottomColor: '#959CA9',
        paddingHorizontal:10,
    },
})