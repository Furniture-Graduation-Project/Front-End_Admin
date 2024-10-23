import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useVoucherMutation } from '@/hooks/mutations/useVoucherMutation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  const { register, handleSubmit, formState: { errors } } = useForm<Voucher>({
    defaultValues: {
      code: '',
      description: '',
      type: 'Percent',
      value: 0,
      startDate: '',
      endDate: '',
      usageLimit: 1,
      status: 'active',
    },
  });
  const navigate = useNavigate();
  const { mutate } = useVoucherMutation("CREATE");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Voucher> = (data) => {
    mutate({ data }, {
      onSuccess: () => {
        setSuccessMessage('Voucher đã được thêm thành công!');
        setTimeout(() => {
          navigate("/voucher");
        }, 2000);
      },
      onError: (error) => {
        console.error('Lỗi khi thêm voucher:', error);
      },
    });
  };

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <div className='text-2xl font-semibold mb-7'>Add New Voucher</div>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 bg-white p-6 rounded-md shadow-lg'>
        <div>
          <label className='block font-medium'>Voucher Code</label>
          <input
            type='text'
            {...register('code', { required: 'Voucher code is required' })}
            className='border rounded-md w-full py-2 px-3 mt-2'
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className='border rounded-md w-full h-32 py-2 px-3 mt-2'
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>Type</label>
          <select
            {...register('type')}
            className='border rounded-md l py-2 px-3 mt-2'
          >
            <option value='Percent'>Percent</option>
            <option value='Fixed'>Fixed</option>
          </select>
        </div>

        <div>
          <label className='block font-medium'>Value</label>
          <input
            type='number'
            {...register('value', { required: 'Value is required', min: 1 })}
            className='border rounded-md  py-2 px-3 mt-2'
          />
          {errors.value && <p className="text-red-500">{errors.value.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>Start Date</label>
          <input
            type='date'
            {...register('startDate', { required: 'Start date is required' })}
            className='border rounded-md w-1/2 py-2 px-3 mt-2'
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>End Date</label>
          <input
            type='date'
            {...register('endDate', { required: 'End date is required' })}
            className='border rounded-md w-1/2 py-2 px-3 mt-2'
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>Usage Limit</label>
          <input
            type='number'
            {...register('usageLimit', { required: 'Usage limit is required', min: 1 })}
            className='border rounded-md  py-2 px-3 mt-2'
          />
          {errors.usageLimit && <p className="text-red-500">{errors.usageLimit.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>Status</label>
          <select
            {...register('status')}
            className='border rounded-md  py-2 px-3 mt-2'
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
