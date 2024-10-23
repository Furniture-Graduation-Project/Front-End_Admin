import { Button } from '@/components/ui/button';
import { useVoucherMutation } from '@/hooks/mutations/useVoucherMutation';
import { useVoucherQuery } from '@/hooks/querys/useVoucherQuery';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';

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

const VoucherEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useVoucherQuery(id);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Voucher>();
  const navigate = useNavigate();
  const { mutate } = useVoucherMutation("UPDATE");

  React.useEffect(() => {
    if (data) {
      setValue('code', data.code);
      setValue('description', data.description);
      setValue('type', data.type);
      setValue('value', data.value);
      setValue('startDate', data.startDate);
      setValue('endDate', data.endDate);
      setValue('usageLimit', data.usageLimit);
      setValue('status', data.status);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<Voucher> = (formData) => {
    if (id) {
      mutate({ id, data: formData }, {
        onSuccess: () => {
           alert("Đã sửa thành công")
          navigate("/voucher");
        },
        onError: () => {
          toast.error("Lỗi sửa Voucher");
        }
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading voucher</p>;

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <div className='text-2xl font-semibold mb-7'>Edit Voucher</div>
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
            className='border rounded-md  py-2 px-3 mt-2'
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
          Update Voucher
        </Button>
      </form>
    </div>
  );
};

export default VoucherEdit;
