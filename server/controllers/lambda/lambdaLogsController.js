const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const getLambdaLogs = async (req, res, next) => {
  const { currFunc } = req.query;

  const logGroupName = '/aws/lambda/' + currFunc;

  const cloudWatchLogs = new CloudWatchLogsClient({
    region: 'us-east-1',
    credentials: res.locals.credentials,
  });

  try {
    const logEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: new Date().valueOf(),
        startTime: new Date(
          new Date().getTime() - 1 * 24 * 60 * 60 * 1000
        ).valueOf(),
        filterPattern: '- START - END - REPORT',
      })
    );
    // console.log('logEvents', logEvents);
    const fiftyLogEvents = logEvents.events.slice(0, 50);
    // console.log('fiftyLogEvents', fiftyLogEvents);

    const logEventsMessages = [];
    fiftyLogEvents.forEach((event) => {
      if (
        event.message.slice(0, 4) !== 'LOGS' &&
        event.message.slice(0, 9) !== 'EXTENSION'
      ) {
        logEventsMessages.push({
          message: event.message.slice(67),
          timestamp: new Date(event.timestamp),
        });
      } else {
        logEventsMessages.push({
          message: event.message,
          timeStamp: new Date(event.timestamp),
        });
      }
    });

    const eventLog = logEventsMessages;

    res.locals.functionLogs = eventLog;
    console.log('res.locals.functionLogs', res.locals.functionLogs);
    return next();
  } catch (err) {
    if (err) console.error(err);
    return next(err);
  }
};

module.exports = {
  getLambdaLogs,
};
