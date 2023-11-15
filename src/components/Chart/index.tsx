import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, StyleSheet} from 'react-native';

interface IChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
}

function Chart({data}: IChartProps) {
  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width - 32}
      height={250}
      formatYLabel={value => `${value.slice(0, -3)}`}
      chartConfig={{
        backgroundColor: '#552586',
        backgroundGradientFrom: '#6A369C',
        backgroundGradientTo: '#B589D6',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 8,
        },
        propsForDots: {
          r: '3',
          strokeWidth: '2',
          stroke: '#c3ff00',
        },
      }}
      bezier
      style={style.chart}
    />
  );
}

export default Chart;

const style = StyleSheet.create({
  chart: {marginVertical: 8, borderRadius: 16},
});
