import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PieGraph from './PieGraph';

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const [data, setData] = useState({
    datasets: [
      {
          data: [],
          backgroundColor: []
      }
    ], 
    labels: []  
  });
  const [d3Data, setd3Data] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3300/budget').then((res) => {
      setData({
        datasets: [
          {
              data: res.data.myBudget.map(i => i.budget),
              backgroundColor: [
                  '#0AFAF7',
                  '#73FA0A',
                  '#320AFA',
                  '#FA0A0A',
                  '#FA5E0A',
                  '#DAF7A6',
                  '#FF5733',
                  '#581845'
              ]
          }
        ], 
        labels: res.data.myBudget.map(i => i.title)
      });
      setd3Data(
        res.data.myBudget.map(i => ({label: i.title, value: i.budget}))
      )
    });
  }, [data]);

  return (
    <main className = "center" id = 'main'>
      <div className = "page-area">
        {/* <!-- This is an Semantic HTML change --> */}
        <article className = "text-box">
          <h1 id = "main">Stay on track</h1>
          <p>
              Do you know where you are spending your money? If you really stop to track it down,
              you would get surprised! Proper budget management depends on real data... and this
              app will help you with that!
          </p>
        </article>

        {/* <!-- This is an Semantic HTML change --> */}
        <article className = "text-box">
          <h1>Alerts</h1>
          <p>
              What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        {/* <!-- This is an Semantic HTML change --> */}
        <article className = "text-box">
          <h1>Results</h1>
          <p>
              People who stick to a financial plan, budgeting every expense, get out of debt faster!
              Also, they to live happier lives... since they expend without guilt or fear... 
              because they know it is all good and accounted for.
          </p>
        </article>

        {/* <!-- This is an Semantic HTML change --> */}
        <article className = "text-box">
          <h1>Free</h1>
          <p>
              This app is free!!! And you are the only one holding your data!
          </p>
        </article>

        <article className = "text-box">
          <h1>Chart.js</h1>
          {data.datasets[0].data.length === 0 ? <p>loading chart data....</p> : <Pie data={data}/>}
        </article>

        <article className = "text-box">
          <h1>D3.js</h1>
          <PieGraph
            data={d3Data}
            width={200}
            height={200}
            innerRadius={0}
            outerRadius={100}
          />
        </article>
      </div>
    </main>
  );
}

export default HomePage;
