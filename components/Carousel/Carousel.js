import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, useWindowDimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useAnimatedScrollHandler } from 'react-native-reanimated'
import { interpolate } from 'react-native-reanimated'

export const Carousel = ({ data }) => {
    const { width } = useWindowDimensions()
    const SIZE = width * 0.8
    const SPACER = (width - SIZE) / 2
    const x = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x
        }
    })
    const [newData] = useState([{
        key: 'spacer-left'
    },
    ...data,
    { key: 'spacer-right' }])
    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={SIZE}
            decelerationRate={'fast'}
            onScroll={onScroll}
        >
            {newData.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.88, 1, 0.88]
                    )
                    return {
                        transform: [{ scale }],
                    }
                })
                if (!item.image) {
                    return <View style={{ width: SPACER }} key={index} />;
                }
                return (
                    <View style={{ width: SIZE }} key={index}>
                        <Animated.View style={[styles.imageContainer, style]}>
                            <Image source={item.image} style={styles.image} />
                        </Animated.View>
                    </View>
                );
            })}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 34,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9,
    }
})
