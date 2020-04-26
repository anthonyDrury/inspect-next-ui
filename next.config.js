// append .page to page files, allows for tests in page folder
module.exports = {
  pageExtensions: ["page.tsx"],
  distDir: "build",
  env: {
    REACT_APP_ANALYTICS_KEY=process.env.REACT_APP_ANALYTICS_KEY,
    REACT_APP_API_URL=process.env.REACT_APP_API_URL
  }
};