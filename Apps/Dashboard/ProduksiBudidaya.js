import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/SuperAppps';
import { StyleSheet } from 'react-native';
import { TopsProduksiBudidaya } from '../Korespondensi/AppNavigator';
import { useDispatch } from 'react-redux';
import { setTeknologiList } from '../../store/Dashboard';

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


export const ProduksiBudidaya = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTeknologiList(teknologi))
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.primary, height: '10%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                        <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Produksi Budidaya</Text>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <TopsProduksiBudidaya />
            </View>
        </SafeAreaView>
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