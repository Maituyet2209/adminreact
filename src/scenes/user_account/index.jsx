import React from "react";
import { useState } from "react";
import { Box, useTheme, Typography, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import { DataUsers } from "../../data/mockDataUser_accounts";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DataUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box m="20px">
      <Header title="USER ACCOUNTS" subtitle="Manage user accounts" />
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
            <Typography fontWeight="bold">Ảnh đại diện</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Họ Tên</Typography>
          </Box>
          <Box flex="2">
            <Typography fontWeight="bold">Ngày tạo tài khoản</Typography>
          </Box>
          <Box flex="1">
            <Typography fontWeight="bold">Chức năng</Typography>
          </Box>
        </Box>
        {/* Rows */}
        <Box>
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
                {/* <Typography>{val.AnhDaiDien}</Typography> */}
                <img
                  src={`../../assets/avatar2.png`}
                  //src={require(`../../assets/${val.AnhDaiDien}`)}
                  alt={`Avatar - ${val.HoTen}`}
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                  }}
                />
              </Box>
              <Box flex="2">
                <Typography>{val.HoTen}</Typography>
              </Box>
              <Box flex="2">
                <Typography>
                  {new Date(val.NgayTao).toLocaleDateString("vi-VN")}
                </Typography>
              </Box>
              <Box flex="1">
                <Typography>
                  <InfoOutlinedIcon /> <EditOutlinedIcon />{" "}
                  <DeleteOutlineOutlinedIcon />
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(DataUsers.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Users;
