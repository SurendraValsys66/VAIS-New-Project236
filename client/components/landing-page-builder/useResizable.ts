import { useRef, useState, useEffect } from "react";
import { LandingPageBlock } from "./types";

interface ResizeHandle {
  position: string;
  className: string;
  cursor: string;
  onMouseDown: (e: React.MouseEvent) => void;
}

interface ResizeState {
  resizeHandles: ResizeHandle[];
  blockSize: { width?: number; height?: number };
}

export const useResizable = (
  block: LandingPageBlock,
  onUpdate: (props: Record<string, any>) => void
): ResizeState => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [blockWidth, setBlockWidth] = useState<number | undefined>(
    block.properties.width ? parseInt(block.properties.width as string) : undefined
  );
  const [blockHeight, setBlockHeight] = useState<number | undefined>(
    block.properties.height ? parseInt(block.properties.height as string) : undefined
  );

  const createResizeHandler = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - resizeStart.x;
      const deltaY = moveEvent.clientY - resizeStart.y;

      // Update dimensions based on direction
      if (
        direction.includes("right") &&
        blockWidth !== undefined &&
        blockWidth + deltaX > 100
      ) {
        const newWidth = blockWidth + deltaX;
        setBlockWidth(newWidth);
        onUpdate({ width: `${newWidth}px` });
      }

      if (
        direction.includes("bottom") &&
        blockHeight !== undefined &&
        blockHeight + deltaY > 100
      ) {
        const newHeight = blockHeight + deltaY;
        setBlockHeight(newHeight);
        onUpdate({ height: `${newHeight}px` });
      }

      // Reset start position for continuous resize
      setResizeStart({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resizeHandles: ResizeHandle[] = [
    {
      position: "top-right",
      className: "top-0 right-0 -translate-y-1 translate-x-1",
      cursor: "nesw-resize",
      onMouseDown: createResizeHandler("right-bottom"),
    },
    {
      position: "bottom-right",
      className: "bottom-0 right-0 translate-y-1 translate-x-1",
      cursor: "nwse-resize",
      onMouseDown: createResizeHandler("right-bottom"),
    },
    {
      position: "bottom-left",
      className: "bottom-0 left-0 translate-y-1 -translate-x-1",
      cursor: "nesw-resize",
      onMouseDown: createResizeHandler("left-bottom"),
    },
    {
      position: "top-left",
      className: "top-0 left-0 -translate-y-1 -translate-x-1",
      cursor: "nwse-resize",
      onMouseDown: createResizeHandler("left-top"),
    },
  ];

  return {
    resizeHandles,
    blockSize: { width: blockWidth, height: blockHeight },
  };
};
