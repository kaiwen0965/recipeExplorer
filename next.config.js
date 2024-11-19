/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ivan-nextjs-demo-image.s3.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  

module.exports = nextConfig


