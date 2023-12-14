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
        width: "300px",
        height: "auto",
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
          <Typography variant="h4">
            <strong>{data.TenTheLoai}</strong>
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Mô Tả:</strong> {data.MoTa}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "5px",
          marginBottom: "10px",
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
