import { useEffect, useState } from 'react'
import { StatisticalService } from '@/services/statistical'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tooltip } from '@radix-ui/react-tooltip'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardPieChart = () => {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StatisticalService.getBieChart()
        const data = response.data.data || []
        const dataRes = normalizeData(data)
        console.log(dataRes)
        setChartData(dataRes)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err)
      }
    }

    fetchData()
  }, [])

  const normalizeData = (data: any[]): any[] => {
    const allProducts: Set<string> = new Set()

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'month') {
          // Loại bỏ trường "month"
          allProducts.add(key)
        }
      })
    })

    return data.map((item) => {
      const month = item.month
      const normalizedItem: any = { month }

      allProducts.forEach((product) => {
        normalizedItem[product] = item[product] || '' // Nếu không có sản phẩm trong tháng, gán giá trị là 0
      })

      return normalizedItem
    })
  }

  return (
    <Card className='dark:bg-'>
      <CardHeader>
        <CardTitle className='text-black'>Biểu đồ cột thống kê danh mục</CardTitle>
        <CardDescription>Hiển thị tổng số lượt truy cập trong 6 tháng qua</CardDescription>
      </CardHeader>
      <CardContent style={{ height: '500px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={600}
            height={300}
            data={chartData} // Dữ liệu từ state
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 40
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              padding={{ left: 20, right: 20 }} // Thêm padding
              tick={{ fontSize: 12 }} // Kích thước font
              angle={-15} // Góc nhãn trục X
              textAnchor='end'
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            {Object.keys(chartData[0] || {})
          .filter((key) => key !== 'month')
          .map((key, index) => (
            <Bar
              dataKey={key}
              fill={`hsl(${index * 50}, 60%, 50%)`}
              minPointSize={1}
            >
                <LabelList dataKey={key} position="top" />
            </Bar>
          ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'></div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>Tháng 7 - Tháng 1 Năm 2025</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default DashboardPieChart
