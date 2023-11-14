import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { COLORS, PADDING } from '../../config/SuperAppps';
import { StyleSheet } from 'react-native';
import { TopsKeuanganKinerja } from '../../utils/menutab';
import { useDispatch } from 'react-redux';
import { setTeknologiList } from '../../store/Dashboard';
import { useNavigation } from '@react-navigation/native';

const teknologi = [
    {
        image: require('../../assets/superApp/teknologi.png'),
        imagedetail: require('../../assets/superApp/teknologi2.png'),
        deskripsi: 'Larangan Pengeluaran Ikan Arwana dan Ikan Botia'
    },
    {
        image: require('../../assets/superApp/teknologi.png'),
        deskripsi: 'Pengelolaan Kesehatan Ikan dan Lingkungan Tambak Budidaya Udang Intensif'
    },
    {
        image: require('../../assets/superApp/teknologi.png'),
        imagedetail: require('../../assets/superApp/teknologi2.png'),
        deskripsi: 'Penyakit Undang'
    },
]


export const Keuangan = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.primary, height: '10%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                        <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Keuangan & Kinerja</Text>
                </View>
            </View>

            <View style={{ flex: 1, }}>
                <TopsKeuanganKinerja />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193, width: 350, borderRadius: 16
    },
    imageAndroid: {
        height: 193, width: 369, borderRadius: 16
    },
})