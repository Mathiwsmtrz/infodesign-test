import React from "react";
import {
  Box,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function Info() {
  return (
    <Box>
      <Typography variant="h6">
        Estadísticas consumo eléctrico de EPM en Colombia
      </Typography>
      <Typography variant="p">
        Aquí podrá encontrar reportes acerca del consumo eléctrico de EPM en las
        distintas ciudades donde esta entidad presta el servicio, y puede
        analizarla por zonas que están tipificadas como residenciales,
        comerciales, e industriales.
      </Typography>
      <Typography variant="subtitle2" marginTop={4}>
        Diccionario de datos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Campo</TableCell>
            <TableCell>Descripcion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Tramo</TableCell>
            <TableCell>
              Cada tramo equivale a un municipio en concreto
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Consumo</TableCell>
            <TableCell>Cantidad de unidades consumidas (kW)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Costo</TableCell>
            <TableCell>Costo por unidad consumida ($COP)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Perdida</TableCell>
            <TableCell>
              Porcentaje de perdida de unidades en este tramo (%)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
