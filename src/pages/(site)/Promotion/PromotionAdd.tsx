import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Promotion {
    description: string;
    type: 'Percent' | 'Fixed';
    value: number;
    startDate: string;
    endDate: string;
    productID: string;
    categoryID: string;
    usageLimit: number;
    status: 'active' | 'inactive';
}

const PromotionAdd: React.FC = () => {
    const [promotionData, setPromotionData] = useState<Promotion>({
        description: '',
        type: 'Percent',
        value: 0,
        startDate: '',
        endDate: '',
        productID: '',
        categoryID: '',
        usageLimit: 1,
        status: 'active',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPromotionData({ ...promotionData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gửi yêu cầu thêm promotion tới API
        console.log('Promotion Added:', promotionData);
    };

    return (
        <div className='container mx-auto p-7 bg-[#f5f6fa]'>
            <div className='text-2xl font-semibold mb-7'>Add New Promotion</div>
            <form onSubmit={handleSubmit} className='space-y-6 bg-white p-6 rounded-md shadow-lg'>
                <div>
                    <label className='block font-medium'>Description</label>
                    <textarea
                        name='description'
                        value={promotionData.description}
                        onChange={handleInputChange}
                        className='border rounded-md w-full py-2 px-3 mt-2'
                        required
                    />
                </div>
                <div>
                    <label className='block font-medium'>Type</label>
                    <select
                        name='type'
                        value={promotionData.type}
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
                        value={promotionData.value}
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
                        value={promotionData.startDate}
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
                        value={promotionData.endDate}
                        onChange={handleInputChange}
                        className='border rounded-md w-full py-2 px-3 mt-2'
                        required
                    />
                </div>
                <div>
                    <label className='block font-medium'>Product ID</label>
                    <input
                        type='text'
                        name='productID'
                        value={promotionData.productID}
                        onChange={handleInputChange}
                        className='border rounded-md w-full py-2 px-3 mt-2'
                        required
                    />
                </div>
                <div>
                    <label className='block font-medium'>Category ID</label>
                    <input
                        type='text'
                        name='categoryID'
                        value={promotionData.categoryID}
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
                        value={promotionData.usageLimit}
                        onChange={handleInputChange}
                        className='border rounded-md w-full py-2 px-3 mt-2'
                        required
                    />
                </div>
                <div>
                    <label className='block font-medium'>Status</label>
                    <select
                        name='status'
                        value={promotionData.status}
                        onChange={handleInputChange}
                        className='border rounded-md w-full py-2 px-3 mt-2'
                    >
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </select>
                </div>
                <Button type='submit' variant='primary' className='mt-4'>
                    <Plus size={18} />
                    <span className='ml-2'>Add Promotion</span>
                </Button>
            </form>
        </div>
    );
};

export default PromotionAdd;
