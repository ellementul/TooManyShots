import nwbuild from "nw-builder"
nwbuild({
  outDir: "../TMS-build/",
  cacheDir: "../cache-build/",
  zip: "zip",
  flavor: "sdk"
})