import React from "react";
import { useDraggable } from "@dnd-kit/core";

type SidebarItemProps = {
  id: string;
  label: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = {
    padding: "10px",
    border: "1px solid #ccc",
    margin: "10px 0",
    background: "#f9f9f9",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
};

type SidebarProps = {
  items: SidebarItemProps[];
};

const FormSideBar: React.FC<SidebarProps> = ({ items }) => (
  <div
    style={{
      width: "200px",
      padding: "10px",
      border: "1px solid #ccc",
      height: "80vh",
    }}
  >
    <h3>Form Elements</h3>
    {items.map((item) => (
      <SidebarItem key={item.id} id={item.id} label={item.label} />
    ))}
  </div>
);

export default FormSideBar;
