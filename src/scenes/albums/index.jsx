import React from "react";
import { useState } from "react";
import { Box, useTheme, Typography, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import { DataAlbums } from "../../data/mockDataAlbums";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/header";
import EditAlbum from "./form/edit_album";
import DetailsAlbum from "./form/details_ablum";

const Albums = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DataAlbums.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isDetailsFormVisible, setIsDetailsFormVisible] = useState(false);

  const handleEditClick = (album) => {
    setSelectedAlbum(album);
    setIsEditFormVisible(true);
  };

  const handleDetailsClick = (album) => {
    setSelectedAlbum(album);
    setIsDetailsFormVisible(true);
  };

  const handleCloseDetailsForm = () => {
    setIsDetailsFormVisible(false);
  };

  return (
    <Box m="20px">
      <Header title="ALBUMS" subtitle="Manage albums" />
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
            <Typography fontWeight="bold">Bìa</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Tên Album</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Nghệ sĩ</Typography>
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
              <img
                src={`../../assets/anhminhhoa.png`}
                //src={require(`../../assets/${val.BiaAlbum}`)}
                alt={`Bìa album - ${val.TenAlbum}`}
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box flex="2">
              <Typography>{val.TenAlbum}</Typography>
            </Box>
            <Box flex="2">
              {/* <Typography>{val.IDNgheSi}</Typography> */}
              <Typography>Tên ca sĩ</Typography>
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
          count={Math.ceil(DataAlbums.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
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
          <EditAlbum
            data={selectedAlbum}
            onSave={(editedData) => {
              // Save logic here
              console.log("Saved:", editedData);
              setSelectedAlbum(null);
              setIsEditFormVisible(false);
            }}
            onCancel={() => {
              setSelectedAlbum(null);
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
          <DetailsAlbum data={selectedAlbum} onClose={handleCloseDetailsForm} />
        </div>
      )}
    </Box>
  );
};

export default Albums;
