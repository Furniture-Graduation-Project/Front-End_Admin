import { Edit, Search, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useVoucherQuery } from '@/hooks/querys/useVoucherQuery';
import { useVoucherMutation } from '@/hooks/mutations/useVoucherMutation';
import { useDataTable } from '@/hooks/useDataTable';
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import DataTableCustom from '@/components/common/DataTable/DataTableCustom';
import { ToastAction } from '@/components/ui/toast';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import AlertAcitonDialog from '@/components/modals/AlertDialog';

const VoucherList: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast()
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useVoucherQuery(); 
  const { mutate } = useVoucherMutation("DELETE");
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  
  const [openDelete, setOpenDelete] = useState(false)
  const [voucherId, setVoucherId] = useState<string>('')
  const openDeleteModal = (id: string): void => {
    setVoucherId(id)
    setOpenDelete(true)
  }

  const handleDelete = async () => {
    try {
      if (voucherId == undefined) return
      mutate({ id : voucherId }); 
      setOpenDelete(false);
      const date = new Date()
      toast({
        title: 'Đã chuyển bản ghi vào thùng rác ! ',
        description: format(date, "d MMM yyyy 'at' hh:mm a", { locale: vi }),
        action: <ToastAction altText='Hoàn tác'>Undo</ToastAction>
      })
      queryClient.invalidateQueries({ queryKey: ['Voucher'] });

      navigate('/voucher');
      
    } catch (error) {
      console.error('Error deleting voucher:', error);
      setSuccessMessage('Có lỗi xảy ra khi xóa voucher!');
    }
  };
  const columnVoucher: ColumnDef<any>[] = [
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
      const meta = info.table.options.meta as { openDeleteModal: (id: string) => void } | undefined;

      return (
        <>
          <Link to={`${voucher._id}/edit`}>
            <button className='text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
              <Edit size={18} />
            </button>
          </Link>
          <button
            className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg'
            onClick={() => meta?.openDeleteModal(voucher._id)}>
            <Trash size={18} />
          </button>
        </>
      );
    },
  },
];

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columnVoucher,
    totalData: data?.totalData,
    meta: { openDeleteModal },
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

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
          <Button variant='outline' className='mt-4 bg-blue-500 text-white hover:bg-blue-600'>
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

      <DataTableCustom columns={columnVoucher} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn chuyển bản ghi này vào thùng rác ?'
        description='Bản ghi khi chuyển vào thùng rác sẽ bị xóa sau 30 ngày không làm việc .'
        variant={'destructive'}
        isOpen={openDelete}
        setIsOpen={setOpenDelete}
        handleAciton={handleDelete}
      />
    </div>
  );
};

export default VoucherList;
