import { useEffect } from "react";

const useOutSIdeAlerterProduct = (ref, clickedCart, action) => {
  console.log("bug");
  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (
        ref.current != undefined &&
        ref.current &&
        ref.current.classList.contains("show") &&
        !ref.current.contains(event.target) &&
        clickedCart
      ) {
        console.log("bug2");
        action();
      }
    }
    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
  }, [ref]);
};

export { useOutSIdeAlerterProduct };
