import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Company = ({ closeModal }) => {
  const [companyInfo, setCompayInfo] = useState({
    companyName: "",
    CEOName: "",
    teams: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompayInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamsChange = (event, value) => {
    setCompayInfo((prev) => ({
      ...prev,
      teams: value,
    }));
  };

  const handleClose = () => {
    closeModal((prev) => ({ ...prev, companyModal: false }));
  };

  const handleSend = () => {
    console.log("Send clicked", companyInfo);
  };

  const handleReset = () => {
    setCompayInfo({
      companyName: "",
      CEOName: "",
      teams: [],
    });
  };

  const teams = [
    "Managament",
    "HR",
    "Development",
    "Testing",
    "Marketing",
    "Sales",
    "Others",
  ];

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              component="h6"
              style={{ marginBottom: "1rem" }}
            >
              Company Details
            </Typography>
            <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <TextField
            id="companyName"
            label="Company Name"
            name="companyName"
            placeholder="Company Name"
            variant="standard"
            style={{
              width: "100%",
              marginBottom: "1rem",
            }}
            InputProps={{
              sx: {
                "&:before": {
                  borderBottomColor: "#333",
                },
                "&:after": {
                  borderBottomColor: "#333",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#333",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#333",
                "&.Mui-focused": {
                  color: "#333",
                },
              },
            }}
            onChange={handleInputChange}
            value={companyInfo.companyName}
            multiline
          />

          <TextField
            id="CEOName"
            label="CEO Name"
            name="CEOName"
            placeholder="CEO Name"
            variant="standard"
            style={{ width: "100%", marginBottom: "1rem" }}
            InputProps={{
              sx: {
                "&:before": {
                  borderBottomColor: "#333",
                },
                "&:after": {
                  borderBottomColor: "#333",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#333",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#333",
                "&.Mui-focused": {
                  color: "#333",
                },
              },
            }}
            onChange={handleInputChange}
            value={companyInfo.CEOName}
            multiline
          />

          <Autocomplete
            multiple
            id="size-small-standard-multi"
            size="small"
            options={teams}
            getOptionLabel={(option) => option}
            value={companyInfo.teams}
            onChange={handleTeamsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Teams"
                placeholder="Teams"
                name="teams"
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                multiline
                InputLabelProps={{
                  style: { color: "#333" }, // Customize the label color
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    color: "#333", // Customize text color if needed
                  },
                  sx: {
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#333", // Default underline color
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#333", // Hover underline color
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#333", // Focused underline color
                    },
                  },
                }}
              />
            )}
          />

          <TextField
            id="address"
            label="Address"
            name="address"
            placeholder="Address"
            variant="standard"
            style={{ width: "100%", marginBottom: "1rem" }}
            InputProps={{
              sx: {
                "&:before": {
                  borderBottomColor: "#333",
                },
                "&:after": {
                  borderBottomColor: "#333",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#333",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#333",
                "&.Mui-focused": {
                  color: "#333",
                },
              },
            }}
            onChange={handleInputChange}
            value={companyInfo.address || ""}
            multiline
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              style={{ border: "1px solid #333", color: "#333" }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              style={{ background: "#333" }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Company;
