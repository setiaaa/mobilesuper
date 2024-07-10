import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS } from "../../config/SuperAppps";

export const CardListNominatif = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>NAMA</Text>
          <Text>NIP</Text>
          <Text>TEMPAT/TANGGAL LAHIR</Text>
          <Text>NO KARPEG KARIS/KARSU</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_nama_lengkap
              ? item?.updated_getrefpeg_data?.pegawai_nama_lengkap
              : item?.nama
              ? item?.nama
              : "-"}
          </Text>
          <Text>{item?.nip ? item?.nip : "-"}</Text>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_tempat_tanggal_lahir
              ? item?.updated_getrefpeg_data?.pegawai_tempat_tanggal_lahir
              : "-"}
          </Text>
          <Text>{item?.karis ? item.karis : "-"}</Text>
          <Text>{item?.karpeg ? item.karpeg : "-"}</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>JENIS KELAMIN</Text>
          <Text>STAT.KELUARGA</Text>
          <Text>AGAMA</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>{item?.jenis_kelamin ? item?.jenis_kelamin : "-"}</Text>
          <Text>{item?.status_kel ? item?.status_kel : "-"}</Text>
          <Text>{item?.religion ? item?.religion : "-"}</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>GOL/RU</Text>
          <Text>TMT MASA KERJA GOL. TERAKHIR</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>{item?.golongan ? item?.golongan : "-"}</Text>
          <Text>{`${
            item?.updated_getrefpeg_data?.pegawai_tanggal_tmt_jabatan ?? "-"
          } ${
            item?.updated_getrefpeg_data?.pegawai_tahun_masa_kerja_golongan
              ? item?.updated_getrefpeg_data
                  ?.pegawai_tahun_masa_kerja_golongan +
                " " +
                "Tahun"
              : "-"
          } ${
            item?.updated_getrefpeg_data?.pegawai_bulan_masa_kerja_golongan
              ? item?.updated_getrefpeg_data
                  ?.pegawai_bulan_masa_kerja_golongan +
                " " +
                "Bulan"
              : "-"
          }`}</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>TMT STRUKTURAL MASA KERJA JAB.TERAKHIR</Text>
          <Text>JAB.FUNGSIONAL TMT FUNGSIONAL</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_nama_jabatan
              ? item?.updated_getrefpeg_data?.pegawai_nama_jabatan
              : "-"}
          </Text>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_tanggal_tmt_jabatan
              ? item?.updated_getrefpeg_data?.pegawai_tanggal_tmt_jabatan
              : "-"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>UNIT KERJA</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>{item?.unit_kerja ? item?.unit_kerja : "-"}</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>PENDIDIKAN AKHIR/TAHUN SEKOLAH/UNIVERSITAS</Text>
          <Text>FAKULTAS JURUSAN</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>
            {item?.pendidikan ? item?.pendidikan : "-"}/
            {item?.updated_getrefpeg_data?.pegawai_pendidikan_tahun_lulus
              ? item?.updated_getrefpeg_data?.pegawai_pendidikan_tahun_lulus
              : "-"}
            /
            {item?.updated_getrefpeg_data?.pegawai_pendidikan_nama
              ? item?.updated_getrefpeg_data?.pegawai_pendidikan_nama
              : "-"}
          </Text>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_pendidikan_program_studi_nama
              ? item?.updated_getrefpeg_data
                  ?.pegawai_pendidikan_program_studi_nama
              : "-"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>DIKLAT PERJENJANGAN</Text>
          <Text>NAMA DIKLAT</Text>
          <Text>TAHUN</Text>
          <Text>LEMHANAS/ANGKATAN</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>
            {item?.updated_getrefpeg_data?.jenis_diklat_nama
              ? item?.updated_getrefpeg_data?.jenis_diklat_nama
              : "-"}
          </Text>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_diklat_nama
              ? item?.updated_getrefpeg_data?.pegawai_diklat_nama
              : "-"}
          </Text>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_diklat_tahun
              ? item?.updated_getrefpeg_data?.pegawai_diklat_tahun
              : "-"}
          </Text>
          <Text>-</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>TGL.CAPEG MASA KERJA KESELURUHAN</Text>
          <Text>STATUS KEPEGAWAIAN</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          <Text>
            {item?.updated_getrefpeg_data?.pegawai_cpns_tanggal_tmt
              ? item?.updated_getrefpeg_data?.pegawai_cpns_tanggal_tmt
              : "-"}
          </Text>
          <Text>
            {item?.updated_getrefpeg_data?.masa_kerja_keseluruhan
              ? item?.updated_getrefpeg_data?.masa_kerja_keseluruhan
              : "-"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.ExtraDivinder,
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <Text>PHOTO</Text>
        </View>
        <Text>:</Text>
        <View style={{ width: 150 }}>
          {item?.updated_getrefpeg_data?.pegawai_image_path ? (
            <Image
              source={{ uri: item?.updated_getrefpeg_data?.pegawai_image_path }}
              style={{ width: 70, height: 70, borderRadius: 50 }}
            />
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>
    </View>
  );
};
