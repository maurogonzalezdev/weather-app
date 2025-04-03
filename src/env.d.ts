// Define the type of the environment variables.
declare interface Env {
  readonly NG_APP_ENV: 'development' | 'production';
  readonly NG_APP_API_KEY: string;
  readonly NG_APP_API_URL: string;
  readonly NG_APP_VERSION: string;
}

// Choose how to access the environment variables.
// Remove the unused options.

// 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta {
  readonly env: Env;
}
