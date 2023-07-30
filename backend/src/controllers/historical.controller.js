const db = require("../database-MySQL");

module.exports = class historical {
  static getHistTramos(data, callback) {
    var consultaTramos = `
      SELECT 
        c.Linea as linea,
        ROUND(SUM(c.Residencial + c.Comercial + c.Industrial), 2) AS consumo_total,
        ROUND(SUM(p.Residencial + p.Comercial + p.Industrial) / 3 * 100, 2) AS perdidas_promedio,
        ROUND(SUM(co.Residencial + co.Comercial + co.Industrial) / 3, 2) AS costo_promedio
      FROM consumo_tramo c
      JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea
      WHERE c.Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}'
      GROUP BY c.Linea
      ORDER BY c.Linea;
    `;

    db.query(consultaTramos, (err, resp) => {
      if (err) {
        callback(err);
      }
      callback(resp);
    });
  }

  static getHistCliente(data, callback) {
    var consultaCliente = `
      SELECT 
        c.Linea as linea,
        ROUND(SUM(c.Residencial), 2) AS consumo_residencial,
        ROUND(SUM(c.Comercial), 2) AS consumo_comercial,
        ROUND(SUM(c.Industrial), 2) AS consumo_industrial,
        ROUND(SUM(p.Residencial) * 100, 2) AS perdidas_residencial,
        ROUND(SUM(p.Comercial) * 100, 2) AS perdidas_comercial,
        ROUND(SUM(p.Industrial) * 100, 2) AS perdidas_industrial,
        ROUND(SUM(co.Residencial), 2) AS costo_residencial,
        ROUND(SUM(co.Comercial), 2) AS costo_comercial,
        ROUND(SUM(co.Industrial), 2) AS costo_industrial
      FROM consumo_tramo c
      JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea
      WHERE c.Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}'
      GROUP BY c.Linea
      ORDER BY c.Linea;
    `;

    db.query(consultaCliente, (err, resp) => {
      if (err) {
        callback(err);
      }
      callback(resp);
    });
  }

  static async getHistory(callback) {
    var consultaConsumos = `
      SELECT 
        c.Linea as linea,
        YEAR(c.Fecha) as year_c,
        ROUND(SUM(c.Residencial + c.Comercial + c.Industrial), 2) as consumo
      FROM consumo_tramo c
      group by c.Linea, YEAR(c.Fecha)
      order by YEAR(c.Fecha), c.Linea
    `;

    var dataConsumos = await new Promise((resolve, reject) => {
      db.query(consultaConsumos, (err, resp) => {
        if (err) reject(err);
        return resolve(resp);
      });
    });

    console.log(dataConsumos);

    var consultaCostos = `
      SELECT 
        YEAR(c.Fecha) as year_c,
        ROUND(AVG(c.Residencial), 2) as costo_residencial,
        ROUND(AVG(c.Comercial), 2) as costo_comercial,
        ROUND(AVG(c.Industrial), 2) as costo_industrial
      FROM costos_tramo c
      group by YEAR(c.Fecha)
      order by YEAR(c.Fecha);
    `;
    var dataCostos = await new Promise((resolve, reject) => {
      db.query(consultaCostos, (err, resp) => {
        if (err) reject(err);
        return resolve(resp);
      });
    });

    callback({ dataConsumos, dataCostos });
  }
};
