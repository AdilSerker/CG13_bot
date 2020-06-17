export enum ConfigType {
	Server = "server",
	Crm = "crm"
}

export interface ConfigDictionary {
	[key: string]: BaseConfig;
}

export interface BaseConfig {}

export interface ServerConfig extends BaseConfig {
	host: string;
	port: number;
}

export interface CrmConfig {
	host: string;
	username: string;
	password: string;
}
