import React from "react";
import styled from "styled-components";
import { formatPrice, formatPercent } from "../utils";
import Chart from "./Chart";

const getPercentChange = (from, to) => {
  const delta = to - from;
  return delta / from;
};

const StyledCard = styled.div.attrs(({ className }) => ({
  className,
}))`
  background-image: ${(props) =>
    `linear-gradient(to top, ${
      props.isPositive ? "rgba(6, 78, 59, .15)" : "rgba(153, 27, 27, .15)"
    }, rgba(0,0,0,0))`};

  :hover {
    background-image: ${(props) =>
      `linear-gradient(to top, ${
        props.isPositive ? "rgba(6, 78, 59, .30)" : "rgba(153, 27, 27, .30)"
      }, rgba(0,0,0,0))`};
  }
`;

const Product = ({
  product,
  productPrice,
  productStats,
  currency,
  productCandles,
}) => {
  const percent = getPercentChange(productStats.open, productStats.last);
  const isPositive = percent >= 0;
  const dailyStats = {
    ...productStats,
    percent,
    isPositive,
  };

  const borderColor = isPositive
    ? "border-green-300 dark:border-green-900 hover:border-green-500 dark:hover:border-green-700"
    : "border-red-300 dark:border-red-900 hover:border-red-500 dark:hover:border-red-700";

  return (
    <StyledCard
      isPositive={isPositive}
      className={`p-4 border rounded ${borderColor}`}
    >
      <ProductName currency={currency} product={product} />
      <ProductPrice
        product={product}
        price={productPrice?.price}
        dailyStats={dailyStats}
      />
      <SecondaryStats product={product} dailyStats={dailyStats} />
      <div className="h-24">
        <Chart
          candles={productCandles || []}
          color={isPositive ? "rgba(16, 185, 129)" : "rgb(239, 68, 68)"}
        />
      </div>
    </StyledCard>
  );
};

const ProductName = ({ currency, product }) => {
  return (
    <div className="flex text-white-700 dark:text-white-400">
      <div className="cryptobar">
      <span><img src={"https://icons.bitbot.tools/api/" + product.base_currency.toString().toLowerCase() + "/32x32"}></img></span>
      </div>
      <span className="flex text-xl">{currency.name}</span>{" "}
      <span className="text-xs">{product.display_name}</span>
    </div>
  );
};

const ProductPrice = ({ product, price, dailyStats }) => {
  const { isPositive, percent } = dailyStats;
  const color = isPositive ? "text-green-500" : "text-red-500";
  return (
    <>
      <span className="text-3xl font-semibold" id={`${product.id}Price`}>
        {price}
      </span>
      <span className={`ml-2 whitespace-nowrap ${color}`}>
        {formatPercent(percent)}
      </span>
    </>
  );
};

const SecondaryStats = ({ product, dailyStats }) => {
  const { minimumQuoteDigits } = product;
  const { low, high, volume } = dailyStats;
  return (
    <div className="mb-4 text-xs">
      <div>
        <span>l: {formatPrice(low, minimumQuoteDigits)}</span>
        <span className="ml-4">h: {formatPrice(high, minimumQuoteDigits)}</span>
      </div>
      <div>v: {formatPrice(Math.round(volume))}</div>
    </div>
  );
};

export default React.memo(Product);
