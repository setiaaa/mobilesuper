import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetailTodo } from "../../service/api"
import { View } from "react-native"
import { TouchableOpacity } from "react-native"
import { COLORS, DATETIME, FONTWEIGHT } from "../../config/SuperAppps"
import { Ionicons } from '@expo/vector-icons';
import { Text } from "react-native"
import moment from "moment"


export const CardListTodo = ({ token, item, bottomSheetAttach, role, setIdEdit }) => {
    const [user, setUser] = useState('resepsionis')
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const getDetail = (id) => {
        const params = { token, id }
        dispatch(getDetailTodo(params))
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{
                width: '90%',
                backgroundColor: COLORS.white,
                borderRadius: 8,
                justifyContent: 'center',
                padding: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('DetailTodo', { item: item })
                }}
            >
                {role.is_pic === true ||
                    role.is_notulensi === true ||
                    role.is_pic === false &&
                    role.is_notulensi === false &&
                    role.is_presensi === false &&
                    role.is_member === false ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, width: 250 }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => {
                            bottomSheetAttach()
                            setIdEdit(item.id)
                        }}>
                            <Ionicons name='chevron-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.name}</Text>
                )}

                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Due Date :</Text>
                    <Text style={{ marginVertical: 10, color: COLORS.lighter }}>{moment(item.due_date).format(DATETIME.LONG_DATE)}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Agenda :</Text>
                    <Text style={{ color: COLORS.lighter, width: 250 }}>{item.agenda}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
