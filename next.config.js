/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  // Vercel部署配置
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig; 