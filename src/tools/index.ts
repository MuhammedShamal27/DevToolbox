import { ToolModule } from '@/types';
import { Base64Tool } from './base64/Base64Tool';
import { PasswordGeneratorTool } from './password-generator/PasswordGeneratorTool';
import { YamlDiffTool } from './yaml-diff/YamlDiffTool';
import { FileType, Lock, KeyRound, FileDiff } from 'lucide-react';

export const tools: ToolModule[] = [
  {
    id: 'base64',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings safely.',
    icon: FileType,
    component: Base64Tool,
    category: 'Formatting',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords.',
    icon: KeyRound,
    component: PasswordGeneratorTool,
    category: 'Generators',
  },
  {
    id: 'yaml-diff',
    name: 'YAML Diff Checker',
    description: 'Compare two YAML configurations side-by-side.',
    icon: FileDiff,
    component: YamlDiffTool,
    category: 'Utilities',
  },
];
