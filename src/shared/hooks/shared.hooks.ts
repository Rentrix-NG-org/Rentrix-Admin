import { RefObject, useEffect, useState } from "react";

export const useMenuPosition = (menuRef: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ top: -45, left: -140 });

  useEffect(() => {
    const calculateOptimalPosition = () => {
      if (!menuRef.current) return;

      const menu = menuRef.current;
      const menuRect = menu.getBoundingClientRect();
      const parentRect = menu.parentElement?.getBoundingClientRect();
      const container = menu
        .closest("[data-table-container]")
        ?.getBoundingClientRect();

      if (!parentRect || !container) return;

      let optimalTop = position.top;
      let optimalLeft = position.left;

      // Calculate vertical position
      const overflowBottom = menuRect.bottom > container.bottom;
      const overflowTop = menuRect.top < container.top;

      if (overflowBottom) {
        optimalTop = -(menuRect.height + -80);
      } else if (overflowTop) {
        optimalTop = 10;
      }

      // Calculate horizontal position
      const overflowRight = menuRect.right > container.right;
      const overflowLeft = menuRect.left < container.left;

      if (overflowRight) {
        optimalLeft = -(menuRect.width - parentRect.width);
      } else if (overflowLeft) {
        optimalLeft = 0;
      }

      setPosition({ top: optimalTop, left: optimalLeft });
    };

    calculateOptimalPosition();

    const resizeObserver = new ResizeObserver(calculateOptimalPosition);
    if (menuRef.current) {
      resizeObserver.observe(menuRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [menuRef.current]);

  return position;
};
