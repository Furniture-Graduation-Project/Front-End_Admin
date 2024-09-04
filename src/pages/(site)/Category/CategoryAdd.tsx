import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryAdd = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ categoryName: '' });
    const navigate = useNavigate();
    const validate = () => {
        let isValid = true;
        let errors = { categoryName: '' };
    
        if (categoryName.trim() === '') {
          errors.categoryName = 'Category name cannot be empty';
          isValid = false;
        } else if (categoryName.length < 3) {
          errors.categoryName = 'Category names must have at least 3 characters';
          isValid = false;
        }
    
        setErrors(errors);
        return isValid;
      };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }
  
      // Dữ liệu sẽ được gửi lên server
      const newCategory = {
        categoryName: categoryName,
        description: description,
      };
  
      try {
        // Thực hiện yêu cầu POST đến API của bạn
        const response = await fetch('http://localhost:3000/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        });
        
        if (response.ok) {
          // Xử lý khi thêm danh mục thành công
          alert('The category has been added successfully');
          navigate('/category');
        } else {
          // Xử lý khi thêm danh mục thất bại
          alert('An error occurred while adding a category');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa] '>
      <h2 className='text-2xl font-semibold mb-7'>Add New Category</h2>
      <form className='bg-white p-7 shadow-md rounded-lg'  onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Category Name</label>
          <Input type='text' placeholder='Enter category name' className='mt-2'   value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}/>
             {errors.categoryName && <p className='text-red-500 text-sm mt-2'>{errors.categoryName}</p>}
        </div>
        <div className='mb-2'>
          <label className='block text-gray-700 font-medium'>Description</label>
          <textarea placeholder='Enter category description' className='mt-2 w-full p-2 border rounded-md text-sm'  value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <Button type='submit' className='w-[200px] bg-blue-600 text-white mt-4'>
          Add Category
        </Button>
      </form>
    </div>
  )
}

export default CategoryAdd
