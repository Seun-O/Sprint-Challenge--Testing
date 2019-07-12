const PORT = 3300 || process.env.PORT;
const server = require("./server");

server.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
