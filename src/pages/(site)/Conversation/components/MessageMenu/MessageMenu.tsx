import messageMenup from '@/assets/data/messageMenu'
import MessageMenuMobile from './_component/MessageMenuMobile'
import MessageMenuSide from './_component/MessageMenuSide'

const MessLeft = () => {
  return (
    <div>
      <MessageMenuSide menu={messageMenup} />
      <MessageMenuMobile menu={messageMenup} />
    </div>
  )
}

export default MessLeft
