/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,

  // ===========================================================================
  // SECURITY HEADERS
  // ===========================================================================
  async headers() {
    return [
      {
        // Применять ко всем маршрутам
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            // Content-Security-Policy - разрешаем только доверенные источники
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://mc.yandex.ru https://www.google-analytics.com https://stats.g.doubleclick.net;
              frame-src 'self' https://www.youtube-nocookie.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
}

module.exports = withSentryConfig(
  withBundleAnalyzer(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'your-org',
    project: 'direct-line',

    // Only print logs for uploading source maps in CI
    sourcemaps: {
      disable: true,
    },

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    widenClientFileUpload: true,

    // Enables performance monitoring
    tracesSampleRate: 0.1,

    // Enables monitoring of server-side rendering
    tunnelRoute: '/monitoring-tunnel',
  }
);
