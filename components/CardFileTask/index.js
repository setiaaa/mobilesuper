import React from 'react'
import { FlatList, Text } from 'react-native'
import { View } from 'react-native'
import { COLORS, FONTSIZE } from '../../config/SuperAppps'
import { Image } from 'react-native'


export const CardFile = ({ image, file }) => {
    return (
        <View style={{ backgroundColor: COLORS.white, width: 96, borderRadius: 8, marginHorizontal: 10, marginBottom: 10 }}>
            <Image source={image} />
            <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: FONTSIZE.H5 }}>{file}</Text>
            </View>
        </View>
    )
}

export const CardFileTask = ({ taskDetail }) => {
    return (
        <View>
            <FlatList
                key={'*'}
                data={taskDetail[0].lampiranFile}
                renderItem={({ item }) => <CardFile
                    image={item.image}
                    file={item.file}
                />
                }
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={item => "*" + item.id}
            />
        </View>
    )
}
