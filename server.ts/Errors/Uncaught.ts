process.on('uncaughtException', function (err) {
  Logger.error(`Uncaught exception:`, err);
});

process.on('unhandledRejection', function (err) {
  Logger.error(`Unhandled rejection:`, err);
});