// metro.config.js
// --- Polyfill for os.availableParallelism on older Node versions ---
const os = require("os");

if (typeof os.availableParallelism !== "function") {
  os.availableParallelism = () => {
    const cpus = typeof os.cpus === "function" ? os.cpus() : [];
    return Array.isArray(cpus) && cpus.length > 0 ? cpus.length : 1;
  };
}

// --- Standard Expo + NativeWind metro config ---
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Optional workaround: some packages + SDK 54 + exports
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
};

module.exports = withNativeWind(config, {
  input: "./app/global.css", // ensure this file exists
});
