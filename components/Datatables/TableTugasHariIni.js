import React, { useState, useEffect } from "react";
import Edit from "@/assets/icons/Edit";
import Play from "@/assets/icons/Play";
import DataTable from "react-data-table-component";
import { useTimer } from "@/utils/timer";
import moment from "moment";

const TableTugasHariIni = ({ propsTugasUtamaHariIni }) => {
  const { sortTugasHariIni, formatDateTime, handlePlay, handleModalRincian } =
    propsTugasUtamaHariIni;

  const customStyles = {
    table: {
      style: {
        // padding: pending && "50px 0",
        // height: pending && "100px",
      },
    },
    progress: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    tableWrapper: {
      style: {
        display: "table",
        borderRadius: "100px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
    },
    rows: {
      style: {
        minHeight: "60px", //, override the row height
        "&:hover:enabled": {
          backgroundColor: "#D9D9D9",
        },
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        borderBottom: "3px solid #D9D9D9",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
        borderBottom: "1px solid #ccc",

        "&:hover:enabled": {
          backgroundColor: "#D9D9D9",
        },
      },
    },
  };

  const currentTime = useTimer();

  const columnsTugasHariIni = [
    {
      name: "No.",
      selector: (row, idx) => idx + 1,
      width: "50px",
      center: true,
    },
    {
      name: "Judul Tugas",
      selector: (row) => row.judul_tugas,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Waktu Pengerjaan",
      selector: (row) => formatDateTime(row.waktu_pengerjaan),
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Estimasi",
      selector: (row) => row.estimasi,
      sortable: true,
      minWidth: "50px",
      center: true,
    },
    {
      name: "Real",
      selector: (row) => row.real,
      sortable: true,
      minWidth: "50px",
      center: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex ">
          <span
            className="hover: mr-2 h-8 w-8 cursor-pointer
                          text-[#EE3D3D] hover:text-[#d63737]"
            onClick={() => {
              handleModalRincian(row.id);
            }}
          >
            <Edit />
          </span>
          <span
            className="h-8 w-8 cursor-pointer text-[#EE3D3D] hover:text-[#d63737]"
            onClick={() => {
              if (
                row.status === "Belum Dikerjakan" &&
                moment(currentTime).isAfter(moment(row.waktu_pengerjaan))
              ) {
                alert("perbarui waktu pengerjaan");
              } else {
                handlePlay(row.id);
              }
            }}
          >
            <Play />
          </span>
        </div>
      ),
      // width: "150px",
    },
  ];

  return (
    <DataTable
      columns={columnsTugasHariIni}
      data={sortTugasHariIni}
      className="w-full rounded-xl bg-white text-left shadow-lg"
      customStyles={customStyles}
    />
  );
};

export default TableTugasHariIni;
