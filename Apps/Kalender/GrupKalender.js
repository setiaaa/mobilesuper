import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { CardAgenda } from '../../components/CardAgenda';

export const GrupKalender = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState("");

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  return (
    <View>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Agenda Bersama</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20, gap: 10 }}>
        <View style={{ width: '75%', marginLeft: 20 }}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder='Pilih Grup'
            boxStyles={{ borderColor: COLORS.white, backgroundColor: COLORS.white }}
          />
        </View>
        <View style={{ backgroundColor: 'white', width: '11%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, height: 45 }}>
          <Ionicons name='information-circle-outline' size={24} color={COLORS.primary} />
        </View>
      </View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          console.log(day.dateString)
        }}
        markedDates={{
          [moment(Date.now()).format('YYYY-MM-DD')]: {
            selected: true,
          },

          ['2023-07-06']: {
            marked: 'true',
            type: 'multi-dot',
            dots: [
              { color: 'red' },
              { color: 'blue' },
              { color: 'green' },
              { color: 'orange' }
            ]
          }
        }}
        markingType='multi-dot'
        style={{ width: '90%', marginLeft: 20, borderRadius: 16 }}
        theme={{
          arrowColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.primary,
          todayTextColor: COLORS.primary,

        }}
      />
      <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Agenda hari ini</Text>
        <View style={{ marginTop: 20 }}>
          <CardAgenda />
        </View>
      </View>
    </View>
  )
}
