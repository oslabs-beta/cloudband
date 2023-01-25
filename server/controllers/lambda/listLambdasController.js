const {
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

const listLambdasController = {};

//retrieve name of all user's lambda functions
listLambdasController.getLambdas = async (req, res, next) => {
  //create new instance of LambdaClient with user's region and credentials
  const lambdaClient = new LambdaClient({
    region: req.query.region,
    credentials: res.locals.credentials,
  });

  //retrieve names of lambda functions (max 10)
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
