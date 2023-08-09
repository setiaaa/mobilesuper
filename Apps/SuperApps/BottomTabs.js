import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS, FONTSIZE } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native';
import { Modal } from 'react-native';
import { Image } from 'react-native';

function MyTabBar({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'center', paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'center', gap: 30 }}>
                        <TouchableOpacity
                            key={1}
                            onPress={() => {
                                setTabItemIndex(1)
                                navigation.navigate('Home', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='home' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={2}
                            onPress={() => {
                                setTabItemIndex(2)
                                navigation.navigate('Satker', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='business-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Satker</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={4}
                            onPress={() => {
                                setTabItemIndex(4)
                                // navigation.navigate('Tp', { unread: false })
                                setVisibleModal(true)
                            }}
                            style={{
                                top: -35,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                height: 70,
                                width: 70,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <View style={{
                                    backgroundColor: COLORS.primary,
                                    width: 51,
                                    height: 51,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Ionicons name='grid-outline' color={COLORS.white} size={24} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={5}
                            onPress={() => {
                                setTabItemIndex(5)
                                navigation.navigate('FAQ', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='reader' color={tabItemIndex === 5 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 5 ? COLORS.primary : COLORS.grey }}>FAQ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={6}
                            onPress={() => {
                                setTabItemIndex(6)
                                navigation.navigate('Profile', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='person' color={tabItemIndex === 6 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 6 ? COLORS.primary : COLORS.grey }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 
                
                
                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'flex-end', flex: 1, marginRight: 20 }}>
                
                
                
            </View> */}
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visibleModal}
                    onRequestClose={() => {
                        setVisibleModal(!visibleModal);
                    }}
                >
                    <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <View style={{ backgroundColor: COLORS.white, width: '90%', height: '28%', borderRadius: 10, marginTop: '90%' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 30 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                                        <View style={[styles.cardApps, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                                            <Ionicons name='create-outline' size={24} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Perencanaan</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                                        <View style={[styles.cardApps, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                                            <Ionicons name='document-outline' size={24} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Keuangan</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Kepegawaian')
                                        setVisibleModal(false)
                                    }
                                    }>
                                        <View style={[styles.cardApps, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                                            <Ionicons name='people-circle-outline' size={24} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kepegawaian</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, marginTop: 30, marginHorizontal: 15, alignItems: 'flex-start' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                                        <View style={[styles.cardApps, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                                            <Ionicons name='list-outline' size={24} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>Produksi{'\n'}Budidaya</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                                        <View style={[styles.cardApps, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                                            <Ionicons name='list-outline' size={24} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Produk Penangkapan</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { setVisibleModal(false) }}
                        style={{
                            position: 'absolute',
                            bottom: '9%',
                            left: '40%'
                        }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            height: 70,
                            width: 70,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                            <View style={{
                                backgroundColor: COLORS.primary,
                                width: 51,
                                height: 51,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <Ionicons name='close-outline' color={COLORS.white} size={24} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        </BottomSheetModalProvider >
    )
}


const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cardApps: {
        width: 48,
        height: 48,
        borderRadius: 50,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        //shadow android
        elevation: 5
    },

})
export default MyTabBar