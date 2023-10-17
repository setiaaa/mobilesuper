import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR } from '../../../config/SuperAppps'
import { FlatList } from 'react-native'
import { CardListTask } from '../../../components/CardListTask'
import { useSelector } from 'react-redux'
import { CardListGridTask } from '../../../components/CardListGridTask'
import moment from 'moment'
import ListEmpty from '../../../components/ListEmpty'
import { CardShimmerListTask } from '../../../components/CardListTask/CardShimmerListTask'
import { CardShimmerListGridTask } from '../../../components/CardListGridTask/CardShimmerListGridTask'


export const MingguIni = () => {
    const { list, variant, loading } = useSelector(state => state.task)
    const taskLists = list.data
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const data = taskLists.filter((item) => {
            return item.deadline_status === 'this week'
        })
        setFilterData(data)
    }, [taskLists])

    const renderShimmerList = () => {
        const arr = []
        for (let i = 0; i < 6; i++) {
            arr.push(
                <View key={i}>
                    <CardShimmerListTask />
                </View>
            )
        }
        return arr
    }

    const renderShimmerGrid = () => {
        const arr = []
        for (let i = 0; i < 6; i++) {
            arr.push(
                <View key={i} style={{ flexDirection: 'row', gap: 4 }}>
                    <CardShimmerListGridTask />
                    <CardShimmerListGridTask />
                </View>
            )
        }
        return arr
    }
    return (
        <>
            {variant === 'list' ? (
                <View style={{ flex: 1, marginTop: 20 }}>
                    {
                        loading ? (
                            <View style={{ flexDirection: 'column', gap: 10 }}>
                                {
                                    renderShimmerList()
                                }
                            </View>
                        ) : (
                            <View style={{ marginTop: 20 }}>
                                <FlatList
                                    data={filterData}
                                    renderItem={({ item }) => <CardListTask
                                        id={item.id}
                                        title={item.title}
                                        duedate={moment(item.due_date).format('DD MMMM YYYY')}
                                    />
                                    }
                                    ListEmptyComponent={() =>
                                        <ListEmpty />
                                    }
                                />
                            </View>
                        )
                    }
                </View>
            ) : variant === 'grid' ? (
                <View style={{ flex: 1 }}>
                    {
                        loading ? (
                            <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                {
                                    renderShimmerGrid()
                                }
                            </View>
                        ) : (
                            <FlatList
                                key={'#'}
                                data={filterData}
                                renderItem={({ item }) => <CardListGridTask
                                    id={item.id}
                                    title={item.title}
                                    duedate={moment(item.due_date).format('DD MMMM YYYY')}
                                    priority={item.priority}
                                    members={item.members}
                                />
                                }
                                style={{ marginTop: 20 }}
                                columnWrapperStyle={{ gap: 4 }}
                                numColumns={2}
                                keyExtractor={item => "#" + item.id}
                                ListEmptyComponent={() =>
                                    <ListEmpty />
                                }
                            />
                        )
                    }
                </View>
            ) : (
                null
            )}
        </>
    )
}
