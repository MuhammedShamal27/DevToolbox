import { LucideIcon } from 'lucide-react';

export interface ToolModule {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
  category: 'Cryptography' | 'Formatting' | 'Generators' | 'Utilities';
}
