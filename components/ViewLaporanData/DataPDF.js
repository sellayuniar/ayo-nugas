import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const DataPDF = ({ dataTugasSelesai }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 12,
      padding: 15,
      backgroundColor: "#FFFFFF",
    },
    section: {
      marginLeft: 15,
      marginRight: 15,
      backgroundColor: "#FFFFFF",
    },
    text: {
      textAlign: "center",
      margin: 15,
      fontWeight: "bold",
      fontSize: 16,
      color: "#000000",
    },
    table: {
      marginTop: 15,
      display: "table",
      width: "100%",
      border: 0,
      // borderBottom: "1px solid #000",
      marginBottom: 16,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      border: 0,
    },
    tableCell: {
      width: "10%",
      border: 0,
      borderWidth: 1,
      borderColor: "#000",
      padding: 16,
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
          <View></View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>No.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Judul Tugas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Catatan</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Waktu Pengerjaan</Text>
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
              <View style={styles.tableCell}>
                <Text>Real</Text>
              </View>
            </View>

            {/* Table Body */}
            {dataTugasSelesai.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{no++}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.judul_tugas}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.catatan}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.waktu_pengerjaan}</Text>
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
                <View style={styles.tableCell}>
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
