export enum ConfigType {
	Server = "server",
	Telegram = 'telegram'
}

export interface ConfigDictionary {
	[key: string]: BaseConfig;
}

export interface BaseConfig {}

export interface ServerConfig extends BaseConfig {
	host: string;
	port: number;
}

export interface TelegramBotConfig extends BaseConfig {
	token: string;
}

