import { VoucherService } from '@/services/voucher';
import { useMutation } from '@tanstack/react-query';

type VoucherMutation = 'CREATE' | 'UPDATE' | 'DELETE';

export const useVoucherMutation = (key: VoucherMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Voucher'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await VoucherService.create(params.data);
        case 'UPDATE':
          if (!params.id) throw new Error('Cần có ID để cập nhật');
          return await VoucherService.update(params.id, params.data);
        case 'DELETE':
          if (!params.id) throw new Error('Cần phải có ID để xóa');
          return await VoucherService.delete(params.id);
        default:
          throw new Error('Khóa không hợp lệ');
      }
    },
  });

  return { mutate };
};
