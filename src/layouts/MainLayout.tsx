import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SideBar from '@/components/common/SideBar/SideBar'
import TopBar from '@/components/common/TopBar/TopBar'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='flex-col md:flex-row'>
      <SideBar />
      <SidebarInset className='relative inset-0'>
        <TopBar />
        <div className='px-3 sm:px-5 flex-1 overflow-auto mt-16 md:mt-0 bg-slate-50 relative h-full pt-5 pb-16 sm:py-5 space-y-2 sm:space-y-4 box-border'>
          <div className='h-full min-h-full md:h-0'>{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default MainLayout
