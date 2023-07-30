export const FormatDate = "YYYY/MM/DD";

export const hostApi = "http://localhost:4000"; // cambiar por una variable de entorno en un futuro

export const endpointsApi = {
  tramos: {
    url: `${hostApi}/tramos`,
    method: "POST",
  },
  cliente: {
    url: `${hostApi}/cliente`,
    method: "POST",
  },
  history: {
    url: `${hostApi}/history`,
    method: "POST",
  },
};

export function filterUniques(value, index, array) {
  return array.indexOf(value) === index;
}
