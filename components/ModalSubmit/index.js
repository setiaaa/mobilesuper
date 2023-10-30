import React from 'react'
import { Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from '../../store/GrupKalender'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { COLORS } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'

export const ModalSubmit = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { status } = useSelector(state => state.grupKalender)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={status === '' ? false : true}
            onRequestClose={() => {
                dispatch(setStatus(''))
            }}
        >
            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: 325, height: 350 }}>
                    <TouchableOpacity onPress={() => dispatch(setStatus(''))} style={{ marginTop: 5, paddingRight: '80%' }}>
                        <Ionicons name='close-outline' size={24} />
                    </TouchableOpacity>
                    {
                        status === 'berhasil' ? (
                            <>
                                <View style={{ marginBottom: 40 }}>
                                    <Image source={require('../../assets/superApp/alertBerhasil.png')} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                        <Text >Berhasil Ditambahkan!</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        dispatch(setStatus(''))
                                        navigation.navigate('GrupKalender')
                                    }} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ backgroundColor: COLORS.success, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: COLORS.white }}>Ok</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View style={{ marginBottom: 40 }}>
                                <Image source={require('../../assets/superApp/alertGagal.png')} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Text >Terjadi Kesalahan!</Text>
                                </View>
                                <TouchableOpacity onPress={() => dispatch(setStatus(''))} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ backgroundColor: COLORS.danger, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: COLORS.white }}>Ok</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    Card: {
        backgroundColor: COLORS.white,
        width: "90%",
        marginVertical: 20,
        marginLeft: 20,
        borderRadius: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

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
    }
})