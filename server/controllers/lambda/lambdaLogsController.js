const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
  DescribeLogStreamsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const getLambdaLogs = async (req, res, next) => {
  const { currFunc } = req.query;
  // append name of function to the format necessary for grabbing logs
  const logGroupName = '/aws/lambda/' + currFunc;

  const cloudWatchLogs = new CloudWatchLogsClient({
    region: 'us-east-1',
    credentials: res.locals.credentials,
  });

  // if a nextToken exists (meaning there are more logs to fetch), helperFunc provides a recursive way to get all the logs
  async function helperFunc(nextToken, data = []) {
    // once we run out of nextTokens, return data
    if (!nextToken) {
      return data;
    }
    const nextLogEvents = await cloudWatchLogs.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: new Date().valueOf(),
        startTime: new Date(
          new Date().getTime() - 1 * 24 * 60 * 60 * 1000
        ).valueOf(),
        nextToken,
        filterPattern: '- START - END - REPORT',
      })
    );
    data.push(nextLogEvents.events);
    return helperFunc(nextLogEvents.nextToken, data);
  }

  try {
    // find the logEvents with given logGroupName and time period
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
    // if no log events, just go back to frontend
    if (!logEvents) {
      res.locals.functionLogs = false;
      return next();
    }
    // only send back most recent 50 logs to reduce size
    const shortenedEvents = [];

    // if we received a nextToken, start helperFunc process and make sure to parse through that data in order to grab from the end
    if (logEvents.nextToken) {
      const helperFuncResults = await helperFunc(logEvents.nextToken);
      let poppedEl;

      // while we still have logs to grab from the helperFunc and shortenedEvents is shorter than 50 logs, add to it from the end (giving us the most recent first instead)
      while (helperFuncResults.length && shortenedEvents.length <= 50) {
        poppedEl = helperFuncResults.pop();
        for (let i = poppedEl.length - 1; i >= 0; i -= 1) {
          if (shortenedEvents.length === 50) {
            break;
          }
          shortenedEvents.push(poppedEl[i]);
        }
      }
    }

    // if we didn't have a nextToken and got all logs in one request to the CloudWatchLogsClient
    if (!logEvents.nextToken) {
      // grab from the end to grab most recent logs and stop once we reach 50 to send back to frontend
      for (let i = logEvents.events.length - 1; i >= 0; i -= 1) {
        if (shortenedEvents.length === 50) break;
        shortenedEvents.push(logEvents.events[i]);
      }
    }

    // start forming what it'll look like to send back to frontend
    const eventLog = {
      name: req.body.function,
      timePeriod: req.body.timePeriod,
    };
    const streams = [];

    // loop through logs in order to eventually add to eventLog object
    for (let i = 0; i < shortenedEvents.length; i += 1) {
      let eventObj = shortenedEvents[i];
      // create the individual arrays to populate the table, this info makes up one row
      const dataArr = [];
      // just cut off the last five characters for the log stream name as an identifier
      dataArr.push('...' + eventObj.logStreamName.slice(-5));
      // format the date of the log timestamp to be more readable
      dataArr.push(moment(eventObj.timestamp).format('lll'));

      // if message is just from a normal log, remove the first 67 characters as it's all just metadata/a string of timestamps and unnecessary info
      if (
        eventObj.message.slice(0, 4) !== 'LOGS' &&
        eventObj.message.slice(0, 9) !== 'EXTENSION'
      ) {
        dataArr.push(eventObj.message.slice(67));
        // if the message starts with LOGS or EXTENSION, it's usually different type of info and the beginning part has to stay
      } else {
        dataArr.push(eventObj.message);
      }
      // push to the larger array to then make up the table
      streams.push(dataArr);
    }
    eventLog.streams = streams;
  } catch (err) {
    if (err) console.error(err);
    return next(err);
  }
};

module.exports = getLambdaLogs;
