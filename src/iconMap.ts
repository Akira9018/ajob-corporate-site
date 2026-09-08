export type IconName = 'idea' | 'ai-advisory' | 'dialogue' | 'workflow' | 'line-connect' | 'community' | 'improve' | 'journal' | 'plan' | 'build';

export const serviceIcons: Record<string, IconName> = {
  'ai-advisory': 'ai-advisory',
  'line-app': 'line-connect',
  'regional-portal': 'community',
};
export const articleIcons: Record<string, IconName> = {
  'ai-advisory': 'idea',
  'line-app': 'workflow',
  'regional-portal': 'community',
};
export const processIcons: readonly IconName[] = ['dialogue', 'plan', 'build'];
export const articleSectionIcons: readonly IconName[] = ['idea', 'workflow', 'improve', 'journal'];
