import { useRef } from "react";
import Draggable from "react-draggable";

function TextLayer({ item, isSelected, isExporting, onSelect, onUpdate }) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{ x: item.x, y: item.y }}
      onDrag={(_, data) => onUpdate(item.id, { x: data.x, y: data.y })}
      onStop={(_, data) => onUpdate(item.id, { x: data.x, y: data.y })}
    >
      <div
        ref={nodeRef}
        className="absolute left-0 top-0 z-10 max-w-[92%] cursor-move touch-none select-none"
        onMouseDown={() => onSelect(item.id)}
        onTouchStart={() => onSelect(item.id)}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`Select text layer: ${item.value}`}
          onFocus={() => onSelect(item.id)}
          className={`min-w-28 rounded-md px-3 py-2 text-center transition ${
            isSelected && !isExporting
              ? "bg-slate-950/15 ring-2 ring-pink-500"
              : "bg-transparent"
          }`}
          style={{
            width: `${item.width}%`,
            color: item.color,
            fontFamily: item.fontFamily,
            fontSize: `${item.fontSize}px`,
            fontWeight: 900,
            lineHeight: 0.95,
            textAlign: item.align,
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.65)",
            textTransform: item.uppercase ? "uppercase" : "none",
            WebkitTextStroke: `${item.strokeWidth}px ${item.strokeColor}`,
          }}
        >
          <span className="block whitespace-pre-wrap break-words">
            {item.value || "Text"}
          </span>
        </div>
      </div>
    </Draggable>
  );
}

export default TextLayer;
