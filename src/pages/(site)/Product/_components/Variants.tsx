import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
import { useState, useCallback, FC } from 'react'
import { toast } from '@/hooks/use-toast'
import { ProductItemService } from '@/services/productItem'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ProductItem } from '@/interface/productItem'

const VariantFormSchema = {
  fixedVariants: ['Màu sắc', 'Mùi hương', 'Kích cỡ']
}

interface AddVariantsProps {
  productId: string
}

const AddVariants: FC<AddVariantsProps> = ({ productId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<ProductItem>({
    defaultValues: {
      productId: productId || '',
      variants: [],
      stock: 0,
      price: 0,
      image: '',
      SKU: ''
    }
  })

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleVariantChange = useCallback((variant: string) => {
    setSelectedVariants((prev) => (prev.includes(variant) ? prev.filter((v) => v !== variant) : [...prev, variant]))
  }, [])

  const validateStock = (value: number) => {
    if (value <= 0) {
      return 'Số lượng phải lớn hơn 0'
    }
    return true
  }

  const validatePrice = (value: number) => {
    if (value <= 0) {
      return 'Giá phải lớn hơn 0'
    }
    return true
  }

  const validateSKU = async (value: string) => {
    if (!value || value.trim().length < 1) {
      return 'SKU không được để trống'
    }
    return true
  }

  const handleAddProductItemSubmit = async (data: ProductItem) => {
    if (!productId) {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      return true
    }

    const variantInputs = selectedVariants.map((variant, index) => ({
      variant,
      value: data.variants[index]?.value || ''
    }))

    try {
      const productData = {
        ...data,
        productId: productId as string,
        variants: variantInputs
      }
      await ProductItemService.create({ ...productData })
      toast({
        title: 'Thành công',
        description: 'Biến thể mới đã được thêm.',
        variant: 'success',
        duration: 3000
      })
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'Mã SKU đã tồn tại !',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Lỗi',
          description: 'Đã xảy ra lỗi khi thêm biến thể.',
          variant: 'destructive',
          duration: 3000
        })
      }
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    reset()
  }

  return (
    <div className='space-y-4 pb-8 bg-[#f5f6fa] dark:bg-gray-900 container'>
      <Label className='font-bold text-2xl dark:text-gray-100'>Biến thể sản phẩm</Label>
      <div className='flex flex-wrap gap-4'>
        {VariantFormSchema.fixedVariants.map((variant) => (
          <div key={variant} className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={selectedVariants.includes(variant)}
              onChange={() => handleVariantChange(variant)}
              id={variant}
            />
            <Label htmlFor={variant}>{variant}</Label>
          </div>
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='dark:bg-gray-700 dark:text-gray-100'>
              Thêm biến thể mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className=' dark:text-gray-100'>Thêm biến thể mới</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleAddProductItemSubmit)}
              className='space-y-4 mt-6 p-4 bg-[#f5f6fa] rounded-md dark:bg-gray-800'
            >
              <div className='space-y-4'>
                {selectedVariants.map((variant, index) => (
                  <div key={variant}>
                    <Label className='dark:text-gray-100'>{variant}</Label>
                    <Controller
                      name={`variants.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={`Nhập ${variant.toLowerCase()}`}
                          className='dark:bg-gray-700 dark:text-gray-100'
                        />
                      )}
                    />
                    {errors.variants?.[index]?.value && (
                      <p className='text-red-500 text-sm'>{errors.variants[index]?.value?.message}</p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <Label className='dark:text-gray-100'>Số lượng</Label>
                <Input
                  {...register('stock', { validate: validateStock })}
                  placeholder='Số lượng'
                  type='number'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
                {errors.stock && <p className='text-red-500 text-sm'>{errors.stock?.message}</p>}
              </div>
              <div>
                <Label className='dark:text-gray-100'>Giá</Label>
                <Input
                  {...register('price', { validate: validatePrice })}
                  placeholder='Giá sản phẩm'
                  type='number'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
                {errors.price && <p className='text-red-500 text-sm'>{errors.price?.message}</p>}
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
                <Input
                  {...register('SKU', { validate: validateSKU })}
                  placeholder='Mã SKU'
                  className='dark:bg-gray-700 dark:text-gray-100'
                />
                {errors.SKU && <p className='text-red-500 text-sm'>{errors.SKU?.message}</p>}
              </div>
              <DialogFooter>
                <Button type='submit' className='dark:bg-gray-700 dark:text-gray-100'>
                  Thêm biến thể
                </Button>
                <Button variant='outline' className='dark:bg-gray-700 dark:text-gray-100' onClick={handleCancel}>
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
