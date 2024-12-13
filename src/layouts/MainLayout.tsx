import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import SideBar from '@/components/common/SideBar/SideBar'
import TopBar from '@/components/common/TopBar/TopBar'
import { useAuth } from '@/context/AuthContext'
import ErrorPage from '@/pages/(site)/404/404'
import { Loader2 } from 'lucide-react'
import useListenOrder from '@/hooks/useListenOrder'
import { Toaster } from 'sonner'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenUnauthorized from '@/hooks/useListenUnauthorized'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  useAuthToken()
  useListenOrder()
  const { isDialogOpen, handleDialogClose } = useListenUnauthorized()
  return isLoading ? (
    <div className='flex items-center justify-center h-screen'>
      <Loader2 size='100' className='animate-spin'></Loader2>
    </div>
  ) : user ? (
    <SidebarProvider className='flex-col md:flex-row'>
      <SideBar />
      <SidebarInset className='relative inset-0'>
        <TopBar />
        <div className='px-3 sm:px-5 flex-1 overflow-auto mt-16 md:mt-0 bg-slate-50 dark:bg-slate-900 relative h-full pt-5 pb-16 sm:py-5 space-y-2 sm:space-y-4 box-border'>
          <div className='h-full min-h-full md:h-0 dark:text-slate-200'>{children}</div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => (open ? null : handleDialogClose())}>
            <DialogContent>
              <AlertDialogHeader>
                <h3 className='text-xl font-semibold'>Phiên đăng nhập của bạn đã hết hạn</h3>
              </AlertDialogHeader>
              <p className='text-sm text-gray-600'>
                Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục sử dụng trang quản lý.
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleDialogClose}>Đăng nhập lại</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <ErrorPage />
  )
}

export default MainLayout
