import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

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

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 30px;
  span {
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return (
    <h1>
      {isLoading ? (
        "Lodaing price..."
      ) : (
        <OverviewItem>
          <span>[개장시간]</span>
          <span>{data?.map((price) => price.time_open)}</span>
          <span>[폐장시간]</span>
          <span>{data?.map((price) => price.time_close)}</span>
          <span>[시가]</span>
          <span>$ {data?.map((price) => price.open.toFixed(3))}</span>
          <span>[고가]</span>
          <span>$ {data?.map((price) => price.high.toFixed(3))}</span>
          <span>[저가]</span>
          <span>$ {data?.map((price) => price.low.toFixed(3))}</span>
          <span>[종가]</span>
          <span>$ {data?.map((price) => price.close.toFixed(3))}</span>
        </OverviewItem>
      )}
    </h1>
  );
}

export default Price;
