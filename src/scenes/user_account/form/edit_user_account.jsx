// albums/forms/EditAlbum.js
import React, { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const EditForm = ({ data, onSave, onCancel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editedData, setEditedData] = useState({
    TenAlbum: data.TenAlbum,
    SanXuat: data.SanXuat,
    MoTa: data.MoTa,
    NgayPH: data.NgayPH,
    BiaAlbum: data.BiaAlbum,
    NgheSi: data.IDNgheSi,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Đọc file hình ảnh thành định dạng base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;

        // Cập nhật state với đường dẫn hình ảnh mới
        setEditedData((prevData) => ({
          ...prevData,
          BiaAlbum: imageData,
        }));
      };

      reader.readAsDataURL(file);
    }
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
      <Box mt={2} sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={`../../assets/anhminhhoa.png`}
          alt="Bìa Album"
          style={{ width: "100px", marginRight: "10px", borderRadius: "20px" }}
        />
        <label htmlFor="upload" className="custom-file-upload">
          Chọn hình ảnh
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="Tên Album"
          name="TenAlbum"
          value={editedData.TenAlbum}
          onChange={handleInputChange}
          sx={{ width: "50%", marginRight: "10px" }}
          margin="normal"
        />
        <TextField
          label="Sản Xuất"
          name="SanXuat"
          value={editedData.SanXuat}
          onChange={handleInputChange}
          sx={{ width: "50%" }}
          margin="normal"
        />
      </Box>

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
      <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="Ngày Phát Hành"
          name="NgayPH"
          type="date"
          value={editedData.NgayPH}
          onChange={handleInputChange}
          sx={{ width: "50%", marginRight: "10px" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Nghệ Sĩ"
          name="NgheSi"
          value={editedData.NgheSi}
          onChange={handleInputChange}
          sx={{ width: "50%" }}
          margin="normal"
        />
      </Box>
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
