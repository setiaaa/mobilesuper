import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenValue } from '../../service/session'
import { TouchableOpacity } from 'react-native'
import { getKesejahteraan } from '../../service/api'
import { FlatList } from 'react-native'
import moment from 'moment'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native'


const CardLists = ({ item, setDetail, setDetailContent, value }) => {
    const source = {
        html: `<section id="services" className="services">
        <div className="container">
            <header className="section-header wow fadeInUp col-md-8" style={{ margin: '0px auto', visibility: 'visible', animationName: 'fadeInUp' }}>
                <h3 className="text-center">Layanan untuk ASN</h3>
                <p className="section-subheading text-muted text-center mb-4">TASPEN sebagai penyelenggara Jaminan Sosial Aparatur Sipil Negara (ASN) dan Pejabat Negara yaitu Program Tabungan Hari Tua (THT), Program Pensiun, Program JKK dan JKM.</p>
            </header>
            <div className="row" id="services-list">
                <div className="col-lg-6 col-md-12" style={{ visibility: 'visible' }}>
                    <div className="row">
                        <div className="icon col-md-2" style={{ padding: '0px' }}>
                            <img src="https://www.taspen.co.id/assets/img/icon/JKKv2_copy.png" width="100%" />
                        </div>
                        <div className="col-md-10">
                            <h3 className="title">
                                <a href="https://www.taspen.co.id/layanan/jkk">Jaminan Kecelakaan Kerja</a>
                            </h3>
                            <p className="section-subheading text-muted mb-4">Perlindungan atas risiko kecelakaan kerja atau penyakit akibat kerja berupa perawatan, santunan dan tunjangan cacat </p>
                            <a href="https://www.taspen.co.id/layanan/jkk" style={{ marginBottom: '10px' }}>Selengkapnya &gt;</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12" style={{ visibility: 'visible' }}>
                    <div className="row">
                        <div className="icon col-md-2" style={{ padding: '0px' }}>
                            <img src="https://www.taspen.co.id/assets/img/icon/THTv2_copy.png" width="100%" />
                        </div>
                        <div className="col-md-10">
                            <h3 className="title">
                                <a href="https://www.taspen.co.id/layanan/tht">Tabungan Hari Tua</a>
                            </h3>
                            <p className="section-subheading text-muted mb-4">Program Asuransi Dwiguna yang dikaitkan dengan usia pensiun ditambah dengan Asuransi Kematian </p>
                            <a href="https://www.taspen.co.id/layanan/tht" style={{ marginBottom: '10px' }}>Selengkapnya &gt;</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-5" style={{ visibility: 'visible' }}>
                    <div className="row">
                        <div className="icon col-md-2" style={{ padding: '0px' }}>
                            <img src="https://www.taspen.co.id/assets/img/icon/PENSIUN2v2_copy.png" width="100%" />
                        </div>
                        <div className="col-md-10">
                            <h3 className="title">
                                <a href="https://www.taspen.co.id/layanan/pensiun">Program Pensiun</a>
                            </h3>
                            <p className="section-subheading text-muted mb-4"> Penghasilan yang diterima oleh penerima pensiun setiap bulan sebagai jaminan hari tua dan penghargaan atas jasa-jasanya mengabdi pada negara berdasarkan Undang-Undang No. 11 Tahun 1969 tentang Pensiun Pegawai dan Pensiun Janda/Duda Pegawai.</p>
                            <a href="https://www.taspen.co.id/layanan/pensiun" style={{ marginBottom: '10px' }}>Selengkapnya &gt;</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-5" style={{ visibility: 'visible' }}>
                    <div className="row">
                        <div className="icon col-md-2" style={{ padding: '0px' }}>
                            <img src="https://www.taspen.co.id/assets/img/icon/JKMv2_copy.png" width="100%" />
                        </div>
                        <div className="col-md-10">
                            <h3 className="title">
                                <a href="https://www.taspen.co.id/layanan/jkm">Jaminan Kematian</a>
                            </h3>
                            <p className="section-subheading text-muted mb-4">Perlindungan atas risiko kematian bukan akibat kecelakaan kerja berupa santunan kematian</p>
                            <a href="https://www.taspen.co.id/layanan/jkm" style={{ marginBottom: '10px' }}>Selengkapnya &gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    };

    const { width } = useWindowDimensions();

    return (
        <View>
            {/* {value === 'taspen' ? (
                <RenderHTML
                    source={source}
                    contentWidth={width}
                />
            ) : ( */}

            <TouchableOpacity style={{ backgroundColor: COLORS.white, marginTop: 20, marginHorizontal: 20, padding: 10, borderRadius: 8 }}
                onPress={() => {
                    setDetail('detail')
                    setDetailContent(item)
                    console.log(item)
                }}
            >
                <Text>{moment(item.created_date).format("DD MMMM YYYY")}</Text>
                <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>{item.title}</Text>
            </TouchableOpacity>
            {/* )} */}
        </View>
    )
}

export const Kesejahteraan = () => {
    const [token, setToken] = useState('')
    const [value, setValue] = useState('')
    const [detail, setDetail] = useState('')
    const [detailContent, setDetailContent] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {

            setToken(val)
        })
    }, [])

    const { kesejahteraan } = useSelector(state => state.dashboard)
    const [lists, setLists] = useState([])

    const { width } = useWindowDimensions();

    const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ID', DATE_OPTIONS);
    };

    useEffect(() => {
        setLists(kesejahteraan.lists.results)
    }, [kesejahteraan])

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 80, marginTop: 20 }}>

                <TouchableOpacity style={{ alignItems: 'center', width: 50 }}
                    onPress={() => {
                        setValue('tapera')
                        dispatch(getKesejahteraan({ token: token, value: 'tapera' }))
                    }}
                >
                    <Image source={require('../../assets/superApp/Tapera.png')} />
                    <Text>Tapera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', width: 50 }}
                    onPress={() => {
                        setValue('bpjs')
                        dispatch(getKesejahteraan({ token: token, value: 'bpjs' }))
                    }}
                >
                    <Image source={require('../../assets/superApp/BPJS.png')} />
                    <Text>BPJS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', width: 50 }}
                    onPress={() => {
                        setValue('taspen')
                        dispatch(getKesejahteraan({ token: token, value: 'taspen' }))
                    }}
                >
                    <Image source={require('../../assets/superApp/Taspen.png')} />
                    <Text>Taspen</Text>
                </TouchableOpacity>
            </View>


            {detail === '' ? (
                <ScrollView>
                    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Berita</Text>
                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginTop: 10 }} />
                    </View>

                    <FlatList
                        data={lists}
                        renderItem={({ item }) => <CardLists
                            item={item}
                            setDetail={setDetail}
                            setDetailContent={setDetailContent}
                            value={value}
                        />
                        }
                        style={{ height: 500 }}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            ) : (
                <ScrollView>
                    <View style={{ marginTop: 20, marginHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setDetail('')
                        }}>
                            <Ionicons name='chevron-back-outline' size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Detail Berita</Text>
                    </View>
                    {/* custom divider */}
                    <View style={{ height: 1, width: '90%', backgroundColor: '#DBDADE', marginTop: 10, marginHorizontal: 20 }} />

                    <View style={{ marginHorizontal: 20, backgroundColor: COLORS.white, padding: 20, marginTop: 20, borderRadius: 8 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{detailContent.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                            <Ionicons name='time-outline' size={20} color={COLORS.grey} />
                            {/* <Text>{moment(detailContent.created_date).format("DD MMMM YYYY")}</Text> */}
                            <Text>{formatDate(detailContent.created_date)}</Text>
                        </View>
                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginTop: 10 }} />

                        <RenderHTML
                            source={{ html: detailContent.content }}
                            contentWidth={width}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    )
}
