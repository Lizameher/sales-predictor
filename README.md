# sales-predictor


# Sales Predictor - Linear Regression Model

A React application that demonstrates linear regression for predicting sales based on advertising spend. This project showcases the application of statistical modeling in a business context with an interactive UI.

## Overview

This application allows users to:
- Visualize the relationship between advertising spend and sales with a scatter plot
- See the linear regression model fit with a trend line
- View model metrics (R², MAE, RMSE) for both training and testing datasets
- Make sales predictions based on custom advertising spend values
- Understand the interpretation of regression coefficients
Screenshot : ![Screenshot 2025-04-13 205721](https://github.com/user-attachments/assets/cfb7bdb8-4d22-4813-80e1-3f3ce7fa8868)
![Screenshot 2025-04-13 205944](https://github.com/user-attachments/assets/27b663bf-c75f-48e5-8dfd-c751ee3162c5)
![Screenshot 2025-04-13 210029](https://github.com/user-attachments/assets/7888ae19-97f7-4748-8356-2e2bfa7cd8e3)

## Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Recharts** - Charting library for data visualization
- **Vite** - Fast build tool and development server

## Features

### Data Visualization
- Interactive scatter plot showing the relationship between advertising spend and sales
- Regression line overlay showing the model's predictions

### Statistical Analysis
- Linear regression model built from synthetic data
- Automatic train/test split to evaluate model performance
- Key performance metrics calculation:
  - R-squared (coefficient of determination)
  - Mean Absolute Error (MAE)
  - Root Mean Squared Error (RMSE)

### Interactive Prediction
- Slider and input field for selecting advertising spend values
- Instant sales predictions based on the linear regression model
- Visual feedback on prediction results

### Educational Components
- Model interpretation panel explaining the meaning of coefficients
- Information section on linear regression fundamentals

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/sales-predictor.git
cd sales-predictor
```

2. Install dependencies
```sh
npm install
# or
yarn
```

3. Start the development server
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/              # UI components from shadcn/ui
│   ├── Header.tsx       # Application header
│   ├── MetricsCard.tsx  # Display for model metrics
│   ├── PredictionForm.tsx # User input form for predictions
│   └── ScatterPlot.tsx  # Data visualization component
├── pages/               # Page components
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 page
├── utils/               # Utility functions
│   └── regressionUtils.ts # Linear regression calculations
└── main.tsx             # Application entry point
```

## Future Enhancements

- Add ability to upload custom datasets
- Implement multiple regression with additional features
- Add more advanced statistical models
- Support for exporting predictions and visualizations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was inspired by the need to demonstrate linear regression concepts in an interactive way
- Special thanks to the open-source libraries that made this project possible
