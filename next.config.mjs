/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "header", key: "host", value: `www.${NEXT_PUBLIC_DOMAIN}` }],
      destination: `http://${NEXT_PUBLIC_DOMAIN}/:path*`,
      permanent: true,
    },
  ],
};

export default nextConfig;
