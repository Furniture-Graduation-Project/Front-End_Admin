import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useParams và useNavigate
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ categoryName: string }>({ categoryName: '' });
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    // Fetch the category details when component mounts
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCategoryName(data.data.categoryName);
          setDescription(data.data.description);
        } else {
          console.error('Failed to fetch category');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);
  
  const validate = () => {
    let isValid = true;
    let errors = { categoryName: '' };

    if (categoryName.trim() === '') {
      errors.categoryName = 'Category name cannot be empty';
      isValid = false;
    } else if (categoryName.length < 3) {
      errors.categoryName = 'Category name must be at least 3 characters';
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

    const updatedCategory = {
        categoryName: categoryName,
        description: description,
    };

    try {
      const response = await fetch(`http://localhost:3000/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response.ok) {
        alert('Category has been successfully updated');
        navigate('/category'); // Navigate to category list page
      } else {
        alert('Error occurred while updating the category');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <h2 className='text-2xl font-semibold mb-7'>Edit Category</h2>
      <form className='bg-white p-7 shadow-md rounded-lg' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Category Name</label>
          <Input
            type='text'
            placeholder='Enter category name'
            className='mt-2'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {errors.categoryName && <p className='text-red-500 text-sm mt-2'>{errors.categoryName}</p>}
        </div>
        <div className='mb-2'>
          <label className='block text-gray-700 font-medium'>Description</label>
          <textarea
            placeholder='Enter category description'
            className='mt-2 w-full p-2 border rounded-md text-sm'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type='submit' className='w-[200px] bg-blue-600 text-white mt-4'>
          Update Category
        </Button>
      </form>
    </div>
  );
};

export default CategoryEdit;
