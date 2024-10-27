import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICategory } from '@/interface/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryService } from '@/services/category';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const FormSchema = z.object({
  categoryName: z.string().min(1, { message: 'Tên danh mục không được để trống.' }),
  description: z.string().optional(),
});

const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID danh mục:", id);
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<ICategory>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: '',
      description: '',
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        console.error('ID không tồn tại');
        return;
      }

      try {
        const response = await CategoryService.getCategoryById(id);
        setCategory(response.data.category);
        form.reset(response.data.category);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin danh mục:', error);
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin danh mục.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, form]);

  const handleSubmit = async (data: ICategory) => {
    setLoading(true);
    try {
      await CategoryService.updateCategoryById(id!, data);
      toast({
        title: 'Cập nhật thành công',
        description: `Danh mục ${data.categoryName} đã được cập nhật thành công.`,
        variant: 'success', // Thay đổi variant thành 'success' để có nền xanh
      });
      navigate('/category'); // Quay lại danh sách sau khi cập nhật thành công
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật danh mục.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!category) {
    return <div>Không tìm thấy danh mục với ID đã cho.</div>;
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <h1 className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>
        Cập nhật danh mục
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='categoryName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='categoryName' className='font-bold dark:text-gray-100'>
                  Tên danh mục
                </Label>
                <FormControl>
                  <Input
                    id='categoryName'
                    placeholder='Tên danh mục'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='description' className='font-bold dark:text-gray-100'>
                  Mô tả
                </Label>
                <FormControl>
                  <Input
                    id='description'
                    placeholder='Mô tả'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<div className='flex justify-end mt-6 space-x-3'>
            <Button type='button' variant='outline' onClick={() => navigate('/category')}>
              Hủy
            </Button>
            <Button type='submit'>Cập nhật</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryEdit;
