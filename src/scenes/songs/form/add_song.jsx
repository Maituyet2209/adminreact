import React, { useState } from "react";
import axios from "axios";
import { tokens } from "../../../theme";
import { Box, useTheme, Typography, Button, TextField } from "@mui/material";

const AddSong = ({ onSave, onCancel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [songData, setSongData] = useState({
    TenBH: "",
    LuotTai: 0,
    NgayPH: "",
    IDAlbum: null,
    IDTheLoai: null,
    IDNgheSi: null,
    IDNgonNgu: null,
    LuotNghe: 0,
    fileText: "",
    fileImage: "",
    fileMusic: "",
  });

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    setSongData((prevData) => ({
      ...prevData,
      [fileType]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("TenBH", songData.TenBH);
    formData.append("LuotTai", songData.LuotTai);
    formData.append("NgayPH", songData.NgayPH);
    formData.append("IDAlbum", songData.IDAlbum);
    formData.append("IDTheLoai", songData.IDTheLoai);
    formData.append("IDNgheSi", songData.IDNgheSi);
    formData.append("IDNgonNgu", songData.IDNgonNgu);
    formData.append("LuotNghe", songData.LuotNghe);
    formData.append("fileText", songData.fileText);
    formData.append("fileImage", songData.fileImage);
    formData.append("fileMusic", songData.fileMusic);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/song",
        formData
      );
      console.log("Add Song Response:", response.data);

      onSave(response.data);
    } catch (error) {
      console.error("Error adding song:", error);
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
        maxWidth: "500px",
        height: "auto",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <Typography variant="h6" sx={{ color: colors.greenAccent[300] }}>
            Add Song
          </Typography>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Tên Bài Hát:
            <input
              type="text"
              value={songData.TenBH}
              onChange={(e) =>
                setSongData({ ...songData, TenBH: e.target.value })
              }
            />
          </label>
        </div>

        <TextField
          label="Ngày Phát Hành"
          type="date"
          value={songData.NgayPH}
          onChange={(e) => setSongData({ ...songData, NgayPH: e.target.value })}
          sx={{ flex: 1, marginRight: "10px" }}
          margin="normal"
        />

        <div style={{ marginBottom: "15px" }}>
          <label>
            Thể Loại:
            <input
              type="text"
              value={songData.IDTheLoai}
              onChange={(e) =>
                setSongData({ ...songData, IDTheLoai: e.target.value })
              }
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Nghệ Sĩ:
            <input
              type="text"
              value={songData.IDNgheSi}
              onChange={(e) =>
                setSongData({ ...songData, IDNgheSi: e.target.value })
              }
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            File Lời Nhạc:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileText")}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            File Ảnh Bìa:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileImage")}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            File Âm Thanh:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileMusic")}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[600],
              color: colors.greenAccent[300],
            }}
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outlined"
            sx={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddSong;
