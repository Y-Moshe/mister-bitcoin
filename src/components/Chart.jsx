import { useMediaQuery } from 'react-responsive'
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
  const isWide = useMediaQuery({ minWidth: 768 })
  const size = {
    width: isWide ? 730 : 300,
    height: isWide ? 300 : 200
  }

  let chartToRender = null

  switch (type) {
    case 'transactions':
      chartToRender = (
        <LineChart
          width={size.width}
          height={size.height}
          data={data}>
          <XAxis dataKey="month" />
          <YAxis dataKey="BIT" />
          <Tooltip formatter={(value, name) => [`${value.toFixed(7)}`, name]} animationEasing='ease-out' />
          <Line type="monotone" dataKey="BIT" stroke={color} />
        </LineChart>
      )
      break;
    case 'marketPrice':
      chartToRender = (
        <ComposedChart
          width={size.width}
          height={size.height}
          data={data}>
          <XAxis dataKey="month" angle={-45} tickMargin={15} height={50} />
          <YAxis dataKey="USD" />
          <Tooltip content={CustomTooltip} animationEasing='linear' />
          <Area type="monotone" dataKey="USD" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="USD" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="USD" stroke="#ff7300" />
        </ComposedChart>
      )
      break;
    case 'transfers':
      chartToRender = (
        <LineChart
          width={size.width}
          height={size.height}
          data={data}>
          <XAxis dataKey="month" />
          <YAxis dataKey="coins" />
          <Tooltip
            labelFormatter={(_, data) => data[0]?.payload?.contactName || ''}
            formatter={(value, name) => [`${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            animationEasing='ease-out'
          />
          <Line type="monotone" dataKey="coins" stroke={color} />
        </LineChart>
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
