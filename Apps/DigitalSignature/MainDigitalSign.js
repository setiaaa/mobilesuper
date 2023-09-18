import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabsDigitalSign, BottomTabsKeb } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDigitalSignLists } from '../../store/DigitalSign'
import { AVATAR } from '../../config/SuperAppps'

const listsDigitalSign = [
    {
        id: 1,
        judul: 'Judul lagu',
        nosertifikat: '123.xx.345.2023',
        namapenerima: 'nama Penerima',
        avatarpenerima: AVATAR.U2,
        jabatanpenerima: 'jabatan penerima',
        tanggal: '24 Januari 2023',
        judulcourse: 'judul course',
        keterangan: 'keterangan keterangan keterangan keterangan',
        panandatangansatu: [
            {
                id: 1,
                status: 'terima',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
        panandatangandua: [
            {
                id: 2,
                status: 'tolak',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
    },
    {
        id: 2,
        judul: 'Judul Sertifikat',
        nosertifikat: '123.xx.345.2023',
        namapenerima: 'nama Penerima',
        avatarpenerima: AVATAR.U2,
        jabatanpenerima: 'jabatan penerima',
        tanggal: '24 Januari 2023',
        judulcourse: 'judul course',
        keterangan: 'keterangan keterangan keterangan keterangan',
        panandatangansatu: [
            {
                id: 1,
                status: 'terima',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
        panandatangandua: [
            {
                id: 2,
                status: 'tolak',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
    },
    {
        id: 3,
        judul: 'Judul Sertifikat',
        nosertifikat: '123.xx.345.2023',
        namapenerima: 'nama Penerima',
        avatarpenerima: AVATAR.U2,
        jabatanpenerima: 'jabatan penerima',
        tanggal: '24 Januari 2023',
        judulcourse: 'judul course',
        keterangan: 'keterangan keterangan keterangan keterangan',
        panandatangansatu: [
            {
                id: 1,
                status: 'terima',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
        panandatangandua: [
            {
                id: 2,
                status: 'tolak',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
    },
    {
        id: 4,
        judul: 'Judul Sertifikat',
        nosertifikat: '123.xx.345.2023',
        namapenerima: 'nama Penerima',
        avatarpenerima: AVATAR.U2,
        jabatanpenerima: 'jabatan penerima',
        tanggal: '24 Januari 2023',
        judulcourse: 'judul course',
        keterangan: 'keterangan keterangan keterangan keterangan',
        panandatangansatu: [
            {
                id: 1,
                status: 'terima',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
        panandatangandua: [
            {
                id: 2,
                status: 'tolak',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
    },
    {
        id: 5,
        judul: 'Judul Sertifikat',
        nosertifikat: '123.xx.345.2023',
        namapenerima: 'nama Penerima',
        avatarpenerima: AVATAR.U2,
        jabatanpenerima: 'jabatan penerima',
        tanggal: '24 Januari 2023',
        judulcourse: 'judul course',
        keterangan: 'keterangan keterangan keterangan keterangan',
        panandatangansatu: [
            {
                id: 1,
                status: 'terima',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
        panandatangandua: [
            {
                id: 2,
                status: 'tolak',
                avatar: AVATAR.U2,
                namajabatan: 'Nama Jabatan',
                nama: 'Rizky Novriansyah',
                tanggal: '12 Juni 2023',
                jam: '13.05'
            }
        ],
    },
]


export default function MainDigitalSign() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDigitalSignLists(listsDigitalSign))
    }, [])
    return (
        <BottomSheetModalProvider>
            <BottomTabsDigitalSign />
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 70,
        left: 150
    }
})