import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR } from '../../config/SuperAppps'
import { FlatList } from 'react-native'
import { CardListTask } from '../../components/CardListTask'
import { useSelector } from 'react-redux'

export const InProgres = () => {
    const { task } = useSelector(state => state.task)
    const taskLists = task.lists
    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
                data={taskLists}
                renderItem={({ item }) => <CardListTask
                    kegiatan={item.kegiatan}
                    subAvatar={item.subAvatar}
                    warna={item.warna}
                    tanggal={item.tanggal}
                />
                }
            />
        </View>
    )
}
