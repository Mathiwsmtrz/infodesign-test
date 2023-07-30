export function fetchApi({ url, method, body }) {
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then((response) => response.json())
      .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
