import React, { useState, Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Tab, Tabs } from "@mui/material";
import "./App.scss";
const TableTramos = lazy(() => import("./components/tableTramos/tableTramos"));
const TableTramosDetail = lazy(() =>
  import("./components/tableTramosDetail/tableTramosDetail")
);
const TableHistory = lazy(() =>
  import("./components/tableHistory/tableHistory")
);
const Info = lazy(() => import("./components/info/info"));

export default function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = (value) => {
    let tab = null;
    switch (value) {
      case 0:
        tab = (
          <Suspense>
            <Info />
          </Suspense>
        );
        break;
      case 1:
        tab = (
          <Suspense>
            <TableTramos />
          </Suspense>
        );
        break;
      case 2:
        tab = (
          <Suspense>
            <TableTramosDetail />
          </Suspense>
        );
        break;
      case 3:
        tab = (
          <Suspense>
            <TableHistory />
          </Suspense>
        );
        break;
    }
    return tab;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth="md">
        <Box className="spacingVertical">
          <Typography variant="h4" marginBottom={2} fontWeight="bold">
            Prueba técnica Info Design
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="tabs tables"
            >
              <Tab label="Info" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Consulta por Tramo" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Consulta por Tramo/Zonas" id="tab-2" aria-controls="tabpanel-2" />
              <Tab
                label="Estadisticas por Año"
                id="tab-3"
                aria-controls="tabpanel-3"
              />
            </Tabs>
          </Box>
          <Box className="spacingVertical">{renderTabs(value)}</Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
