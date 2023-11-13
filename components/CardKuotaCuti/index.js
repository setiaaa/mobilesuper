import React from 'react'
import { View } from 'react-native'
import { COLORS, DATETIME, FONTWEIGHT } from '../../config/SuperAppps'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import moment from 'moment'

export const CardKuotaCuti = ({ item }) => {
    return (
        <View>
            <View style={{ gap: 20, flexDirection: 'row' }}>
                <View style={[styles.cardKouta]}>
                    <View style={{
                        width: "60%",
                        padding: 15,
                        borderRadius: 8,
                        backgroundColor: COLORS.white,
                        alignItems: "center"
                    }}>
                        <View style={{ rowGap: 10 }}>
                            <Text style={{ fontSize: 12 }}>Jenis : {item.jenis_cuti}</Text>
                            <Text style={{ fontSize: 12 }}>Periode:  {item.periode} </Text>
                            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai Berlaku: {moment(item.mulai_berlaku, "DD MMMM YYYY HH:mm:ss").format(DATETIME.LONG_DATE)}</Text>
                            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Akhir Beralaku: {moment(item.akhir_berlaku, "DD MMMM YYYY HH:mm:ss").format(DATETIME.LONG_DATE)}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: "40%",
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                        backgroundColor: "grey",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <View style={{ gap: 20, }}>
                            <View style={{ flexDirection: "row", columnGap: 5, alignItems: "center" }}>
                                <Text>Kuota Cuti</Text>
                                <View style={{ backgroundColor: COLORS.white, borderRadius: 5, paddingHorizontal: 12, paddingVertical: 8 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.kuota}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: 5, alignItems: "center" }}>
                                <Text>Sisa Kuota</Text>
                                <View style={{ backgroundColor: COLORS.white, borderRadius: 5, paddingHorizontal: 12, paddingVertical: 8 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.sisa_kuota}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardStatus: {
        width: "23%",
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        margin: 10,
        backgroundColor: COLORS.white,
        alignItems: "center",
    },
    cardKouta: {
        width: 360,
        // padding: 1,
        borderRadius: 8,
        // marginHorizontal: 5,
        // margin:10,
        marginVertical: 10,
        flexDirection: "row",
    }

})