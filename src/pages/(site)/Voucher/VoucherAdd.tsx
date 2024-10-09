import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Voucher {
  code: string;
  description: string;
  type: 'Percent' | 'Fixed';
  value: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  status: 'active' | 'inactive';
}

const VoucherAdd: React.FC = () => {
  const [voucherData, setVoucherData] = useState<Voucher>({
    code: '',
    description: '',
    type: 'Percent',
    value: 0,
    startDate: '',
    endDate: '',
    usageLimit: 1,
    status: 'active',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (newVoucher: Voucher) => {
      await axios.post('http://localhost:3000/vouchers', newVoucher);
    },
    onSuccess: () => {
      alert('Thêm sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ['VOUCHERS'] });
      navigate('/voucher');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVoucherData({ ...voucherData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(voucherData);
  };

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <div className='text-2xl font-semibold mb-7'>Add New Voucher</div>
      <form onSubmit={handleSubmit} className='space-y-6 bg-white p-6 rounded-md shadow-lg'>
        <div>
          <label className='block font-medium'>Voucher Code</label>
          <input
            type='text'
            name='code'
            value={voucherData.code}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>Description</label>
          <textarea
            name='description'
            value={voucherData.description}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>Type</label>
          <select
            name='type'
            value={voucherData.type}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
          >
            <option value='Percent'>Percent</option>
            <option value='Fixed'>Fixed</option>
          </select>
        </div>
        <div>
          <label className='block font-medium'>Value</label>
          <input
            type='number'
            name='value'
            value={voucherData.value}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>Start Date</label>
          <input
            type='date'
            name='startDate'
            value={voucherData.startDate}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>End Date</label>
          <input
            type='date'
            name='endDate'
            value={voucherData.endDate}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>Usage Limit</label>
          <input
            type='number'
            name='usageLimit'
            value={voucherData.usageLimit}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
            required
          />
        </div>
        <div>
          <label className='block font-medium'>Status</label>
          <select
            name='status'
            value={voucherData.status}
            onChange={handleInputChange}
            className='border rounded-md w-full py-2 px-3 mt-2'
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <Button type='submit' variant='primary' className='mt-4'>
          <Plus size={18} />
          <span className='ml-2'>Add Voucher</span>
        </Button>
      </form>
    </div>
  );
};

export default VoucherAdd;
