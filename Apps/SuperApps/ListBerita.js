import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search';
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../../config/SuperAppps';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const Item = ({ image, tanggal, subtitle, title, item, index }) => {
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: '90%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginHorizontal: 20
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailBerita', {
                item: item
            })}>
                <View>
                    <Image source={image} style={Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid} />
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{tanggal}</Text>
                    <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{subtitle}</Text>
                    <Text style={{ marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


export const ListBerita = () => {
    const { berita } = useSelector(state => state.superApps)
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                <View style={{ backgroundColor: COLORS.primary, height: '10%', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                            <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Berita</Text>
                    </View>
                </View>
                <View style={{ width: '90%', marginLeft: 20, marginTop: 20 }}>
                    <Search
                        placeholder={'Pencarian'}
                    />
                </View>
                <FlatList
                    data={berita.lists}
                    renderItem={({ item, index }) => <View key={index}>
                        <Item
                            image={item.image}
                            tanggal={item.tanggal}
                            subtitle={item.subtitle}
                            title={item.title}
                            id={item.id}
                            item={item}
                        />
                    </View>
                    }
                    keyExtractor={item => item.id}
                />

            </View>
        </SafeAreaView>
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
        height: 193, width: 350, borderRadius: 16
    },
    imageAndroid: {
        height: 193, width: 369, borderRadius: 16
    }
})
