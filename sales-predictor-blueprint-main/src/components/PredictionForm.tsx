
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

interface PredictionFormProps {
  predictSales: (advertising: number) => number;
  minAdvertising?: number;
  maxAdvertising?: number;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ 
  predictSales, 
  minAdvertising = 0,
  maxAdvertising = 100
}) => {
  const [advertisingValue, setAdvertisingValue] = useState(30);
  const [predictedSales, setPredictedSales] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSliderChange = (value: number[]) => {
    setAdvertisingValue(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= minAdvertising && value <= maxAdvertising) {
      setAdvertisingValue(value);
    }
  };

  const handlePredict = () => {
    const prediction = predictSales(advertisingValue);
    setPredictedSales(prediction);
    
    toast({
      title: "Sales Prediction",
      description: `Predicted sales: $${prediction.toFixed(2)}k for $${advertisingValue}k in advertising`,
    });
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Predict Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="advertisingInput" className="text-sm font-medium">
                Advertising Budget (in $000s)
              </label>
              <span className="text-sm text-muted-foreground">
                ${advertisingValue}k
              </span>
            </div>
            
            <Slider
              value={[advertisingValue]}
              min={minAdvertising}
              max={maxAdvertising}
              step={1}
              onValueChange={handleSliderChange}
              className="my-4"
            />
            
            <div className="flex space-x-3 items-center">
              <Input
                id="advertisingInput"
                type="number"
                value={advertisingValue}
                onChange={handleInputChange}
                min={minAdvertising}
                max={maxAdvertising}
                className="w-full"
              />
              <Button 
                onClick={handlePredict}
                className="bg-brand-teal hover:bg-brand-teal/90"
              >
                Predict
              </Button>
            </div>
          </div>
          
          {predictedSales !== null && (
            <div className="p-4 bg-brand-gray rounded-md border border-gray-200">
              <p className="text-sm text-muted-foreground">Predicted Sales:</p>
              <p className="text-2xl font-bold text-brand-blue">
                ${predictedSales.toFixed(2)}k
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Based on ${advertisingValue}k advertising spend
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
