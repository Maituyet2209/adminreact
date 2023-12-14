// albums/forms/EditAlbum.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";

const EditForm = ({ data, onSave, onCancel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editedData, setEditedData] = useState({
    HoTen: data.HoTen,
    NgaySinh: data.NgaySinh,
    GioiTinh: data.GioiTinh,
    NgayTao: data.NgayTao,
    AnhDaiDien: data.AnhDaiDien,
    TieuSu: data.TieuSu,
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
          src={`../../../assets/${data.AnhDaiDien}`}
          alt="Avatar"
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

      <TextField
        label="Họ Tên"
        name="HoTen"
        value={editedData.HoTen}
        onChange={handleInputChange}
        sx={{ width: "50%", marginRight: "10px" }}
        margin="normal"
      />
      <Box
        mt={2}
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <TextField
          label="Ngày sinh"
          name="NgaySinh"
          type="date"
          value={editedData.NgaySinh}
          onChange={handleInputChange}
          sx={{ width: "50%", marginRight: "10px" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            dateFormat: "yyyy-MM-dd",
          }}
        />
        <Select
          label="Giới tính"
          name="GioiTinh"
          value={editedData.GioiTinh}
          onChange={handleInputChange}
          sx={{
            width: "50%",
            marginTop: "8px",
          }}
          displayEmpty
          margin="normal"
        >
          <MenuItem value={true}>Nam</MenuItem>
          <MenuItem value={false}>Nữ</MenuItem>
        </Select>
      </Box>
      <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="Tài khoản"
          name="IDTaiKhoan"
          value={editedData.IDTaiKhoan}
          onChange={handleInputChange}
          sx={{ width: "50%", marginRight: "10px" }}
          margin="normal"
        />
        <TextField
          label="Ngày tạo"
          name="NgayTao"
          type="date"
          value={editedData.NgayTao}
          onChange={handleInputChange}
          sx={{ width: "50%", marginRight: "10px" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <TextField
        label="Tiểu sử"
        name="TieuSu"
        value={editedData.TieuSu}
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
