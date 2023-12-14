import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme, Typography, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/header";
import EditCategory from "./form/edit_category";
import DetailsCategory from "./form/details_category";

const Categories = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cate");
        setApiData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Array.isArray(apiData) && apiData.length > 0
      ? apiData.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isDetailsFormVisible, setIsDetailsFormVisible] = useState(false);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditFormVisible(true);
  };

  const handleDetailsClick = (category) => {
    setSelectedCategory(category);
    setIsDetailsFormVisible(true);
  };

  const handleCloseDetailsForm = () => {
    setIsDetailsFormVisible(false);
  };

  return (
    <Box m="20px">
      <Header title="CATEGORIES" subtitle="Manage categories" />
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
            <Typography fontWeight="bold">Tên thể loại</Typography>
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
              <Typography>{val.TenTheLoai}</Typography>
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
      {/* Form Edit Category */}
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
          <EditCategory
            data={selectedCategory}
            onSave={(editedData) => {
              console.log("Saved:", editedData);
              setSelectedCategory(null);
              setIsEditFormVisible(false);
            }}
            onCancel={() => {
              setSelectedCategory(null);
              setIsEditFormVisible(false);
            }}
          />
        </div>
      )}
      {/* Form Details Category */}
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
          <DetailsCategory
            data={selectedCategory}
            onClose={handleCloseDetailsForm}
          />
        </div>
      )}
    </Box>
  );
};

export default Categories;
