import { useCallback, useRef, useState } from "react"
import useOnClickOutside from "helpers/hooks"
import { Wrapper, DropdownWrapper } from "./styled"


interface I_DropDownPanel {
  toggler: any
  children: React.ReactElement
  toLeft?: boolean
}

const DropDownPanel: React.FC<I_DropDownPanel> = ({
  toggler,
  children,
  toLeft = false,
}: I_DropDownPanel) => {
  const dropDownPanelRef = useRef(null)

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible((isVisible) => !isVisible)
  }, [])

  useOnClickOutside(dropDownPanelRef, toggleVisibility)

  const Toggler = toggler

  return (
    <Wrapper>
      <Toggler onClick={toggleVisibility} />

      {isVisible && (
        <DropdownWrapper
          ref={dropDownPanelRef}
          toLeft={toLeft}
        >
          {children}
        </DropdownWrapper>
      )}
    </Wrapper>
  )
}

export default DropDownPanel
