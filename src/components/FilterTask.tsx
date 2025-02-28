import React, { useEffect, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import FSelect from "@/components/form/FSelect";

interface FilterTaskProps {
  onFilterChange: (value: string) => void;
}

function FilterTask({ onFilterChange }: FilterTaskProps) {
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    onFilterChange(filterPriority);
  }, [filterPriority, onFilterChange]);

  return (
    <Box sx={{ minWidth: 210 }}>
      <FSelect
        name="filter"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value as string)}
      >
        {[
          { value: "All", label: "All" },
          { value: "Low", label: "Low" },
          { value: "Medium", label: "Medium" },
          { value: "High", label: "High" },
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </FSelect>
    </Box>
  );
}

export default FilterTask;
