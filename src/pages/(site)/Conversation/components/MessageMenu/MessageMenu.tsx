import messageMenup from '@/assets/data/messageMenu'
import MessageMenuMobile from './_component/MessageMenuMobile'
import MessageMenuSide from './_component/MessageMenuSide'

const MessLeft = () => {
  return (
    <>
      <MessageMenuSide menu={messageMenup} />
      <MessageMenuMobile menu={messageMenup} />
    </>
  )
}

export default MessLeft
