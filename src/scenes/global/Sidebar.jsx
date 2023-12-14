import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        backgroundColor:
          selected === title ? "rgba(0, 0, 0, 0.1)" : "transparent",
        color:
          selected === title ? colors.greenAccent[300] : colors.primary[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box height="100%">
      <Box
        height="100%"
        backgroundColor={colors.blueAccent[900]}
        collapsed={isCollapsed}
        style={{
          width: isCollapsed ? "70px" : "240px",
          transition: "width 0.1s ease-in-out",
        }}
      >
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              backgroundColor:
                selected === "ADMINS" ? "rgba(0, 0, 0, 0.1)" : "transparent",
              color: colors.primary[100],
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!isCollapsed && (
              <Box display="flex" alignItems="center" width="100%">
                <Typography
                  variant="h3"
                  color={
                    selected === "ADMINS"
                      ? colors.primary[100]
                      : colors.grey[100]
                  }
                  style={{
                    margin: "0",
                    color:
                      selected === "ADMINS"
                        ? colors.primary[100]
                        : colors.grey[100],
                  }}
                >
                  ADMINS
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  width="100%"
                >
                  <IconButton
                    style={{ padding: "0" }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </MenuItem>
          {/* User */}
          {!isCollapsed && (
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "15px 0 0 0" }}
                >
                  Ten_Admin
                </Typography>
                <Typography variant="h5" color={colors.blueAccent[300]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu items */}
          <Box paddingLeft={isCollapsed ? undefined : "0px"}>
            <Item
              title="Thống kê"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bài hát"
              to="/songs"
              icon={<LibraryMusicOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Album"
              to="/albums"
              icon={<AlbumOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thể loại"
              to="/categories"
              icon={<CategoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nghệ sĩ"
              to="/artists"
              icon={<MusicNoteOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Quản lý ngôn ngữ"
              to="/language"
              icon={<LanguageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tài khoản người dùng"
              to="/user_account"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Lịch"
              to="/calendar"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};
export default Sidebar;
