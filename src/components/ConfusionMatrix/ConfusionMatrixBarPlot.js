import { Container } from '@mantine/core';
import React from 'react';
import Plot from 'react-plotly.js';

const ConfusionMatrixBarPlot = ({ confusionMatrices }) => {
  // Define a custom color scale for different models
  const modelColors = [
    '#B197FC', // Model 1
    '#C0EB75', // Model 2
    '#FCC2D7', // Model 3
    '#96F2D7', // Model 4
    '#3BC9DB', // Model 5
  ];

  // Initialize arrays to store classwise accuracies for each model
  const class1Accuracies = [];
  const class2Accuracies = [];
  const modelLabels = [];

  // Loop through each confusion matrix and calculate classwise accuracies
  confusionMatrices.forEach((matrix, index) => {
    const totalClass1 = matrix[0][0] + matrix[0][1];
    const totalClass2 = matrix[1][0] + matrix[1][1];
    const accuracyClass1 = (matrix[0][0] / totalClass1) * 100;
    const accuracyClass2 = (matrix[1][1] / totalClass2) * 100;

    class1Accuracies.push(accuracyClass1);
    class2Accuracies.push(accuracyClass2);
    modelLabels.push(`Model ${index + 1}`);
  });

  // Define data for the bar plot with different colors for each model
  const data = confusionMatrices.map((_, index) => ({
    x: ['Class #1', 'Class #2'],
    y: [class1Accuracies[index], class2Accuracies[index]],
    type: 'bar',
    name: `Model ${index + 1}`,
    marker: { color: modelColors[index] },
  }));

  // Define layout for the bar plot
  const layout = {
    title: 'Classwise Accuracies for 5 Models',
    xaxis: { title: 'Classes' },
    yaxis: { title: 'Accuracy (%)' },
    barmode: 'group', // This groups the bars for each class
  };

  return (
    <Container>
      <Plot data={data} layout={layout} />
    </Container>
  );
};

export default ConfusionMatrixBarPlot;
