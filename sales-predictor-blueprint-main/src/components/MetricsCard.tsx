
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricsCardProps {
  title: string;
  metrics: {
    label: string;
    value: string | number;
    description?: string;
  }[];
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, metrics }) => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="font-medium text-lg text-brand-blue">
                  {typeof metric.value === 'number' && !isNaN(metric.value)
                    ? metric.value.toFixed(3)
                    : metric.value}
                </span>
              </div>
              {metric.description && (
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
