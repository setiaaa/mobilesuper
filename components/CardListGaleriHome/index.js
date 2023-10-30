import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native';
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';


export const CardListGaleriHome = ({ image, deskripsi, onclick }) => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                flex: 0.5,
            }}
        >
            <View
                style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 20,
                    marginTop: 30,
                }}
            >
                <TouchableOpacity onPress={onclick}>
                    <Image
                        source={{ uri: image }}
                        style={
                            Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid
                        }
                    />
                    <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                        <Text
                            numberOfLines={3}
                            style={{
                                color: COLORS.grey,
                                marginVertical: 5,
                                fontSize: 10,
                                fontWeight: 400,
                                textAlign: "center",
                                fontWeight: FONTWEIGHT.bold
                            }}
                        >
                            {deskripsi}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: "white",
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193,
        width: 150,
        borderRadius: 16,
    },
    imageAndroid: {
        height: 193,
        width: 150,
        borderRadius: 16,
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.7,
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.7,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});