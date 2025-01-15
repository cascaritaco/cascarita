import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineShortText,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { IconType } from "react-icons";
import styles from "./DraggableButton.module.css";
import { DraggableButtonKeys, DraggableButtonProps } from "./types";
import { GrTextAlignFull } from "react-icons/gr";
import { TiPhoneOutline } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { FaDollarSign } from "react-icons/fa6";

const iconMapping: { [key: string]: IconType } = {
  shorttext: MdOutlineShortText,
  longtext: GrTextAlignFull,
  dateandtime: LuCalendar,
  dropdown: MdOutlineArrowDropDownCircle,
  multiplechoice: FaListUl,
  email: MdOutlineMailOutline,
  phonenumber: TiPhoneOutline,
  payment: FaDollarSign,
};

const DraggableButton: React.FC<DraggableButtonProps> = ({ label, onDrop }) => {
  const { t } = useTranslation("DraggableButtons");
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStop = (_: DraggableEvent, data: DraggableData) => {
    // Define the drop zone area (e.g., x: 100-300, y: 100-300)
    const dropZone = { x1: 190, x2: 500 };

    if (data.x >= dropZone.x1 && data.x <= dropZone.x2) {
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
    <div className={styles.container}>
      <Draggable
        position={dragPosition}
        onStop={handleDragStop}
        onDrag={(_, data) => setDragPosition({ x: data.x, y: data.y })}>
        <button
          className={`${styles.buttonContainer} ${additionalClass} ${
            label === "Payment" ? styles.paymentButton : styles.standardButton
          }`}>
          {IconComponent && <IconComponent />}
          <span className={styles.buttonText}>
            {t(`draggableButtons.${label}` as DraggableButtonKeys)}
          </span>
        </button>
      </Draggable>
      <PlusCircledIcon onClick={onDrop} className={styles.plusIcon} />
    </div>
  );
};

export default DraggableButton;
