import React from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS,FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'



export const TambahCutiTahunan = () => {

  const navigation = useNavigation()
  const [collapse, setCollapse] = useState({
    nip: '',
    toggle: false
  })
  const { profile } = useSelector(state => state.superApps)


  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ position: 'relative' }}>
      <ScrollView>
          
        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',backgroundColor: COLORS.primary, height: 80,  }}>
          <View style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            marginLeft: 20
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
          </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center',  }}>
            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Libur</Text>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20}}>

        <View style={{ gap: 10}}>
          <View style={{flexDirection:"row", padding:5, columnGap:10}}>
            <Ionicons name='document-outline' size={18} color={COLORS.primary} />
            <Text style={{fontWeight:FONTWEIGHT.bold}}>Jenis Cuti</Text>
          </View>

          <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
            <View style={{ gap: 5}}>
              <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10}}>
                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Jenis Cuti</Text>
                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Cuti Alasan Penting - Kementrian Kelautan dan Perikanan</Text>
              </View>

              <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10}}>
                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tipe Hari</Text>
                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color: "#B745FF" }}>Hari Kerja</Text>
              </View>

              <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", padding: 10}}>
                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Status Dokumen</Text>
                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color:COLORS.success }}>Dokumen Baru</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{flexDirection:"row", padding:5, columnGap:10}}>
            <Ionicons name='document-outline' size={18} color={COLORS.primary} />
            <Text style={{fontWeight:FONTWEIGHT.bold}}>Status Dokumen Cuti</Text>
          </View>
          <View>
          <View style={{
            backgroundColor: COLORS.white,
            padding: 15,
            borderRadius: 8,
          }}>
            <TouchableOpacity onPress={() => setCollapse({ nip: profile.nip, toggle: true })}>
              <View style={{flexDirection:"row"}}>
                <View style={{width:"90%"}}>
                  <Text>Muhammad Zaini</Text>
                  <Text>NIP. 1923123121213</Text>
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
                <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>IV</Text>

                <Text style={{ marginTop: 10, }}>Jabatan</Text>
                <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Pengelola Produksi</Text>

                <Text style={{ marginTop: 10, }}>Unit Kerja</Text>
                <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Kelompok Fungsional Direktorat</Text>
              </TouchableOpacity>
            </View>
            ) : (
            null
            )}
          </View>                                  
          </View>
        </View>

        <View style={{}}>
          <View style={{ backgroundColor: COLORS.white, padding: 15, borderRadius: 8}}>
              <Text>Periode Cuti</Text>
          </View>
        </View>

      </View>
      </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  cardStatus: {
      width:175,
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
      // margin:10,
      marginVertical: 10,
      flexDirection:"row",
  }

})