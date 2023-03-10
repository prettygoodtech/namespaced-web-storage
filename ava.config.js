export default {
  files: ["src/**/*.test.ts", "src/**/*.spec.ts"],
  typescript: {
    rewritePaths: {
      "src/": "lib/",
    },
    compile: false,
  },
};
