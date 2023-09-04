import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR } from '../../config/SuperAppps'
import { FlatList } from 'react-native'
import { CardListTask } from '../../components/CardListTask'
import { useSelector } from 'react-redux'
import { CardListGridTask } from '../../components/CardListGridTask'

export const Pending = () => {
    const { task, variant } = useSelector(state => state.task)
    const taskLists = task.lists
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const data = taskLists.filter((item) => {
            return item.status === 'pending'
        })
        setFilterData(data)
    }, [taskLists])
    return (
        <>
            {variant === 'list' ? (
                <View style={{ flex: 1, marginTop: 20 }}>
                    <FlatList
                        data={filterData}
                        renderItem={({ item }) => <CardListTask
                            kegiatan={item.kegiatan}
                            subAvatar={item.subAvatar}
                            warna={item.warna}
                            tanggal={item.tanggal}
                        />
                        }
                    />
                </View>
            ) : variant === 'grid' ? (
                <FlatList
                    key={'#'}
                    data={filterData}
                    renderItem={({ item }) => <CardListGridTask
                        kegiatan={item.kegiatan}
                        subAvatar={item.subAvatar}
                        warna={item.warna}
                        tanggal={item.tanggal}
                        prioritas={item.prioritas}
                    />
                    }
                    style={{ marginTop: 20 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    keyExtractor={item => "#" + item.id}
                />
            ) : variant === 'filter' ? (
                <Text>filter</Text>
            ) : variant === 'reorder' ? (
                <Text>reorder</Text>
            ) : (
                null
            )}
        </>
    )
}
