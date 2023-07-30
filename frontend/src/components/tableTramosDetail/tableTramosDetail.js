import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import Filters from "./../filters/filters.js";
import { fetchApi } from "../../utils/fetch.js";
import { endpointsApi } from "../../utils/config.js";
import StatusSearch from "../statusSearch/statusSearch.js";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { BarChart } from "@mui/x-charts/BarChart";

export default function TableTramosDetail() {
  const [status, setStatus] = useState(null);
  const [dataset, setDataset] = useState([]);

  const onSearch = (data) => {
    if (data.dateStart && data.dateEnd) {
      setStatus("progress");
      fetchApi({
        url: endpointsApi.cliente.url,
        method: endpointsApi.cliente.method,
        body: {
          fechainicial: data.dateStart,
          fechafinal: data.dateEnd,
        },
      })
        .then((result) => {
          setDataset(result);
          setStatus("success");
        })
        .catch(() => setStatus("error"));
    } else {
      setStatus("errorForm");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "linea",
        header: "Linea",
      },
      {
        accessorKey: "consumo_residencial",
        header: "Consumo Residencial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "perdidas_residencial",
        header: "Perdidas Residencial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "costo_residencial",
        header: "Costo Residencial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "consumo_comercial",
        header: "Consumo Comercial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "perdidas_comercial",
        header: "Perdidas Comercial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "costo_comercial",
        header: "Costo Comercial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "consumo_industrial",
        header: "Consumo Industrial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "perdidas_industrial",
        header: "Perdidas Industrial",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "costo_industrial",
        header: "Costo Industrial",
        filterFn: "between",
        size: 300,
      },
    ],
    []
  );

  return (
    <Box>
      <Filters onSearch={onSearch} />
      <StatusSearch status={status} setStatus={setStatus} />
      <Box marginTop={2}>
        <MaterialReactTable
          columns={columns}
          data={dataset}
          enableColumnFilterModes
          enableColumnOrdering
          initialState={{ showColumnFilters: true, density: "compact" }}
          enableGlobalFilter={false}
          enableColumnDragging={false}
          localization={MRT_Localization_ES}
        />
      </Box>
      {dataset.length > 0 && (
        <Box marginTop={2}>
          <BarChart
            series={[
              {
                data: dataset.map((item) => item.consumo_comercial),
                stack: "A",
                label: "Comercial",
              },
              {
                data: dataset.map((item) => item.consumo_industrial),
                stack: "A",
                label: "Industrial",
              },
              {
                data: dataset.map((item) => item.consumo_residencial),
                stack: "A",
                label: "Residencial",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                data: dataset.map((item) => item.linea),
              },
            ]}
            height={400}
          />
        </Box>
      )}
    </Box>
  );
}
