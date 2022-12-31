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
          <XAxis dataKey="month" stroke={color} />
          <YAxis dataKey="BIT" stroke={color} />
          <Line type="monotone" dataKey="BIT" stroke='#D1980B' color='#FBD065' />
          <Tooltip
            contentStyle={{ color: 'black' }}
            formatter={(value, name) => [`${value.toFixed(7)}`, name]}
            animationEasing='ease-out'
          />
        </LineChart>
      )
      break;
    case 'marketPrice':
      chartToRender = (
        <ComposedChart
          width={size.width}
          height={size.height}
          data={data}>
          <XAxis dataKey="month" angle={-45} tickMargin={15} height={50} stroke={color} />
          <YAxis dataKey="USD" stroke={color} />
          <Tooltip content={CustomTooltip} animationEasing='linear' />
          <Area type="monotone" dataKey="USD" fill="#7AE1D8" />
          <Bar dataKey="USD" barSize={20} fill="#004D46" />
          <Line type="monotone" dataKey="USD" stroke="#147EB3" />
        </ComposedChart>
      )
      break;
    case 'transfers':
      chartToRender = (
        <LineChart
          width={size.width}
          height={size.height}
          data={data}>
          <XAxis dataKey="month" stroke={color} />
          <YAxis dataKey="coins" stroke={color} />
          <Tooltip
            contentStyle={{ color: 'black' }}
            labelFormatter={(_, data) => data[0]?.payload?.contactName || ''}
            formatter={(value, name) => [`${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            animationEasing='ease-out'
          />
          <Line type="monotone" dataKey="coins" stroke='#8E292C' color='#FA999C' />
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
