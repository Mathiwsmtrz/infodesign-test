import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { FormatDate } from "./../../utils/config";

Filters.propTypes = {
  onSearch: PropTypes.func,
};

export default function Filters({ onSearch }) {
  const [dateStart, setDateStart] = useState(moment("2010-01-01"));
  const [dateEnd, setDateEnd] = useState(moment("2010-01-30"));

  const validDate = (value) => {
    if (!value || !value.isValid()) return null;
    const newDate = value?.format(FormatDate);
    return newDate;
  };

  const send = () => {
    const dataForm = {
      dateStart: validDate(dateStart),
      dateEnd: validDate(dateEnd),
    };
    onSearch(dataForm);
  };

  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} md={5}>
        <DatePicker
          label="Fecha inicial"
          className="fullWidth"
          format={FormatDate}
          value={dateStart}
          onChange={(newValue) => setDateStart(newValue)}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <DatePicker
          label="Fecha final"
          className="fullWidth"
          format={FormatDate}
          value={dateEnd}
          onChange={(newValue) => setDateEnd(newValue)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" fullWidth onClick={send}>
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
}
