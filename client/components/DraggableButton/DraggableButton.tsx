import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { IconType } from "react-icons";
import styles from "./DraggableButton.module.css";
import { MdOutlineShortText } from "react-icons/md";
import { DraggableButtonProps } from "./types";
import { GrTextAlignFull } from "react-icons/gr";

const iconMapping: { [key: string]: IconType } = {
  shorttext: MdOutlineShortText,
  longtext: GrTextAlignFull,
  dateandtime: LuCalendar,
  dropdown: MdOutlineArrowDropDownCircle,
  multiplechoice: FaListUl,
};

const DraggableButton: React.FC<DraggableButtonProps> = ({ label, onDrop }) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    // Define the drop zone area (e.g., x: 100-300, y: 100-300)
    const dropZone = { x1: 190, x2: 500 };

    if (data.x >= dropZone.x1 && data.x <= dropZone.x2) {
      console.log("handling onDrop");
      onDrop();
    }

    // Reset button position (illusion of staying in place)
    setDragPosition({ x: 0, y: 0 });
  };

  const getIcon = (label: string): IconType => {
    const formattedLabel = label.replace(/\s+/g, "").toLowerCase();
    return iconMapping[formattedLabel];
  };

  const IconComponent = getIcon(label);

  const additionalClass =
    label.toLowerCase() === "section"
      ? styles.sectionStyle
      : label.toLowerCase() === "signature"
      ? styles.penStyle
      : "styles.baseStyle";

  return (
    <Draggable
      position={dragPosition}
      onStop={handleDragStop}
      onDrag={(e, data) => setDragPosition({ x: data.x, y: data.y })}
    >
      <button className={`${styles.buttonContainer} ${additionalClass}`}>
        {IconComponent && <IconComponent />}
        {label}
      </button>
    </Draggable>
  );
};

export default DraggableButton;
