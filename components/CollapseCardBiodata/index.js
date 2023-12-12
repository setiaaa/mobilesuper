import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Touchable } from 'react-native'
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export const CollapseCardBiodata = ({ profile }) => {
    console.log(profile)
    const [collapse, setCollapse] = useState(false)
    return (
        <View>
            <Collapse>
                <CollapseHeader>
                    <TouchableOpacity onPress={() => setCollapse(!collapse)}>
                        <View style={styles.card} >
                            <View style={{
                                backgroundColor: collapse === true ? COLORS.secondaryLighter : COLORS.white,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <Ionicons name='person-outline' size={24} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Biodata</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    {collapse === true ?
                                        <Ionicons name='chevron-up-outline' size={20} />
                                        :
                                        <Ionicons name='chevron-down-outline' size={20} />}

                                </View>
                            </View>
                            <View style={{ marginLeft: 50 }}>
                                {/* custom divider */}
                                <View style={{ height: 1, width: '88%', backgroundColor: '#DBDADE' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.cardCollapse}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%"}}>Nama</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%"}}>{profile.nama}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>NIP</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%"}}>{profile.nip}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Karpeg/Karis-Karsu/NPWP</Text>
                            <Text>:</Text>
                            <View style={{width:"55%", flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                                {profile.Karpeg == null ? (
                                    <Text>-</Text>
                                ) : (
                                    <Text>{profile.Karpeg}</Text>
                                )}
                                <Text>/</Text>
                                {profile.Karis == null ? (
                                    <Text>-</Text>
                                ) : (
                                    <Text>{profile.Karis}</Text>
                                )}
                                <Text>/</Text>
                                {profile.npwp === "" ? (
                                    <Text>-</Text>
                                ) : (
                                    <Text>{profile.npwp}</Text>
                                )}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Tempat/Tanggal lahir</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.place_birth}/{profile.date_birth}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5,width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Telepon Seluler</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.mobile}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>No KTP</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.ktp}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5,width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Email KKP</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.email}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5,width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Email Lain</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.email_alt}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%"}}>Pendidikan Terakhir</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.pendidikan}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5,width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Unit Kerja</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.satuan_kerja_nama}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Satker</Text>
                            <Text>:</Text>
                            <Text style={{ width: "55%" }}>{profile.unit_kerja}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Pangkat</Text>
                            <Text>:</Text>
                            {profile.pangkat == null ? (
                                <Text>-</Text>
                            ) : (
                                <Text style={{ width: "55%" }}>{profile.pangkat}</Text>
                            )}
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5, width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Golongan</Text>
                            <Text>:</Text>
                            {profile.golongan == null ? (
                                <Text>-</Text>
                            ) : (
                                <Text style={{ width: "55%" }}>{profile.golongan}</Text>
                            )}
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5,width:wp(82) }}>
                            <Text style={{ width: "40%" }}>Alamat Kantor</Text>
                            <Text>:</Text>
                            {profile.office_address == null ? (
                                <Text>-</Text>
                            ) : (
                                <Text style={{ width: "50%" }}>{profile.office_address}</Text>
                            )}
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginTop: 10 }} />
                    </View>
                </CollapseBody>
            </Collapse>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        borderRadius: 8,
        width: wp(88),
        alignItems:"center"
    },
    cardCollapse: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        width: wp(88),
        alignItems:"center",
        paddingHorizontal:wp(20),
    }
})
