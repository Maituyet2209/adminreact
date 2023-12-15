import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";

const AddSong = ({ onSave, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:5000/api/cate"
        );
        const languagesResponse = await axios.get(
          "http://localhost:5000/api/lang"
        );
        const artistsResponse = await axios.get(
          "http://localhost:5000/api/artist"
        );

        if (Array.isArray(categoriesResponse.data.data)) {
          setCategories(categoriesResponse.data.data);
        } else {
          console.error("Invalid data format for categories");
        }

        if (Array.isArray(languagesResponse.data.data)) {
          setLanguages(languagesResponse.data.data);
        } else {
          console.error("Invalid data format for languages");
        }

        if (Array.isArray(artistsResponse.data.data)) {
          setArtists(artistsResponse.data.data);
        } else {
          console.error("Invalid data format for artists");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    fileText: null,
    fileImage: null,
    fileMusic: null,
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

    if (songData.IDTheLoai) formData.append("IDTheLoai", songData.IDTheLoai);
    if (songData.IDNgheSi) formData.append("IDNgheSi", songData.IDNgheSi);

    formData.append("LuotNghe", songData.LuotNghe);
    formData.append("fileText", songData.fileText);
    formData.append("fileImage", songData.fileImage);
    formData.append("fileMusic", songData.fileMusic);

    if (songData.IDNgonNgu) formData.append("IDNgonNgu", songData.IDNgonNgu);


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
  const handleCancel = (event) => {
    event.preventDefault();
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
        width: "400px",
      }}
    >
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
        fontWeight="bold"
        textAlign="center"
        mb={3}
      >
        Add Song
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}></Box>
        <TextField
          label="Tên bài hát"
          value={songData.TenBH}
          onChange={(e) => setSongData({ ...songData, TenBH: e.target.value })}
          sx={{ width: "50%" }}
          mb={2}
        />
        <Box sx={{}}>
          <Typography>Ngày phát hành: </Typography>
          <TextField
            type="date"
            value={songData.NgayPH}
            onChange={(e) =>
              setSongData({ ...songData, NgayPH: e.target.value })
            }
            sx={{ width: "50%" }}
            mb={2}
          />
        </Box>
        <Box
          mt={2}
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <FormControl
            mb={2}
            sx={{ width: "45%", marginTop: "5px", marginRight: "10px" }}
          >
            <InputLabel id="theloai-label">Thể Loại</InputLabel>
            <Select
              labelId="theloai-label"
              value={songData.IDTheLoai}
              onChange={(e) =>
                setSongData({ ...songData, IDTheLoai: e.target.value })
              }
            >
              <MenuItem value="">
                <em>Chọn Thể Loại</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.ID} value={category.ID}>
                  {category.TenTheLoai}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={2} sx={{ width: "45%", marginTop: "5px" }}>
            <InputLabel id="ngonngu-label">Ngôn ngữ</InputLabel>
            <Select
              labelId="ngonngu-label"
              value={songData.IDNgonNgu}
              onChange={(e) => setSongData({ ...songData, IDNgonNgu: e.target.value })
              }
            >
              <MenuItem value="">
                <em>Chọn Ngôn ngữ</em>
              </MenuItem>
              {languages.map((language) => (
                <MenuItem key={language.ID} value={language.ID}>
                  {language.TenNgonNgu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl mb={2} sx={{ width: "50%", marginTop: "10px" }}>
          <InputLabel id="nghesi-label">Nghệ sĩ</InputLabel>
          <Select
            labelId="nghesi-label"
            value={songData.IDNgheSi}
            onChange={(e) =>
            {
              console.log(e.target.value)

              setSongData({ ...songData, IDNgheSi: e.target.value })
              }
            }
          >
            <MenuItem value="">
              <em>Chọn Nghệ sĩ</em>
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist.ID} value={artist.ID}>
                {artist.HoTen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <label>
            File Lời Nhạc:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileText")}
            />
          </label>
        </Box>

        <Box>
          <label>
            File Ảnh Bìa:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileImage")}
            />
          </label>
        </Box>

        <Box>
          <label>
            File Âm Thanh:
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "fileMusic")}
            />
          </label>
        </Box>

        <Box mt={3}>
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
            onClick={handleCancel}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddSong;
