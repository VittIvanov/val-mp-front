import React, { useCallback, useRef, useState } from "react";
import useOnClickOutside from "helpers/hooks";
import { Wrapper, DropdownWrapper } from "./styled";

interface I_DropDownPanel {
  toggler: (props: any) => React.ReactElement;
  children: React.ReactElement;
  toLeft?: boolean;
}

const DropDownPanel: React.FC<I_DropDownPanel> = ({
  toggler,
  children,
  toLeft = false,
}: I_DropDownPanel) => {
  const menuRef = useRef(null);
  const togglerRef = useRef(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleMenuVisibility = useCallback(() => {
    setIsVisible((isVisible) => !isVisible);
  }, []);

  useOnClickOutside(menuRef, () => setIsVisible(false));

  const handleToggleClick = useCallback(() => {
    setIsVisible((isVisible) => !isVisible);
  }, []);

  const handleMenuClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const Toggler = toggler;

  return (
    <Wrapper>
      <div ref={togglerRef} onClick={handleToggleClick}>
        <Toggler />
      </div>

      {isVisible && (
        <DropdownWrapper ref={menuRef} toLeft={toLeft} onClick={handleMenuClick}>
          {children}
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

export default DropDownPanel;




// import React, { useCallback, useRef, useState } from "react"
// import useOnClickOutside from "helpers/hooks"
// import { Wrapper, DropdownWrapper } from "./styled"


// interface I_DropDownPanel {
//   toggler: (props: any) => React.ReactElement
//   children: React.ReactElement
//   toLeft?: boolean
// }

// const DropDownPanel: React.FC<I_DropDownPanel> = ({
//   toggler,
//   children,
//   toLeft = false,
// }: I_DropDownPanel) => {
//   const dropDownPanelRef = useRef(null)

//   const [isVisible, setIsVisible] = useState<boolean>(false)

//   const toggleMenuVisibility = useCallback(() => {
//     setIsVisible((isVisible) => !isVisible)
//   }, [])

//   useOnClickOutside(dropDownPanelRef, toggleMenuVisibility)

//   const Toggler = toggler

//   return (
//     <Wrapper>
//       <Toggler onClick={toggleMenuVisibility} />

//       {isVisible && (
//         <DropdownWrapper
//           ref={dropDownPanelRef}
//           toLeft={toLeft}
//         >
//           {children}
//         </DropdownWrapper>
//       )}
//     </Wrapper>
//   )
// }

// export default DropDownPanel
