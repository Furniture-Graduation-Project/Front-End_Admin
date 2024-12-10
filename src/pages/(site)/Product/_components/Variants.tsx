/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Skeleton } from '@/components/ui/skeleton'
import { Edit3, Eye, RefreshCw, Trash2 } from 'lucide-react'
import AlertAcitonDialog from '@/components/modals/AlertDialog'

interface AddVariantsProps {
  productId: string
  setVariantChange: (emit: any) => void
}

const VariantFormSchema = {
  fixedVariants: ['Màu sắc', 'Mùi hương', 'Kích cỡ', 'Phong cách']
}

const AddVariants: FC<AddVariantsProps> = ({ productId, setVariantChange }) => {
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
  const [loading, setLoading] = useState(false)
  const [editImage, setEditImage] = useState<string | null>('')
  const [statusFilter] = useState<string>('all')
  const [showDeleted, setShowDeleted] = useState(false)
  const [restoreItemId, setRestoreItemId] = useState<string | null>(null)
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)

  const toggleShowDeleted = () => {
    setShowDeleted((prev) => !prev)
  }

  const handleRestoreConfirm = (id: string) => {
    setRestoreItemId(id)
    setIsRestoreDialogOpen(true)
  }

  const handleRestoreConfirmed = async () => {
    if (restoreItemId) {
      try {
        const response = await ProductItemService.getById(restoreItemId)
        const productItem = response.data
        const isExactDuplicate = productItems.some((item) => {
          const sortedExistingVariants = [...item.variants].sort((a, b) => a.variant.localeCompare(b.variant))
          const sortedInputVariants = [...productItem.variants].sort((a, b) => a.variant.localeCompare(b.variant))
          return (
            sortedExistingVariants.length === sortedInputVariants.length &&
            sortedExistingVariants.every(
              (existingVariant, idx) =>
                sortedInputVariants[idx] &&
                existingVariant.variant === sortedInputVariants[idx].variant &&
                existingVariant.value === sortedInputVariants[idx].value
            ) &&
            item.productId === productItem.productId &&
            item.status === 'active'
          )
        })

        if (isExactDuplicate) {
          toast({
            title: 'Lỗi',
            description: 'Không thể khôi phục sản phẩm vì đã có sản phẩm trùng lặp.',
            variant: 'destructive',
            duration: 3000
          })
          return
        }
        const updatedData = { ...productItem, status: 'active' }
        await ProductItemService.update(restoreItemId, updatedData)
        toast({
          title: 'Thành công',
          description: 'Sản phẩm đã được khôi phục.',
          variant: 'success',
          duration: 3000
        })
        fetchProductItems()
      } catch (error) {
        toast({
          title: 'Lỗi',
          description: 'Đã có lỗi xảy ra trong quá trình khôi phục.',
          variant: 'destructive',
          duration: 3000
        })
      } finally {
        setIsRestoreDialogOpen(false)
        setRestoreItemId(null)
      }
    }
  }

  const confirmDelete = (id: any) => {
    setDeleteItemId(id)
    setIsDeleteDialogOpen(true)
  }
  const handleDeleteConfirmed = async () => {
    if (deleteItemId) {
      try {
        const productItem = await ProductItemService.getById(deleteItemId)
        const updatedData = { ...productItem, status: 'deleted' }
        await ProductItemService.update(deleteItemId, updatedData)
        toast({
          title: 'Thành công',
          description: 'Biến thể đã bị xóa.',
          variant: 'success',
          duration: 3000
        })
        await fetchProductItems()
        const productItemsRes = await ProductItemService.getByProductId(productId)
        const productItems = productItemsRes.data.data
        const allDisabled = productItems.every((item: ProductItem) => item.status === 'deleted')
        if (allDisabled) {
          const product = ProductService.getById(productId)
          const updatedData = { ...product, status: 'creating' }
          await ProductService.update(productId, updatedData as any)
          toast({
            title: 'Chuyển trạng thái thành công',
            description: `Sản phẩm đã được chuyển sang danh sách chưa bán".`,
            variant: 'success',
            duration: 3000
          })
          setVariantChange(null)
        }
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

  const filteredProducts = productItems.filter((item) => (statusFilter === 'all' ? true : item.status === statusFilter))

  const handleVariantChange = useCallback((variant: string) => {
    setSelectedVariants((prev) => (prev.includes(variant) ? prev.filter((v) => v !== variant) : [...prev, variant]))
  }, [])

  const handleAddOrUpdate = async (data: ProductItem) => {
    const isBasicProduct = selectedVariants.length === 0
    const variantInputs = selectedVariants.map((variant, index) => ({
      variant,
      value: data.variants[index]?.value || ''
    }))
    const payload = {
      ...data,
      status: data.status,
      productId,
      variants: variantInputs,
      image: image || data.image
    }
    setImage('')
    setPreview('')

    const isAnyBasicProductExists = productItems.some((item) => item.variants.length === 0 && item.status !== 'deleted')
    if (isAnyBasicProductExists && !isBasicProduct) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm sản phẩm biến thể khi đã có sản phẩm không có biến thể.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }
    const isAnyVariantProductExists = productItems.some((item) => item.variants.length > 0 && item.status !== 'deleted')
    if (isAnyVariantProductExists && isBasicProduct) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm sản phẩm không có biến thể khi đã có sản phẩm biến thể.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    if (!isEditMode) {
      const isExactDuplicate = productItems.some((item) => {
        const sortedExistingVariants = [...item.variants].sort((a, b) => a.variant.localeCompare(b.variant))
        const sortedInputVariants = [...variantInputs].sort((a, b) => a.variant.localeCompare(b.variant))
        return (
          sortedExistingVariants.length === sortedInputVariants.length &&
          sortedExistingVariants.every(
            (existingVariant, idx) =>
              sortedInputVariants[idx] &&
              existingVariant.variant === sortedInputVariants[idx].variant &&
              existingVariant.value === sortedInputVariants[idx].value
          ) &&
          item.productId === productId
        )
      })
      if (isExactDuplicate) {
        toast({
          title: 'Lỗi',
          description: 'Sản phẩm biến thể đã tồn tại.',
          variant: 'destructive',
          duration: 3000
        })
        return
      }
    }

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
          description: isBasicProduct ? 'Sản phẩm không có biến thể đã được thêm.' : 'Biến thể mới đã được thêm.',
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
    setValue('outStock', item.outStock || 0)
    setValue('stock', 0)
    setValue('price', item.price)
    setValue('image', image || item.image)
    setValue('SKU', item.SKU)
    setEditImage(item.image || '')
    setPreview('')
    setValue('status', item.status)
    setSelectedVariants(item.variants.map((v) => v.variant))
    item.variants.forEach((variant, index) => {
      setValue(`variants.${index}.value`, variant.value)
    })
  }

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setLoading(true)
    setEditImage('')
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setImage(urls[0])
    setPreview(URL.createObjectURL(files[0]))
    setLoading(false)
  }

  const openAddForm = () => {
    setIsDialogOpen(true)
    setPreview('')
    setImage('')
    setIsEditMode(false)
    reset()
  }

  if (!productExists) {
    return <div className='text-center text-gray-500 dark:text-gray-400'>Sản phẩm không tồn tại.</div>
  }

  return (
    <div className='bg-[#ffffff] dark:bg-[#1f2937] rounded-md px-10 py-5 mt-5'>
      <Label className='font-bold text-2xl dark:text-gray-100'>Biến thể sản phẩm</Label>
      <div className='flex items-center justify-between gap-4 w-full'>
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
        <div className='flex flex-col items-end mt-4'>
          <Button variant='outline' onClick={toggleShowDeleted} className='flex items-center space-x-2'>
            {showDeleted ? <Eye className='h-4 w-4' /> : <Trash2 className='h-4 w-4' />}
            <span>{showDeleted ? 'Hiển thị hoạt động' : 'Hiển thị đã xóa'}</span>
          </Button>
        </div>
      </div>

      <div className='mt-4'>
        {filteredProducts
          .filter((item) => (showDeleted ? item.status === 'deleted' : item.status !== 'deleted'))
          .map((item) => (
            <div key={item._id} className='lg:flex lg:items-center lg:justify-between p-4 border rounded'>
              <div className='lg:flex lg:space-x-6 items-center'>
                <img
                  src={item.image || 'https://img.icons8.com/parakeet-line/48/image.png'}
                  width={100}
                  alt={item.SKU || 'Hình ảnh sản phẩm'}
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
                  <span className='font-bold'>Giá:</span> {item.price.toLocaleString()} VNĐ
                </p>
                <p>
                  <span className='font-bold'>Số lượng:</span> {item.stock}
                </p>
              </div>
              <div className='flex space-x-2 lg:mt-0 mt-2'>
                <Button variant='outline' onClick={() => handleEdit(item)}>
                  <Edit3 className='h-4 w-4' />
                </Button>
                {item.status === 'deleted' ? (
                  <Button
                    variant='outline'
                    onClick={() => {
                      if (item._id) {
                        handleRestoreConfirm(item._id)
                      }
                    }}
                  >
                    <RefreshCw className='h-4 w-4' />
                  </Button>
                ) : (
                  <Button
                    variant='outline'
                    onClick={() => {
                      if (item._id) {
                        confirmDelete(item._id)
                      }
                    }}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>

      <AlertAcitonDialog
        title='Xác nhận khôi phục'
        description='Bạn có chắc chắn muốn khôi phục biến thể này không?'
        variant='destructive'
        isOpen={isRestoreDialogOpen}
        setIsOpen={setIsRestoreDialogOpen}
        handleAciton={handleRestoreConfirmed}
      />

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
              <Label className='dark:text-gray-100'>Thêm số lượng</Label>
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
              {loading ? (
                <Skeleton className='w-20 h-20 rounded-lg mt-2' />
              ) : (
                preview && (
                  <div className='mt-2'>
                    <img src={preview} alt='preview' className='w-20 h-20 object-cover rounded-lg' />
                  </div>
                )
              )}
              {editImage && (
                <div className='mt-2'>
                  <img src={editImage} alt='preview' className='w-20 h-20 object-cover rounded-lg' />
                </div>
              )}
              <Label className='dark:text-gray-100'>SKU</Label>
              <Input
                {...register('SKU', { required: 'SKU không được để trống' })}
                className='dark:bg-gray-700 dark:text-gray-100'
              />
              {errors.SKU && <p className='text-red-500 py-2 text-sm'>{errors.SKU.message}</p>}
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
