import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { paths } from "../../routes/helpers"
import DropDownPanel from 'components/DropDownPanel'
import { selectUserData } from 'features/UserData/selectors'
import UserAvatar from './UserAvatar'
import { UserProfileDropDown } from "./styled"

const UserDropdownMenu: React.FC = () => {
  const navigate = useNavigate()

  const { nameFirst, nameLast, displayName } = useSelector(selectUserData)

  const handleLogout = useCallback(() => navigate(paths.logout), [navigate])

  return (
    <DropDownPanel
      toggler={(props: any) => <UserAvatar onClick={props.onClick} />}
      toLeft >
      <UserProfileDropDown>
        <div>
          <strong>
            {displayName || (nameFirst + ' ' + nameLast)}
          </strong>
        </div>

        <hr />
        <div>Заказы</div>
        <div>Возвраты</div>
        <div>Избранное</div>
        <div>Поддержка</div>
        <div>Настройки</div>

        <hr />

        <div onClick={handleLogout}>Выйти</div>

      </ UserProfileDropDown >
    </ DropDownPanel>
  )
}

export default UserDropdownMenu
