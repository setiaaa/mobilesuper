import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { COLORS } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';


export const Dropdown = ({ data, setSelected, placeHolder, borderColor, borderWidth, borderwidthDrop, borderColorDrop, borderWidthValue, borderColorValue, heightValue }) => {
    const [press, setPress] = useState(0)
    const handlePress = () => {
        if (press === 0) {
            setPress(1)
        } else {
            setPress(0)
        }
    }
    const [pressData, setPressData] = useState('')
    const [displayData, setDisplayData] = useState('')
    const handlePressData = (item) => {
        setPressData(item.key)
        setPress(0)
        setSelected(item)
        setDisplayData(item.value)
    }
    return (
        <View>
            {press === 0 ? (
                <View style={{ backgroundColor: COLORS.white, width: '100%', height: 43, borderRadius: 8, borderColor: borderColor, borderWidth: borderWidth }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Animated.View
                            entering={FadeInUp}
                            exiting={FadeOutUp}
                        >
                            <View style={{ marginLeft: 20, flexDirection: 'row', marginTop: 15 }}>
                                <Text style={{ color: COLORS.lighter }}>{displayData !== '' ? displayData : placeHolder}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    <Ionicons name='chevron-down-outline' size={14} color={COLORS.lighter} />
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            ) : (
                <Animated.View
                    entering={FadeInUp}
                    exiting={FadeOutUp}
                >
                    <View>
                        <View style={{ backgroundColor: COLORS.white, width: '100%', height: 43, borderRadius: 8, borderWidth: borderwidthDrop, borderColor: borderColorDrop }}>
                            <TouchableOpacity onPress={handlePress} style={{ alignItems: 'center', flex: 1, marginLeft: 20, flexDirection: 'row' }}>
                                <Text style={{ color: COLORS.lighter }}>{displayData !== '' ? displayData : placeHolder}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    <Ionicons name='chevron-up-outline' size={14} color={COLORS.lighter} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: COLORS.white, width: '100%', borderRadius: 8, marginTop: 15, paddingVertical: 10, borderWidth: borderWidthValue, borderColor: borderColorValue, height: heightValue ? heightValue : 'auto' }}>
                            {data.map(kategori => {
                                return (
                                    <TouchableOpacity onPress={() => handlePressData(kategori)} style={{ alignItems: 'center', flex: 1, marginLeft: 20, flexDirection: 'row', gap: 10, marginVertical: 5 }}>
                                        {pressData !== kategori.key ? (
                                            <Ionicons name='radio-button-off' color={COLORS.primary} size={18} />
                                        ) : (
                                            <Ionicons name='radio-button-on' color={COLORS.primary} size={18} />
                                        )}
                                        <Text style={{ color: COLORS.lighter }}>{kategori.value}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            )}
                        </View>
                    </View>
                </Animated.View>
            )}
        </View>
    )
}
