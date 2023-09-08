import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Slider, Stack, Flex, Space, Text } from '@mantine/core';




const Losses = ({ losses }) => {
  const [smoothingFactor, setSmoothingFactor] = useState(0.5); // Initial smoothing factor

  const smoothedLosses = losses.map((loss) => {
    let smoothed = [loss[0]]; // Initialize with the first value

    for (let i = 1; i < loss.length; i++) {
      smoothed[i] = smoothingFactor * loss[i] + (1 - smoothingFactor) * smoothed[i - 1];
    }

    return smoothed;
  });
  const steps = Array.from({ length: 5000 }, (_, index) => index + 1);
  const lineColors = [
    '#91A7FF', '#C0EB75', '#FF6B6B', '#9775FA', '#FFA94D'
  ];
  const data = smoothedLosses.map((loss, index) => ({
    x: steps, // Steps
    y: loss, // Smoothed loss values for the model
    mode: 'lines',
    name: `Model ${index + 1}`,
    line: { color: lineColors[index] }
  }));

  const layout = {
    title: 'Exponential Smoothing of Loss Values with Smoothing Factor',
    xaxis: { title: 'Steps' },
    yaxis: { title: 'Smoothed Loss' },
  };

  const handleSmoothingFactorChange = (value) => {
    setSmoothingFactor(value);
  };

  return (
    <Stack>
      <Flex justify={'center'} >
        <Plot data={data} layout={layout} />
      </Flex>
      <Flex justify={'center'} align={'center'} direction={'column'}>


        <Slider
          w={200}
          color="cyan"
          min={0}
          max={1}
          step={0.01}
          value={smoothingFactor}
          onChange={handleSmoothingFactorChange}
          labelAlwaysOn
          marks={[
            { value: 0, label: '0' },
            { value: 0.5, label: '0.5' },
            { value: 80, label: '1' },
          ]}
        />
        <Space h="md" />
        <Text>Smoothing Factor: {smoothingFactor.toFixed(2)}</Text>

      </Flex>
    </Stack>
  );
};

export default Losses;
