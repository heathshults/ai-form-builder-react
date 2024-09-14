export interface IFieldGroups {
  location?: {
    address?: { type: string; label: string };
    address2?: { type: string; label: string };
    city?: { type: string; label: string };
    state?: { type: string; options: string[]; label: string };
    zip?: { type: string; label: string };
  };
  name?: string[];
}

export const DnDFormGroupTypes = {
  DNDFORMGROUP: 'formgroup',
}


export interface GridPartsProps {
  children: React.ReactNode
};
export interface IDragonDropGrid {
  children?: React.ReactNode
};
export interface IDragonDropGridContainer {
  children?: React.ReactNode
  col: number;
  row: number;
};

export interface IDragonDropGridCanvas {
  children?: React.ReactNode
  width?: number | string;
  height?: number | string;
};