import React, { useEffect, useRef } from "react";
import { DraggableSubMenuProps } from "./types";
import TrashBinIcon from "../../assets/TrashBinIcon";

const DraggableSubMenu: React.FC<DraggableSubMenuProps> = ({
  onDelete,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: 0,
        right: "-150px",
        width: "140px",
        padding: "8px",
        borderLeft: "1px solid #AAAAAA",
      }}>
      <button type="button" onClick={onDelete}>
        <TrashBinIcon width={20} height={20} color={"#AAAAAA"} />
      </button>
    </div>
  );
};

export default DraggableSubMenu;
