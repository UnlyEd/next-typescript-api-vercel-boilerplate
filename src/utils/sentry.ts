import * as Sentry from '@sentry/node';
import get from 'lodash.get';

/**
 * Initialize Sentry and return it.
 *
 * Helper to avoid doing the init() call in every /pages/api file.
 * Used in pages/index for the client side, and doesn't need to be included in any frontend file.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',
  environment: process.env.APP_STAGE,
  release: process.env.APP_VERSION_RELEASE,
});

if (!process.env.SENTRY_DSN && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.error('Sentry DSN not defined');
}

// Scope configured by default, subsequent calls to "configureScope" will add additional data
Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
  scope.setTag('nodejs', process.version);
  scope.setTag('nodejsAWS', process.env.AWS_EXECUTION_ENV || null); // Optional - Available on production environment only
  scope.setTag('memory', process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null); // Optional - Available on production environment only
  scope.setTag('cache', process.env.GRAPHCMS_CACHE_ENDPOINT || null); // Optional - Available on production environment only
  scope.setTag('buildTime', process.env.BUILD_TIME);
});

export const configureReq = (req) => {
  Sentry.configureScope((scope) => {
    scope.setTag('host', get(req, 'headers.host'));
    scope.setTag('url', get(req, 'url'));
    scope.setTag('method', get(req, 'method'));
    scope.setContext('query', get(req, 'query'));
    scope.setContext('cookies', get(req, 'cookies'));
    scope.setContext('body', get(req, 'body'));
    scope.setContext('headers', get(req, 'headers'));
  });
};

export default Sentry;
