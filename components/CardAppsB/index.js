import React, { useEffect, useState, Fragment } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../config/SuperAppps';
import { useSelector } from 'react-redux';

export const CardAppsB = ({ handlePressModal }) => {
  const navigation = useNavigation()
  const [listMenu, setListMenu] = useState([]);

  const { profile } = useSelector((state) => state.superApps)

  const roleKalender = ["CALENDAR.USER"];
  const rolePreShare = ["PRESHARE.USER"];
  const roleTaskManagement = ["TASK.USER"];
  const roleEvent = ["EVENT.USER"];

  const isRoleKalender = profile.roles_access?.some((item) =>
    roleKalender.includes(item)
  );
  const isRolePreShare = profile.roles_access?.some((item) =>
    rolePreShare.includes(item)
  );
  const isRoleTaskManagement = profile.roles_access?.some((item) =>
    roleTaskManagement.includes(item)
  );
  const isRoleEvent = profile.roles_access?.some((item) =>
    roleEvent.includes(item)
  );

  useEffect(() => {
    let tmpMenu = []
    tmpMenu.push(
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/korespondensi-ikon3.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Korespondensi</Text>
      </View>,
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainKeb')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/kebijakan-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kebijakan</Text>
      </View>,
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainPengetahuan')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/pengetahuan-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4, textAlign: 'center' }}>Pengetahuan</Text>
      </View>
    )
    if (isRolePreShare) {
      tmpMenu.push(
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainRepo')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/preparing-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: FONTSIZE.H4,
            }}
          >
            Preparing dan Sharing
          </Text>
        </View>
      )
    }
    if (isRoleKalender) {
      tmpMenu.push(
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('GrupKalender')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/kalender-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kalender</Text>
        </View>
      )
    }
    if (isRoleTaskManagement) {
      tmpMenu.push(
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/task-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              textAlign: "center",
              fontSize: FONTSIZE.H4,
            }}
          >
            Agenda Rapat
          </Text>
        </View>
      )
    }
    if (isRoleEvent) {
      tmpMenu.push(
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('HalamanUtama')}>
            <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
              <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/agenda-ikon.png')} />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>Agenda Rapat</Text>
        </View>
      )
    }
    tmpMenu.push(
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainDigitalSign')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            {/* <Ionicons name='school-outline' size={24} color={COLORS.primary} /> */}
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/digital-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Digital Sign</Text>
      </View>,
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ListPegawai')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/pegawai-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pegawai</Text>
      </View>,
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainSPPD')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/sppd-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>SPPD</Text>
      </View>,
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainCuti')}>
          <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex', }]}>
            <Image style={{ width: 28, height: 28 }} source={require('../../assets/superApp/cuti-ikon.png')} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Cuti</Text>
      </View>
    )

    setListMenu(tmpMenu);
  }, [])

  const numRows = Math.ceil(listMenu.length / 3);

  const renderRow = ({ item }) => (
    <View style={{ flexDirection: 'row', gap: 25, marginBottom: 15 }}>
      {item}
    </View>
  );

  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    listMenu.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  return (
    <View>
      <FlatList
        style={{ padding: 20, gap: 20 }}
        data={rows}
        keyExtractor={(row, index) => `row_${index}`}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    width: "90%",
    height: 150,
    borderRadius: 12,
    marginVertical: 30,
  },
  cardApps: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
