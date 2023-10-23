import { Text } from "react-native"
import { View } from "react-native"
import { COLORS, DATETIME, FONTSIZE } from "../../config/SuperAppps"
import moment from "moment"
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder"
import { LinearGradient } from "expo-linear-gradient"

export const CardSubAgendaGrup = ({ item, loading }) => {
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                        ) : (
                            <Text style={{ fontSize: FONTSIZE.H3 }}>{moment(item.date).format(DATETIME.LONG_DATE)}</Text>
                        )}

                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4, marginTop: 5 }} width={80} height={20} />
                        ) : (
                            <Text style={{ fontSize: FONTSIZE.H4 }}>{item.start_time.substr(0, 5)} - {item.end_time.substr(0, 5)}</Text>
                        )}
                    </View>

                    {loading ? (
                        <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                    ) : (

                        <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: 500 }}>{item.title}</Text>
                    )}
                </View>

                {loading ? (
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={70} height={20} />
                ) : (
                    <Text>{item.location}</Text>
                )}
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10 }} />
        </View>
    )
}