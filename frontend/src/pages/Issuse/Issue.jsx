import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreateIssue from "@/component/CreateIssue";
import axios from "axios";
import { getPort, showToast } from "../../commonFunctions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const Issue = () => {
  const { isLoading } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState({ issue: false });
  const [path, setPath] = React.useState({ apiUrl: getPort() });
  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "firstName", headerName: "First name", width: 130 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) =>
  //       `${row.firstName || ""} ${row.lastName || ""}`,
  //   },
  // ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const handleModalOpen = () => {
    setModalOpen((prev) => ({ ...prev, issue: true }));
  };

  useEffect(() => {
    getIssuseDetails();
  }, []);

  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [tempData, setTempData] = React.useState(null);

  const getIssuseDetails = async () => {
    debugger;
    try {
      let obj = {
        email: JSON.parse(sessionStorage["auth"])["email"] || "",
        companyName: JSON.parse(sessionStorage["auth"])["companyName"] || "",
      };
      const response = await axios.post(`${path.apiUrl}/getIssuseInfo`, obj);
      console.log("res", response);
      if (response.data.project.length !== 0) {
        setTempData(response.data.project);
        let ResultObj = response.data.project.map((user, index) => ({
          id: index + 1,
          project: user.project,
          type: user.issueTypes,
          summary: user.summary,
          description: user.description,
          category: user.category,
          module: user.module,
          taskOwnner: user.taskOwnner,
          createdName: user.createdName,
          createOn: user.createdOn,
          status: user.Status,
        }));
        setData(ResultObj);
        console.log("temp data", tempData);
      }
    } catch (ex) {
      console.log("Error in get issuse details", ex);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "summary",
      headerName: "Summary",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "module",
      headerName: "Module",
      flex: 1,
    },
    {
      field: "taskOwnner",
      headerName: "Task ownner",
      flex: 1,
    },
    {
      field: "createdName",
      headerName: "Created by",
      flex: 1,
    },
    {
      field: "createOn",
      headerName: "Created on",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            color: getStatusColor(params.value),
            fontWeight: "bold",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          // variant="contained"
          // color="primary"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleEdit(params.row)}
          variant="outlined"
          color="secondary"
          style={{ border: "1px solid #333", color: "#333" }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "gray";
      case "Not an Issuse":
        return "black";
      case "Not Reproduceable":
        return "gold";
      case "In progress":
        return "orange";
      case "Re open":
        return "red";
      case "Testing":
        return "pink";
      case "Yet to release":
        return "skyblue";
      case "Done":
        return "green";
      default:
        return "black";
    }
  };

  const handleEdit = (data) => {
    debugger;
    console.log(data);
    let obj = {
      ...data,
      _id: tempData[data.id - 1]["_id"],
    };
    setEditData(obj);
    setModalOpen((prev) => ({ ...prev, issue: true }));
  };

  return (
    <>
      <div style={{ width: "90%", margin: "20px auto" }}>
        <Stack direction="row" spacing={2}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={100}
              height={40}
              sx={{ marginBottom: "1rem", borderRadius: "8px" }}
            />
          ) : (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              style={{ background: "#333" }}
              onClick={() => handleModalOpen("companyModal")}
            >
              Create Issuse
            </Button>
          )}
        </Stack>
        {isLoading ? (
          <Box>
            {rows.map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, mt: 1, width: "100%" }}
              >
                <Skeleton variant="rectangular" width={70} height={40} />
                <Skeleton variant="rectangular" width={130} height={40} />
                <Skeleton variant="rectangular" width={130} height={40} />
                <Skeleton variant="rectangular" width={90} height={40} />
                <Skeleton variant="rectangular" width={160} height={40} />
              </Box>
            ))}
          </Box>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>
      {modalOpen.issue && (
        <CreateIssue
          closeModal={setModalOpen}
          editData={editData}
          getIssuseDetails={getIssuseDetails}
        />
      )}
    </>
  );
};

export default Issue;
