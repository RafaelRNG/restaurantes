import server from "./server";
import { environment } from "./utils/environment";

server.listen(environment.server.port, () => console.log(`server is running on ${environment.server.port}`));