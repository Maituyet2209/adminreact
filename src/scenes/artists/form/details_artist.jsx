import React from "react";
import { Box, useTheme, Typography, Button, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const DetailsAlbum = ({ data, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      backgroundColor={colors.greenAccent[800]}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        width: "600px",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: "5px", right: "5px" }}
        onClick={onClose}
      >
        <CloseOutlinedIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <img
            src={`../../assets/${data.AnhDaiDien}`}
            alt={`Avatar - ${data.AnhDaiDien}`}
            style={{
              width: "250px",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          />
        </Box>

        <Box
          backgroundColor={colors.greenAccent[800]}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            flex: 1,
          }}
        >
          <Typography variant="body1" marginBottom="16px">
            <strong>Tên nghệ Sĩ:</strong> {data.HoTen}
          </Typography>

          <Typography variant="body1">
            <strong>Ngày Sinh:</strong>
            {new Date(data.NgaySinh).toLocaleDateString("vi-VN")}
          </Typography>

          <Typography variant="body1">
            <strong>ID Tài khoản:</strong> {data.IDTaiKhoan}
          </Typography>

          <Typography variant="body1">
            <strong>Ngày Tạo:</strong>{" "}
            {new Date(data.NgayTao).toLocaleDateString("vi-VN")}
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Tiểu Sử:</strong> {data.TieuSu}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "5px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button color="secondary" variant="contained">
          Chỉnh sửa
        </Button>
      </Box>
    </Box>
  );
};

export default DetailsAlbum;
