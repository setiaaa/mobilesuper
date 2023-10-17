import { Text } from "react-native"
import { View } from "react-native"
import { DATETIME, FONTSIZE } from "../../config/SuperAppps"

export const CardSubAgendaGrup = ({ item }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: FONTSIZE.H3 }}>{moment(item.date).format(DATETIME.LONG_DATE)}</Text>
                        <Text style={{ fontSize: FONTSIZE.H4 }}>{item.start_time.substr(0, 5)} - {item.end_time.substr(0, 5)}</Text>
                    </View>
                    <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: 500 }}>{item.title}</Text>
                </View>
                <Text>{item.location}</Text>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10 }} />
        </View>
    )
}