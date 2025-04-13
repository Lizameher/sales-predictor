
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ScatterPlot from '@/components/ScatterPlot';
import MetricsCard from '@/components/MetricsCard';
import PredictionForm from '@/components/PredictionForm';
import ModelInterpretation from '@/components/ModelInterpretation';
import LinearRegressionInfo from '@/components/LinearRegressionInfo';
import { 
  generateData, 
  calculateRegression, 
  splitData, 
  evaluateModel 
} from '@/utils/regressionUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  // Generate sample data and calculate regression
  const [data, setData] = useState(generateData());
  const [model, setModel] = useState(() => calculateRegression(data));
  const [splitDatasets, setSplitDatasets] = useState(() => splitData(data));
  const [testMetrics, setTestMetrics] = useState(() => 
    evaluateModel(splitDatasets.testingData, model.predictSales)
  );

  // Generate new data and recalculate when component mounts
  useEffect(() => {
    const newData = generateData();
    const newModel = calculateRegression(newData);
    const newSplitDatasets = splitData(newData);
    const newTestMetrics = evaluateModel(
      newSplitDatasets.testingData, 
      newModel.predictSales
    );
    
    setData(newData);
    setModel(newModel);
    setSplitDatasets(newSplitDatasets);
    setTestMetrics(newTestMetrics);
  }, []);

  // Min and max advertising values for the prediction form
  const minAdvertising = Math.floor(Math.min(...data.map(d => d.advertising)));
  const maxAdvertising = Math.ceil(Math.max(...data.map(d => d.advertising)));

  // Format training metrics for display
  const trainingMetrics = [
    {
      label: 'Intercept (β₀)',
      value: model.intercept,
      description: 'Base sales with no advertising'
    },
    {
      label: 'Slope (β₁)',
      value: model.slope,
      description: 'Sales increase per $1000 spent on advertising'
    },
    {
      label: 'R² (Coefficient of Determination)',
      value: model.rSquared,
      description: 'Proportion of sales variance explained by advertising'
    },
    {
      label: 'Mean Absolute Error (MAE)',
      value: model.mae,
      description: 'Average absolute prediction error'
    },
    {
      label: 'Root Mean Squared Error (RMSE)',
      value: model.rmse,
      description: 'Square root of average squared prediction error'
    }
  ];

  // Format testing metrics for display
  const testingMetrics = [
    {
      label: 'R² on Test Data',
      value: testMetrics.rSquared,
      description: 'Model performance on unseen data'
    },
    {
      label: 'MAE on Test Data',
      value: testMetrics.mae,
      description: 'Prediction error on unseen data'
    },
    {
      label: 'RMSE on Test Data',
      value: testMetrics.rmse,
      description: 'Root mean squared error on unseen data'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6 space-y-8">
        {/* Data Visualization Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-brand-blue">
            Advertising vs. Sales Relationship
          </h2>
          <ScatterPlot 
            data={data} 
            slope={model.slope} 
            intercept={model.intercept} 
          />
        </div>
        
        {/* Model Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="training">Training Metrics</TabsTrigger>
                <TabsTrigger value="testing">Testing Metrics</TabsTrigger>
              </TabsList>
              <TabsContent value="training" className="pt-4">
                <MetricsCard 
                  title="Training Dataset Metrics" 
                  metrics={trainingMetrics} 
                />
              </TabsContent>
              <TabsContent value="testing" className="pt-4">
                <MetricsCard 
                  title="Testing Dataset Metrics" 
                  metrics={testingMetrics} 
                />
              </TabsContent>
            </Tabs>
            
            <PredictionForm 
              predictSales={model.predictSales}
              minAdvertising={minAdvertising}
              maxAdvertising={maxAdvertising}
            />
          </div>
          
          <div className="space-y-6">
            <ModelInterpretation 
              slope={model.slope}
              intercept={model.intercept}
              rSquared={model.rSquared}
            />
            
            <LinearRegressionInfo />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
