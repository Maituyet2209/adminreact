// albums/forms/EditAlbum.js
import React, { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const EditForm = ({ data, onSave, onCancel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editedData, setEditedData] = useState({
    TenTheLoai: data.TenTheLoai,
    MoTa: data.MoTa,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Call the onSave callback to save the edited data
    onSave(editedData);
    // Reset the form or close it
    onCancel();
  };

  return (
    <Box
      backgroundColor={colors.greenAccent[800]}
      boxShadow={colors.blueAccent[600]}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "8px",
        width: "600px",
      }}
    >
      <TextField
        label="Tên thể loại"
        name="TenTheLoai"
        value={editedData.TenTheLoai}
        onChange={handleInputChange}
        sx={{ width: "50%", marginRight: "10px" }}
        margin="normal"
      />

      <TextField
        label="Mô Tả"
        name="MoTa"
        value={editedData.MoTa}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onCancel}
          style={{ marginLeft: 8 }}
        >
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default EditForm;
