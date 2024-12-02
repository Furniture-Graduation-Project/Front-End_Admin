import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { useState, useEffect, FC, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'
import { ProductItemService } from '@/services/productItem'
import { ProductService } from '@/services/product'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProductItem } from '@/interface/productItem'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { Edit3, Trash2 } from 'lucide-react'
import AlertAcitonDialog from '@/components/modals/AlertDialog'

interface AddVariantsProps {
  productId: string
}

const VariantFormSchema = {
  fixedVariants: ['Màu sắc', 'Mùi hương', 'Kích cỡ', 'Phong cách']
}

const AddVariants: FC<AddVariantsProps> = ({ productId }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductItem>({
    defaultValues: {
      productId: '',
      variants: [],
      stock: 0,
      price: 0,
      image: '',
      SKU: '',
      status: 'active'
    },
    mode: 'onBlur'
  })

  const [productItems, setProductItems] = useState<ProductItem[]>([])
  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItemId, setCurrentItemId] = useState<string | null>(null)
  const [productExists, setProductExists] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>('')
  const confirmDelete = (id: any) => {
    setDeleteItemId(id)
    setIsDeleteDialogOpen(true)
  }
  const handleDeleteConfirmed = async () => {
    if (deleteItemId) {
      try {
        const productItem = ProductItemService.getById(deleteItemId)
        const updatedData = { ...productItem, status: 'deleted' }
        await ProductItemService.update(deleteItemId, updatedData)
        toast({
          title: 'Thành công',
          description: 'Biến thể đã bị xóa.',
          variant: 'success',
          duration: 3000
        })
        fetchProductItems()
      } catch (error) {
        toast({
          title: 'Lỗi',
          description: 'Đã có lỗi xảy ra trong quá trình xóa.',
          variant: 'destructive',
          duration: 3000
        })
      } finally {
        setIsDeleteDialogOpen(false)
        setDeleteItemId(null)
      }
    }
  }

  const validateProduct = async () => {
    try {
      const response = await ProductService.getById(productId)
      setProductExists(!!response.data)
    } catch {
      setProductExists(false)
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy sản phẩm tương ứng.',
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  const fetchProductItems = async () => {
    try {
      const response = await ProductItemService.getByProductId(productId)
      setProductItems(response.data.data)
    } catch {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách biến thể.',
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  useEffect(() => {
    if (productId) {
      validateProduct()
      fetchProductItems()
    }
  }, [productId])

  const handleVariantChange = useCallback((variant: string) => {
    setSelectedVariants((prev) => (prev.includes(variant) ? prev.filter((v) => v !== variant) : [...prev, variant]))
  }, [])

  const handleAddOrUpdate = async (data: ProductItem) => {
    const variantInputs = selectedVariants.map((variant, index) => ({
      variant,
      value: data.variants[index]?.value || ''
    }))

    const payload = { ...data, status: data.status, productId, variants: variantInputs, image: image || data.image }
    console.log('Payload:', payload)

    try {
      if (isEditMode && currentItemId) {
        const currentItem = productItems.find((item) => item._id === currentItemId)
        if (currentItem) {
          payload.stock += currentItem.stock
        }
        await ProductItemService.update(currentItemId, payload)
        toast({
          title: 'Thành công',
          description: 'Cập nhật biến thể thành công.',
          variant: 'success',
          duration: 3000
        })
      } else {
        await ProductItemService.create(payload)
        toast({
          title: 'Thành công',
          description: 'Biến thể mới đã được thêm.',
          variant: 'success',
          duration: 3000
        })
      }
      setIsDialogOpen(false)
      reset()
      setIsEditMode(false)
      fetchProductItems()
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi khi thêm biến thể.'
      toast({
        title: 'Lỗi',
        description: errorMessage,
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  const handleEdit = (item: ProductItem) => {
    setIsDialogOpen(true)
    setIsEditMode(true)
    setCurrentItemId(item._id || null)
    setValue('outStock', 0)
    setValue('stock', 0)
    setValue('price', item.price)
    setValue('image', image || item.image)
    setValue('SKU', item.SKU)
    setValue('status', item.status)
    setSelectedVariants(item.variants.map((v) => v.variant))
    item.variants.forEach((variant, index) => {
      setValue(`variants.${index}.value`, variant.value)
    })
  }

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setImage(urls[0])
    setPreview(URL.createObjectURL(files[0]))
  }

  const openAddForm = () => {
    setIsDialogOpen(true)
    setIsEditMode(false)
    reset()
  }

  if (!productExists) {
    return <div className='text-center text-gray-500 dark:text-gray-400'>Sản phẩm không tồn tại.</div>
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
        <Button variant='outline' className='dark:bg-gray-700 dark:text-gray-100' onClick={openAddForm}>
          Thêm biến thể
        </Button>
      </div>
      <div className='mt-4'>
        {productItems
          .filter((item) => item.status !== 'deleted')
          .map((item) => (
            <div key={item._id} className='lg:flex lg:items-center lg:justify-between  p-4 border rounded'>
              <div className='lg:flex lg:space-x-6 items-center'>
                <img
                  src={item.image ? item.image : 'https://img.icons8.com/parakeet-line/48/image.png'}
                  width={40}
                  alt=''
                />
                {item.variants.map((variant) => (
                  <p key={variant.variant}>
                    <span className='font-bold'>{variant.variant}:</span> {variant.value}
                  </p>
                ))}
                <p>
                  <span className='font-bold'>SKU:</span> {item.SKU}
                </p>
                <p>
                  <span className='font-bold'>Giá:</span> {item.price.toLocaleString()} VND
                </p>
                <p>
                  <span className='font-bold'>Số lượng:</span> {item.stock}
                </p>
              </div>
              <div className='flex space-x-2 lg:mt-0 mt-2'>
                <Button variant='outline' onClick={() => handleEdit(item)}>
                  <Edit3 className='h-4 w-4' />
                </Button>
                <Button variant='outline' onClick={() => confirmDelete(item._id)}>
                  <Trash2 className=' h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='dark:text-gray-100'>
              {isEditMode ? 'Cập nhật biến thể' : 'Thêm biến thể mới'}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleAddOrUpdate)}
            className='space-y-4 mt-6 p-4 bg-[#f5f6fa] rounded-md dark:bg-gray-800'
          >
            {!isEditMode && (
              <div>
                {selectedVariants.map((variant, index) => (
                  <div key={variant}>
                    <Label className='dark:text-gray-100'>{variant}</Label>
                    <Controller
                      name={`variants.${index}.value`}
                      control={control}
                      rules={{ required: `${variant} không được để trống` }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={`Nhập ${variant.toLowerCase()}`}
                          className='dark:bg-gray-700 dark:text-gray-100'
                        />
                      )}
                    />
                    {errors.variants?.[index]?.value && (
                      <p className='text-red-500 py-2 text-sm'>{errors.variants?.[index]?.value?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className='space-y-2'>
              <Label className='dark:text-gray-100'>Số lượng</Label>
              <Input
                type='number'
                min={0}
                {...register('stock', { valueAsNumber: true, required: 'Số lượng không được để trống', min: 0 })}
                className='dark:bg-gray-700 dark:text-gray-100'
              />
              {errors.stock && <p className='text-red-500 py-2 text-sm'>Số lượng phải là số không âm</p>}

              <Label className='dark:text-gray-100'>Giá</Label>
              <Input
                type='number'
                min={0}
                {...register('price', { valueAsNumber: true, required: 'Giá không được để trống', min: 1 })}
                className='dark:bg-gray-700 dark:text-gray-100'
              />
              {errors.price && <p className='text-red-500 py-2 text-sm'>Giá phải là số lớn hơn 0</p>}

              <Label className='dark:text-gray-100'>Ảnh</Label>
              <Input
                {...register('image')}
                type='file'
                className='dark:bg-gray-700 dark:text-gray-100'
                onChange={onChangeImage}
              />
              {errors.image && <p className='text-red-500 py-2 text-sm'>{errors.image.message}</p>}
              {preview && <img src={preview} alt='preview' className='w-20 h-20' />}
              <Label className='dark:text-gray-100'>SKU</Label>
              <Input
                {...register('SKU', { required: 'SKU không được để trống' })}
                className='dark:bg-gray-700 dark:text-gray-100'
              />
              {errors.SKU && <p className='text-red-500 py-2 text-sm'>{errors.SKU.message}</p>}

              {isEditMode && (
                <>
                  <Label className='dark:text-gray-100'>Trạng thái</Label>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                      >
                        <option value='active'>Hoạt động</option>
                        <option value='deleted'>Xóa</option>
                      </select>
                    )}
                  />
                  {errors.status && <p className='text-red-500 py-2 text-sm'>{errors.status.message}</p>}
                </>
              )}
            </div>
            <DialogFooter>
              <Button type='submit'>Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertAcitonDialog
        title='Xác nhận xóa'
        description='Bạn có chắc chắn muốn xóa biến thể này không?'
        variant='destructive'
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleAciton={handleDeleteConfirmed}
      />
    </div>
  )
}

export default AddVariants
