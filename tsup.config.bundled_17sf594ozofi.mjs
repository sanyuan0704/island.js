// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig([
  {
    entry: {
      cli: "src/node/cli.ts",
      dev: "src/node/dev.ts",
      index: "src/node/index.ts"
    },
    minifyIdentifiers: false,
    bundle: true,
    platform: "node",
    format: "esm",
    dts: true,
    sourcemap: true,
    splitting: true,
    keepNames: true,
    minify: process.env.NODE_ENV === "production",
    skipNodeModulesBundle: true,
    outDir: "dist/node",
    clean: true
  },
  {
    entry: {
      "jsx-runtime": "src/runtime/island-jsx-runtime.js",
      lazyWithPreload: "src/runtime/lazyWithPreload.tsx"
    },
    format: "esm",
    dts: false,
    minify: false,
    outDir: "dist/runtime",
    clean: true
  }
]);
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoW1xuICB7XG4gICAgZW50cnk6IHtcbiAgICAgIGNsaTogJ3NyYy9ub2RlL2NsaS50cycsXG4gICAgICBkZXY6ICdzcmMvbm9kZS9kZXYudHMnLFxuICAgICAgaW5kZXg6ICdzcmMvbm9kZS9pbmRleC50cydcbiAgICB9LFxuICAgIG1pbmlmeUlkZW50aWZpZXJzOiBmYWxzZSxcbiAgICBidW5kbGU6IHRydWUsXG4gICAgcGxhdGZvcm06ICdub2RlJyxcbiAgICBmb3JtYXQ6ICdlc20nLFxuICAgIGR0czogdHJ1ZSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgc3BsaXR0aW5nOiB0cnVlLFxuICAgIGtlZXBOYW1lczogdHJ1ZSxcbiAgICBtaW5pZnk6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXG4gICAgc2tpcE5vZGVNb2R1bGVzQnVuZGxlOiB0cnVlLFxuICAgIG91dERpcjogJ2Rpc3Qvbm9kZScsXG4gICAgY2xlYW46IHRydWVcbiAgfSxcbiAge1xuICAgIGVudHJ5OiB7XG4gICAgICAnanN4LXJ1bnRpbWUnOiAnc3JjL3J1bnRpbWUvaXNsYW5kLWpzeC1ydW50aW1lLmpzJyxcbiAgICAgIGxhenlXaXRoUHJlbG9hZDogJ3NyYy9ydW50aW1lL2xhenlXaXRoUHJlbG9hZC50c3gnXG4gICAgfSxcbiAgICBmb3JtYXQ6ICdlc20nLFxuICAgIGR0czogZmFsc2UsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBvdXREaXI6ICdkaXN0L3J1bnRpbWUnLFxuICAgIGNsZWFuOiB0cnVlXG4gIH1cbl0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCO0FBQUEsSUFDRSxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsbUJBQW1CO0FBQUEsSUFDbkIsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsUUFBUSxRQUFRLElBQUksYUFBYTtBQUFBLElBQ2pDLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLElBQ0UsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNUO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
