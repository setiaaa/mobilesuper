import React from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS,FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'

export const Libur = () => {
    const navigation = useNavigation()
    const [variant, SetVariant] = useState('')

    const [collapse, setCollapse] = useState({ toggle: false }) 
  return (
    <GestureHandlerRootView>
        <SafeAreaView style={{ position: 'relative' }}>
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,  }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center',  }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Libur</Text>
                    </View>
                </View>

                <View style={{marginTop: 50, gap: 30, marginBottom: 30 }}>
                  <View style={{ alignItems: 'center', gap: 20 }}>
                    <Image source={require('../../assets/superApp/LiburTanggal.png')} style={{  }} />
                    <Text style={{fontWeight: FONTWEIGHT.bold, fontSize: 30, color: COLORS.lighter}}>2023</Text>
                  </View>

                  <View style={{paddingHorizontal:20}}>
                    <View style={{
                            backgroundColor: COLORS.white,
                            padding: 15,
                            borderRadius: 8
                    }}>
                        <TouchableOpacity onPress={() => setCollapse({  toggle: true })}>
                            <View style={{flexDirection:"row", gap: 20}}>
                              <View>
                                <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{marginRight:"35%"}}>Libur Nasional Tahun ini</Text>
                                { collapse.toggle === true ? (
                                <TouchableOpacity onPress={() => setCollapse({ toggle: false })}>
                                  <Ionicons name='chevron-up' size={24} />
                                </TouchableOpacity>
                                ) : (
                                  <Ionicons name='chevron-down' size={24} />
                                )}
                              </View>
                            </View>
                        </TouchableOpacity>

                            { collapse.toggle === true ? (
                                <View>

                                    <TouchableOpacity onPress={() => setCollapse({ toggle: false })} style={{ gap: 20, marginTop: 20}}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <View>
                                          <Ionicons name='ellipse-outline' size={24} />
                                        </View>
                                        <View>
                                         <Text style={{ marginTop: 10, }}>01 Januari 2023</Text>
                                          <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Tahun Baru Masehi</Text>  
                                        </View>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <View>
                                          <Ionicons name='ellipse-outline' size={24} />
                                        </View>
                                        <View>
                                         <Text style={{ marginTop: 10, }}>01 Januari 2023</Text>
                                          <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Tahun Baru Masehi</Text>  
                                        </View>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <View>
                                          <Ionicons name='ellipse-outline' size={24} />
                                        </View>
                                        <View>
                                         <Text style={{ marginTop: 10, }}>01 Januari 2023</Text>
                                          <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Tahun Baru Masehi</Text>  
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                null
                            )}
                    </View>
                </View>

                <View style={{paddingHorizontal:20}}>
                    <View style={{
                            backgroundColor: COLORS.white,
                            padding: 15,
                            borderRadius: 8
                    }}>
                        <TouchableOpacity onPress={() => setCollapse({  toggle: true })}>
                            <View style={{flexDirection:"row", gap: 20}}>
                              <View>
                                <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{marginRight:"35%"}}>Libur Khusus Tahun Ini</Text>
                                { collapse.toggle === true ? (
                                <TouchableOpacity onPress={() => setCollapse({ toggle: false })}>
                                  <Ionicons name='chevron-up' size={24} />
                                </TouchableOpacity>
                                ) : (
                                  <Ionicons name='chevron-down' size={24} />
                                )}
                              </View>
                            </View>
                        </TouchableOpacity>

                            { collapse.toggle === true ? (
                                <View>

                                    <TouchableOpacity onPress={() => setCollapse({ toggle: false })}>
                                        <Text style={{ marginTop: 10, }}>Jenis Kelamin</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>dsadsadsa</Text>  
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                null
                            )}
                    </View>
                </View>

              </View>
              </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
  )
}
