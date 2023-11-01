import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Video } from 'expo-av';
import { FlatList } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import moment from 'moment';
import { Dropdown } from '../../components/DropDown';
import { deleteEvent, updateStatus } from '../../service/api';
import { getTokenValue } from '../../service/session';
import { CardLampiran } from '../../components/CardLampiran';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export const DetailEvent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [kategori, setKategori] = useState('')
  const [visibleModal, setVisibleModal] = useState(false);
  const [lampiranById, setLampiranById] = useState(null)
  const [token, setToken] = useState('')
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)

  const statusEvent = [
    { key: 'siap', value: 'persiapan' },
    { key: 'pel', value: 'pelaksanaan' },
    { key: 'pas', value: 'pasca' }
  ]

  const [document, setDocument] = useState([]);

  const getFileExtension = (type) => {
    let jenis = type.split('.')
    jenis = jenis[jenis.length - 1]
    return jenis
  }

  useEffect(() => {
    getTokenValue().then(val => {
      setToken(val)
    })
  }, [])

  const video = useRef(null);
  const [status, setStatus] = useState({});

  const { event, loading } = useSelector((state) => state.event);

  const data = event.detailEvent;


  console.log(event)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,}}>
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
          <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail Agenda Rapat</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
          <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={200} height={20} />
              )
                : (
                  <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold, width: 200 }}>{data.title}</Text>
                )}

              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                <View
                  style={{
                    width: 90,
                    height: 24,
                    backgroundColor: COLORS.infoLight,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: COLORS.info }}>{data.status}</Text>
                </View>
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>{data.note}</Text>
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Tanggal</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                <>
                  <Text>{moment(data.start_date).format('d MMM yyy')} - </Text>
                  <Text>{moment(data.end_date).format('d MMM yyy')}</Text>
                </>
              )}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Tempat</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                <Text style={{ width: 156 }}>{data.location}</Text>
              )}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Pimpinan Agenda Rapat</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                <Text style={{ width: 150 }}>{data.extra_attrs?.pic.title.name}</Text>
              )}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta Agenda Rapat</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                data.extra_attrs?.members?.map((data, index) =>
                  <View key={data.id} style={{ position: 'relative' }}>
                    <Image source={{ uri: data.avatar_url }} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0, borderRadius: 50 }} />
                  </View>
                )
              )}
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity> */}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta Agenda Rapat Eksternal</Text>
              <View>
                {loading ? (
                  <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                ) : (
                  data.extra_attrs?.guest_external?.map((data, index) =>
                    <View key={data.id} style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                      <Text>-</Text>
                      {/* <Image source={{ uri: data.avatar_url }} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0, borderRadius: 50 }} /> */}
                      <Text style={{ width: 150 }}>{data.name}</Text>
                    </View>
                  )
                )}
              </View>
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity> */}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Notulen</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                data.extra_attrs?.notulen?.map((data, index) =>
                  <View key={data.id} style={{ position: 'relative' }}>
                    {/* <Image source={{ uri: data.avatar_url }} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0, borderRadius: 50 }} /> */}
                    <Text>{data.nama}</Text>
                  </View>
                )
              )}
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity> */}
            </View>

            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Petugas Absen</Text>
              {loading ? (
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
              ) : (
                data.extra_attrs?.presensi?.map((item) =>
                  <View>
                    <Text>{item.nama}</Text>
                  </View>
                )
              )}
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity> */}
            </View>



            {/* custom divider */}
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
            {loading ? (
              <ShimmerPlaceHolder style={{ borderRadius: 4, marginTop: 20 }} width={100} height={100} />
            ) : (
              <FlatList
                key={'*'}
                data={data.attachments}
                renderItem={({ item }) =>
                <View key={item.id}>
                {item.attachments !== 0 ? (
                  <Text>-</Text> 
                ) : (
                  <CardLampiran
                    lampiran={item.file}
                    type={getFileExtension(item.name)}
                    onClick={() => {
                      setVisibleModal(true);
                      setLampiranById(item);
                    }}
                  />
                )}
              </View>
              
                }
                scrollEnabled={false}
                style={{ marginTop: 10 }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15, gap: 5 }}
                numColumns={3}
                keyExtractor={item => "*" + item.id}
              />
            )}

            {
              lampiranById !== null ? (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={visibleModal}
                  onRequestClose={() => {
                    setVisibleModal(false);
                    setLampiranById(null)
                  }}

                >
                  <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                  <View style={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setVisibleModal(false)
                        setLampiranById(null)
                      }}
                      style={{
                        position: 'absolute',
                        top: '15%',
                        left: 20
                      }}>

                      <View style={{
                        backgroundColor: COLORS.primary,
                        width: 51,
                        height: 51,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50
                      }}>
                        <Ionicons name='close-outline' color={COLORS.white} size={24} />
                      </View>
                    </TouchableOpacity>
                    {getFileExtension(lampiranById.name) === 'png' || getFileExtension(lampiranById.name) === 'jpg' || getFileExtension(lampiranById.name) === 'jpeg' ? (
                      <View>
                        <Image source={{ uri: lampiranById.file }} style={{ width: 390, height: 283 }} />
                      </View>
                    ) : getFileExtension(lampiranById.name) === 'mp4' ? (
                      <Video
                        ref={video}
                        style={{ width: 390, height: 283 }}
                        source={lampiranById.gambar}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                </Modal>
              ) : null
            }
          </View>
        </View>


        {
          data.user_role?.is_pic === true ||
            data.user_role?.is_notulensi === false &&
            data.user_role?.is_presensi === false &&
            data.user_role?.is_member === false &&
            data.user_role?.is_pic === false ? (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

                {/* <TouchableOpacity style={{
                                    backgroundColor: COLORS.info,
                                    width: 134,
                                    height: 50,
                                    borderRadius: 8
                                }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flex: 1, gap: 20 }}>
                                        <Text style={{ color: COLORS.white }}>Persiapan</Text>
                                        <Ionicons name='chevron-forward-outline' size={20} color={COLORS.white} />
                                    </View>
                                </TouchableOpacity> */}
                <View style={{ width: '50%' }}>
                  <Dropdown
                    data={statusEvent}
                    setSelected={setKategori}
                    handleClick={(item) => {
                      dispatch(updateStatus({ token: token, id: data.id, status: item.value }))
                    }}
                    borderWidth={1}
                    borderColor={COLORS.ExtraDivinder}
                    borderwidthDrop={1}
                    borderColorDrop={COLORS.ExtraDivinder}
                    borderWidthValue={1}
                    borderColorValue={COLORS.ExtraDivinder}
                    placeHolder={data.status}
                    backgroundColor={COLORS.info}
                    textColor={COLORS.white}
                  />
                </View>


                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity style={{
                    backgroundColor: COLORS.lightBrown,
                    width: 50,
                    height: 50,
                    borderRadius: 8
                  }}
                    onPress={() => {
                      navigation.navigate('EditEvent')
                    }}
                  >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flex: 1, gap: 20 }}>
                      <Ionicons name='pencil-outline' size={20} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{
                    backgroundColor: COLORS.infoDanger,
                    width: 50,
                    height: 50,
                    borderRadius: 8
                  }}
                    onPress={() => {
                      const datas = {
                        token: token,
                        id: data.id
                      }
                      dispatch(deleteEvent(datas))
                      setTimeout(() => {
                        navigation.navigate('HalamanUtama')
                      }, 3000)
                    }}
                  >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flex: 1, gap: 20 }}>
                      <Ionicons name='trash-outline' size={20} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>

                </View>

              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.foundation,
                    width: Platform.OS === "ios" ? "90%" : "91%",
                    height: 50,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      flex: 1,
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: COLORS.white }}>Kirim Notifikasi</Text>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color={COLORS.white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: "white",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  imageIos: {
    width: 390,
    height: 260,
    resizeMode: "cover",
  },
  imageAndroid: {
    width: 420,
    height: 260,
    resizeMode: "cover",
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.7,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.7,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
