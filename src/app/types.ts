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