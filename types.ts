export interface Example {
  title: string;
  command: string;
  description: string;
  is_offensive: boolean;
}

export interface Tool {
  id: string;
  name: string;
  definition: string;
  function: string;
  requirements: string[];
  installation: string;
  run_command: string;
  examples: Example[];
  mitre_attack_mappings?: string[];
  icon?: 'web' | 'network' | 'generic' | 'exploit' | 'password' | 'wifi' | 'ad' | 'cloud' | 'evasion' | 'social' | 'forensics' | 're' | 'android';
  post_exploitation_guidance?: string[];
}

export interface Category {
  name: string;
  description?: string;
  tools: Tool[];
}