import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { fetchApi } from "../../utils/fetch.js";
import { endpointsApi, filterUniques } from "../../utils/config.js";
import { LineChart } from "@mui/x-charts/LineChart";
import StatusSearch from "../statusSearch/statusSearch.js";

StackedConsumos.propTypes = {
  data: PropTypes.array,
};

export function StackedConsumos({ data }) {
  const years = data.map((item) => `${item.year_c}`).filter(filterUniques);
  const lineas = data.map((item) => item.linea).filter(filterUniques);
  const dataset = [];
  lineas.map((linea) => {
    dataset[linea] = years.map(
      (year) =>
        data.filter((item) => item.year_c == year && item.linea === linea)?.[0]
          ?.consumo ?? 0
    );
  });
  if (data.length <= 0) return <></>;
  return (
    <LineChart
      xAxis={[
        {
          id: "Years",
          data: years,
        },
      ]}
      series={lineas.map((linea) => {
        return {
          id: linea,
          label: linea,
          data: dataset[linea],
        };
      })}
      height={500}
      margin={{ left: 70 }}
    />
  );
}

StackedCostos.propTypes = {
  data: PropTypes.array,
};

export function StackedCostos({ data }) {
  const years = data.map((item) => `${item.year_c}`).filter(filterUniques);
  const lineas = ["Residencial", "Comercial", "Industrial"];
  const dataset = {
    Residencial: data.map((item) => item.costo_residencial),
    Comercial: data.map((item) => item.costo_comercial),
    Industrial: data.map((item) => item.costo_industrial),
  };
  if (data.length <= 0) return <></>;
  return (
    <LineChart
      xAxis={[
        {
          id: "Years",
          data: years,
        },
      ]}
      series={lineas.map((linea) => {
        return {
          id: linea,
          label: linea,
          data: dataset[linea],
        };
      })}
      height={500}
      margin={{ left: 70 }}
    />
  );
}

export default function TableHistory() {
  const [status, setStatus] = useState(null);
  const [datasetConsumos, setDatasetConsumos] = useState([]);
  const [datasetCostos, setDatasetCostos] = useState([]);

  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    setStatus("progress");
    fetchApi({
      url: endpointsApi.history.url,
      method: endpointsApi.history.method,
    })
      .then((result) => {
        setDatasetConsumos(result.dataConsumos);
        setDatasetCostos(result.dataCostos);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "Linea",
        header: "Linea",
      },
      {
        accessorKey: "TipoConsumo",
        header: "Tipo Consumo",
        size: 300,
      },
      {
        accessorKey: "perdidas",
        header: "Perdidas",
        filterFn: "between",
        size: 300,
      },
    ],
    []
  );

  return (
    <Box>
      <StatusSearch status={status} setStatus={setStatus} />
      <Box marginTop={2}>
        <Typography variant="h5" textAlign="center">
          Consumo historico
        </Typography>
        <StackedConsumos data={datasetConsumos} />
      </Box>
      <Box marginTop={2}>
        <Typography variant="h5" textAlign="center">
          Costos historicos por zona
        </Typography>
        <StackedCostos data={datasetCostos} />
      </Box>
    </Box>
  );
}
