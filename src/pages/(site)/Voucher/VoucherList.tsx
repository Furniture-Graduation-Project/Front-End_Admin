import { Edit, Search, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { useVoucherQuery } from '@/hooks/querys/useVoucherQuery';
import { useVoucherMutation } from '@/hooks/mutations/useVoucherMutation';

const VoucherList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading, isError } = useVoucherQuery(); 
  const vouchers = data?.vouchers || [];

  const { mutate } = useVoucherMutation("DELETE");

  const columns: ColumnDef<any>[] = useMemo(() => [
    {
      header: 'Mã phiếu giảm giá',
      accessorKey: 'code',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Kiểu',
      accessorKey: 'type',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Giá trị',
      accessorKey: 'value',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Ngày bắt đầu',
      accessorKey: 'startDate',
      cell: (info) => {
        const startDate = info.getValue() as string | undefined;
        if (!startDate) return 'N/A';
        const date = new Date(startDate);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('vi-VN');
      },
    },
    {
      header: 'Ngày kết thúc',
      accessorKey: 'endDate',
      cell: (info) => {
        const endDate = info.getValue() as string | undefined;
        if (!endDate) return 'N/A';
        const date = new Date(endDate);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('vi-VN');
      },
    },
    {
      header: 'Giới hạn sử dụng',
      accessorKey: 'usageLimit',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Số lượng đã dùng',
      accessorKey: 'usedCount',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      cell: (info) => {
        const status = info.getValue() as string | undefined;
        if (status === undefined) return 'N/A';

        const isActive = status.toLowerCase() === 'active';

        return (
          <span className={`inline-block px-3 py-1 rounded-full text-white ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
            {status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      cell: (info) => {
        const voucher = info.row.original;
        return (
          <>
            <Link to={`${voucher._id}/edit`}>
              <button className='text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
                <Edit size={18} />
              </button>
            </Link>
            <button
              className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg'
              onClick={() => handleDelete(voucher._id)}>
              <Trash size={18} />
            </button>
          </>
        );
      },
    }
  ], [mutate]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa voucher này không?");
    if (!confirmDelete) return;
  
    try {
      await mutate({ id }); 
      setSuccessMessage('Voucher đã được xóa thành công!');
      queryClient.invalidateQueries({ queryKey: ['Voucher'] });

      navigate('/voucher');
      
    } catch (error) {
      console.error('Error deleting voucher:', error);
      setSuccessMessage('Có lỗi xảy ra khi xóa voucher!');
    }
  };

  const filteredVouchers = useMemo(() => 
    vouchers.filter((voucher: any) => 
      voucher.code.toLowerCase().includes(search.toLowerCase())
    ), [vouchers, search]
  );

  const pageCount = Math.min(Math.ceil(filteredVouchers.length / 5), 5);
  const paginatedVouchers = useMemo(() => 
    filteredVouchers.slice(pageIndex * 5, (pageIndex + 1) * 5), 
    [filteredVouchers, pageIndex]
  );
  

  const table = useReactTable({
    data: paginatedVouchers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error('Error loading vouchers:', isError);
    return <div>Error loading vouchers</div>;
  }

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      {successMessage && (
        <div className='bg-green-500 text-white p-2 rounded-lg mb-4'>
          {successMessage}
        </div>
      )}

      <div className='flex justify-between items-center mb-7'>
        <div className='text-2xl font-semibold'>Voucher List</div>
      </div>
      <div className='w-full flex justify-between pb-7'>
        <Link to='add'>
          <Button variant='primary' className='flex items-center space-x-2'>
            <Plus size={18} />
            <span>Add Voucher</span>
          </Button>
        </Link>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center space-x-2 relative'>
            <Search className='text-gray-700 absolute left-5' size={16} />
            <input
              type='text'
              placeholder='Search voucher name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='border-b-2'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='text-left'>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-4 font-bold'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-t hover:bg-gray-50 transition-colors'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='p-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className='text-center py-4'>
                No vouchers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='flex justify-between items-center mt-7'>
        <p className='text-[14px] font-light'>
          Showing page {pageIndex + 1} of {pageCount}
        </p>
        <div>
          <Button
            variant='outline'
            onClick={() => setPageIndex(prev => Math.max(0, prev - 1))}
            disabled={pageIndex === 0}>
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant='outline'
            onClick={() => setPageIndex(prev => Math.min(pageCount - 1, prev + 1))}
            disabled={pageIndex >= pageCount - 1}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
