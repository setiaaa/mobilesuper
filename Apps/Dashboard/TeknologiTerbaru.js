import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'

const ListTeknologi = ({ image, deskripsi, item }) => {
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: '91%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginHorizontal: 20
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailTeknologi', { item: item })}>
                <View>
                    <Image source={image} style={Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid} />
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <Text style={{ marginVertical: 5, fontSize: 13, fontWeight: FONTWEIGHT.bold, marginHorizontal: 10 }}>{deskripsi}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const TeknologiTerbaru = () => {

    const { teknologi } = useSelector(state => state.dashboard)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '90%', marginLeft: 20, marginTop: 20 }}>
                <Search
                    placeholder={'Pencarian'}
                />
            </View>
            <FlatList
                data={teknologi.lists}
                renderItem={({ item }) => <ListTeknologi
                    image={item.image}
                    deskripsi={item.deskripsi}
                    item={item}
                />
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        borderRadius: 16
    },
    imageAndroid: {
        borderRadius: 16
    },
})
