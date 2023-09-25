const app = require("../app");
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("서버 가동");
});
