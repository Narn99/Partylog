import React, { useState, useEffect } from "react";
import { Chip, Stack, ThemeProvider, createTheme } from "@mui/material";

export default function ClickableChips() {
  const [selected, setSelected] = useState("전체 연도");

  useEffect(() => {
    setSelected("전체 연도");
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fbb3c2",
      },
    },
  });

  const handleClick = (label) => {
    setSelected(label);
    console.info("You clicked the Chip.");
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1}>
        <Chip
          label="전체 연도"
          variant={selected === "전체 연도" ? "filled" : "outlined"}
          color={selected === "전체 연도" ? "secondary" : "default"}
          onClick={() => handleClick("전체 연도")}
          sx={{
            color: selected === "전체 연도" ? "#ffffff" : undefined,
            fontFamily:
              selected === "전체 연도"
                ? "MaplestoryOTFBold"
                : "MaplestoryOTFLight",
          }}
        />
        <Chip
          label="2023"
          variant={selected === "2023" ? "filled" : "outlined"}
          color={selected === "2023" ? "secondary" : "default"}
          onClick={() => handleClick("2023")}
          sx={{
            color: selected === "2023" ? "#ffffff" : undefined,
            fontFamily:
              selected === "2023" ? "MaplestoryOTFBold" : "MaplestoryOTFLight",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
