import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { JSX } from "react";

interface DeleteTaskProps {
  id: string;
  openDeleteDialog: boolean;
  deleteDialogClose: () => void;
  onDelete: () => void;
}

function DeleteTask({
  openDeleteDialog,
  deleteDialogClose,
  onDelete,
}: DeleteTaskProps): JSX.Element {
  const handleDeleteTask = () => {
    onDelete();
    deleteDialogClose();
  };

  return (
    <Dialog open={openDeleteDialog} onClose={deleteDialogClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this task?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDeleteTask} color="error">
          Delete
        </Button>
        <Button variant="outlined" onClick={deleteDialogClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTask;
