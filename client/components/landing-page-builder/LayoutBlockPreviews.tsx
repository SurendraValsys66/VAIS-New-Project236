import React from "react";
import { LandingPageBlock } from "./types";

interface BlockPreviewProps {
  block: LandingPageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (props: Record<string, any>) => void;
}

export const SectionBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 rounded-lg ${
        isSelected ? "border-valasys-orange" : "border-gray-300"
      }`}
      style={{
        backgroundColor: props.backgroundColor,
        padding: props.padding,
        minHeight: props.minHeight,
      }}
    >
      <div className="min-h-full">
        {block.children && block.children.length > 0 ? (
          <div className="space-y-4">
            {block.children.map((child) => (
              <div key={child.id} className="text-gray-500 text-sm p-4 bg-gray-50 rounded">
                {child.type} block
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span>Section - drop blocks here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RowBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 rounded-lg p-4 ${
        isSelected ? "border-valasys-orange" : "border-gray-300"
      }`}
      style={{
        display: props.display || "grid",
        gridTemplateColumns: props.gridTemplateColumns || "repeat(12, 1fr)",
        gap: props.gap || "16px",
      }}
    >
      {block.children && block.children.length > 0 ? (
        block.children.map((child) => (
          <div
            key={child.id}
            style={{
              gridColumn: `${child.properties.gridColumnStart || 1} / span ${
                (child.properties.gridColumnEnd || 7) -
                (child.properties.gridColumnStart || 1)
              }`,
            }}
            className="bg-gray-50 p-3 rounded text-sm text-gray-500"
          >
            Column
          </div>
        ))
      ) : (
        <div className="col-span-12 flex items-center justify-center h-20 text-gray-400">
          <span>Row - 12 column grid</span>
        </div>
      )}
    </div>
  );
};

export const ColumnBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all rounded-lg flex items-center justify-center ${
        isSelected
          ? "border-2 border-valasys-orange bg-orange-50"
          : "border border-dashed border-gray-300 bg-gray-50"
      }`}
      style={{
        minHeight: props.minHeight || "100px",
        padding: props.padding || "16px",
      }}
    >
      <div className="text-center text-gray-500 text-sm">
        <p className="font-medium">Column</p>
        <p className="text-xs mt-1">
          Grid: {props.gridColumnStart || 1} - {props.gridColumnEnd || 7}
        </p>
      </div>
    </div>
  );
};
