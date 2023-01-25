const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

//retrieve logs of each lambda function
const getLambdaLogs = async (req, res, next) => {
  const { currFunc } = req.query;
  const logGroupName = '/aws/lambda/' + currFunc;

  //create new instance of CloudWatchLogsClient with user's region and credentials
  const cloudWatchLogs = new CloudWatchLogsClient({
    region: req.query.region,
    credentials: res.locals.credentials,
  });

  //initiate starttime to be 7 days before endtime in milliseconds from epoch time
  const now = new Date();
  const EndTime = now.valueOf();
  const StartTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).valueOf();

  //helper function to recursively retrieve logs if there's a nextToken
  const nextTokenHelper = async (nextToken, data = []) => {
    if (!nextToken) {
      return data;
    }
    const nextLogEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: EndTime.valueOf(),
        startTime: StartTime.valueOf(),
        nextToken,
        filterPattern: '- START - END ',
      })
    );
    data.push(nextLogEvents.events);
    return nextTokenHelper(nextLogEvents.nextToken, data);
  };

  //AWS query format for each individual lambda function to list logs
  try {
    const logEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: EndTime.valueOf(),
        startTime: StartTime.valueOf(),
        filterPattern: '- START - END ',
      })
    );
    //if there are no logs, return to next middleware
    if (!logEvents) {
      return next();
    }

    //if there is a nextToken, recursively retrieve logs with helper function
    if (logEvents.nextToken) {
      const nextTokenData = await nextTokenHelper(logEvents.nextToken);
      logEvents.events = logEvents.events.concat(...nextTokenData);
    }

    //only return the first 50 logs
    const fiftyLogEvents = logEvents.events.slice(0, 50);

    //format the logs to remove unnecessary information
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

    res.locals.functionLogs = logEventsMessages;
    return next();
  } catch (err) {
    if (err) console.error(err);
    return next(err);
  }
};

module.exports = {
  getLambdaLogs,
};
