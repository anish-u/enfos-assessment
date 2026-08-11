import type { LucideIcon } from 'lucide-react';
import { Building2, FolderKanban, Users } from 'lucide-react';
import { REPORT_IDS } from '../../shared/utils';

export const REPORT_ICON_MAP: Record<string, LucideIcon> = {
  [REPORT_IDS.USERS]: Users,
  [REPORT_IDS.DEPARTMENTS]: Building2,
  [REPORT_IDS.PROJECTS]: FolderKanban,
};

export function getReportIcon(iconKey: string): LucideIcon {
  return REPORT_ICON_MAP[iconKey] ?? FolderKanban;
}
