// // next.config.js
// const path = require("path");

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

//E:\Projects\patient-monitor\patient-monitor\my-app\next.config.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    // Restrict Webpack rules to only include your project folder
    config.module.rules.forEach((rule) => {
      if (rule.include) {
        rule.include = path.resolve(__dirname);
      }
    });

    return config;
  },
};
