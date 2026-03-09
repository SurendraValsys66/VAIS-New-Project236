import React, { useState } from "react";
import { LandingPageBlock } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnhancedSettingsPanelProps {
  block: LandingPageBlock | null;
  onBlockUpdate: (block: LandingPageBlock) => void;
  onBlockDelete: () => void;
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => (
  <div>
    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
      {label}
    </Label>
    <div className="flex gap-2">
      <Input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 cursor-pointer"
      />
      <Input
        type="text"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 focus:ring-valasys-orange focus:ring-2"
        placeholder="#000000"
      />
    </div>
  </div>
);

export const EnhancedSettingsPanel: React.FC<EnhancedSettingsPanelProps> = ({
  block,
  onBlockUpdate,
  onBlockDelete,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["content"])
  );

  if (!block) {
    return (
      <div className="bg-white border-l border-gray-200 p-4 h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          Select a block to edit properties and styling
        </p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const props = block.properties;

  const renderContentSettings = () => {
    switch (block.type) {
      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Logo Text
              </Label>
              <Input
                type="text"
                value={props.logoText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, logoText: e.target.value },
                  })
                }
                placeholder="Your Logo"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                CTA Button Text
              </Label>
              <Input
                type="text"
                value={props.ctaButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, ctaButtonText: e.target.value },
                  })
                }
                placeholder="Get Started"
              />
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Headline
              </Label>
              <Input
                type="text"
                value={props.headline || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, headline: e.target.value },
                  })
                }
                placeholder="Your Headline"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Subheading
              </Label>
              <Input
                type="text"
                value={props.subheading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, subheading: e.target.value },
                  })
                }
                placeholder="Your subheading"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                CTA Button Text
              </Label>
              <Input
                type="text"
                value={props.ctaButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, ctaButtonText: e.target.value },
                  })
                }
                placeholder="Learn More"
              />
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <textarea
                value={props.description || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, description: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Number of Columns
              </Label>
              <Select
                value={String(props.columns || 4)}
                onValueChange={(val) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, columns: parseInt(val) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Content
              </Label>
              <textarea
                value={props.content || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, content: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                rows={3}
              />
            </div>
          </div>
        );

      case "contact-form":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <Input
                type="text"
                value={props.description || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, description: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Button Text
              </Label>
              <Input
                type="text"
                value={props.submitButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, submitButtonText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <h3 className="font-semibold text-gray-900 text-sm capitalize">
          {block.type.replace("-", " ")} Settings
        </h3>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          onClick={onBlockDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-gray-50 px-4">
            <TabsTrigger value="content" className="rounded-none border-b-2">
              Content
            </TabsTrigger>
            <TabsTrigger value="styling" className="rounded-none border-b-2">
              Styling
            </TabsTrigger>
            <TabsTrigger value="spacing" className="rounded-none border-b-2">
              Spacing
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="p-4 space-y-4">
            {renderContentSettings()}
          </TabsContent>

          {/* Styling Tab */}
          <TabsContent value="styling" className="p-4 space-y-4">
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("backgroundColor")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Colors
                </span>
                {expandedSections.has("backgroundColor") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("backgroundColor") && (
                <div className="space-y-3">
                  <ColorPicker
                    label="Background Color"
                    value={props.backgroundColor || "#ffffff"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, backgroundColor: value },
                      })
                    }
                  />
                  <ColorPicker
                    label="Text Color"
                    value={props.textColor || "#000000"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, textColor: value },
                      })
                    }
                  />
                  <ColorPicker
                    label="Button Color"
                    value={props.submitButtonColor || "#FF6A00"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, submitButtonColor: value },
                      })
                    }
                  />
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("typography")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Typography
                </span>
                {expandedSections.has("typography") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("typography") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Font Family
                    </Label>
                    <Select
                      value={props.fontFamily || "system"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, fontFamily: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System (Sans-serif)</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Font Size (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.fontSize || "16"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, fontSize: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Font Weight
                    </Label>
                    <Select
                      value={props.fontWeight || "400"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, fontWeight: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light</SelectItem>
                        <SelectItem value="400">Regular</SelectItem>
                        <SelectItem value="600">Semibold</SelectItem>
                        <SelectItem value="700">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Line Height
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={props.lineHeight || "1.5"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, lineHeight: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("effects")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Effects
                </span>
                {expandedSections.has("effects") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("effects") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Border Radius (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.borderRadius || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, borderRadius: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Shadow
                    </Label>
                    <Select
                      value={props.shadow || "none"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, shadow: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Opacity (%)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={props.opacity || "100"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, opacity: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="p-4 space-y-4">
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("padding")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Padding
                </span>
                {expandedSections.has("padding") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("padding") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Padding Top (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.paddingTop || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, paddingTop: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Padding Bottom (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.paddingBottom || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, paddingBottom: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Padding Left (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.paddingLeft || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, paddingLeft: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Padding Right (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.paddingRight || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, paddingRight: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("margin")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Margin
                </span>
                {expandedSections.has("margin") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("margin") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Margin Top (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.marginTop || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, marginTop: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Margin Bottom (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.marginBottom || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, marginBottom: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Margin Left (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.marginLeft || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, marginLeft: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Margin Right (px)
                    </Label>
                    <Input
                      type="number"
                      value={props.marginRight || "0"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, marginRight: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("dimensions")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Dimensions
                </span>
                {expandedSections.has("dimensions") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("dimensions") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Min Height (px)
                    </Label>
                    <Input
                      type="text"
                      value={props.minHeight || "auto"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, minHeight: e.target.value },
                        })
                      }
                      placeholder="auto"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Max Height (px)
                    </Label>
                    <Input
                      type="text"
                      value={props.maxHeight || "auto"}
                      onChange={(e) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, maxHeight: e.target.value },
                        })
                      }
                      placeholder="auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
