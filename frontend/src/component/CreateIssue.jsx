import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getPort, showToast } from "../commonFunctions";
import { AuthContext } from "../context/AuthContext";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import "../pages/Issuse/Issuse.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateIssue = ({ closeModal }) => {
  let projectList = ["A", "B", "C"];
  let issueTypes = ["Story", "Bug", "Suggestion", "Improvement"];
  let category = ["Functional", "Non-functional"];
  let statusList = [
    "To do",
    "Not an issue",
    "Not Reproduceable",
    "In progress",
    "Re open",
    "Testing",
    "Yet to release",
    "Done",
  ];

  const [issuseInfo, setIssuseInfo] = useState({
    project: "",
    issueTypes: "",
  });

  const handleClose = () => {
    closeModal((prev) => ({ ...prev, issue: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssuseInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="createissuse-header">
            <p className="createissuse-header-h1">Create issue</p>
            <CloseIcon onClick={handleClose} />
          </div>

          <div className="createissuse-body">
            {/* project div */}
            <div className="section">
              <div className="section-div">
                <p className="section-h1">Project</p>
                <TextField
                  id="project"
                  select
                  label=""
                  name="project"
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
                  SelectProps={{
                    renderValue: (selected) => selected, // Display selected option as a single value
                  }}
                  onChange={handleInputChange}
                  value={issuseInfo.project || ""} // Ensure value is a string for single selection
                >
                  {projectList.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="section-div">
                <p className="section-h1">Issue Type</p>
                <TextField
                  id="issueTypes"
                  select
                  label=""
                  name="issueTypes"
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
                  SelectProps={{
                    renderValue: (selected) => selected, // Display selected option as a single value
                  }}
                  onChange={handleInputChange}
                  value={issuseInfo.issueTypes || ""} // Ensure value is a string for single selection
                >
                  {issueTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <hr className="hrw" />
            <div className="section">
              {/* status */}
              <div className="section-div">
                <p className="section-h1">Status</p>
                <TextField
                  id="Status"
                  select
                  label=""
                  name="Status"
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
                  SelectProps={{
                    renderValue: (selected) => selected, // Display selected option as a single value
                  }}
                  onChange={handleInputChange}
                  value={issuseInfo.Status || ""} // Ensure value is a string for single selection
                >
                  {statusList.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {/* summary */}
              <div className="section-div">
                <p className="section-h1">Summary</p>
                <TextField
                  id="summary"
                  label=""
                  variant="standard"
                  name="summary"
                  onChange={handleInputChange}
                  value={issuseInfo.summary || ""}
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
                />
              </div>

              {/* category */}
              <div className="section-div">
                <p className="section-h1">Category</p>
                <TextField
                  id="category"
                  select
                  label=""
                  name="category"
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
                  SelectProps={{
                    renderValue: (selected) => selected, // Display selected option as a single value
                  }}
                  onChange={handleInputChange}
                  value={issuseInfo.category || ""} // Ensure value is a string for single selection
                >
                  {category.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {/* task owner */}
              <div className="section-div">
                <p className="section-h1">Task Owner</p>
                <TextField
                  id="taskOwnner"
                  label=""
                  variant="standard"
                  name="taskOwnner"
                  onChange={handleInputChange}
                  value={issuseInfo.taskOwnner || ""}
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
                />
              </div>

              {/* module */}
              <div className="section-div">
                <p className="section-h1">Module</p>
                <TextField
                  id="module"
                  label=""
                  variant="standard"
                  name="module"
                  onChange={handleInputChange}
                  value={issuseInfo.module || ""}
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
                />
              </div>

              {/* description */}
              <div className="section-div">
                <p className="section-h1">Description</p>
                <TextField
                  id="description"
                  label=""
                  variant="standard"
                  name="description"
                  onChange={handleInputChange}
                  value={issuseInfo.description || ""}
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
                />
              </div>
            </div>
          </div>

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
              // onClick={handleReset}
              style={{ border: "1px solid #333", color: "#333" }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSend}
              style={{ background: "#333" }}
            >
              {"Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateIssue;
