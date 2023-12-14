import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme, Typography, Pagination, Button } from "@mui/material";
import { tokens } from "../../theme";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/header";
import EditSong from "./form/edit_song";
import SongDetail from "./form/details_song";
import AddSong from "./form/add_song";

const Songs = () => {
  const [categories, setCategories] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [addFormData, setAddFormData] = useState(null);
  const [isDetailsFormVisible, setIsDetailsFormVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cate");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/song");
        setApiData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Array.isArray(apiData) && apiData.length > 0
      ? apiData.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (song) => {
    setEditFormData(song);
    setIsEditFormVisible(true);
  };

  const sendEditRequest = async (editedData) => {
    try {
      const response = await axios.put(
        `/api/song/${editedData.ID}`,
        editedData
      );
      console.log("Edit Response:", response.data);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const handleEditFormSave = async (editedData) => {
    try {
      await sendEditRequest(editedData);

      setApiData((prevData) =>
        prevData.map((item) => (item.ID === editedData.ID ? editedData : item))
      );

      setEditFormData(null);
      setIsEditFormVisible(false);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const handleEditFormCancel = () => {
    setEditFormData(null);
    setIsEditFormVisible(false);
  };

  const handleDetailsClick = (song) => {
    setSelectedSong(song);
    setIsDetailsFormVisible(true);
  };

  const handleAddSongClick = () => {
    setIsAddFormVisible(true);
    setAddFormData(null);
  };

  const handleAddSongSave = async (newSongData) => {
    try {
      console.log("New Song Data:", newSongData);

      const response = await axios.get("http://localhost:5000/api/song");
      setApiData(response.data.data);

      setIsEditFormVisible(false);
    } catch (error) {
      console.error("Error saving new song:", error);
    }
  };

  const handleAddSongCancel = () => {
    setIsEditFormVisible(false);
  };

  return (
    <Box m="20px">
      <Header title="SONGS" subtitle="Manage songs" />
      <Box>
        <Box
          display="flex"
          borderBottom={`1px solid ${colors.grey[300]}`}
          py="10px"
        >
          <Box flex="1">
            <Typography fontWeight="bold">ID</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Tên bài hát</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Thể Loại</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Ngày phát hành</Typography>
          </Box>
          <Box flex="1">
            <Typography fontWeight="bold">Chức năng</Typography>
          </Box>
        </Box>

        {/* Rows */}
        {currentItems.map((val, key) => (
          <Box
            key={key}
            display="flex"
            borderBottom={`1px solid ${colors.grey[200]}`}
            py="10px"
            flex="1"
          >
            <Box flex="1">
              <Typography>{val.ID}</Typography>
            </Box>
            <Box flex="2">
              <Typography>{val.TenBH}</Typography>
            </Box>
            <Box flex="2">
              <Typography>
                {categories.find((category) => category.ID === val.IDTheLoai)
                  ?.TenTheLoai || "N/A"}
              </Typography>
            </Box>
            <Box flex="2">
              <Typography>
                {new Date(val.NgayPH).toLocaleDateString("vi-VN")}
              </Typography>
            </Box>
            <Box flex="1">
              <Typography fontWeight="bold">
                <InfoOutlinedIcon onClick={() => handleDetailsClick(val)} />{" "}
                <EditOutlinedIcon onClick={() => handleEditClick(val)} />{" "}
                <DeleteOutlineOutlinedIcon />
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Pagination */}
      <Box className="pagination-container">
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination
            count={Math.ceil(apiData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
      {/* Nút Thêm Bài Hát */}
      <Box mt={2} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          onClick={handleAddSongClick}
          style={{
            backgroundColor: colors.greenAccent[200],
            color: colors.primary[900],
          }}
        >
          Thêm Bài Hát
        </Button>
      </Box>
      {/* Form Add Song */}
      {isAddFormVisible && (
        <div className="overlay-container">
          <div
            backgroundColor={colors.blueAccent[900]}
            boxShadow={colors.blueAccent[800]}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AddSong
              data={addFormData}
              onSave={handleAddSongSave}
              onCancel={handleAddSongCancel}
            />
          </div>
        </div>
      )}

      {/* Form Edit Song */}
      {isEditFormVisible && (
        <div className="overlay-container">
          <div
            backgroundColor={colors.blueAccent[900]}
            boxShadow={colors.blueAccent[800]}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <EditSong
              data={editFormData}
              onSave={handleEditFormSave}
              onCancel={handleEditFormCancel}
            />
          </div>
        </div>
      )}
      {/* Form Details Song */}
      {isDetailsFormVisible && (
        <div className="overlay-container">
          <div
            backgroundColor={colors.blueAccent[900]}
            boxShadow={colors.blueAccent[800]}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SongDetail
              songId={selectedSong?.ID}
              onClose={() => setIsDetailsFormVisible(false)}
              songDetails={selectedSong}
            />
          </div>
          <Box
            mt={2}
            zIndex="1000"
            position="fixed"
            bottom="10px"
            width="60%"
            textAlign="center"
          >
            <Button
              style={{
                backgroundColor: colors.greenAccent[200],
                color: colors.primary[900],
              }}
              onClick={() => setIsDetailsFormVisible(false)}
            >
              Đóng
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Songs;
