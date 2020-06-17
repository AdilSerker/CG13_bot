import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';

import * as morgan from 'morgan';
import * as bodyParser from "body-parser";


import { Config, ConfigType, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";

const serverConfig = <ServerConfig>Config.getInstance().getConfig(ConfigType.Server);

const app = createExpressServer({
    controllers: [__dirname + '/application/controllers/*.js'],
    middlewares
});

app.use(morgan('dev'));
app.use(bodyParser.json());

async function startServer() {

	app.listen(serverConfig, () => {
		console.info(`Server started at http://${serverConfig.host}:${serverConfig.port}`);
	});
}

startServer();
