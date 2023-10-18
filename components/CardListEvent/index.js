import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getEventDetail } from "../../service/api";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import { Text } from "react-native";
import { Image } from "react-native";

export const CardListEvent = ({ token, item }) => {
    const navigation = useNavigation();
    // const { event } = useSelector(state => state.event)
    const dispatch = useDispatch();

    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getEventDetail(params));
    };


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                width: '90%',
                padding: 20,
                borderRadius: 8,
                marginTop: 20
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailEvent')
                }
                }
            >
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text>Departemen:</Text>
                    <Text style={{ marginVertical: 10, width: 200 }}>{item.pic.title.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>PIC</Text>
                        <Image source={{ uri: item.pic.avatar_url }} style={{ width: 26, height: 26, borderRadius: 30 }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>Status</Text>
                        <View style={{
                            width: 100,
                            height: 24,
                            backgroundColor: COLORS.infoLight,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.info }}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}