// // next.config.js
// const path = require("path");

const { Cookie } = require('lucide-react');

// module.exports = {
//   webpack: (config) => {
//     // Ignore problematic Windows system folders
//     config.snapshot = { managedPaths: [] }; // avoid over-scanning
//     return config;
//   },
//   // Optional: prevent Next from looking outside the project
//   experimental: {
//     outputFileTracingRoot: path.join(__dirname),
//   },
// };

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};


// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//       },
//     ],
//   },
//   webpack: (config) => {
//     // Exclude multiple folders from being scanned
//     config.module.rules.push({
//       test: /\.(js|ts|jsx|tsx)$/,
//       exclude: [
//         /C:\\Users\\Sadhika Rajendran\\Application Data/,
//         /C:\\Users\\Sadhika Rajendran\\Cookies/,
//         /C:\\Users\\Sadhika Rajendran\\My Documents/,
//         /C:\\Users\\Sadhika Rajendran\\Local Settings/,
//       ],
//     });
//     return config;
//   },
// };

// module.exports = nextConfig;


// // next.config.js
// const path = require('path');

// module.exports = {
//   outputFileTracingRoot: path.join(__dirname), // only trace files inside project
//   webpack: (config) => {
//     config.snapshot = { managedPaths: [] }; // prevents over-scanning
//     return config;
//   },
// };

// // next.config.js
// module.exports = {
//   experimental: {
//     serverActions: false, // prevents full RSC scanning
//   },
// };


// const path = require('path');

// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(js|ts|jsx|tsx)$/,
//       exclude: /C:\\Users\\Sadhika Rajendran\\Cookies/,
//     });
//     return config;
//   },
// };


// // next.config.js
// const path = require("path");

// module.exports = {
//   webpack(config) {
//     // Prevent Webpack from scanning outside the project folder
//     config.module.rules.forEach((rule) => {
//       if (rule.include && typeof rule.include !== "string") return;

//       // Limit scanning only to ./src or project root
//       rule.include = [
//         path.resolve(__dirname, "src"),
//         path.resolve(__dirname)
//       ];
//     });

//     return config;
//   },
// };
