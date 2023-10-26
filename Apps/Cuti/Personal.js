import React from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS,FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native-svg'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'


export const Personal = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.superApps)
    const [collapse, setCollapse] = useState({
        nip: '',
        toggle: false
    })
    const navigation = useNavigation()
    const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge"
    console.log(profile)
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ position: 'relative' }}>
            <ScrollView>
            
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,  }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center',}}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Cuti</Text>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                                       
                </View>
                
                <View style={{padding:20}}>
                    <View style={{
                        padding: 20,
                        marginTop: 10,
                        borderTopRightRadius: 8,
                        borderTopLeftRadius:8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:COLORS.primary
                        }}>
                            <Image source={{ uri: BASE_URL + profile.avatar }} style={{ width: 61, height: 61, borderRadius: 30 }} />
                            <Text style={{ fontWeight: FONTWEIGHT.bold, color:COLORS.white }}>{profile.nama}</Text>
                            <Text style={{ marginTop: 5, color:COLORS.white }}>{profile.nip}</Text>    
                    </View>
                    <View style={{
                            backgroundColor: COLORS.white,
                            padding: 15,
                            borderBottomRightRadius: 8,
                            borderBottomLeftRadius: 8,
                    }}>
                        <TouchableOpacity onPress={() => setCollapse({ nip: profile.nip, toggle: true })}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{marginRight:"80%"}}>Profil</Text>
                                {collapse.nip === profile.nip && collapse.toggle === true ? (
                                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                                        <Ionicons name='chevron-up' size={24} />
                                    </TouchableOpacity>
                                ) : (
                                    <Ionicons name='chevron-down' size={24} />
                                )}
                            </View>
                        </TouchableOpacity>

                            {collapse.nip === profile.nip && collapse.toggle === true ? (
                                <View>

                                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                                        <Text style={{ marginTop: 10, }}>Jenis Kelamin</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>{profile.jenis_kelamin}</Text>

                                        <Text style={{ marginTop: 10, }}>Golongan</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>{profile.golongan}</Text>

                                        <Text style={{ marginTop: 10, }}>Jabatan</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>{profile.nama_jabatan}</Text>
                                        
                                        <Text style={{ marginTop: 10, }}>Kementrian</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}></Text>

                                        <Text style={{ marginTop: 10, }}>Unit Kerja</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>{profile.unit_kerja}</Text>

                                        <Text style={{ marginTop: 10, }}>Satuan Kerja</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>{profile.satuan_kerja_nama}</Text>

                                        
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                null
                            )}
                    </View>
                </View>
                <View style={{padding:20}}>
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.infoDanger,
                            padding: 15,
                            borderRadius: 8,
                            alignItems:"center",
                    }}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Ionicons name='document-outline' size={24} color={COLORS.white} />
                            <Text style={{color:COLORS.white, paddingLeft:5}}>Form Pengajuan Cuti</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft:20}}>
                    <Text style={{fontWeight:FONTWEIGHT.bold}}>Status Dokumen Cuti</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection:"row"}}>
                            <View style={styles.cardStatus}>
                                <View style={{width:"70%", alignItems:"center", rowGap:20}}>
                                    <Ionicons name='document-outline' size={50} color={COLORS.grey} />
                                    <Text>Draft</Text>
                                    <Text>3</Text>
                                </View>
                            </View>
                            
                            <View style={styles.cardStatus}>
                                <View style={{width:"70%", alignItems:"center", rowGap:10}}>
                                    <Ionicons name='document-outline' size={50} color={COLORS.grey} />
                                    <Text>Sedang Proses</Text>
                                    <Text>3</Text>
                                </View>
                            </View>

                            <View style={styles.cardStatus}>
                                <View style={{width:"70%", alignItems:"center", rowGap:10}}>
                                    <Ionicons name='document-outline' size={50} color={COLORS.grey} />
                                    <Text>Dokumen Disetujui</Text>
                                    <Text>3</Text>
                                </View>
                            </View>

                            <View style={styles.cardStatus}>
                                <View style={{width:"70%", alignItems:"center", rowGap:2}}>
                                    <Ionicons name='document-outline' size={50} color={COLORS.grey} />
                                    <Text>Dokumen Tidak Disetujui</Text>
                                    <Text>3</Text>
                                </View>
                                </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{paddingLeft:20}}>
                    <Text style={{fontWeight:FONTWEIGHT.bold}}>Kouta Cuti</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.cardKouta}>
                            <View style={{
                                width:"60%",
                                padding: 15,
                                backgroundColor:COLORS.white,
                                alignItems:"center"
                            }}>
                                <View style={{rowGap:3}}>
                                    <Text style={{ fontSize: 12}}>Jenis : Cuti Tahunan</Text>
                                    <Text style={{ fontSize: 12}}>Periode:  N-2 </Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai Berlaku: 01 Januari 2021</Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Akhir Beralaku: 31 Desember 2021</Text>
                                </View>
                            </View>
                            <View style={{
                                width:"40%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                backgroundColor:"#  999999",
                                alignItems: "center",
                                justifyContent: "center",
                                }}>
                                    <View style={{gap:20}}>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Kuota Cuti</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Sisa Kuota</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={styles.cardKouta}>
                            <View style={{
                                width:"60%",
                                padding: 15,
                                backgroundColor:COLORS.white,
                                alignItems:"center"
                            }}>
                                <View style={{rowGap:3}}>
                                    <Text style={{ fontSize: 12}}>Jenis : Cuti Tahunan</Text>
                                    <Text style={{ fontSize: 12}}>Periode:  N-2 </Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai Berlaku: 01 Januari 2021</Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Akhir Beralaku: 31 Desember 2021</Text>
                                </View>
                            </View>
                            <View style={{
                                width:"40%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                backgroundColor:"#  999999",
                                alignItems: "center",
                                justifyContent: "center",
                                }}>
                                    <View style={{gap:20}}>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Kuota Cuti</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Sisa Kuota</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        </ScrollView>
                    </View>

                    <View style={{padding: 20, rowGap:10}}>
                        <Text style={{fontWeight:FONTWEIGHT.bold}}>Monitoring Kuota</Text>
                        <View style={{ backgroundColor: "white", borderRadius: 8}}>
                                <View style={{flexDirection: "row", gap: 70, padding: 10, justifyContent: 'center'}}>
                                    <TouchableOpacity>
                                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                                    </TouchableOpacity>
                                    <Text>Cuti Tahunan 2021</Text>
                                    <TouchableOpacity>
                                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ padding: 10, marginHorizontal: 15, marginBottom: 15, flexDirection: 'row'}}>
                                    <View style={{ gap: 20, position: 'relative'}}>
                                        <View style={{flexDirection: 'row',}}>
                                            <Text>Kuota</Text>
                                            <View style={{ backgroundColor: "#1868AB", width: 20, height: 20, alignItems: 'center', borderRadius: 3, marginHorizontal:130, position: 'absolute' }}>
                                                <Text style={{color: "white", }}>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>Penggunaan</Text>
                                            <View style={{ backgroundColor: "#F6AD1D", width: 20, height: 20, alignItems: 'center', borderRadius: 3, marginHorizontal:130, position: 'absolute' }}>
                                                <Text style={{color: "white", }}>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>Sisa</Text>
                                            <View style={{ backgroundColor: "#11C15B", width: 20, height: 20, alignItems: 'center', borderRadius: 3, marginHorizontal:130, position: 'absolute'}}>
                                                <Text style={{color: "white" }}>6</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        {/* Masukan diagram pie disini */}
                                    </View>
                                </View>
                        </View>
                  </View>

                    <View style={{padding: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight:FONTWEIGHT.bold}}>Arsip Cuti</Text>
                            <TouchableOpacity style={{ justifyContent: 'flex-end'}}>
                                <Text style={{ color: COLORS.info}}>Selengkapnya</Text>
                            </TouchableOpacity>
                        </View>

                        <View >
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                        <View style={styles.cardKouta}>
                            <View style={{
                                width:"60%",
                                padding: 15,
                                backgroundColor:COLORS.white,
                                alignItems:"center"
                            }}>
                                <View style={{rowGap:3}}>
                                    <Text style={{ fontSize: 12}}>Jenis : Cuti Tahunan</Text>
                                    <Text style={{ fontSize: 12}}>Periode:  N-2 </Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai Berlaku: 01 Januari 2021</Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Akhir Beralaku: 31 Desember 2021</Text>
                                </View>
                            </View>
                            <View style={{
                                width:"40%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                backgroundColor:"#  999999",
                                alignItems: "center",
                                justifyContent: "center",
                                }}>
                                    <View style={{gap:20}}>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Kuota Cuti</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Sisa Kuota</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={styles.cardKouta}>
                            <View style={{
                                width:"60%",
                                padding: 15,
                                backgroundColor:COLORS.white,
                                alignItems:"center"
                            }}>
                                <View style={{rowGap:3}}>
                                    <Text style={{ fontSize: 12}}>Jenis : Cuti Tahunan</Text>
                                    <Text style={{ fontSize: 12}}>Periode:  N-2 </Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai Berlaku: 01 Januari 2021</Text>
                                    <Text style={{ fontSize: 12, color: COLORS.lighter}}>Akhir Beralaku: 31 Desember 2021</Text>
                                </View>
                            </View>
                            <View style={{
                                width:"40%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                backgroundColor:"#  999999",
                                alignItems: "center",
                                justifyContent: "center",
                                }}>
                                    <View style={{gap:20}}>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Kuota Cuti</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row", columnGap:5, alignItems: "center"}}>
                                            <Text>Sisa Kuota</Text>
                                            <View style={{backgroundColor:COLORS.white, borderRadius:5, padding: 10}}>
                                                <Text>6</Text>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        {/* </ScrollView> */}
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    cardStatus: {
        width:"23%",
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        margin:10,
        backgroundColor:COLORS.white,
        alignItems:"center",
    },
    cardKouta:{
        width:360,
        // padding: 1,
        borderRadius: 8,
        // marginHorizontal: 5,
        margin:10,
        flexDirection:"row",
    }

})
