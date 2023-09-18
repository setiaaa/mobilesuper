import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenValue } from '../service/session'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { getEmployee } from '../service/api'
import { COLORS, FONTWEIGHT } from '../config/SuperAppps'
import { setAddressbookSelected } from '../store/AddressbookKKP'


const CardPegawai = ({ data, addressbook, config }) => {
    const dispatch = useDispatch()
    return (
        <View style={{ backgroundColor: COLORS.white }}>

            <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 15 }}
                onPress={() => {
                    const checkNode = addressbook.selected.filter((item) => item.nip === data.nip)
                    if (checkNode.length > 0) {
                        alert('Data tidak boleh sama')
                    } else {
                        if (config.multiselect) {
                            dispatch(setAddressbookSelected([
                                ...addressbook.selected,
                                data
                            ]))
                        } else {
                            dispatch(setAddressbookSelected([data]))
                        }
                    }
                }}
            >
                <Text style={{ width: '60%' }}>{data.nama}</Text>
                <Text>{data.nip}</Text>
            </TouchableOpacity>
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
        </View>
    )
}

export const AddressBookPegawai = ({ route }) => {
    const [token, setToken] = useState('')
    const { config } = route.params

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getEmployee(token))
            // dispatch(getDivisionTree({ token: token, id: kategori.key }))
        }
    }, [token])

    const { addressbook } = useSelector(state => state.addressBookKKP)
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.infoLight, }}>
                <Text style={{ width: '49%', marginHorizontal: 20, fontWeight: FONTWEIGHT.bold }}>Nama</Text>
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>NIP</Text>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE' }} />
            <FlatList
                data={addressbook?.employee}
                renderItem={({ item }) => <CardPegawai
                    data={item}
                    addressbook={addressbook}
                    config={config}
                />
                }
                keyExtractor={item => item.nip}
            />
        </View>
    )
}
