/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import Edit from "@/assets/icons/Edit";
import Play from "@/assets/icons/Play";
import Spinner from "../Spinner";
import { useTable } from "react-table";

const TableTugasTidakDirencanakanMendesak = ({
  propsTugasTidakDirencakanMendesak,
}) => {
  const {
    sortTugasTidakDirencanakanMendesak,
    formatDateTime,
    handlePlay,
    handleModalRincian,
  } = propsTugasTidakDirencakanMendesak;

  //   const [pending, setPending] = useState(true);
  //   const [rows, setRows] = useState([]);

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       setRows(sortTugasTidakDirencanakanMendesak);
  //       setPending(false);
  //     }, 2000);
  //     return () => clearTimeout(timeout);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const columnsTugas = [
    {
      Header: "No.",
      accessor: "idx" + 1,
      align: "center",
    },
    {
      Header: "Judul Tugas",
      accessor: "judul_tugas",
    },
    {
      Header: "Waktu Pengerjaan",
      accessor: "waktu_pengerjaan",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Estimasi",
      accessor: "estimasi",
    },
    {
      Header: "Real",
      accessor: "real",
    },
    {
      Header: "Action",
      //   accessor: (
      //     <div className="flex ">
      //       <span
      //         className="hover: mr-2 h-8 w-8 cursor-pointer
      //                         text-[#EE3D3D] hover:text-[#d63737]"
      //         onClick={() => {
      //           handleModalRincian(id);
      //         }}
      //       >
      //         <Edit />
      //       </span>
      //       <span
      //         className="h-8 w-8 cursor-pointer text-[#EE3D3D] hover:text-[#d63737]"
      //         onClick={() => {
      //           handlePlay(id);
      //         }}
      //       >
      //         <Play />
      //       </span>
      //     </div>
      //   ),
    },
  ];

  const columns = useMemo(() => columnsTugas, []);
  const data = useMemo(() => sortTugasTidakDirencanakanMendesak, []);
  const tableInstance = useTable({
    columns,
    data,
  });

  console.log(tableInstance);

  console.log(sortTugasTidakDirencanakanMendesak);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, idx) => (
          <tr {...headerGroup.getHeaderGroupProps} key={idx}>
            {headerGroup.headers.map((column, idx) => (
              <th key={idx} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr key={idx} {...row.getRowProps()}>
              {row.cells.map((cell, idx) => {
                return (
                  <td key={idx} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTugasTidakDirencanakanMendesak;
