import { IContainer } from '@/interface/container'
import { cn } from '@/utils/classUtils'

const Container = ({ children, className }: IContainer) => {
  return <>{children}</>
}

export default Container
