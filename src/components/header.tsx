"use client";

import { CodeViewer } from "@/components/code-viewer";
import { PresetSelector } from "@/components/preset-selector";

export function Header() {
  return (
    <div className="flex flex-shrink-0 flex-col lg:flex-row p-4 border-l border-r border-t border-b rounded-t-md bg-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:flex-grow">
        <div className="flex flex-row items-center justify-between sm:justify-end space-x-2 mt-2 lg:mt-0">
          <div className="flex flex-row items-center space-x-2">
            <PresetSelector />
            <CodeViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
