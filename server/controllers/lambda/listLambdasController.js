const {
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

const listLambdasController = {};
//retrieve lambda function names
listLambdasController.getLambdas = async (req, res, next) => {
  const lambdaClient = new LambdaClient({
    region: 'us-east-1',
    credentials: res.locals.credentials,
  });

  try {
    const allFuncs = await lambdaClient.send(
      new ListFunctionsCommand({
        MaxItems: 10,
        FunctionVersion: 'ALL',
      })
    );

    const funcList = allFuncs.Functions.map((func) => func.FunctionName);

    res.locals.lambdaNames = funcList;

    return next();
  } catch (err) {
    console.log('Error in listLambdas', err);
    return next(err);
  }
};
module.exports = listLambdasController;
