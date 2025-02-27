import React, { JSX } from "react";
import { useTaskContext } from "@/contexts/taskContext";
import { Box, Typography, Paper } from "@mui/material";

function Toast(): JSX.Element {
  const { toastMessage, closeToast } = useTaskContext();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      onClick={closeToast}
    >
      <Paper
        sx={{
          p: 3,
          width: 350,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: "background.paper",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Success!
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mt={2}
        >
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {toastMessage}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Toast;
