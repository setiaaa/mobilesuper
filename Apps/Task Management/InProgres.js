import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR } from '../../config/SuperAppps'
import { FlatList } from 'react-native'
import { CardListTask } from '../../components/CardListTask'

const item = [
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: '#1868AB'
    },
]

export const InProgres = () => {
    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
                data={item}
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
