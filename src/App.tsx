import React from "react";
import dayjs from "dayjs";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  ChartCanvas,
  Chart,
  LineSeries,
  discontinuousTimeScaleProvider,
  last,
  XAxis,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate,
  HoverTooltip,
  CrossHairCursor,
  YAxis,
} from "react-financial-charts";
import { mouseEdgeAppearance, toFixedNumber } from "./utils";
import initialData from "./mock.json";

export interface IChartData {
  // 日期（秒）
  date?: number;
  accumulate_unit_net_value?: number | string;
  a1000_index?: number;
  a1000_original_index?: number;
}

const App: React.FC = () => {
  const width = 1200,
    height = 600;

  const getTooltipContent = ({
    currentItem: d,
  }: {
    currentItem: IChartData;
  }) => {
    return {
      x: d.date ? dayjs(d.date * 1000).format("YYYY-MM-DD") : "",
      y: [
        {
          label: "xxxx公司1000指数增强公募证券投资基金",
          value: d.accumulate_unit_net_value?.toString(),
          stroke: "#ED561B",
        },
        {
          label: "1000指数",
          value: `${toFixedNumber(d.a1000_index, 4)}（${toFixedNumber(
            d.a1000_original_index,
            4
          )}）`,
          // value: d.a1000_original_index?.toString(),
          stroke: "#50B432",
        },
      ],
    };
  };

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => new Date(d.date * 1000)
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(initialData);

  const xExtents = [xAccessor(data[0]), xAccessor(last(data))];
  const margin = {
    left: 65,
    right: 90,
    top: 20,
    bottom: 40,
  };

  return (
    <ChartCanvas
      height={height - 30}
      width={width}
      ratio={2}
      margin={margin}
      padding={10}
      seriesName="xxxx公司1000指数增强公募证券投资基金"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart
        id="1"
        yExtents={(d) => [d.accumulate_unit_net_value, d.a1000_index]}
      >
        <XAxis
          axisAt="bottom"
          orient="bottom"
          tickFormat={(index: number) => {
            return data[index]?.date
              ? timeFormat("%Y-%m-%d")(new Date(data[index].date * 1000))
              : "";
          }}
          tickStrokeStyle="#ccc"
          tickLabelFill="#595d61"
          strokeStyle="#ccc"
        />
        <YAxis
          axisAt="left"
          orient="left"
          tickFormat={format(".4f")}
          ticks={6}
          tickStrokeStyle="#ccc"
          tickLabelFill="#595d61"
          strokeStyle="#ccc"
        />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
          {...mouseEdgeAppearance}
        />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4f")}
          {...mouseEdgeAppearance}
        />
        <LineSeries
          connectNulls
          yAccessor={(d) => d.accumulate_unit_net_value}
          strokeStyle="#ED561B"
        />
        <CurrentCoordinate
          r={4}
          yAccessor={(d) => d.accumulate_unit_net_value}
          fillStyle="#ED561B"
        />

        <LineSeries
          connectNulls
          yAccessor={(d) => d.a1000_index}
          strokeStyle="#50B432"
        />
        <CurrentCoordinate
          r={4}
          yAccessor={(d) => d.a1000_index}
          fillStyle="#50B432"
        />
        <HoverTooltip
          background={{
            fillStyle: "transparent",
          }}
          toolTipFillStyle="#000"
          toolTipStrokeStyle="#151a1e"
          fontFill="#ccc"
          tooltip={{ content: getTooltipContent }}
          yAccessor={(data) => 100000}
        />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default App;
