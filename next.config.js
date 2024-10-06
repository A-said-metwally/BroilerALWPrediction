module.exports = {
  // reactStrictMode: true,
  images:{
    domains:[
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "image.tmdb.org/t/p/original//",
      "https://image.tmdb.org"
    ],
    },
    webpack: (config) => {
      config.resolve.fallback = {
          // Resolve TensorFlow.js modules
          fs: false,
          path: false,
      };

      return config;
  }
}

