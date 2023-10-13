import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../config/SuperAppps'
import Checkbox from 'expo-checkbox'
import { setTokenValue } from '../service/session'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../service/api'
import { Ionicons } from '@expo/vector-icons';

export const LoginToken = () => {
    const navigation = useNavigation()
    const [isSelected, setSelection] = useState(false);
    const [count, setCount] = useState(0)
    const [password, setPassword] = useState('')
    const [onChange, setOnChange] = useState('')
    const [token, setToken] = useState('')
    const [username, setUserName] = useState('')
    const [validasi, setValidasi] = useState({
        nip: false,
        pass: false
    })
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()

    const { error } = useSelector((state) => state.login);

    useEffect(() => {
        setUserName('')
        setPassword('')
        if (error !== null && !error) {
            navigation.navigate('Main')
        } else if (error !== null && error) {
            alert('Username atau Password salah')
        }
    }, [error])

    const handleSubmit = () => {
        let nipField = false;
        let passField = false;
        if (username === '') nipField = true;
        else nipField = false;
        if (password === '') passField = true;
        else passField = false;
        setValidasi({
            ...validasi,
            nip: nipField,
            pass: passField
        })
        if (username === '' || password === '') {
            alert('Harap Lengkapi Form')
        } else {
            dispatch(Login({ username, password }))
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'height' : 'height'}
            >
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={{ backgroundColor: COLORS.white, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingVertical: 20 }}>

                            <Pressable onPress={() => {
                                setCount(prev => prev + 1)
                            }}>
                                <Image source={require('../assets/logokkp.png')} style={{ width: 200, height: 200 }} />
                            </Pressable>

                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 20 }}>
                                <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: 500 }}>SSO</Text>
                                <Text style={{ fontSize: FONTSIZE.Judul }}>Kementerian Kelautan & Perikanan</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 20 }}>
                                <Text>Nama Pengguna</Text>
                                <TextInput
                                    style={{ borderWidth: 1, borderRadius: 5, height: 35, marginTop: 5, borderColor: COLORS.ExtraDivinder, padding: 10 }}
                                    onChangeText={(e) => {
                                        setUserName(e)
                                    }}
                                    value={username}
                                />
                            </View>
                            <View style={{ width: '90%', marginTop: 10 }}>
                                <Text>Kata Sandi</Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row',
                                    height: 35,
                                    marginTop: 5,
                                }}>
                                    <TextInput
                                        style={{ padding: 10, width: '70%' }}
                                        onChangeText={(e) => {
                                            setPassword(e)
                                        }}
                                        value={password}
                                        secureTextEntry={show}

                                    />
                                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                        {show == false ? (
                                            <TouchableOpacity onPress={() => {
                                                setShow(true)
                                            }}>
                                                <Ionicons name='eye-off-sharp' size={24} color={COLORS.grey} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => {
                                                setShow(false)
                                            }}>
                                                <Ionicons name='eye-sharp' size={24} color={COLORS.grey} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Checkbox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    color={isSelected === true ? COLORS.lighter : null}
                                />
                                <Text>Saya menyetujui Ketentuan Penggunaan dan Ketentuan Layanan BSrE</Text>
                            </View>


                            <TouchableOpacity
                                style={{
                                    width: '90%',
                                    height: 35,
                                    backgroundColor: COLORS.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                    borderRadius: 8
                                }}
                                onPress={() => {
                                    handleSubmit()
                                }}
                            >
                                <Text style={{ color: COLORS.white }}>Masuk</Text>
                            </TouchableOpacity>

                            {/* {count >= 5 ? (
                                <View style={{ borderWidth: 1, marginTop: 20, padding: 20, borderRadius: 8, borderColor: COLORS.ExtraDivinder, width: '80%' }}>
                                    <Text>FORM KODE ADMIN</Text>
                                    <View>
                                        <TextInput
                                            style={{ borderWidth: 1, borderRadius: 5, height: 35, marginTop: 5, borderColor: COLORS.ExtraDivinder, padding: 10 }}
                                            onChangeText={(e) => setOnChange(e)}
                                        />
                                        {password === onChange ? (
                                            <View style={{ marginTop: 10 }}>
                                                <Text>INPUT TOKEN</Text>
                                                <View>
                                                    <TextInput
                                                        style={{ borderWidth: 1, borderRadius: 5, height: 35, marginTop: 5, borderColor: COLORS.ExtraDivinder, padding: 10 }}
                                                        onChangeText={(e) => {
                                                            setToken(e)
                                                        }}
                                                    />
                                                </View>
                                                <TouchableOpacity onPress={() => {
                                                    if (token !== '') {
                                                        setTokenValue(token)
                                                        navigation.navigate('Main')
                                                    }
                                                }}
                                                    style={{
                                                        backgroundColor: COLORS.primary,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 20,
                                                        borderRadius: 8,
                                                        height: 35
                                                    }}
                                                >
                                                    <Text style={{ color: COLORS.white }}>Masuk</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                </View>
                            ) : (
                                null
                            )} */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
