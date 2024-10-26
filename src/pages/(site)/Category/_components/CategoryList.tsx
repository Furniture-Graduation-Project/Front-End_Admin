import { DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import DataTableCustom from '@/components/common/DataTable/DataTableCustom';
import React, { useState } from 'react';
import { columns } from './columns';
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery';
import { useDataTable } from '@/hooks/useDataTable';
import { PaginationState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CategoryList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError, refetch } = useMultipleCategoryQuery(pagination, searchTerm);

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      refetch();
    }, 300);
  };

  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách danh mục</h1>
      <div className='w-full pt-5'>
        <Link to='/category/add'>
          <Button variant='outline' className='space-x-2 bg-[#F5F6FA] dark:bg-gray-800 text-black dark:text-gray-100'>
            <Plus size={18} />
            <span>Add Category</span>
          </Button>
        </Link>
      </div>
      <div className='w-full mt-5 bg-white dark:bg-gray-800 rounded-xl p-4'>
        <div className='mr-5 pt-5'>
          <Input
            type='text'
            placeholder='Tìm kiếm theo tên danh mục...'
            value={searchTerm}
            onChange={handleSearch}
            className='border dark:border-gray-600 p-2 rounded mb-5 w-1/3 ml-auto dark:bg-gray-700 dark:text-gray-100'
          />
        </div>
        {isLoading && <div className='text-center'>Đang tải...</div>}
        {isError && <div className='text-red-600'>Lỗi khi tải danh mục. Vui lòng thử lại.</div>}
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </>
  );
};

export default CategoryList;
