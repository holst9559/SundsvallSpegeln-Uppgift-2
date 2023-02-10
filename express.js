import runApp from "./src/server.js";
import * as api from "./src/api.js";
const app = runApp(api);

app.listen(5080);