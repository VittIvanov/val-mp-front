import { useEffect, useCallback } from "react";

// do something on click outside element
export const useOnClickOutside = (ref: any, handler: any) => {
  const handleClickOutside = useCallback(
    (e: any) => {
      if (!ref.current || !ref.current.contains(e.target)) return handler(e);
    },
    [ref, handler]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOnClickOutside;

// import { useEffect } from "react"


// //  do something on click outside element
// export const useOnClickOutside = (ref: any, handler: any) => {
//   useEffect(
//     () => {
//       const listener = (e: any) => {
//         if (!ref.current || ref.current.contains(e.target)) return handler(e)
//       }

//       document.addEventListener('mousedown', listener)
//       document.addEventListener('touchstart', listener)

//       return () => {
//         document.removeEventListener('mousedown', listener)
//         document.removeEventListener('touchstart', listener)
//       }
//     },

//     // wrap handler useCallback before passing it into this hook to avoid unneccessary renders
//     [ref, handler]
//   )
// }

// export default useOnClickOutside
