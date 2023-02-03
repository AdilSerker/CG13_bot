import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { createConnection } from 'typeorm';

import * as morgan from 'morgan';
import * as bodyParser from "body-parser";

import { Config, ConfigType, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";
import { createTelegramBot } from './components/telegram-bot/TelegramBot';

import { commands, onListeners, textListeners } from './application/bot-controllers';
import {openai} from "./components/openai";
openai
const serverConfig = <ServerConfig>Config.getInstance().getConfig(ConfigType.Server);
const dbConfig = <PostgresConnectionOptions>Config.getInstance().getConfig(ConfigType.Db);

const app = createExpressServer({
    controllers: [__dirname + '/application/controllers/*.js'],
    middlewares
});

const bot = createTelegramBot({
	commands,
	onListeners,
	textListeners
});

app.use(morgan('dev'));
app.use(bodyParser.json());

async function startServer() {

	const connection = await createConnection(dbConfig);

	connection.isConnected ?
		console.info("DB " + dbConfig.database + " is connected") :
		console.info("DB " + dbConfig.database + " isn't connected");

	app.listen(serverConfig, () => {
		console.info(`Server started at http://${serverConfig.host}:${serverConfig.port}`);
	});

	bot.launch();
	console.info(`TelegramBot username @cg_13_bot`);
}

startServer();
