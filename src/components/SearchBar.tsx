import { ColorsBase } from "@/theme/colorBase";
import { Box, Button, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <form
        id="searchForm"
        onSubmit={handleSearch}
        style={{ display: "flex", width: "100%" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Task name"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: "400px",
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px 0 0 8px",
              backgroundColor: ColorsBase.white,
              transition: "border 0.2s",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: ColorsBase.gray300,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: ColorsBase.gray500,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "0 8px 8px 0",
            backgroundColor: ColorsBase.gray300,
            color: "black",
            "&:hover": { backgroundColor: ColorsBase.gray300 },
            minWidth: "auto",
            border: `1px solid ${ColorsBase.gray300}`,
          }}
        >
          <AiOutlineSearch size={20} />
        </Button>
      </form>
    </Box>
  );
}

export default SearchBar;
