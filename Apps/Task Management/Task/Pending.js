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

export const Pending = () => {
    const { list, variant } = useSelector(state => state.task)
    const taskLists = list.data
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
            ) : variant === 'grid' ? (
                <View style={{ flex: 1 }}>
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
                </View>
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
