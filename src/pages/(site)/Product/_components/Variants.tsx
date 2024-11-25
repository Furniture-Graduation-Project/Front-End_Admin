import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'
import { ProductItem } from '@/interface/productItem'
import { ProductItemService } from '@/services/productItem'
import { useParams } from 'react-router-dom'

const VariantFormSchema = {
  fixedVariants: ['Màu sắc', 'Mùi hương', 'Kích cỡ']
}

const VariantCheckbox = ({
  variant,
  isChecked,
  onChange
}: {
  variant: string
  isChecked: boolean
  onChange: (variant: string) => void
}) => (
  <div key={variant} className='flex items-center space-x-2'>
    <input type='checkbox' checked={isChecked} onChange={() => onChange(variant)} id={variant} />
    <Label htmlFor={variant}>{variant}</Label>
  </div>
)

const AddVariants = () => {
  const { productId } = useParams<{ productId: string }>()
  const { register, handleSubmit } = useForm<{
    productItems: ProductItem[]
  }>({
    defaultValues: {
      productItems: []
    }
  })

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const [isAddingProductItem, setIsAddingProductItem] = useState(false)

  const handleVariantChange = useCallback((variant: string) => {
    setSelectedVariants((prev) => (prev.includes(variant) ? prev.filter((v) => v !== variant) : [...prev, variant]))
  }, [])

  const handleAddProductItem = () => {
    setIsAddingProductItem(true)
  }

  const handleAddProductItemSubmit = async (data: ProductItem) => {
    try {
      await ProductItemService.create({ ...data, productId })
      setIsAddingProductItem(false)
      toast({
        title: 'Thành công',
        description: 'Biến thể mới đã được thêm.',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi khi thêm biến thể.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='space-y-4 pb-8 bg-[#f5f6fa] dark:bg-gray-900'>
      <Label className='font-bold text-2xl dark:text-gray-100'>Biến thể sản phẩm</Label>
      <div className='flex flex-wrap gap-4'>
        {VariantFormSchema.fixedVariants.map((variant) => (
          <VariantCheckbox
            key={variant}
            variant={variant}
            isChecked={selectedVariants.includes(variant)}
            onChange={handleVariantChange}
          />
        ))}
        <Button variant='outline' onClick={handleAddProductItem} className='dark:bg-gray-700 dark:text-gray-100'>
          Thêm biến thể mới
        </Button>
      </div>

      {isAddingProductItem && (
        <form
          onSubmit={handleSubmit((data) => handleAddProductItemSubmit(data as unknown as ProductItem))}
          className='space-y-4 mt-6 p-4 bg-[#f5f6fa] rounded-md dark:bg-gray-800'
        >
          <Label className='dark:text-gray-100'>Biến thể mới</Label>
          <div className='space-y-4'>
            {selectedVariants.includes('Màu sắc') && (
              <div>
                <Label className='dark:text-gray-100'>Màu sắc</Label>
                <Input
                  {...register('color' as const)}
                  placeholder='Nhập màu sắc'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
            )}
            {selectedVariants.includes('Mùi hương') && (
              <div>
                <Label className='dark:text-gray-100'>Mùi hương</Label>
                <Input
                  {...register('scent' as const)}
                  placeholder='Nhập mùi hương'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
            )}
            {selectedVariants.includes('Kích cỡ') && (
              <div>
                <Label className='dark:text-gray-100'>Kích cỡ</Label>
                <Input
                  {...register('size' as const)}
                  placeholder='Nhập kích cỡ'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
            )}
          </div>
          <div>
            <Label className='dark:text-gray-100'>Số lượng</Label>
            <Input
              {...register('stock' as const)}
              placeholder='Số lượng'
              type='number'
              className='dark:bg-gray-700 dark:text-gray-100'
            />
          </div>
          <div>
            <Label className='dark:text-gray-100'>Giá</Label>
            <Input
              {...register('price' as const)}
              placeholder='Giá sản phẩm'
              type='number'
              className='dark:bg-gray-700 dark:text-gray-100'
            />
          </div>
          <div>
            <Label className='dark:text-gray-100'>Ảnh biến thể</Label>
            <Input
              {...register('image' as const)}
              placeholder='URL ảnh (tùy chọn)'
              type='text'
              className='dark:bg-gray-700 dark:text-gray-100'
            />
          </div>

          <div className='flex space-x-4 justify-end'>
            <Button type='submit' className='dark:bg-gray-700 dark:text-gray-100'>
              Thêm biến thể
            </Button>
            <Button
              variant='outline'
              onClick={() => setIsAddingProductItem(false)}
              className='border text-black dark:text-gray-100'
            >
              Hủy
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddVariants
