import React, { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import axios from "axios";

const EditSong = ({ onSave, onCancel, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [editedSongDetails, setEditedSongDetails] = useState({
    ...data,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSongDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file, fieldName) => {
    try {
      const formData = new FormData();
      formData.append(fieldName, file);

      const response = await axios.post(
        `http://localhost:5000/api/file/upload`,
        formData
      );

      const uploadedFileName = response.data.filename;

      setEditedSongDetails((prevData) => ({
        ...prevData,
        [fieldName]: uploadedFileName,
      }));
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleSave = async () => {
    try {
      // Upload files
      await handleFileUpload(editedSongDetails.AnhBiaFile, "AnhBia");

      await handleFileUpload(editedSongDetails.LoiNhacFile, "LoiNhac");

      await handleFileUpload(
        editedSongDetails.MusicAPIPathFile,
        "MusicAPIPath"
      );

      // Update song details
      const editedData = {
        ...editedSongDetails,
        NgayPH: new Date(editedSongDetails.NgayPH).toISOString(),
        IDAlbum:
          editedSongDetails.IDAlbum === "null"
            ? null
            : editedSongDetails.IDAlbum,
      };

      const response = await axios.put(
        `http://localhost:5000/api/song/${data.ID}`,
        editedData
      );

      console.log("API response:", response.data);

      onSave(editedSongDetails);
    } catch (error) {
      console.error("Error updating song:", error);
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
        borderRadius: "8px",
        width: "80%",
        maxWidth: "1200px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        mt={2}
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <img
          src={`http://localhost:5000/api/file/get/${editedSongDetails.AnhBia}`}
          alt={`Ảnh bìa - ${editedSongDetails.TenBH}`}
          style={{
            width: "100px",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        />
        <label
          htmlFor="uploadAnhBia"
          className="custom-file-upload"
          style={{ marginTop: "10px" }}
        >
          Chọn ảnh bìa
        </label>
        <input
          id="uploadAnhBia"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files[0], "AnhBiaFile")}
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <TextField
          label="Tên Bài Hát"
          name="TenBH"
          value={editedSongDetails.TenBH}
          onChange={handleInputChange}
          sx={{ flex: 1, marginRight: "10px" }}
          margin="normal"
        />

        <TextField
          label="Nghệ sĩ"
          name="IDNgheSi"
          value={editedSongDetails.IDNgheSi}
          onChange={handleInputChange}
          sx={{ flex: 1 }}
          margin="normal"
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <TextField
          label="Ngày Phát Hành"
          name="NgayPH"
          type="date"
          value={editedSongDetails.NgayPH}
          onChange={handleInputChange}
          sx={{ flex: 1, marginRight: "10px" }}
          margin="normal"
        />

        <TextField
          label="Ngôn ngữ"
          name="IDNgonNgu"
          value={editedSongDetails.IDNgonNgu}
          onChange={handleInputChange}
          sx={{ flex: 1 }}
          margin="normal"
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <label
          htmlFor="uploadLoiNhac"
          className="custom-file-upload"
          style={{ flex: 1 }}
        >
          Chọn file lời nhạc
        </label>
        <input
          id="uploadLoiNhac"
          type="file"
          accept=".txt"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files[0], "LoiNhacFile")}
        />

        <label
          htmlFor="uploadMusicAPIPath"
          className="custom-file-upload"
          style={{ flex: 1, marginLeft: "10px" }}
        >
          Chọn file âm nhạc
        </label>
        <input
          id="uploadMusicAPIPath"
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={(e) =>
            handleFileUpload(e.target.files[0], "MusicAPIPathFile")
          }
        />
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          style={{ marginRight: "10px" }}
        >
          Lưu
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default EditSong;
