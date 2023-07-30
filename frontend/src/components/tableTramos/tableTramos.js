import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import Filters from "./../filters/filters.js";
import { fetchApi } from "../../utils/fetch.js";
import { endpointsApi } from "../../utils/config.js";
import StatusSearch from "../statusSearch/statusSearch.js";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function TableTramos() {
  const [status, setStatus] = useState(null);
  const [dataset, setDataset] = useState([]);

  const onSearch = (data) => {
    if (data.dateStart && data.dateEnd) {
      setStatus("progress");
      fetchApi({
        url: endpointsApi.tramos.url,
        method: endpointsApi.tramos.method,
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
        accessorKey: "consumo_total",
        header: "Consumo",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "costo_promedio",
        header: "Costo Promedio",
        filterFn: "between",
        size: 300,
      },
      {
        accessorKey: "perdidas_promedio",
        header: "Perdidas Promedio",
        filterFn: "between",
        size: 300,
      },
    ],
    []
  );

  const ConsumoTotal = dataset
    .map((item) => item.consumo_total)
    .reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / ConsumoTotal;
    return `${(percent * 100).toFixed(0)}%`;
  };

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
          <PieChart
            className="chart"
            series={[
              {
                outerRadius: 80,
                data: dataset.map((item, idx) => {
                  return {
                    id: idx,
                    value: item.consumo_total,
                    label: item.linea,
                  };
                }),
                arcLabel: getArcLabel,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
              },
            }}
            height={400}
          />
        </Box>
      )}
    </Box>
  );
}
