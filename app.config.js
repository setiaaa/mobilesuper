import localconfig from "./config/kkp.json";
module.exports = () => {
  return {
    ...localconfig,
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "sentry",
            project: "kkp-mobile-prod",
            authToken: "$(SENTRY_AUTH_TOKEN)",
          },
        },
      ],
    },
  };
};
