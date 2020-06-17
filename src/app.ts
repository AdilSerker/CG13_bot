import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

import * as morgan from 'morgan';
import * as bodyParser from "body-parser";

import { Config, ConfigType, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";
import { createTelegramBot } from './components/telegram-bot/TelegramBot';

import { commands, onListeners, textListeners } from './application/bot-controllers';

const serverConfig = <ServerConfig>Config.getInstance().getConfig(ConfigType.Server);

const app = createExpressServer({
    controllers: [__dirname + '/application/controllers/*.js'],
    middlewares
});

const bot = createTelegramBot({
	commands,
	onListeners,
	textListeners
})

app.use(morgan('dev'));
app.use(bodyParser.json());

async function startServer() {

	app.listen(serverConfig, () => {
		console.info(`Server started at http://${serverConfig.host}:${serverConfig.port}`);
	});

	bot.launch();
	console.info(`TelegramBot username @cg_13_bot`);
}

startServer();
