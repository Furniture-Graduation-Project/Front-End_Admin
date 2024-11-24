import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'
import { ProductItem } from '@/interface/productItem'
import { ProductItemService } from '@/services/productItem'
import { useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

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
  const { register, handleSubmit, reset } = useForm<ProductItem>({
    defaultValues: {
      productId: productId || '',
      variants: [],
      stock: 0,
      outStock: 0,
      price: 0,
      image: '',
      SKU: ''
    }
  })

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const handleVariantChange = useCallback((variant: string) => {
    setSelectedVariants((prev) => (prev.includes(variant) ? prev.filter((v) => v !== variant) : [...prev, variant]))
  }, [])

  const handleAddProductItemSubmit = async (data: ProductItem) => {
    if (!productId) {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID sản phẩm.',
        variant: 'destructive'
      })
      return
    }
    try {
      const productData = {
        ...data,
        productId: productId as string,
        outStock: data.outStock ?? 0
      }
      await ProductItemService.create({ ...productData })
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='dark:bg-gray-700 dark:text-gray-100'>
              Thêm biến thể mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm biến thể mới</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleAddProductItemSubmit)}
              className='space-y-4 mt-6 p-4 bg-[#f5f6fa] rounded-md dark:bg-gray-800'
            >
              <div className='space-y-4'>
                {selectedVariants.includes('Màu sắc') && (
                  <div>
                    <Label className='dark:text-gray-100'>Màu sắc</Label>
                    <Input
                      {...register('variants.0.value')}
                      placeholder='Nhập màu sắc'
                      className='dark:bg-gray-700 dark:text-gray-100'
                    />
                  </div>
                )}
                {selectedVariants.includes('Mùi hương') && (
                  <div>
                    <Label className='dark:text-gray-100'>Mùi hương</Label>
                    <Input
                      {...register('variants.1.value')}
                      placeholder='Nhập mùi hương'
                      className='dark:bg-gray-700 dark:text-gray-100'
                    />
                  </div>
                )}
                {selectedVariants.includes('Kích cỡ') && (
                  <div>
                    <Label className='dark:text-gray-100'>Kích cỡ</Label>
                    <Input
                      {...register('variants.2.value')}
                      placeholder='Nhập kích cỡ'
                      className='dark:bg-gray-700 dark:text-gray-100'
                    />
                  </div>
                )}
              </div>
              <div>
                <Label className='dark:text-gray-100'>Số lượng</Label>
                <Input
                  {...register('stock', { valueAsNumber: true })}
                  placeholder='Số lượng'
                  type='number'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
              <div>
                <Label className='dark:text-gray-100'>Giá</Label>
                <Input
                  {...register('price', { valueAsNumber: true })}
                  placeholder='Giá sản phẩm'
                  type='number'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
              <div>
                <Label className='dark:text-gray-100'>Ảnh biến thể</Label>
                <Input
                  {...register('image')}
                  placeholder='URL ảnh (tùy chọn)'
                  type='text'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
              </div>
              <div>
                <Label className='dark:text-gray-100'>SKU</Label>
                <Input {...register('SKU')} placeholder='Mã SKU' className='dark:bg-gray-700 dark:text-gray-100' />
              </div>
              <DialogFooter>
                <Button type='submit' className='dark:bg-gray-700 dark:text-gray-100'>
                  Thêm biến thể
                </Button>
                <Button variant='outline' className='dark:bg-gray-700 dark:text-gray-100'>
                  Hủy
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AddVariants
