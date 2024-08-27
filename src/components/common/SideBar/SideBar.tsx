import { cn } from '@/utils/classUtils'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu'

const SideBar = () => {
  return (
    <>
      <div className='flex h-screen'>
        <div className='w-full bg-white text-gray-900 flex flex-col'>
          {/* Main Sidebar Navigation */}
          <div className='flex justify-center py-6'>
            <img src='/public/Logo  (Light).svg' alt='Logo' className='w-[150px] h-auto' />
          </div>
          <nav className='flex justify-center'>
            <NavigationMenu>
              <NavigationMenuList className='space-y-4'>
                {['Dashboard', 'Product', 'Favourites', 'Messenger', 'Order Lists', 'E-commerce'].map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <a
                      href='#'
                      className={cn(
                        'flex pl-10 items-center w-[192px] h-[50px] text-left py-2 px-4 rounded',
                        'hover:bg-blue-500 hover:text-white text-gray-900'
                      )}
                    >
                      {item}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className='p-4 border-t'>
            <p className='block py-2 px-4 rounded text-opacity-50 text-gray-900'>PAGES</p>
          </div>

          {/* Secondary Sidebar Navigation */}
          <nav className='flex justify-center'>
            <NavigationMenu>
              <NavigationMenuList className='space-y-4'>
                {[
                  'File Manager',
                  'Calendar',
                  'Feed',
                  'To-Do',
                  'Contact',
                  'Invoice',
                  'UI Elements',
                  'Profile',
                  'Table'
                ].map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <a
                      href='#'
                      className={cn(
                        'flex pl-10 items-center w-[192px] h-[50px] text-left py-2 px-4 rounded',
                        'hover:bg-blue-500 hover:text-white text-gray-900'
                      )}
                    >
                      {item}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Settings and Logout Navigation */}
          <nav className='flex justify-center border-t pt-4'>
            <NavigationMenu>
              <NavigationMenuList className='space-y-4'>
                {['Settings', 'Logout'].map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <a
                      href='#'
                      className={cn(
                        'flex pl-10 items-center w-[192px] h-[50px] text-left py-2 px-4 rounded',
                        'hover:bg-blue-500 hover:text-white text-gray-900'
                      )}
                    >
                      {item}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </>
  )
}

export default SideBar
