import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

export default function ConfirmedTransactionsChart({ data }) {
  return (
    <LineChart width={730} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis dataKey="USD" />
      <Tooltip formatter={(value, name) => [`$${value}`, name]} />
      <Legend />
      <Line type="monotone" dataKey="USD" stroke="#8884d8" />
    </LineChart>
  )
}
