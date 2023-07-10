import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

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
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#800000', height: 80, paddingBottom: 20 }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          width: 28,
          height: 28,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 20
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={24} color={'#800000'} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Agenda Bersama</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20, gap: 10 }}>
        <View style={{ width: '75%', marginLeft: 20 }}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder='Pilih Grup'
            boxStyles={{ borderColor: 'white', backgroundColor: 'white' }}
          />
        </View>
        <View style={{ backgroundColor: 'white', width: '11%', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
          <Ionicons name='information-circle-outline' size={24} color={'#800000'} />
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
          arrowColor: '#800000',
          selectedDayBackgroundColor: '#800000',
          todayTextColor: '#800000',

        }}
      />
    </View>
  )
}
