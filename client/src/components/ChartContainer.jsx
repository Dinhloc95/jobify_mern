import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartContainer;
