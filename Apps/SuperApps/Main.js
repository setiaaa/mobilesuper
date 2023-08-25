import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BottomTabs } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AVATAR } from '../../config/SuperAppps';
import { useDispatch } from 'react-redux';
import { setAgenda, setBanner, setBerita, setGaleri, setLinimasa, setMading, setProfile, setProgram, setUltah, setVisiMisi } from '../../store/SuperApps'
import { Host } from 'react-native-portalize';

const ENTRIES1 = [
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        dari: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        image: require('../../assets/superApp/berita.png')
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        title: 'KKP RESMI PUNYA LOGO BARU',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/logobaru.png'),
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
    {
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        title: 'KKP RESMI PUNYA LOGO BARU',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/logobaru.png'),
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
];

const ENTRIES2 = [
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/prioritas.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/prioritas.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/prioritas.png')
    },
    {
        title: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/prioritas.png')
    },
    {
        ttitle: 'Penangkapan ikan terukur berbasis kuota',
        image: require('../../assets/superApp/prioritas.png')
    },
];

const ENTRIES3 = [
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/pasar.jpeg')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/pasar.jpeg')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/pasar.jpeg')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/pasar.jpeg')
    },
    {
        title: 'Memperkuat ketahanan ekonomi untuk pertumbuhan berkualitas dan berkeadilan',
        image: require('../../assets/superApp/pasar.jpeg')
    },
];

const ENTRIES4 = [
    {
        id: 1,
        image: require('../../assets/superApp/galeri.jpeg'),
        deskripsi: 'Menteri Sakti Wahyu Trenggono menerima kunjungan Mr. Lu Kang'
    },
    {
        id: 2,
        image: require('../../assets/superApp/galeri.jpeg'),
        deskripsi: 'Menteri Sakti Wahyu Trenggono menerima kunjungan Mr. Lu Kang'
    },
    {
        id: 3,
        image: require('../../assets/superApp/galeri.jpeg'),
        deskripsi: 'Menteri Sakti Wahyu Trenggono menerima kunjungan Mr. Lu Kang'
    },
    {
        id: 4,
        image: require('../../assets/superApp/galeri.jpeg'),
        deskripsi: 'Menteri Sakti Wahyu Trenggono menerima kunjungan Mr. Lu Kang'
    },
    {
        id: 5,
        image: require('../../assets/superApp/galeri.jpeg'),
        deskripsi: 'Menteri Sakti Wahyu Trenggono menerima kunjungan Mr. Lu Kang'
    },
];

const ENTRIES5 = [
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.jpeg'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.jpeg'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.jpeg'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.jpeg'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
    {
        nama: 'DRS. ANTAM NOVAMBAR, S.H., M.HUM',
        tanggal: '12 Juni 2023',
        deskripsi: '“Semoga Allah SWT senantiasa melimpahkan kesehatan, kebahagiaan dan kekuatan dalam menjalankan tugas negara untuk memajukan bangsa Indonesia”',
        image: require('../../assets/superApp/Photo.png'),
        image2: require('../../assets/superApp/Photo2.jpeg'),
        avatar: require('../../assets/superApp/Avatar2.png')
    },
];

const dataLinimasa = [
    {
        id: '1',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',

    },
    {
        id: '2',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Kegiatan',
    },
    {
        id: '3',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Infografis',
    },
    {
        id: '4',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    },
    {
        id: '5',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    },
    {
        id: '6',
        image: require('../../assets/superApp/ikan.png'),
        judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        nama: 'Rizky Novriansyah',
        jenis: 'Penelitian',
    }
];

const dataUltah = [
    {
        no: '1',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'

    },
    {
        no: '2',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'
    },
    {
        no: '3',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'
    },
    {
        no: '4',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'
    },
    {
        no: '5',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'
    },
    {
        no: '6',
        nama: 'Rizky Novriansyah',
        unit: 'Unit [Nama Unit]'
    }
];


const dataProfile = {
    avatar: AVATAR.U3,
    nama: 'TRIAN YUNANDA, S.PI, M.SC',
    nip: '197406261999031004',
    unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
    harikerja: '17',
    hadir: '13',
    terlambat: '-',
    dinas: '4',
    cuti: '-',
    ipasn: '85',
    jenisipasn: 'Tinggi',
    kualifikasi: '60',
    kompetensi: '100',
    kinerja: '83,3',
    disiplin: '100',
    email: 'trian@kkp.com'
}

const visimisi = {
    visi: 'Terwujudnya Masyarakat Kelautan dan Perikanan yang Sejahtera dan Sumber Daya Kelautan dan Perikanan yang Berkelanjutan untuk “Mewujudkan Indonesia Maju yang Berdaulat, Mandiri dan, Berkepribadian, berlandaskan Gotong Royong”.',
    misi: [
        {
            text: 'Peningkatan Kualitas Manusia, melalui peningkatan Daya Saing SDM KP dan Pengembangan Inovasi dan Riset Kelautan dan Perikanan.',
        },
        {
            text: 'Struktur Ekonomi yang Produktif, Mandiri, dan Berdaya Saing, melalui peningkatan Kontribusi Ekonomi Sektor Kelautan dan Perikanan terhadap Perekonomian Nasional.',
        },
        {
            text: 'Mencapai Lingkungan Hidup yang Berkelanjutan, melaluli Peningkatan Kelestarian Sumber Daya Kelautan dan Perikanan.',
        },
        {
            text: 'Pengelolaan Pemerintahan yang Bersih, Efektif, dan Terpercaya, melalui Penigkatan Tata Kelola Pemerintahan di KKP.'
        }
    ]
}

const banner = [
    {
        image: require('../../assets/superApp/banner1.jpeg'),
        deskripsi: 'KKP Siapkan Skema Kemitraan Usaha Pemindangan (24/7)'
    },
    {
        image: require('../../assets/superApp/banner2.jpeg'),
        deskripsi: 'KKP Siapkan Skema Kemitraan Usaha Pemindangan (24/7)'
    },
    {
        image: require('../../assets/superApp/banner1.jpeg'),
        deskripsi: 'KKP Siapkan Skema Kemitraan Usaha Pemindangan (24/7)'
    },
    {
        image: require('../../assets/superApp/banner2.jpeg'),
        deskripsi: 'KKP Siapkan Skema Kemitraan Usaha Pemindangan (24/7)'
    },
    {
        image: require('../../assets/superApp/banner1.jpeg'),
        deskripsi: 'KKP Siapkan Skema Kemitraan Usaha Pemindangan (24/7)'
    },
];

export default function Main() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProfile(dataProfile))
        dispatch(setBerita(ENTRIES1))
        dispatch(setAgenda(ENTRIES2))
        dispatch(setProgram(ENTRIES3))
        dispatch(setGaleri(ENTRIES4))
        dispatch(setMading(ENTRIES5))
        dispatch(setLinimasa(dataLinimasa))
        dispatch(setUltah(dataUltah))
        dispatch(setVisiMisi(visimisi))
        dispatch(setBanner(banner))
    }, []);
    return (
        <Host>
            <BottomSheetModalProvider>
                <BottomTabs />
            </BottomSheetModalProvider>
        </Host>
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