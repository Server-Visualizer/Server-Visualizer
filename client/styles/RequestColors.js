const requestColors = {GET: 'rgba(255, 99, 132, 0.7)', // GET
POST: 'rgba(54, 162, 235, 0.7)', // POST
PATCH: 'rgba(255, 206, 86, 0.7)', // PATCH
DELETE: 'rgba(75, 192, 192, 0.7)', // DELETE
PUT: 'rgba(153, 102, 255, 0.7)', // PUT
};

export default function randomColors (requests) {
  return requests.map((requestType) => requestColors[requestType]);
};