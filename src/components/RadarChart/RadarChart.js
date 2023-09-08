import React from 'react';
import Plot from 'react-plotly.js';
import { Container } from '@mantine/core';


const RadarChart = ({ data }) => {
  // Define labels for the metrics
  const metricLabels = ['Metric #1', 'Metric #2', 'Metric #3', 'Metric #4', 'Metric #5'];
// violet teal yellow blue2 pink 2
  const traceColors = ['#4DABF7', '#66A80F', '#AE3EC9', '#FFE066', '#F06595'];


  // Create a trace for each model
  const traces = data.map((modelData, index) => ({
    type: 'scatterpolar',
    r: modelData,
    theta: metricLabels,
    name: `Model ${index + 1}`,
    fill: 'toself',
    line: {
        color: traceColors[index], // Set custom line color for each metric
      },
  }));

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1], // Customize the range based on your data
      },
    },
    showlegend: true,
    legend: {
      x: 0,
      y: 1,
    },
  };

  return (
    <Container>
    <Plot
      data={traces}
      layout={layout}
    />
    </Container>
  );
};

export default RadarChart;
