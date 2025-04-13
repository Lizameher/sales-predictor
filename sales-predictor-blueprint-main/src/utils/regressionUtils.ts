
// Function to generate synthetic advertising and sales data
export const generateData = (count = 75) => {
  // Generate advertising values (independent variable)
  const advertising = Array.from({ length: count }, () => 
    Math.round(Math.random() * 40 + 10) // Values between 10 and 50
  );
  
  // Generate sales data with a linear relationship + some noise
  // Equation: sales = 5 + 3 * advertising + random_noise
  const sales = advertising.map(ad => 
    Math.round(5 + 3 * ad + (Math.random() * 20 - 10))
  );
  
  // Create paired data points
  return advertising.map((ad, index) => ({
    advertising: ad,
    sales: sales[index]
  }));
};

// Function to calculate statistics for linear regression
export const calculateRegression = (data: { advertising: number; sales: number }[]) => {
  // Extract x and y values
  const x = data.map(d => d.advertising);
  const y = data.map(d => d.sales);
  
  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / x.length;
  const meanY = y.reduce((sum, val) => sum + val, 0) / y.length;
  
  // Calculate the numerator and denominator for the slope
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < x.length; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }
  
  // Calculate slope (β₁)
  const slope = numerator / denominator;
  
  // Calculate intercept (β₀)
  const intercept = meanY - slope * meanX;
  
  // Calculate predicted values
  const predicted = x.map(xi => intercept + slope * xi);
  
  // Calculate R-squared
  const totalSumOfSquares = y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0);
  const residualSumOfSquares = y.reduce((sum, yi, i) => sum + Math.pow(yi - predicted[i], 2), 0);
  const rSquared = 1 - (residualSumOfSquares / totalSumOfSquares);
  
  // Calculate error metrics
  const errors = y.map((yi, i) => yi - predicted[i]);
  const mae = errors.reduce((sum, e) => sum + Math.abs(e), 0) / errors.length;
  const mse = errors.reduce((sum, e) => sum + Math.pow(e, 2), 0) / errors.length;
  const rmse = Math.sqrt(mse);
  
  return {
    slope,
    intercept,
    rSquared,
    mae,
    mse,
    rmse,
    predictSales: (advertising: number) => intercept + slope * advertising
  };
};

// Split data into training and testing sets
export const splitData = (data: { advertising: number; sales: number }[], trainRatio = 0.8) => {
  // Make a copy and shuffle
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  
  // Split based on ratio
  const trainSize = Math.floor(data.length * trainRatio);
  const trainingData = shuffled.slice(0, trainSize);
  const testingData = shuffled.slice(trainSize);
  
  return { trainingData, testingData };
};

// Calculate prediction metrics on test data
export const evaluateModel = (
  testData: { advertising: number; sales: number }[],
  predictFn: (advertising: number) => number
) => {
  const actual = testData.map(d => d.sales);
  const predicted = testData.map(d => predictFn(d.advertising));
  
  // Calculate errors
  const errors = actual.map((yi, i) => yi - predicted[i]);
  
  // Calculate error metrics
  const mae = errors.reduce((sum, e) => sum + Math.abs(e), 0) / errors.length;
  const mse = errors.reduce((sum, e) => sum + Math.pow(e, 2), 0) / errors.length;
  const rmse = Math.sqrt(mse);
  
  // Calculate R-squared for test data
  const meanY = actual.reduce((sum, val) => sum + val, 0) / actual.length;
  const totalSumOfSquares = actual.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0);
  const residualSumOfSquares = errors.reduce((sum, e) => sum + Math.pow(e, 2), 0);
  const rSquared = 1 - (residualSumOfSquares / totalSumOfSquares);
  
  return {
    mae,
    mse,
    rmse,
    rSquared
  };
};
