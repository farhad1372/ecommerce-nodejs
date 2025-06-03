import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from "dotenv"
import { SequelizeDatabaseService } from "@services/database.js";
import mustacheExpress from 'mustache-express';
import expressConfig from "./webserver/express.js";
import UserRoutes from "./routes/user.js";
import { ExtendResponse } from "./providers/response/index.js";
import { ExtendRequest } from "./providers/request/index.js";
import SiteRoutes from "./routes/site.js";
import { SupabaseService } from "@services/supabase.js";
import { errorHandler } from "./webserver/errors.js";
// * Base Configuration
dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST: string = process.env.npm_config_host || "localhost";
const app = express();

// * Static Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, '../public')));

// * View Engine Setup
app.set('view engine', 'html');
app.set('views', __dirname + '/resources/views');
app.engine('html', mustacheExpress());

//* Express Config
expressConfig(app, express);

// * DB Connection (sequelize + supabase)
// const sequelizeService = new SequelizeDatabaseService();
// await sequelizeService.connect();

const supabaseService = new SupabaseService();
supabaseService.connect(app);


//* Route Providers
ExtendRequest(app);
ExtendResponse(app);

//* Routes
UserRoutes(app, express);
SiteRoutes(app, express);

app.listen(PORT, () => {
    console.log('\x1b[47m', `Express server listening on ${HOST}:${PORT}, in ${app.get('env').toUpperCase()} mode`, '\x1b[0m');
});

//* Error Handler must be last app.use();
errorHandler(app);
