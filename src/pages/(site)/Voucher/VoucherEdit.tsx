import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Nếu bạn đang dùng react-router
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

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
    const { voucherId } = useParams<{ voucherId: string }>();
    const [voucherData, setVoucherData] = useState<Voucher | null>(null);

    useEffect(() => {
        // Fetch voucher details từ API với voucherId
        // Giả lập API call
        const fetchedVoucher: Voucher = {
            code: 'SAVE10',
            description: 'Giảm 10% cho tất cả các sản phẩm',
            type: 'Percent',
            value: 10,
            startDate: '2024-09-01',
            endDate: '2024-09-30',
            usageLimit: 100,
            status: 'active',
        };
        setVoucherData(fetchedVoucher);
    }, [voucherId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (voucherData) {
            const { name, value } = e.target;
            setVoucherData({ ...voucherData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gửi yêu cầu cập nhật voucher tới API
        console.log('Voucher Updated:', voucherData);
    };

    if (!voucherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto p-7 bg-[#f5f6fa]'>
            <div className='text-2xl font-semibold mb-7'>Edit Voucher</div>
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
                    <Edit size={18} />
                    <span className='ml-2'>Update Voucher</span>
                </Button>
            </form>
        </div>
    );
};

export default VoucherEdit;
