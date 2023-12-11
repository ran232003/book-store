import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../HomePage.css";
import { CiCirclePlus } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const HomePageTable = (props) => {
  const navigate = useNavigate();

  const handleViewCellClicked = (params) => {
    const rowData = params.data; // This contains the data for the clicked row
    console.log("Clicked Row Data:", rowData);

    // Do whatever you need with the rowData, e.g., show a modal or perform an action
  };
  const columnDefs = [
    {
      headerName: "#", // Header for the first column
      valueGetter: "node.rowIndex + 1", // Compute the value as the row index + 1
      width: 50, // Optional: Set the width of the column
    },
    // Add other columns as needed
    { headerName: "Title", field: "title" },
    { headerName: "Author", field: "author" },
    { headerName: "Publish Year", field: "publishYear" },
    {
      headerName: "Operations",
      cellRenderer: CustomViewCellRenderer,
      filter: false,
      cellRendererParams: {
        onCellClicked: handleViewCellClicked,
      },
    },
    // Add more columns as needed
  ];
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
  }));
  const handleClickPlus = () => {
    navigate("/createEdit/create");
  };
  return (
    <div className="table-container">
      <div className="headerDiv">
        <h1 style={{ marginTop: "10px" }}>Books</h1>
        <CiCirclePlus
          onClick={handleClickPlus}
          size={40}
          style={{ cursor: "pointer", marginRight: "26px" }}
        />
      </div>
      <div className="ag-theme-alpine table">
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={props.books.books}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};
const CustomViewCellRenderer = (props) => {
  const navigate = useNavigate();
  const handleClickDetails = (url) => {
    let rowData = props.data; // This contains the data for the clicked row

    if (!rowData) {
      rowData = props.book;
    }
    console.log("test Clicked Row Data:", rowData, url);
    navigate(`/${url}`, { state: { book: rowData } });
  };
  const handleEdit = () => {
    let rowData = props.data; // This contains the data for the clicked row

    if (!rowData) {
      rowData = props.book;
    }
    console.log("test Clicked Row Data:", rowData);
    navigate(`/createEdit/edit`, { state: { book: rowData } });
  };
  const handleDelete = () => {
    let rowData = props.data; // This contains the data for the clicked row

    if (!rowData) {
      rowData = props.book;
    }
    console.log("handleDelete:", rowData);
    navigate(`/deleteBook`, { state: { book: rowData } });
  };
  return (
    <div
      className={props.styleComponent ? props.styleComponent : "myIcons"}
      style={{ color: "blue", textDecoration: "underline" }}
    >
      <h5 className={props.styleComponent ? "" : "h5"}>
        <IoIosInformationCircleOutline
          cursor={"pointer"}
          onClick={() => handleClickDetails("bookDetails")}
        />
      </h5>
      <h5 className={props.styleComponent ? "" : "h5"}>
        <CiEdit cursor={"pointer"} color="green" onClick={handleEdit} />
      </h5>
      <h5 className={props.styleComponent ? "" : "h5"}>
        <FaRegTrashAlt cursor={"pointer"} onClick={handleDelete} color="red" />
      </h5>
    </div>
  );
};
export default HomePageTable;
export { CustomViewCellRenderer };
