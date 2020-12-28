export const environment = {
  production: true,
  kroger: {
    apiUrl: 'https://api.kroger.com/v1',
    authUrl: 'https://api.kroger.com/v1/connect/oauth2/token',
    clientId: 'shopsim-ee0a1124b9d3edc755c227392d1e518d7937917512154107219',
    clientSecret: '*'
  }, walmart: {
    apiKeywordUrl: 'https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?',
    apiProductUrl: 'https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-lookup-product?',
    apiKey: '*',
    host: 'axesso-walmart-data-service.p.rapidapi.com'
  }
};
