/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/preview-home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
