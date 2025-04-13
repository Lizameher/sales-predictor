
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LinearRegressionInfo = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Understanding Linear Regression</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium mb-1">What is Simple Linear Regression?</h3>
            <p className="text-muted-foreground">
              Simple Linear Regression is a statistical method that models the relationship between two variables by fitting a linear equation to the observed data. 
              One variable is considered an explanatory variable (Advertising), and the other is considered the dependent variable (Sales).
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">The Linear Equation</h3>
            <p className="text-muted-foreground mb-2">
              The equation for Simple Linear Regression is:
            </p>
            <div className="p-3 bg-brand-gray rounded-md font-mono">
              Y = β₀ + β₁X + ε
            </div>
            <ul className="mt-2 space-y-1 pl-5 list-disc text-muted-foreground">
              <li>Y is the dependent variable (Sales)</li>
              <li>X is the independent variable (Advertising)</li>
              <li>β₀ is the y-intercept (baseline sales)</li>
              <li>β₁ is the slope (effect of advertising)</li>
              <li>ε represents the error term</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Key Assumptions</h3>
            <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
              <li>Linearity: The relationship between X and Y is linear</li>
              <li>Independence: Observations are independent of each other</li>
              <li>Homoscedasticity: Constant variance in errors</li>
              <li>Normality: Errors are normally distributed</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinearRegressionInfo;
