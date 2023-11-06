import React, { useEffect } from 'react'
import { useState } from 'react'
import { TouchableOpacity, View, Image, TextInput, Modal, Pressable, FlatList } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment';
import { Dropdown } from '../../components/DropDown'
import { Search } from '../../components/Search'
import { getPilihApproval } from '../../service/api'

const kategories = [
  { key: "q", value: "satu" },
  { key: "e", value: "dua" },
  { key: "r", value: "tiga" },
  { key: "t", value: "empat" },
];

export const CardlPimpinan = ({ item }) => {
  return (
    <Text>{item.nama_lengkap}</Text>
  )
}

export const TambahCutiTahunan = () => {

  const navigation = useNavigation()
  const [collapse, setCollapse] = useState({
    nip: '',
    toggle: false
  })
  const { profile } = useSelector(state => state.superApps)
  const { form, pilih } = useSelector(state => state.cuti)

  const [modalVisiblePicker, setModalVisiblePicker] = useState('');

  const [TanggalMulai, setTanggalMulai] = useState('');
  const [TanggalSelesai, setTanggalSelsai] = useState('');
  const [alamat, setAlamat] = useState(form.data_user?.alamat);
  const [telepon, setTelepon] = useState(form.data_user?.no_telpon)
  const [atasan, setAtasan] = useState('');
  const [pejabat, setPejabat] = useState('');
  const [searchAtasan, setSearchAtasan] = useState('');

  const [document, setDocument] = useState([])

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // const file = convertFileToObject(result)
    let tipe = result.uri.split('/')
    tipe = tipe[tipe.length - 1]
    tipe = tipe.split('.')
    tipe = tipe[tipe.length - 1]
    setDocument([...document, result])
    setType([...type, tipe])
    console.log(result)

    const data = {
      token: token,
      result: result
    }
    dispatch(postAttachment(data))
  };
  const dispatch = useDispatch()
  useEffect(() => {
    if (profile.nip !== "") {
      dispatch(getPilihApproval({ nip: profile.nip }));
    }
  }, [profile.nip, searchAtasan]);

  const pickAtasan = () => {
    let nama = [];
    pilih.data.map((item) => {
      nama.push({
        key: item.nip,
        value: item.nama_lengkap,
      });
    });
    return nama
  }


  return (
    <GestureHandlerRootView>
      < View style={{ position: 'relative' }}>
        <ScrollView>

          <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, height: 80, }}>
            <View style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              marginLeft: 20
            }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
              <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Libur</Text>
            </View>
          </View>

          <View style={{ padding: 20, gap: 20 }}>

            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10, alignItems: 'center' }}>
                <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Jenis Cuti</Text>
              </View>

              <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Jenis Cuti</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>{form.data_jenis_cuti?.nama}</Text>
                  </View>

                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tipe Hari</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color: "#B745FF" }}>{form.data_jenis_cuti?.tipe_hari}</Text>
                  </View>

                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Status Dokumen</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color: COLORS.success }}>Dokumen Baru</Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10, alignItems: 'center' }}>
                <Ionicons name='person-outline' size={18} color={COLORS.primary} />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Profil Pegawai</Text>
              </View>

              <View>
                <View style={{
                  backgroundColor: COLORS.white,
                  padding: 15,
                  borderRadius: 8,
                }}>
                  <TouchableOpacity onPress={() => setCollapse({ nip: profile.nip, toggle: true })}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "90%" }}>
                        <Text>{form.data_user?.nama}</Text>
                        <Text>NIP. {form.data_user?.nip}</Text>
                      </View>
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

                        <Text style={{ marginTop: 10, }}>Golongan</Text>
                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>{form.data_user?.golongan}</Text>

                        <Text style={{ marginTop: 10, }}>Jabatan</Text>
                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>{form.data_user?.jabatan}</Text>

                        <Text style={{ marginTop: 10, }}>Unit Kerja</Text>
                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>{form.data_user?.unit_kerja}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    null
                  )}
                </View>
              </View>
            </View>

            <View style={{}}>
              <View style={{ backgroundColor: COLORS.white, padding: 15, borderRadius: 8, gap: 20 }}>
                <Text>Periode Cuti</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <View style={{
                      borderWidth: 1,
                      width: 155,
                      borderRadius: 4,
                      borderColor: COLORS.ExtraDivinder,
                      flexDirection: 'row'
                    }}
                    >
                      <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        placeholder='Mulai'
                        style={{ padding: 10, height: 40 }}
                        value={TanggalMulai}
                      />
                      <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setModalVisiblePicker('mulai')}>
                          <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={{
                      borderWidth: 1,
                      width: 155,
                      borderRadius: 4,
                      borderColor: COLORS.ExtraDivinder,
                      flexDirection: 'row'
                    }}
                    >
                      <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        placeholder='Selesai'
                        style={{ padding: 10, height: 40 }}
                        value={TanggalSelesai}
                      />
                      <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setModalVisiblePicker('selesai')}>
                          <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                        </TouchableOpacity>
                      </View>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisiblePicker === 'mulai' || modalVisiblePicker === 'selesai' ? true : false}
                        onRequestClose={() => {
                          setModalVisiblePicker(!modalVisiblePicker);
                        }}
                      >
                        <TouchableOpacity />
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                          <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: '90%', height: 500, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => setModalVisiblePicker('')} style={{ paddingRight: '85%', marginBottom: 3, marginLeft: 20 }}>
                              <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='close-outline' size={24} color={COLORS.white} />
                              </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%' }}>
                              <DatePicker
                                options={{
                                  backgroundColor: COLORS.white,
                                  textHeaderColor: COLORS.primary,
                                  textDefaultColor: COLORS.primary,
                                  selectedTextColor: '#fff',
                                  mainColor: COLORS.primary,
                                  textSecondaryColor: COLORS.primary,
                                  borderColor: 'rgba(122, 146, 165, 0.1)',
                                }}
                                current={moment(Date.now()).format('YYYY-MM-DD')}
                                mode="calendar"
                                minuteInterval={30}
                                style={{ borderRadius: 10 }}
                                onSelectedChange={date => {
                                  const [year, month, day] = date.split('/').map(Number)
                                  const formattedDate = new Date(year, month - 1, day)
                                  if (modalVisiblePicker === 'mulai') {
                                    setTanggalMulai(moment(formattedDate).format('YYYY-MM-DD'))
                                  } else if (modalVisiblePicker === 'selesai') {
                                    setTanggalSelsai(moment(formattedDate).format('YYYY-MM-DD'))
                                  }
                                }
                                }
                              />
                              <TouchableOpacity onPress={() => setModalVisiblePicker('')} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ backgroundColor: COLORS.primary, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                  <Text style={{ color: COLORS.white }}>Ok</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                </View>

                <View style={{ gap: 8 }}>
                  <View>
                    <Text>Durasi Cuti</Text>
                  </View>
                  <View style={{ backgroundColor: "#F8F8F8", padding: 10, width: "100%", borderRadius: 8 }}>
                    <Text>0</Text>
                  </View>
                </View>

                <View style={{ gap: 8 }}>
                  <View>
                    <Text>Alamat Cuti</Text>
                  </View>
                  <View style={{ padding: 10, width: "100%", borderRadius: 8, borderColor: "#F8F8F8", borderWidth: 1 }}>
                    <TextInput
                      editable
                      multiline
                      onChangeText={setAlamat}
                      value={alamat}
                    />
                  </View>
                </View>

                <View style={{ gap: 8 }}>
                  <View>
                    <Text>Telepon</Text>
                  </View>
                  <View style={{ padding: 10, width: "100%", borderRadius: 8, borderColor: "#F8F8F8", borderWidth: 1 }}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      onChangeText={setTelepon}
                      value={telepon}
                    />
                  </View>
                </View>

                <View style={{ gap: 8 }}>
                  <View>
                    <Text>Alasan Cuti</Text>
                  </View>
                  <View style={{ padding: 10, width: "100%", borderRadius: 8, borderColor: "#F8F8F8", borderWidth: 1 }}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={2}
                      maxLength={50}
                      placeholder='Ketikan Sesuatu'
                    />
                  </View>
                </View>

              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10, alignItems: 'center' }}>
                <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
              </View>

              <View style={{ backgroundColor: COLORS.white, padding: 15, borderRadius: 8, gap: 20 }}>
                <View style={{ gap: 5 }}>
                  <Pressable onPress={pickDocument}>
                    <View style={{
                      borderWidth: 1,
                      width: '100%',
                      borderRadius: 4,
                      borderColor: COLORS.ExtraDivinder,
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5
                    }}
                    >
                      <View style={{ marginBottom: 10 }}>
                        <Ionicons name='md-cloud-upload-outline' size={30} color={'#66656C'} />
                      </View>
                      <Text style={{ color: '#66656C' }}>Klik Untuk Unggah</Text>
                    </View>
                  </Pressable>
                  {/* ) : null} */}
                  {document.length < 1 ? (
                    null
                  ) : (
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, flexWrap: 'wrap', gap: 10 }}>
                      {document?.map((doc, i) => (
                        <>
                          : {(
                            <Image key={doc.uri} source={{ uri: doc.uri }}
                              style={{ width: 97, height: 97, borderRadius: 8 }}
                            />
                          )}
                        </>
                      ))}
                    </View>
                  )}
                </View>

                <Text style={{ color: COLORS.lighter }}>*) Hanya png ,jpg, pdf yang akan diterima dari total berkas file maks 5mb</Text>
              </View>


            </View>

            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10, alignItems: 'center' }}>
                <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Info Cuti</Text>
              </View>

              <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Kuota Penuh</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>{form.data_kuota_cuti?.full_kuota}</Text>
                  </View>

                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Kuota Terpakai</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, }}>{form.data_kuota_cuti?.kuota_terpakai}</Text>
                  </View>

                  <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Kuota Tersisa</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, }}>{form.data_kuota_cuti?.kuota_sisa}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: "row", padding: 5, columnGap: 10, alignItems: 'center' }}>
                <Ionicons name='person-outline' size={18} color={COLORS.primary} />
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Yang Menyetujui</Text>
              </View>

              <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: "row", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, paddingRight: 20 }}>Atasan Langsung</Text>
                  </View>

                  <Dropdown
                    data={pickAtasan()}
                    setSelected={setAtasan}
                    selected={atasan}
                    borderWidth={1}
                    borderwidthDrop={1}
                    borderWidthValue={1}
                    borderColor={COLORS.ExtraDivinder}
                    borderColorDrop={COLORS.ExtraDivinder}
                    borderColorValue={COLORS.ExtraDivinder}
                    search={true}
                  />

                  <View style={{ flexDirection: "row", padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, paddingRight: 20 }}>Pejabat Berwenang</Text>
                  </View>

                </View>
              </View>
            </View>

          </View>

          <View style={{ marginLeft: 17, flexDirection: 'row', gap: 10, paddingBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: COLORS.success, padding: 10, borderRadius: 10, width: "46.5%", height: 50, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: COLORS.white }}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#B745FF", padding: 10, borderRadius: 10, width: "46.5%", height: 50, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: COLORS.white }}>Simpan Draft</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ View>
    </GestureHandlerRootView >
  )
}
const styles = StyleSheet.create({
  cardStatus: {
    width: 175,
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