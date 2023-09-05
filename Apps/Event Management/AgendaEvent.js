import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setAgendaDetail, setAgendaLists } from '../../store/Event'
import { useNavigation } from '@react-navigation/native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-portalize'
import ListEmpty from '../../components/ListEmpty'


const listsAgenda = [
    {
        id: '1',
        judul: 'Azis Faisal',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        avatar: AVATAR.U2,
        unit: 'Unit Kelompok Fungsional',
        absen: 'Alto Belly',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
        approval: [
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '-',
                status: 'Menunggu'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Tidak Sepakat'
            },
        ],
        todo: [
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
        ]
    },
    {
        id: '2',
        judul: 'Bug Fixing Aplikasi',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        avatar: AVATAR.U2,
        unit: 'Unit Kelompok Fungsional',
        absen: 'Alto Belly',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
        approval: [
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '-',
                status: 'Menunggu'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Tidak Sepakat'
            },
        ],
        todo: [
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
        ]
    },
    {
        id: '3',
        judul: 'Bug Fixing Aplikasi',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        avatar: AVATAR.U2,
        unit: 'Unit Kelompok Fungsional',
        absen: 'Alto Belly',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
        approval: [
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Sepakat'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '-',
                status: 'Menunggu'
            },
            {
                nama: 'Yani Dama Putera',
                waktu: '07.40',
                status: 'Tidak Sepakat'
            },
        ],
        todo: [
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
            {
                judul: 'Bug Fixing Aplikasi',
                tanggal: '22 Juli 2023',
                agenda: 'UAT Korespondensi',
                deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
                pic: 'Rizky Novriansyah',
                absen: 'Alto Belly',
                avatar: AVATAR.U2,
                unit: 'Unit Kelompok Fungsional',
                jenis: 'Agenda',
                pesertaevent: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                pesertaagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                tamuagenda: [
                    { image: AVATAR.U2 },
                    { image: AVATAR.U2 },
                ],
                lampiran: [
                    {
                        id: 1,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 2,
                        gambar: require('../../assets/superApp/linimasa1.png'),
                        nama: 'linimasa1.png'
                    },
                    {
                        id: 3,
                        gambar: 'https://www.africau.edu/images/default/sample.pdf',
                        nama: 'linimasa1.pdf'
                    },
                    {
                        id: 4,
                        gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                        nama: 'linimasa2.xls'
                    }
                ],
                approval: [
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Sepakat'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '-',
                        status: 'Menunggu'
                    },
                    {
                        nama: 'Yani Dama Putera',
                        waktu: '07.40',
                        status: 'Tidak Sepakat'
                    },
                ],
                jmlKomen: '3',
                komentar: [
                    {
                        id: '1',
                        avatarKomen: require('../../assets/superApp/AvatarKomen1.png'),
                        nama: 'Yani Dama Putera',
                        tanggal: '23 Januari 2023',
                        jam: '14.01',
                        isi: 'Informasi yang bermanfaat',
                        jmlhBalas: '1',
                        balas:
                            [
                                {
                                    idBalas: '1.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                },

                                {
                                    idBalas: '1.2',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',
                                }

                            ],

                    },
                    {
                        id: '2',
                        avatarKomen: require('../../assets/superApp/AvatarKomen2.png'),
                        nama: 'Salies Apriliyanto',
                        tanggal: '22 Januari 2023',
                        jam: '14.01',
                        isi: 'Sebuah variasi dari teknik pertanyaan di atas, pertanyaan pilihan ganda merupakan cara yang bagus untuk melibatkan pembaca Anda.',
                        jmlhBalas: '1',
                        balas:
                            [
                                {

                                    idBalas: '2.1',
                                    avatarBalas: require('../../assets/superApp/AvatarDetail.png'),
                                    nama: 'Rizky Novriansyah',
                                    tanggal: '24 Januari 2023',
                                    jam: '14.01',
                                    isi: 'Terima Kasih',

                                }
                            ],
                    }
                ]
            },
        ]
    },
]

const CardListDetail = ({ item, bottomSheetAttach }) => {
    const navigation = useNavigation()
    const [user, setUser] = useState('resepsionis')
    const { agenda } = useSelector(state => state.event)
    const dispatch = useDispatch()

    const getDetail = (id) => {
        const data = agenda.lists.find(item => item.id === id)
        dispatch(setAgendaDetail(data))
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{
                width: '90%',
                backgroundColor: COLORS.white,
                marginTop: 10,
                borderRadius: 8,
                padding: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailAgenda')
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
                    {user === 'admin' || user === 'resepsionis' ? (
                        <TouchableOpacity onPress={() => bottomSheetAttach()}>
                            <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                        </TouchableOpacity>
                    ) : (
                        null
                    )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text>{item.tanggal}</Text>
                        <Text style={{ marginTop: 5 }}>{item.jam}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='list-circle-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.jmltodo}</Text>
                        <Text>Todo</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>{item.ruangan}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='people-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.anggota}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AgendaEvent = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setAgendaLists(listsAgenda))
    }, [])

    const { agenda } = useSelector(state => state.event)

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(agenda.lists)
    }, [agenda])

    useEffect(() => {
        if (search !== '') {
            const data = agenda.lists.filter((item) => {
                return item.judul.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(agenda.lists)
        }
    }, [search])

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 20,
                    width: 28,
                    height: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Agenda</Text>
                </View>
            </View>

            <View style={{ width: 358, marginHorizontal: 15, marginVertical: 20 }}>
                <Search placeholder={'Cari Agenda'} onSearch={filter} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='filter-outline' size={24} />
                    </View>

                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='menu-outline' size={24} />
                    </View>
                </View>

                <TouchableOpacity style={{
                    width: 157,
                    backgroundColor: COLORS.infoDanger,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8
                }}
                    onPress={() => {
                        navigation.navigate('TambahAgendaEvent')
                    }}>
                    <Text style={{ color: COLORS.white }}>Tambah Agenda</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filterData}
                renderItem={({ item }) => <CardListDetail
                    item={item}
                    bottomSheetAttach={bottomSheetAttach}
                />
                }
                style={{ marginVertical: 10, height: 440 }}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => <ListEmpty />}
            />

            <Portal>
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={animatedSnapPoints}
                        handleHeight={animatedHandleHeight}
                        contentHeight={animatedContentHeight}
                        index={0}
                        style={{ borderRadius: 50 }}
                        keyboardBlurBehavior="restore"
                        android_keyboardInputMode="adjust"
                        backdropComponent={({ style }) => (
                            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                        )}
                    >
                        <BottomSheetView onLayout={handleContentLayout} >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{
                                    width: 331,
                                    height: 50,
                                    backgroundColor: COLORS.foundation,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center', marginTop: 10
                                }}>
                                    <Text style={{ color: COLORS.white }}>Lihat</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width: 331,
                                    height: 50,
                                    backgroundColor: COLORS.lightBrown,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}>
                                    <Text style={{ color: COLORS.white }}>Ubah</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width: 331,
                                    height: 50,
                                    backgroundColor: COLORS.infoDanger,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 40
                                }}>
                                    <Text style={{ color: COLORS.white }}>Hapus</Text>
                                </TouchableOpacity>

                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </Portal>

        </SafeAreaView>
    )
}
