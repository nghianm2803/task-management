"use client";

import React from "react";
import Link from "next/link";
import Avatar from "../assets/avatar.png";
import Image from "next/image";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ColorsBase } from "@/theme/colorBase";

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "menu-appbar";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} sx={{ mx: 1 }}>
        <Link href="/dashboard">Dashboard</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        boxShadow: 3,
        bgcolor: ColorsBase.gray900,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Typography
            variant="h6"
            component="p"
            sx={{
              borderRadius: 2,
              border: "2px solid",
              borderBottomWidth: "4px",
              borderRightWidth: "4px",
              borderColor: ColorsBase.white,
              px: 2,
              py: 1,
              fontWeight: "bold",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              display: { xs: "none", md: "block" },
              color: ColorsBase.white,
            }}
          >
            Task Management
          </Typography>
        </Link>
        <Button onClick={handleProfileMenuOpen}>
          <Box
            sx={{
              display: "inline-block",
              borderRadius: "50%",
              border: "2px solid white",
              overflow: "hidden",
              width: 45,
              height: 45,
            }}
          >
            <Image src={Avatar} alt="Avatar" width={40} height={40} priority />
          </Box>
        </Button>
        {renderMenu}
      </Box>
    </Box>
  );
};

export default MainHeader;
