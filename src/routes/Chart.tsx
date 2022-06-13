import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: [
                {
                  x: data?.map((price) => price.time_close),
                  y: [
                    data?.map((price) => price.open.toFixed(3)),
                    data?.map((price) => price.high.toFixed(3)),
                    data?.map((price) => price.low.toFixed(3)),
                    data?.map((price) => price.close.toFixed(3)),
                  ],
                },
              ],
            },
          ]}
          options={{
            colors: ["#fbc531"],
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            title: {
              text: "Price Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
              labels: {
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            grid: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
