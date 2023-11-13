import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { View } from "react-native"
import { COLORS, DATETIME, FONTWEIGHT } from "../../config/SuperAppps"
import { Text } from "react-native"
import moment from "moment"
import { TouchableOpacity } from "react-native"
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder"
import { LinearGradient } from "expo-linear-gradient"

export const CardListAbsenEvent = ({ item, role, setScanData, setIdAbsen, eventpic, loading }) => {
    const [user, setUser] = useState('member')
    const [checkIn, setCheckin] = useState('')
    const navigation = useNavigation()
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={
                {
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    marginTop: 10,
                    padding: 20,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,
                }}
            // onPress={() => {
            //     navigation.navigate('DetailAbsen')
            // }}
            >
                {loading ? (
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                ) : (
                    <Text style={{ fontWeight: FONTWEIGHT.bold}}>{item.member?.nama}</Text>
                )}
                <View style={{ marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ width: 110, color: COLORS.lighter }}>Status</Text>
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                        ) : (
                            <View style={{
                                width: 80,
                                height: 24,
                                borderRadius: 30,
                                backgroundColor: item.status === 'hadir' ? COLORS.successLight : item.status === 'waiting' ? COLORS.infoLight : null,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: item.status === 'hadir' ? COLORS.success : item.status === 'waiting' ? COLORS.info : null,
                                }}>{item.status}</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        {user === 'admin' && checkIn === '' ? (
                            <TouchableOpacity style={{
                                width: 97,
                                height: 24,
                                borderRadius: 8,
                                backgroundColor: COLORS.foundation,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => setCheckin('1')}
                            >
                                <Text style={{ color: COLORS.white }}>Check In</Text>
                            </TouchableOpacity>
                        ) : user === 'resepsionis' && checkIn === '' ? (
                            <TouchableOpacity style={{
                                width: 97,
                                height: 24,
                                borderRadius: 8,
                                backgroundColor: COLORS.foundation,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => setCheckin('1')}
                            >
                                <Text style={{ color: COLORS.white }}>Check In</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ width: 120, color: COLORS.lighter }}>Waktu Check In</Text>
                                {loading ? (
                                    <View style={{ width: 200, }}>
                                        <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                                    </View>
                                ) : (
                                    <View style={{ width: 200, height: 24, borderRadius: 30, backgroundColor: COLORS.ExtraDivinder, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{moment(item.updated_at, 'HH:mm:ss').format(DATETIME.LONG_DATETIME)}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                    {eventpic === true && item.status !== 'hadir' ||
                        role.is_pic === true && item.status !== 'hadir' ||
                        role.is_presensi === true && item.status !== 'hadir' ||
                        role.is_pic === false && item.status !== 'hadir' &&
                        role.is_notulensi === false && item.status !== 'hadir' &&
                        role.is_presensi === false && item.status !== 'hadir' &&
                        role.is_member === false && item.status !== 'hadir'
                        ? (

                            <TouchableOpacity style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: COLORS.primary,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                            }}
                                onPress={() => {
                                    setScanData(false)
                                    setIdAbsen(item.id)
                                }
                                }
                            >
                                <Text style={{ color: COLORS.white }}>Scan QRCode</Text>
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                </View>
            </View>
        </View>
    )
}