import React from "react";
import { useState } from "react";
import { Box, useTheme, Typography, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import { DataArtists } from "../../data/mockDataArtists";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/header";
import EditArtist from "./form/edit_artist";
import DetailsArtist from "./form/details_artist";

const Artists = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DataArtists.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isDetailsFormVisible, setIsDetailsFormVisible] = useState(false);

  const handleEditClick = (album) => {
    setSelectedArtist(album);
    setIsEditFormVisible(true);
  };

  const handleDetailsClick = (album) => {
    setSelectedArtist(album);
    setIsDetailsFormVisible(true);
  };

  const handleCloseDetailsForm = () => {
    setIsDetailsFormVisible(false);
  };

  return (
    <Box m="20px">
      <Header title="ARTISTS" subtitle="Manage artists" />
      <Box className="custom-table">
        <Box
          display="flex"
          borderBottom={`1px solid ${colors.grey[300]}`}
          py="10px"
        >
          <Box flex="1">
            <Typography fontWeight="bold">ID</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Họ Tên</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Ảnh đại diện</Typography>
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
          >
            <Box flex="1">
              <Typography>{val.ID}</Typography>
            </Box>
            <Box flex="2">
              <Typography>{val.HoTen}</Typography>
            </Box>
            <Box flex="2">
              <img
                src={`../../assets/${val.AnhDaiDien}`}
                alt={`Ảnh đại diện - ${val.HoTen}`}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box flex="1">
              <Typography>
                <InfoOutlinedIcon onClick={() => handleDetailsClick(val)} />{" "}
                <EditOutlinedIcon onClick={() => handleEditClick(val)} />{" "}
                <DeleteOutlineOutlinedIcon />
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(DataArtists.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {/* Form Edit Album */}
      {isEditFormVisible && (
        <div
          backgroundColor={colors.blueAccent[900]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
        >
          <EditArtist
            data={selectedArtist}
            onSave={(editedData) => {
              // Save logic here
              console.log("Saved:", editedData);
              setSelectedArtist(null);
              setIsEditFormVisible(false);
            }}
            onCancel={() => {
              setSelectedArtist(null);
              setIsEditFormVisible(false);
            }}
          />
        </div>
      )}
      {/* Form Details Album */}
      {isDetailsFormVisible && (
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
          }}
        >
          <DetailsArtist
            data={selectedArtist}
            onClose={handleCloseDetailsForm}
          />
        </div>
      )}
    </Box>
  );
};

export default Artists;
