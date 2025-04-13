
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelInterpretationProps {
  slope: number;
  intercept: number;
  rSquared: number;
}

const ModelInterpretation: React.FC<ModelInterpretationProps> = ({
  slope,
  intercept,
  rSquared
}) => {
  return (
    <Card className="w-full h-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Model Interpretation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Regression Equation</h3>
            <div className="p-3 bg-brand-gray rounded-md">
              <p className="font-mono text-lg">
                Sales = {intercept.toFixed(2)} + {slope.toFixed(2)} × Advertising
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">What This Means</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Intercept ({intercept.toFixed(2)}):</span> 
                <span className="ml-1 text-muted-foreground">
                  Estimated sales ($000s) when no money is spent on advertising.
                </span>
              </li>
              <li>
                <span className="font-medium">Slope ({slope.toFixed(2)}):</span>
                <span className="ml-1 text-muted-foreground">
                  For every $1,000 increase in advertising, sales are expected to increase by ${slope.toFixed(2)}k.
                </span>
              </li>
              <li>
                <span className="font-medium">R² ({(rSquared * 100).toFixed(1)}%):</span>
                <span className="ml-1 text-muted-foreground">
                  {(rSquared * 100).toFixed(1)}% of the variation in sales can be explained by advertising expenditure.
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Business Insight</h3>
            <p className="text-sm text-muted-foreground">
              {slope > 0 
                ? `The positive coefficient (${slope.toFixed(2)}) indicates that increasing advertising budget positively impacts sales. For this dietary product, investing in advertising appears to be effective.`
                : `The model shows no positive relationship between advertising and sales for this product. Consider re-evaluating your marketing approach.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelInterpretation;
