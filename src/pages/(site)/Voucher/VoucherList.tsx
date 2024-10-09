import { Edit, Search, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel,} from '@tanstack/react-table';

const VoucherList: React.FC = () => {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['VOUCHERS'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/vouchers');
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const confirmed = window.confirm('Bạn chắc chắn muốn xóa chứ ?');
      if (!confirmed) {
        return Promise.reject('User canceled the deletion.');
      }
      await axios.delete(`http://localhost:3000/vouchers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['VOUCHERS'] });
      setSuccessMessage('Voucher đã được xóa thành công!');
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  // Đảm bảo columns luôn được gọi trước render
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Voucher Code',
        accessorKey: 'code',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Value',
        accessorKey: 'value',
      },
      {
        header: 'Start Date',
        accessorKey: 'startDate',
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        header: 'End Date',
        accessorKey: 'endDate',
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        header: 'Usage Limit',
        accessorKey: 'usageLimit',
      },
      {
        header: 'Used Count',
        accessorKey: 'usedCount',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => {
          const status = info.getValue() || 'unknown';
          return (
            <span
              className={`px-2 py-1 rounded-full text-white ${
                status === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`}>
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
              <Link to={`${voucher.id}/edit`}>
                <button className='text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
                  <Edit size={18} />
                </button>
              </Link>
              <button
                className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg'
                onClick={() => mutate(voucher.id)}>
                <Trash size={18} />
              </button>
            </>
          );
        },
      },
    ],
    [mutate]
  );

  // Bộ lọc dữ liệu dựa trên tìm kiếm
  const filteredVouchers = useMemo(
    () =>
      data?.filter((voucher: any) =>
        voucher.code.toLowerCase().includes(search.toLowerCase())
      ) || [],
    [data, search]
  );

  const table = useReactTable({
    data: filteredVouchers,
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
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='border-t hover:bg-gray-50 transition-colors'>
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
          Showing {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()} pages
        </p>
        <div>
          <Button
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft size={18} className='mx-2' />
          </Button>
          <Button
            variant='outline'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ChevronRight size={18} className='mx-2' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
