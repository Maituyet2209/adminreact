import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography, Grid, Paper } from "@mui/material";
import { tokens } from "../../../theme";
import axios from "axios";

const SongDetail = ({ songId, onClose, initialSongDetails }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [songDetails, setSongDetails] = useState(initialSongDetails);
  const [lyricsContent, setLyricsContent] = useState("");

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/song/${songId}`
        );
        const fetchedSongDetails = response.data.data[0];
        setSongDetails(fetchedSongDetails);

        // Fetch lời nhạc
        const lyricsResponse = await axios.get(
          `http://localhost:5000/api/file/get/${fetchedSongDetails.LoiNhac}`
        );
        setLyricsContent(lyricsResponse.data);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    };

    if (songId) {
      fetchSongDetails();
    }
  }, [songId]);

  useEffect(() => {
    setSongDetails(initialSongDetails);
  }, [initialSongDetails]);

  if (!songDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      backgroundColor={colors.greenAccent[800]}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        width: "80%", // Giả sử bạn muốn form rộng hơn
        maxWidth: "1200px", // Đặt một giới hạn cho chiều rộng tối đa
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <img
              src={`http://localhost:5000/api/file/get/${songDetails.AnhBia}`}
              alt={`Ảnh bìa - ${songDetails.TenBH}`}
              style={{
                width: "100%",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            />

            <Typography variant="h4">
              <strong>{songDetails.TenBH}</strong>
            </Typography>

            <Typography variant="body1" marginBottom="16px">
              <strong>Tên nghệ sĩ:</strong> {songDetails.IDNgheSi}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Ngày phát hành:</strong>{" "}
              {new Date(songDetails.NgayPH).toLocaleDateString("vi-VN")}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>ID Album:</strong> {songDetails.IDAlbum}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Ngôn ngữ:</strong> {songDetails.IDNgonNgu}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "8px",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" paragraph>
              <strong>Lời nhạc:</strong>{" "}
              <pre
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {lyricsContent}
              </pre>
            </Typography>

            <Typography variant="body1">
              <audio controls>
                <source
                  src={`http://localhost:5000/api/file/get/${songDetails.MusicAPIPath}`}
                  type="audio/mp3"
                />
              </audio>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SongDetail;
