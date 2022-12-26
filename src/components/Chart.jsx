import {
  AreaChart, XAxis, YAxis,
  Tooltip, Area, Legend,
  Line, LineChart
} from 'recharts'

export default function Chart({ title, description, data, color, type }) {
  if (type === 'transactions') {
    return (
      <LineChart width={730} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis dataKey="BIT" />
        <Tooltip formatter={(value, name) => [`${value.toFixed(7)}`, name]} />
        <Legend />
        <Line type="monotone" dataKey="BIT" stroke="#8884d8" />
      </LineChart>
    )
  }

  return (
    <AreaChart
      width={730}
      height={300}
      data={data}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" angle={-45} tickMargin={15} height={50} />
      <YAxis dataKey="USD" />
      <Tooltip formatter={(value, name) => [`$${value}`, name]} />
      <Area type="monotone" dataKey="USD" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  )
}
