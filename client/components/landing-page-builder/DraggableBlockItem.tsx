import React from "react";
import { useDrag } from "react-dnd";
import { LandingPageBlock } from "./types";

interface DraggableBlockItemProps {
  block: LandingPageBlock;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const DraggableBlockItem: React.FC<DraggableBlockItemProps> = ({
  block,
  label,
  onClick,
  icon,
}) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "BLOCK_ITEM",
      item: { ...block, sourceId: "sidebar" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [block]
  );

  return (
    <div
      ref={dragRef}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-valasys-orange transition-colors cursor-move ${
        isDragging ? "opacity-50 bg-orange-50" : ""
      }`}
      title={`Drag to add or click for variants`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{label}</span>
      </div>
    </div>
  );
};
