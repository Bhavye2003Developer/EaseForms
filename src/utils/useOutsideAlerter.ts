import { useEffect, useState } from "react";

export default function useOutsideAlerter(ref: any) {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      let clickedOutside = false;
      if (ref.current && !ref.current.contains(event.target)) {
        clickedOutside = true;
      }
      setIsClickedOutside(clickedOutside);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return isClickedOutside;
}
