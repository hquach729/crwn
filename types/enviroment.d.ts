// NOTE: show that his file is a module
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			STRIPE_SECRET_KEY: string;
			GITHUB_AUTH_TOKEN: string;
			PORT?: string;
			PWD: string;
		}
	}
}
