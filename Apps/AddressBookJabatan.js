import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenValue } from '../service/session'
import { getDivision, getDivisionTree } from '../service/api'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { Dropdown } from '../components/DropDown'
import { COLORS, FONTWEIGHT } from '../config/SuperAppps'
import { ScrollView } from 'react-native-gesture-handler'
import TreeView from 'react-native-final-tree-view'
import { Ionicons } from '@expo/vector-icons';
import { setAddressbookSelected } from '../store/AddressbookKKP'

export const AddressBookJabatan = ({ route }) => {
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
            dispatch(getDivision(token))
            // dispatch(getEmployee(token))
            // dispatch(getDivisionTree({ token: token, id: kategori.key }))
        }
    }, [token])

    const [kategori, setKategori] = useState('')

    const { addressbook } = useSelector(state => state.addressBookKKP)

    function getIndicator(isExpanded) {
        if (isExpanded) {
            return (
                <Ionicons name='chevron-down-outline' size={20} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            )
        } else {
            return (
                <Ionicons name='chevron-forward-outline' size={20} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
            )
        }
    }

    const [listTree, setListTree] = useState([])
    const [selectedlistTree, setSelectedsetListTree] = useState([])

    useEffect(() => {
        setListTree(addressbook.listsDivisiontree)
    }, [addressbook.listsDivisiontree])

    const navigation = useNavigation()

    // const filterselect = (node) => {
    //     if (selectedlistTree.length === 0) {
    //         setSelectedsetListTree([...selectedlistTree, node])
    //     } else {
    //         let data = selectedlistTree.filter(item => item.id === node.id)
    //         if (data.length == 0) {
    //             setSelectedsetListTree([...selectedlistTree, node])
    //         }
    //     }

    // }
    // console.log(selectedlistTree)



    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: 20, width: '90%' }}>
                <Dropdown
                    data={addressbook?.listsDivision}
                    heightValue={'100%'}
                    setSelected={setKategori}
                    handleClick={(item) => {
                        dispatch(getDivisionTree({ token: token, id: item.key }))
                    }}
                    borderWidth={1}
                    borderColor={COLORS.ExtraDivinder}
                    borderwidthDrop={1}
                    borderColorDrop={COLORS.ExtraDivinder}
                    borderWidthValue={1}
                    borderColorValue={COLORS.ExtraDivinder}
                    placeHolder={'Berdasarkan'}
                />
            </View>

            <ScrollView
                style={{ backgroundColor: COLORS.white, marginTop: 20, width: '90%', borderRadius: 8, padding: 10, marginBottom: 50 }}
            >
                <TreeView
                    data={listTree} // defined above
                    onNodePress={({ node }) => {
                        if (node?.children === undefined) {
                            const checkNode = addressbook.selected.filter((item) => item.id === node.id)
                            if (checkNode.length > 0) {
                                alert('Data tidak boleh sama')
                            } else {
                                if (config.multiselect) {
                                    dispatch(setAddressbookSelected([
                                        ...addressbook.selected,
                                        node
                                    ]))
                                } else {
                                    dispatch(setAddressbookSelected([node]))
                                    navigation.goBack()
                                }

                            }
                        }
                    }}
                    renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                        return (
                            <>
                                <View
                                    style={{
                                        paddingVertical: 6
                                    }}
                                >
                                    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4, marginLeft: 30 * level }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                                            {
                                                hasChildrenNodes ? (
                                                    <Text>{getIndicator(isExpanded)}</Text>
                                                ) : null
                                            }
                                            <Text style={{ fontWeight: FONTWEIGHT.bold, flexShrink: 1 }}>{node.title}</Text>
                                        </View>

                                        {
                                            node.officer.official !== '' ? (
                                                <Text>{node.officer.official}</Text>
                                            ) : null
                                        }

                                    </View>
                                    {/* custom divider */}
                                    {
                                        level == 0 && isExpanded ? (
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
                                        ) : (
                                            level == 0 && !isExpanded ? (
                                                <></>
                                            ) : (
                                                <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
                                            )
                                        )
                                    }
                                </View>
                            </>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}
