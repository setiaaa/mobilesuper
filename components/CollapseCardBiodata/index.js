import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Touchable } from 'react-native'
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'

export const CollapseCardBiodata = ({ profile }) => {
    console.log(profile)
    const [collapse, setCollapse] = useState(false)
    return (
        <View>
            <Collapse>
                <CollapseHeader>
                    <TouchableOpacity onPress={() => setCollapse(!collapse)}>
                        <View style={styles.card} >
                            <View style={{
                                backgroundColor: collapse === true ? COLORS.secondaryLighter : COLORS.white,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <Ionicons name='person-outline' size={24} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Biodata</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    {collapse === true ?
                                        <Ionicons name='chevron-up-outline' size={20} />
                                        :
                                        <Ionicons name='chevron-down-outline' size={20} />}

                                </View>
                            </View>
                            <View style={{ marginLeft: 50 }}>
                                {/* custom divider */}
                                <View style={{ height: 1, width: '88%', backgroundColor: '#DBDADE' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.cardCollapse}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5 }}>
                            <Text style={{ width: 100 }}>Nama</Text>
                            <Text>:</Text>
                            <Text>{profile.nama}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5 }}>
                            <Text style={{ width: 100 }}>NIP</Text>
                            <Text>:</Text>
                            <Text>{profile.nip}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5 }}>
                            <Text style={{ width: 100 }}>Email KKP</Text>
                            <Text>:</Text>
                            <Text>{profile.email}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5 }}>
                            <Text style={{ width: 100 }}>Satker</Text>
                            <Text>:</Text>
                            <Text style={{ width: 216 }}>{profile.unit}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 5 }}>
                            <Text style={{ width: 100 }}>Unit Kerja</Text>
                            <Text>:</Text>
                            <Text style={{ width: 216 }}>{profile.unit}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginTop: 10 }} />
                    </View>
                </CollapseBody>
            </Collapse>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        borderRadius: 8,
        width: 362
    },
    cardCollapse: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        width: 362
    }
})
