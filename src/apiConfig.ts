/*

👋 “Hey” from the Praxis team!

'apiConfig' is one pattern that can be used to set environment-based values at build time.
This happens by creating an environment variable REACT_APP_ENV, and then matching corresponding
keys to each environment in the 'envConfigs' object below. To learn more about how to set
REACT_APP_ENV, view the README generated with this app.


For an alternative pattern - using TAP configuration to set environment-based values at cluster initialization - see:
@praxis/component-runtime-env - https://praxis.prod.target.com/components/runtime-env

*/

import merge from 'lodash/merge'
import { AuthConfig } from '@praxis/component-auth'

/**
 * This is the interface of our final export.
   - Extend this as needed with strongly typed values for the best support within your app.
   - TypeScript Interface docs https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
export interface ApiConfig extends CommonConfig {
  readonly auth?: AuthConfig // Overwrite the commonConfig. In this case making it more strict.
}

// This is the type of keys that may be shared across environments.
type CommonConfig = {
  readonly auth?: Omit<AuthConfig, 'clientId'> // Omit a key that is not required in the commonConfig but expected in the final ApiConfig.
  // readonly anotherApi?: AnotherApi // Attempt to strongly type the configuration you expect to consume.
  // readonly anotherApi?: any // Use 'any' as a last resort - intellisense will be limited.
}

// // An example custom type.
// type AnotherApi = {
//   host?: string
//   root?: string
// }

// Defines the environments we are building for.
// These must match the top-level keys of envConfigs.
//
type ReactAppEnv = 'dev' | 'prod'
type EnvConfigs = {
  readonly [key in ReactAppEnv]: ApiConfig
}

// Configurations shared between most or all environments can be stored in commonConfig.
const commonConfig: CommonConfig = {
  auth: {
    authorizationUrl:
      'https://oauth.iam.perf.target.com/auth/oauth/v2/authorize',
    logoutUrl:
      'https://logonservices.iam.perf.target.com/login/responses/logoff.html',
  },
  // // An example common key.
  // anotherApi: {
  //   root: 'v1/',
  // },
}

const envConfigs: EnvConfigs = {
  // 'dev' is the default development environment set by .env.development and the default pipeline in .vela.yml.
  dev: {
    auth: {
      clientId:
        '< Create a non-prod ID2.0 OAuth Client ID at http://go/oauth/ >',
    },
    // An example environment-specific key.
    // anotherApi: {
    //   host: 'example.dev.target.com',
    // },
  },
  /*
  // Additional environments can be added here and by adding a value to the ReactAppEnv type.
  stg: {

  },
  */
  prod: {
    auth: {
      // Keys in envConfigs will overwrite keys from commonConfig.
      authorizationUrl: 'https://oauth.iam.target.com/auth/oauth/v2/authorize',
      logoutUrl:
        'https://logonservices.iam.target.com/login/responses/logoff.html',
      clientId:
        '< Clone your non-prod ID2.0 OAuth Client ID to a production Client ID at http://go/oauth/ >',
    },
  },
}

const appEnv: ReactAppEnv = (process.env.REACT_APP_ENV as ReactAppEnv) || 'dev'
const config = appEnv != null ? envConfigs[appEnv] : {}

// commonConfig and the config for the matching REACT_APP_ENV are combined.
// Values in the environment-specific config will overwrite commonConfig keys if they share the same name.
const apiConfig: ApiConfig = merge(commonConfig, config)
export default apiConfig

// The following line is purely for demonstration purposes and can be removed.
if (process.env.NODE_ENV !== 'production') {
  console.log(`${appEnv} ENV apiConfig:`, apiConfig)
}
