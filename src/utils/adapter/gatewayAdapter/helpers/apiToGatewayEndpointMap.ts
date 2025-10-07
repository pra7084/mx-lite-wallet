import {
  ACCOUNTS_ENDPOINT,
  ADDRESS_ENDPOINT,
  TRANSACTIONS_ENDPOINT,
  NETWORK_CONFIG_ENDPOINT,
  NFTS_ENDPOINT,
  TOKENS_ENDPOINT
} from 'localConstants/sdkDapp';

export const gatewayEndpoints = {
  [ADDRESS_ENDPOINT]: ADDRESS_ENDPOINT,
  [NETWORK_CONFIG_ENDPOINT]: NETWORK_CONFIG_ENDPOINT,
  [TRANSACTIONS_ENDPOINT]: TRANSACTIONS_ENDPOINT,
  [TOKENS_ENDPOINT]: null,
  [NFTS_ENDPOINT]: null
};

export const endpointMap = {
  [ACCOUNTS_ENDPOINT]: gatewayEndpoints[ADDRESS_ENDPOINT],
  [NETWORK_CONFIG_ENDPOINT]: gatewayEndpoints[NETWORK_CONFIG_ENDPOINT],
  [TRANSACTIONS_ENDPOINT]: gatewayEndpoints[TRANSACTIONS_ENDPOINT],
  // not configured
  [TOKENS_ENDPOINT]: gatewayEndpoints[TOKENS_ENDPOINT],
  [NFTS_ENDPOINT]: gatewayEndpoints[NFTS_ENDPOINT]
};

export const apiRoutes: Record<keyof typeof endpointMap, string> = {
  [ACCOUNTS_ENDPOINT]: `/${ACCOUNTS_ENDPOINT}/:id`,
  [NETWORK_CONFIG_ENDPOINT]: `/${gatewayEndpoints[NETWORK_CONFIG_ENDPOINT]}`,
  [TRANSACTIONS_ENDPOINT]: `/${gatewayEndpoints[TRANSACTIONS_ENDPOINT]}`,
  // not configured
  [TOKENS_ENDPOINT]: `/${ACCOUNTS_ENDPOINT}/:id/${TOKENS_ENDPOINT}`,
  [NFTS_ENDPOINT]: `/${ACCOUNTS_ENDPOINT}/:id/${NFTS_ENDPOINT}`
};
