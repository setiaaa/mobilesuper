import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const data = [
    {
        id: '1',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    },
    {
        id: '2',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    },
    {
        id: '3',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    },
    {
        id: '4',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    },
    {
        id: '5',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    },
    {
        id: '6',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
    }
];


export const CardLiniMasaSatker = ({ image, judul, nama, jenis, deskripsi }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ marginLeft: 20, color: '#111827', fontWeight: 600, fontSize: 17 }}>Linimasa Pengetahuan</Text>
            </View>
            <View>
                <Image source={image} />
                <Text>{judul}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        width: '90%',
        height: 76,
        marginLeft: 20,
        opacity: 0.9,
        borderRadius: 12
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
})