import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { CardProfile } from '../../Component/CardProfile'
import { CardMenu } from '../../Component/CardMenu'
import { Carousel } from '../../Component/Carousel/Carousel'
export const Home = () => {
    const CarouselData = [
        {
            image: require('../../assets/image-product-1-landscape.jpg')
        },
        {
            image: require('../../assets/image-product-2-landscape.jpg')
        },
        {
            image: require('../../assets/image-product-3-landscape.jpg')
        },
        {
            image: require('../../assets/image-product-4-landscape.jpg')
        },
    ];
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <CardProfile />
            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
                <View style={styles.containerCard}>
                    <CardMenu />
                    <CardMenu />
                    <CardMenu />
                </View>
            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
                <View style={styles.containerCard}>
                    <CardMenu />
                    <CardMenu />
                    <CardMenu />
                </View>
            </View>
            <View style={{ marginTop: 40 }}>

                <Carousel data={CarouselData} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    containerCard: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 36
    },
});
