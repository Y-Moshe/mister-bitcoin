import {
  ComposedChart, XAxis, YAxis,
  Tooltip, Area, Line, LineChart,
  Bar
} from 'recharts'

const CustomTooltip = ({ active, payload: data }) => {
  if (active && data.length > 0) {
    const { payload, color } = data[0]
    return (
      <div className='custom-chart-tooltip'>
        <p>Month: {payload.month}</p>
        <p style={{ color }}>USD: ${payload.USD}</p>
      </div>
    )
  }

  return null
}

export default function Chart({ title, description, data, color, type }) {
  let chartToRender = null
  // #8884d8
  switch (type) {
    case 'transactions':
      chartToRender = (
        <LineChart width={730} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis dataKey="BIT" />
          <Tooltip formatter={(value, name) => [`${value.toFixed(7)}`, name]} animationEasing='ease-out' />
          <Line type="monotone" dataKey="BIT" stroke={color} />
        </LineChart>
      )
      break;
    case 'marketPrice':
      chartToRender = (
        // <AreaChart
        //   width={730}
        //   height={300}
        //   data={data}>
        //   <defs>
        //     <linearGradient id="colorUsd" x1="0" y1="0" x2="0" y2="1">
        //       <stop offset="5%" stopColor={color} stopOpacity={0.8} />
        //       <stop offset="95%" stopColor={color} stopOpacity={0} />
        //     </linearGradient>
        //     <linearGradient id="colorUd" x1="0" y1="0" x2="0" y2="1">
        //       <stop offset="5%" stopColor={'#8884d8'} stopOpacity={0.8} />
        //       <stop offset="95%" stopColor={'#8884d8'} stopOpacity={0} />
        //     </linearGradient>
        //   </defs>
        //   <XAxis dataKey="month" angle={-45} tickMargin={15} height={50} />
        //   <YAxis />
        //   <Tooltip formatter={(value, name) => [`$${value}`, name]} />
        //   <Area type="monotone" dataKey="USD" stroke={color} fillOpacity={1} fill="url(#colorUsd)" />
        //   <Area type="monotone" stroke={'#8884d8'} fillOpacity={1} fill="url(#colorUd)" />
        // </AreaChart>
        <ComposedChart width={730} height={300} data={data}>
          <XAxis dataKey="month" angle={-45} tickMargin={15} height={50} />
          <YAxis dataKey="USD" />
          <Tooltip
            content={CustomTooltip}
            animationEasing='linear' />
          <Area type="monotone" dataKey="USD" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="USD" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="USD" stroke="#ff7300" />
        </ComposedChart>
      )
      break;

    default:
      chartToRender = null
      break;
  }

  return (
    <div className='text-center'>
      <h3>{title}</h3>
      <p>{description}</p>
      {chartToRender}
    </div>
  )
}
