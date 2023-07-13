import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const DataPDF = ({
  dataTugasSelesai,
  user,
  startDate,
  endDate,
  formatDate,
  formatDateWithFullDay,
}) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 12,
      padding: 16,
      backgroundColor: "#FFFFFF",
    },
    section: {
      marginLeft: 8,
      marginRight: 8,
      backgroundColor: "#FFFFFF",
    },
    heading: {
      textAlign: "center",
      margin: 15,
      fontWeight: "bold",
      fontSize: 16,
      color: "#000000",
    },
    text: {
      textAlign: "center",
      margin: 15,
      fontWeight: "bold",
      fontSize: 16,
      color: "#000000",
    },
    textTitleName: {
      marginRight: 25,
    },
    textTitleTanggal: {
      marginRight: 15,
    },
    title: {
      display: "flex",
      flexDirection: "row",
      fontSize: 12,
      marginBottom: 10,
    },
    table: {
      paddingTop: 15,
      display: "table",
      width: "120%",
      // border: 0,
      marginLeft: -80,
      marginBottom: 16,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      borderBottom: "1px solid #D9D9D9",
    },
    tableCell: {
      width: "10%",
      padding: 16,
      fontSize: 12,
    },
    tableCellNo: {
      width: "5%",
      padding: 16,
      fontSize: 12,
    },
  });
  let no = 1;

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View>
            <Text style={styles.text}>Laporan Pengerjaan Tugas</Text>
          </View>
          <View>
            <View style={styles.title}>
              <Text style={styles.textTitleName}>Nama</Text>
              <Text>
                : {`${user[0]?.nama_depan} ${user[0]?.nama_belakang}`}
              </Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.textTitleTanggal}>Tanggal</Text>
              <Text>
                :{" "}
                {`${formatDateWithFullDay(startDate)} - ${formatDateWithFullDay(
                  endDate
                )}`}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCellNo}>
                <Text>No.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Judul Tugas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Catatan</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Tanggal</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Tipe Tugas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Kategori</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Status</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Estimasi</Text>
              </View>
              <View style={styles.tableCellNo}>
                <Text>Real</Text>
              </View>
            </View>

            {/* Table Body */}
            {dataTugasSelesai.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                <View style={styles.tableCellNo}>
                  <Text>{no++}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.judul_tugas}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.catatan}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatDate(row.waktu_pengerjaan)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.tipe_tugas}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.kategori_tugas}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.status}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.estimasi}</Text>
                </View>
                <View style={styles.tableCellNo}>
                  <Text>{row.real}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DataPDF;
