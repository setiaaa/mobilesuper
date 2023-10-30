import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getDetailPegawai } from '../../service/api'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

export const CardListPegawai = ({ item, collapse, setCollapse, token, }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const loading = false

    const getDetail = (nip) => {
        const params = { token, nip }
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailPegawai(params))
    }
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        <View style={{
            flexDirection: 'column', display: 'flex',
            backgroundColor: COLORS.white,
            width: '90%',
            padding: 20,
            marginTop: 10,
            borderRadius: 8,
            marginHorizontal: 15,
        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
                onPress={() => setCollapse({ nip: item.nip, toggle: true })}
            >
                <View style={{ width: Platform.OS === 'ios' ? '92%' : '93%' }}>
                    {loading ? (
                        <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={250} height={20} />
                    ) : (
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                    )}

                    {loading ? (
                        <ShimmerPlaceHolder style={{ borderRadius: 4, marginTop: 10 }} width={100} height={20} />
                    ) : (
                        <Text style={{ marginTop: 5 }}>{item.nip}</Text>
                    )}
                </View>
                {collapse.nip === item.nip && collapse.toggle === true ? (
                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                        <Ionicons name='chevron-up' size={24} />
                    </TouchableOpacity>
                ) : (
                    <Ionicons name='chevron-down' size={24} />
                )}
            </TouchableOpacity>

            {collapse.nip === item.nip && collapse.toggle === true ? (
                <View>

                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                        <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>Unit Kerja</Text>
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4, marginTop: 10 }} width={100} height={20} />
                        ) : (
                            <Text style={{ marginTop: 5 }}>{item.nama_jabatan}</Text>
                        )}

                        <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>SATKER</Text>
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4, marginTop: 10 }} width={200} height={20} />
                        ) : (
                            <Text style={{ marginTop: 5 }}>{item.unit_kerja}</Text>
                        )}
                    </TouchableOpacity>

                    {loading ? (
                        null
                    ) : (
                        <TouchableOpacity style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: COLORS.danger,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            borderRadius: 8,
                        }}
                            onPress={() => {
                                getDetail(item.nip)
                                navigation.navigate('DetailProfile')
                            }}
                        >
                            <Text style={{ color: COLORS.white }}>Lihat Detail Pegawai</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                null
            )}
        </View>
    )
}
