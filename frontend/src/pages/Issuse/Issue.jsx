import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreateIssue from "@/component/CreateIssue";

const Issue = () => {
  const { isLoading } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState({ issue: false });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

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
            rows={rows}
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
      {modalOpen.issue && <CreateIssue closeModal={setModalOpen}/>}
    </>
  );
};

export default Issue;
