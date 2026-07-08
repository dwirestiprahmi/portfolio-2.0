import * as React from "react";

// Each icon is a list of filled [x, y] cells on an 8x8 grid, drawn as 1-unit rects with crisp edges. Fill is currentColor, so icons inherit the link's text color and hover along with it — no brand colors, palette stays intact.
type Cell = [number, number];

const ICONS = {
  mail: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [1, 2],
    [6, 2],
    [2, 3],
    [5, 3],
    [3, 4],
    [4, 4],
  ],
  github: [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [1, 0],
    [2, 0],
    [1, 1],
    [1, 6],
    [1, 7],
    [2, 7],
    [5, 0],
    [6, 0],
    [5, 1],
    [6, 1],
    [3, 3],
    [4, 3],
    [5, 2],
  ],
  linkedin: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [2, 2],
    [2, 4],
    [2, 5],
    [4, 3],
    [4, 4],
    [4, 5],
    [5, 3],
    [6, 3],
    [6, 4],
    [6, 5],
  ],
  generic: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [3, 3],
    [4, 3],
    [3, 4],
    [4, 4],
  ],
} satisfies Record<string, Cell[]>;

export type PixelIconName = keyof typeof ICONS;

type PixelIconProps = React.SVGProps<SVGSVGElement> & { name: PixelIconName };

export function PixelIcon({ name, ...props }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 8 8"
      width={14}
      height={14}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
      {...props}
    >
      {ICONS[name].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  );
}
