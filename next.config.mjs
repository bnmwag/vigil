/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "header", key: "host", value: `www.${process.env.NEXT_PUBLIC_DOMAIN}` }],
      destination: `http://${process.env.NEXT_PUBLIC_DOMAIN}/:path*`,
      permanent: true,
    },
  ],
};

export default nextConfig;
