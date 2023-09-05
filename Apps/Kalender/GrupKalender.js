import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { CardAgenda } from '../../components/CardAgenda';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from '../../components/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { setAgenda } from '../../store/GrupKalender';
import { setKategori } from '../../store/GrupKalender';
import { setSubKategori } from '../../store/GrupKalender';
import { SafeAreaView } from 'react-native-safe-area-context';

export const GrupKalender = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState("");
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalInfoRef = useRef(null);
  const bottomSheetModalAddRef = useRef(null);
  const bottomSheetModalAddCatRef = useRef(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  const bottomSheetAttach = () => {
    bottomSheetModalRef.current?.present()
  }

  const bottomSheetinfo = () => {
    bottomSheetModalInfoRef.current?.present()
  }

  const bottomSheetAdd = () => {
    bottomSheetModalAddRef.current?.present()
  }

  const bottomSheetAddCat = () => {
    bottomSheetModalAddCatRef.current?.present()
  }

  const bottomSheetClose = () => {
    if (bottomSheetModalAddRef.current)
      bottomSheetModalAddRef.current?.close()
  }

  const bottomSheetCloseCat = () => {
    if (bottomSheetModalAddCatRef.current)
      bottomSheetModalAddCatRef.current?.close()
  }

  const [kategoriField, setKategoriField] = useState('')
  const [subkategoriField, setSubKategoriField] = useState('')

  const kategori = [
    { key: 'KKP', value: 'KKP' },
    { key: 'CK', value: 'CEK' }
  ]


  const subKategori = {
    'KKP': [
      {
        key: '1',
        value: 'Kalender Direksi'
      },
      {
        key: '2',
        value: 'Kalender Grup'
      }
    ],
    'CK': [
      { key: '3', value: 'cek' },
      { key: '4', value: 'halo' }
    ]
  }

  const items = [
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#1868AB'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#1868AB'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#EA5455'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#EA5455'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#F6AD1D'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#FF8F28'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#F6AD1D'
    },
    {
      kegiatan: 'Rapat gabungan dengan seluruh anggota',
      subAvatar: [
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 },
        { avatar: AVATAR.U2 }
      ],
      warna: '#11C15B'
    }
  ]

  const [current, setCurrent] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAgenda(items))
    dispatch(setKategori(kategori))
    dispatch(setSubKategori(subKategori))
  }, []);

  const { agenda, dropdown } = useSelector(state => state.grupKalender)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
              <View style={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
                width: 28,
                height: 28,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20
              }}>
                <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                  <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Agenda Bersama</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 20, gap: 10, zIndex: 1 }}>
              <View style={{ width: '75%', marginLeft: 20 }}>
                <Dropdown
                  data={dropdown.kategori}
                  setSelected={setKategoriField}
                  placeHolder={'Pilih Kategori'}
                />
                {kategoriField !== '' ? (
                  <View style={{ marginTop: 20 }}>
                    <Dropdown
                      data={dropdown.subKategori[kategoriField.key]}
                      setSelected={setSubKategoriField}
                      placeHolder={'Pilih SubKategori'}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <View style={{ backgroundColor: 'white', width: '11%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, height: 45 }}>
                <TouchableOpacity onPress={bottomSheetinfo}>
                  <Ionicons name='information-circle-outline' size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <BottomSheetModal
                  ref={bottomSheetModalInfoRef}
                  snapPoints={animatedSnapPoints}
                  handleHeight={animatedHandleHeight}
                  contentHeight={animatedContentHeight}
                  index={0}
                  style={{ borderRadius: 50 }}
                  keyboardBlurBehavior="restore"
                  android_keyboardInputMode="adjust"
                  backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                  )}
                >
                  <BottomSheetView onLayout={handleContentLayout}>
                    <View style={{ marginVertical: 20, marginLeft: 20 }}>
                      <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Warna Kalender Berdasarkan PIC </Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ height: 18, width: 18, backgroundColor: COLORS.danger, borderRadius: 4 }} />
                      <Text>Direktur A</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ height: 18, width: 18, backgroundColor: COLORS.info, borderRadius: 4 }} />
                      <Text>Direktur B</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ height: 18, width: 18, backgroundColor: COLORS.warning, borderRadius: 4 }} />
                      <Text>Direktur C</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ height: 18, width: 18, backgroundColor: COLORS.orange, borderRadius: 4 }} />
                      <Text>Direktur D</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 40, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ height: 18, width: 18, backgroundColor: COLORS.success, borderRadius: 4 }} />
                      <Text>Direktur E</Text>
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={() => setCurrent(moment(Date.now()).format('YYYY-MM-DD'))} style={{ position: 'absolute', marginTop: 15, right: 90, zIndex: 1 }}>
                <Ionicons name='calendar-outline' size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Calendar
                current={current}
                key={current}
                onDayPress={day => {
                  setSelected(day.dateString);
                  console.log(day.dateString)
                  setCurrent(day.dateString);
                }}
                markedDates={{
                  [moment(Date.now()).format('YYYY-MM-DD')]: {
                    // customStyles: {
                    //   container: {
                    //     backgroundColor: COLORS.primary,
                    //     borderTopRightRadius: 4,
                    //     borderTopLeftRadius: 8,
                    //     borderBottomLeftRadius: 4,
                    //     borderBottomRightRadius: 8
                    //   },
                    //   text: {
                    //     color: COLORS.white,
                    //   }
                    // }
                    selected: true,
                  },

                  ['2023-08-06']: {
                    marked: 'true',
                    type: 'multi-dot',
                    dots: [
                      { color: 'red' },
                      { color: 'blue' },
                      { color: 'green' },
                      { color: 'orange' }
                    ],

                  }
                }}
                markingType='multi-dot'
                style={{ width: '90%', marginLeft: 20, borderRadius: 8 }}
                theme={{
                  arrowColor: COLORS.primary,
                  selectedDayBackgroundColor: COLORS.primary,
                  todayTextColor: COLORS.white,

                }}
              />
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Agenda hari ini</Text>
              <View style={{ marginVertical: 20 }}>
                <FlatList
                  data={agenda.lists.slice(0, 2)}
                  renderItem={({ item }) => <CardAgenda
                    kegiatan={item.kegiatan}
                    subAvatar={item.subAvatar}
                    warna={item.warna}
                  />
                  }
                // keyExtractor={({ item }) => item.kegiatan}
                />
                <View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TouchableOpacity style={{ marginVertical: 10 }} onPress={bottomSheetAttach}>
                    <Text style={{ color: COLORS.info, }}>Selengkapnya</Text>
                  </TouchableOpacity>
                  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                    <TouchableOpacity onPress={bottomSheetAdd}>
                      <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='add-outline' size={24} color={COLORS.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* add agenda */}
                <BottomSheetModal
                  ref={bottomSheetModalAddRef}
                  snapPoints={animatedSnapPoints}
                  handleHeight={animatedHandleHeight}
                  contentHeight={animatedContentHeight}
                  index={0}
                  style={{ borderRadius: 50 }}
                  keyboardBlurBehavior="restore"
                  android_keyboardInputMode="adjust"
                  backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                  )}
                >
                  <BottomSheetView onLayout={handleContentLayout} >
                    <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                      <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                        onPress={() => {
                          navigation.navigate('TambahGrup', { unread: false })
                          // props.navigation.navigate('Home', { unread: false })
                          bottomSheetClose()
                        }}
                      >
                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Grup</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                      <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                        onPress={() => {
                          navigation.navigate('TambahAgenda', { unread: false })
                          // props.navigation.navigate('Home', { unread: false })
                          bottomSheetClose()
                        }}
                      >
                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Agenda Acara</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                      <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                        onPress={() => {
                          bottomSheetAddCat()
                          // props.navigation.navigate('Home', { unread: false })
                        }}
                      >
                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Kategori</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Task</Text>
                      </TouchableOpacity>
                    </View>

                  </BottomSheetView>
                </BottomSheetModal>

                {/* add category */}
                <BottomSheetModal
                  ref={bottomSheetModalAddCatRef}
                  snapPoints={animatedSnapPoints}
                  handleHeight={animatedHandleHeight}
                  contentHeight={animatedContentHeight}
                  index={0}
                  style={{ borderRadius: 50 }}
                  keyboardBlurBehavior="restore"
                  android_keyboardInputMode="adjust"
                  backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                  )}
                >
                  <BottomSheetView onLayout={handleContentLayout}>
                    <View>
                      <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Kategori Baru</Text>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                          <Text style={{ color: COLORS.infoDanger }}>Reset</Text>
                        </View>
                      </View>
                      <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                        <TextInput
                          editable
                          multiline
                          numberOfLines={4}
                          maxLength={40}
                          placeholder='Ketikan Sesuatu'
                          style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6 }}
                        />
                      </View>

                      <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                        <TextInput
                          editable
                          multiline
                          numberOfLines={4}
                          maxLength={40}
                          placeholder='Ketikan Sesuatu'
                          style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6 }}
                        />
                      </View>

                      <TouchableOpacity style={{
                        marginBottom: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        marginTop: 10,
                        backgroundColor: COLORS.infoDanger,
                        width: '90%',
                        height: 50,
                        marginHorizontal: 20,
                        borderRadius: 6
                      }}
                        onPress={() => {
                          bottomSheetCloseCat()
                        }}
                      >
                        <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Simpan</Text>
                      </TouchableOpacity>
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>

                {/* agenda hari ini */}
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  snapPoints={animatedSnapPoints}
                  handleHeight={animatedHandleHeight}
                  contentHeight={animatedContentHeight}
                  index={0}
                  style={{ borderRadius: 50 }}
                  keyboardBlurBehavior="restore"
                  android_keyboardInputMode="adjust"
                  backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                  )}
                >
                  <BottomSheetView onLayout={handleContentLayout} >
                    <View style={{ marginVertical: 20, marginLeft: 20 }}>
                      <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Agenda hari ini</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
                      <FlatList
                        data={agenda.lists}
                        renderItem={({ item }) => <CardAgenda
                          kegiatan={item.kegiatan}
                          subAvatar={item.subAvatar}
                          warna={item.warna}
                        />
                        }
                        keyExtractor={items => items}
                      />
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>
              </View>
            </View>
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}
