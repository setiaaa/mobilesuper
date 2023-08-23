import React from 'react'
import { Modal, Text } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setLiniMasa } from '../../store/Pengetahuan'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

const listsLinimasa = [
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa1.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png',
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png',
            },
            {
                id: 3,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png',
            },
            {
                id: 4,
                gambar: require('../../assets/superApp/Sekilas_Tentang_Program_Ekonomi_Biru_KKP_1080p.mp4'),
                nama: 'SekilasTentangProgramEkonomiBiruKKP1080p.mp4',
            }
        ],
        tempat: 'Surakarta',
        anggota: 'KKP',
        kapan: '15 Agustus 2023',
        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
        jmlKomentar: '2',
        Komentar: [
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
        ],
        orangSuka: [
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
        ],
        disukai: '324',
    },
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa2.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa2.png'),
                nama: 'linimasa2.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa2.png'),
                nama: 'linimasa2.png'
            },
            {
                id: 3,
                gambar: require('../../assets/superApp/linimasa2.png'),
                nama: 'linimasa2.png'
            },
            {
                id: 4,
                gambar: require('../../assets/superApp/Sekilas_Tentang_Program_Ekonomi_Biru_KKP_1080p.mp4'),
                nama: 'SekilasTentangProgramEkonomiBiruKKP1080p.mp4'
            }
        ],
        tempat: 'Surakarta',
        anggota: 'KKP',
        kapan: '15 Agustus 2023',
        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
        jmlKomentar: '2',
        Komentar: [
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
        ],
        orangSuka: [
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
        ],
        disukai: '324',
    },
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa1.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
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
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 4,
                gambar: require('../../assets/superApp/Sekilas_Tentang_Program_Ekonomi_Biru_KKP_1080p.mp4'),
                nama: 'SekilasTentangProgramEkonomiBiruKKP1080p.mp4'
            }
        ],
        tempat: 'Surakarta',
        anggota: 'KKP',
        kapan: '15 Agustus 2023',
        rangkuman: 'SURAKARTA, (15/8) - Kementerian Kelautan dan Perikanan (KKP) berhasil melakukan pendampingan usaha bagi 1.628 Usaha Mikro Kecil (UMK) di seluruh Indonesia.',
        jmlKomentar: '2',
        Komentar: [
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
        ],
        orangSuka: [
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
            {
                avatar: AVATAR.U2,
                nama: 'Rizky Novriansyah',
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
            },
        ],
        disukai: '324',
    }
]


const CardLiniMasa = ({ item, }) => {
    const navigation = useNavigation()
    const [like, setLike] = useState(0)
    const [visibleModal, setVisibleModal] = useState(false);

    const handleLike = () => {
        if (like === 0) {
            setLike(1)
        } else {
            setLike(0)
        }
    }

    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: '90%',
            flex: 1,
            marginTop: 10,
            marginHorizontal: 20,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: '#171717',
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
        }}>
            <TouchableOpacity onPress={(e) => {
                e.stopPropagation()
                navigation.navigate('DetailLinimasa', {
                    item: item
                })
            }}>

                <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View>
                            <Image source={item.avatar} style={{ borderRadius: 50 }} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                            <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 13, }}>{item.tanggal}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Image source={item.image} style={{ width: 326, height: 160, borderRadius: 8 }} />
                    </View>

                    <Text style={{ textAlign: 'justify', color: COLORS.lighter, fontSize: FONTSIZE.H3 }}>{item.judul}</Text>

                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 10 }}>
                        <View style={{
                            backgroundColor: COLORS.warningLight,
                            width: 100,
                            height: 30,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Ionicons name='document-outline' size={18} color={COLORS.warning} />
                            <Text style={{ color: COLORS.warning }}>{item.jenis}</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}
                            onPress={(e) => {
                                e.stopPropagation()
                                handleLike()
                            }}>
                            <Ionicons name='thumbs-up-outline' size={18} color={like !== 0 ? COLORS.primary : null} />
                            <Text style={{ color: like !== 0 ? COLORS.primary : null }}>{item.suka}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name='chatbox-outline' size={18} />
                            <Text>{item.komentar}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name='eye-outline' size={18} />
                            <Text>{item.dilihat}</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                            onPress={(e) => {
                                e.stopPropagation()
                                setVisibleModal(true)
                            }}
                        >
                            <Ionicons name='information-circle-outline' size={18} />
                        </TouchableOpacity>
                    </View>
                </View >
            </TouchableOpacity >

            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => {
                    setVisibleModal(!visibleModal);
                }}
            >
                <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 10, marginTop: '40%' }}>

                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', marginHorizontal: 20, marginTop: 20 }}
                            onPress={() => {
                                setVisibleModal(false)
                            }}
                        >
                            <Ionicons name='close-outline' size={24} color={COLORS.lighter} />
                        </TouchableOpacity>

                        <View style={{
                            backgroundColor: COLORS.primary,
                            padding: 10,
                            width: 179,
                            height: 40,
                            marginHorizontal: 20,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 4
                        }}>
                            <Text style={{ color: COLORS.white }}>Informasi Pengetahuan</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Judul</Text>
                                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[What]</Text>
                            </View>

                            <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{item.judul}</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Anggota Angenda</Text>
                                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Who]</Text>
                            </View>

                            <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{item.anggota}</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Rangkuman</Text>
                                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Why]</Text>
                            </View>

                            <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{item.rangkuman}</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Tempat Agenda</Text>
                                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Where]</Text>
                            </View>

                            <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{item.tempat}</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Waktu Mulai</Text>
                                <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[When]</Text>
                            </View>

                            <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10, marginBottom: 20 }}>{item.kapan}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

export const LiniMasa = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLiniMasa(listsLinimasa))
    }, []);

    const { linimasa } = useSelector(state => state.pengetahuan)
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
                    <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Linimasa Pengetahuan</Text>
                </View>
            </View>

            <FlatList
                data={linimasa.lists}
                renderItem={({ item }) => <CardLiniMasa
                    item={item}
                // setVisibleModal={setVisibleModal}
                />
                }
                keyExtractor={item => item.id}
            />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
