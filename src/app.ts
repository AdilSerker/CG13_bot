import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';

import * as morgan from 'morgan';
import * as bodyParser from "body-parser";

import { Config, ConfigType, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";

const serverConfig = <ServerConfig>Config.getInstance().getConfig(ConfigType.Server);

import { bot } from './infrastructure/TelegramBot';

const app = createExpressServer({
    controllers: [__dirname + '/application/controllers/*.js'],
    middlewares
});

app.use(morgan('dev'));
app.use(bodyParser.json());

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('modern', ({ reply }) => reply('Yo'));
bot.command('hipster', ({ reply }) => reply('λ'));

async function startServer() {

	app.listen(serverConfig, () => {
		console.info(`Server started at http://${serverConfig.host}:${serverConfig.port}`);
	});

	bot.launch();
}

startServer();
