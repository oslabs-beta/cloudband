const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const getLambdaLogs = async (req, res, next) => {
  // const { currFunc } = req.query;
  const { currFunc } = req.body; //testing artillery
  const logGroupName = '/aws/lambda/' + currFunc;

  const cloudWatchLogs = new CloudWatchLogsClient({
    region: 'us-east-1',
    credentials: res.locals.credentials,
  });

  const nextTokenHelper = async (nextToken, data = []) => {
    if (!nextToken) {
      return data;
    }
    const nextLogEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: new Date().valueOf(),
        startTime: 1674335894,
        nextToken,
        filterPattern: '- START - END ',
      })
    );
    // console.log('nextLogEvents', nextLogEvents);
    data.push(nextLogEvents.events);
    return nextTokenHelper(nextLogEvents.nextToken, data);
  };

  try {
    const logEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: new Date().valueOf(),
        startTime: 1674335894,
        filterPattern: '- START - END ',
      })
    );
    // console.log('logEvents', logEvents);
    if (!logEvents) {
      return next();
    }

    if (logEvents.nextToken) {
      const nextTokenData = await nextTokenHelper(logEvents.nextToken);
      logEvents.events = logEvents.events.concat(...nextTokenData);
      // console.log('nextTokenData', nextTokenData);
      // console.log('logEvents.events', logEvents.events);
    }

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
