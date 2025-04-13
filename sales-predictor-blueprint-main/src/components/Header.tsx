
import React from 'react';

const Header = () => {
  return (
    <header className="py-6">
      <div className="container">
        <h1 className="text-3xl font-bold text-brand-blue">Sales Predictor</h1>
        <p className="text-muted-foreground mt-1">
          Linear regression model for predicting dietary product sales based on advertising spend
        </p>
      </div>
    </header>
  );
};

export default Header;
