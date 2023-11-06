import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../config/SuperAppps';

export const CardAppsB = ({ handlePressModal }) => {
  const navigation = useNavigation()
  return (
    <View style={{ padding: 20, gap: 20}}>
      <View style={{ flexDirection: 'row',  gap: 25 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/korespondensi-ikon3.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Korespondensi</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainKeb')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/kebijakan-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kebijakan</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('GrupKalender')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/kalender-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kalender</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row',  gap: 25,  }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainRepo')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/preparing-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Preparing dan Sharing</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainPengetahuan')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/pengetahuan-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4, textAlign: 'center' }}>Pengetahuan</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/task-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Task Management</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row',  gap: 25}}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('HalamanUtama')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/agenda-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>Agenda Rapat</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainDigitalSign')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              {/* <Ionicons name='school-outline' size={24} color={COLORS.primary} /> */}
              <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/digital-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Digital Sign</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ListPegawai')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/pegawai-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pegawai</Text>
        </View>
      </View>
      

      <View style={{flexDirection: 'row',  gap: 25, }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainSPPD')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/sppd-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>SPPD</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainCuti')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex', }]}>
            <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/cuti-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Cuti</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    width: '90%',
    height: 150,
    borderRadius: 12,
    marginVertical: 30
  },
  cardApps: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
})