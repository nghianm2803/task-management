import React, { useEffect, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import FSelect from "@/components/form/FSelect";

interface FilterTaskProps {
  onFilterChange: (value: string) => void;
}

function FilterTask({ onFilterChange }: FilterTaskProps) {
  const [filterPriority, setFilterPriority] = useState<string>("");

  useEffect(() => {
    onFilterChange(filterPriority);
  }, [filterPriority, onFilterChange, setFilterPriority]);

  return (
    <Box sx={{ minWidth: 210 }}>
      <FSelect
        name="filter"
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
