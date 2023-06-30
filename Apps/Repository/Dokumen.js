import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const data = [
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    },
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    },
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    },
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    },
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    },
    {
        judul: 'Business Agility with Scrum',
        tanggal: '16 Mei 2023'
    }
];

const DataList = ({ judul, tanggal }) => {

    return (
        <View style={{ flexDirection: 'row', marginVertical: 20, }}>
            <View style={styles.cardNo}>
                <Ionicons name='document-outline' size={30} color={'#800000'} />
            </View>
            <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontSize: 13, fontWeight: 400, marginBottom: 10, color: '#111827' }}>{judul}</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400, marginBottom: 10, color: '#6B7280' }}>{tanggal}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                        <Ionicons name='ellipsis-vertical-outline' size={24} color={'#999999'} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const DataGrid = ({ judul, tanggal }) => {

    return (
        <View style={{ marginVertical: 20, marginHorizontal: 25 }}>
            <View style={styles.cardNo}>
                <Ionicons name='document-outline' size={30} color={'#800000'} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: 400,
                            marginBottom: 10,
                            color: '#111827',
                            width: 100,
                            textAlign: 'center'
                        }}
                        numberOfLines={2}
                    >
                        {judul}
                    </Text>
                    <View style={{ justifyContent: 'center', }}>
                        <Ionicons name='ellipsis-vertical-outline' size={24} color={'#999999'} />
                    </View>
                </View>
            </View>
        </View>
    )
}


export const Dokumen = () => {
    const [variant, setVariant] = useState('list')

    const handleVariant = (cekVariant) => {
        setVariant(cekVariant)
    }
    const navigation = useNavigation()
    return (
        <ScrollView>
            <View style={{ marginBottom: 20 }}>
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
                            <Ionicons name='close-outline' size={24} color={'#800000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Repositori</Text>
                    </View>
                </View>
                <View style={{ width: '90%', marginLeft: 20, marginVertical: 20 }}>
                    <Search placeholder={'Cari'} />
                </View>
                <View style={styles.card}>
                    <View style={{ marginRight: 40, marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => handleVariant('list')}>
                            <View style={styles.circleList}>
                                <Ionicons name='list-outline' size={24} color={variant === 'list' ? '#800000' : 'grey'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleVariant('grid')}>
                            <View style={styles.circleList}>
                                <Ionicons name='apps-outline' size={24} color={variant === 'grid' ? '#800000' : 'grey'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider bold />
                    {variant === 'list' ? (
                        <FlatList
                            key={'_'}
                            data={data}
                            renderItem={({ item }) => <DataList
                                judul={item.judul}
                                tanggal={item.tanggal}
                                item={item}
                            />
                            }
                            keyExtractor={item => "_" + item.id}
                            style={{ height: 440 }}
                        />

                    ) : (
                        <FlatList
                            key={'#'}
                            data={data}
                            renderItem={({ item }) => <DataGrid
                                judul={item.judul}
                                tanggal={item.tanggal}
                                item={item}
                            />
                            }
                            numColumns={2}
                            keyExtractor={item => "#" + item.id}
                            style={{ height: 440 }}
                        />
                    )}
                    <View style={{ marginBottom: 40 }}>
                        <Divider bold />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        flexDirection: "column",
        width: '90%',
        marginLeft: 20,
        borderRadius: 16,
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    cardNo: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 10
    },
    circleList: {
        width: 35,
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})