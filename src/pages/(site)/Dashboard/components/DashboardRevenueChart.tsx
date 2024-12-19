import { useEffect, useState } from 'react'
import { StatisticalService } from '@/services/statistical'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const RevenueChart = () => {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartConfig, setChartConfig] = useState<any>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StatisticalService.getAll()
        const data = response.data.data || []

        const config: any = {}
        const allCategories: Set<string> = new Set()

        if (data.length > 0) {
          data.forEach((entry) => {
            Object.keys(entry).forEach((key) => {
              if (key !== 'month') {
                allCategories.add(key)
              }
            })
          })

          let colorIndex = 1 
          allCategories.forEach((category) => {
            config[category] = {
              label: category,
              color: `hsl(var(--chart-${colorIndex}))`
            }
            colorIndex += 1
          })
        }
        for (let i = 1; i < data.length; i++) {
          const previousKeys = Object.keys(data[i - 1])
          const currentKeys = Object.keys(data[i])

          previousKeys.forEach((key) => {
            if (!currentKeys.includes(key)) {
              data[i][key] = 0 
            }
          })
        }
        const allKeys = data.reduce((keys, item) => {
          Object.keys(item).forEach((key) => {
            if (!keys.includes(key)) {
              keys.push(key)
            }
          })
          return keys
        }, [] as string[])
        const updatedData = data.map((item) => {
          const updatedItem = { ...item }
          allKeys.forEach((key) => {
            if (!updatedItem.hasOwnProperty(key)) {
              updatedItem[key] = 0
            }
          })
          return updatedItem
        })
        setChartData(updatedData)
        setChartConfig(config)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className='dark:bg-'>
      <CardHeader>
        <CardTitle className='text-black'>Biểu đồ diện tích thống kê danh mục </CardTitle>
        <CardDescription>Hiển thị tổng số lượt truy cập trong 6 tháng qua</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 200)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type='natural'
                fill={chartConfig[key].color}
                fillOpacity={0.4}
                stroke={chartConfig[key].color}
                stackId='a'
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm '>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none '></div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Tháng 7 - Tháng 12 Năm 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default RevenueChart
