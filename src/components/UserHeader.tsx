import { BadgeWithDot, BadgeWithIcon, Badge } from "@/components/base/badges/badges";
import {
  Briefcase01,
  Pin01,
  Phone01,
  Mail01,
  Users01,
  Signal01,
} from "@untitledui/icons";

export const UserHeader = () => (
  <div className="bg-primary rounded-xl border border-secondary shadow-xs px-4 py-4 flex items-center gap-4">
    {/* Avatar */}
    <div className="shrink-0 size-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-utility-brand-100 flex items-center justify-center">
      <span className="text-lg font-bold text-utility-brand-700 select-none">AS</span>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-1.5 min-w-0">
      {/* Name + badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl font-bold text-primary">Aarti Sharma</span>
        <BadgeWithDot type="pill-color" color="success" size="sm">
          Active
        </BadgeWithDot>
        <Badge type="modern" size="sm">
          Direct Supports
        </Badge>
        <BadgeWithIcon type="modern" size="sm" iconLeading={Users01}>
          Part Time
        </BadgeWithIcon>
        <BadgeWithIcon type="modern" size="sm" iconLeading={Signal01}>
          Level 2.2
        </BadgeWithIcon>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="flex items-center gap-1.5 text-sm text-tertiary">
          <Briefcase01 className="size-4 shrink-0 text-fg-quaternary" />
          Support Worker
        </span>
        <span className="flex items-center gap-1.5 text-sm text-tertiary">
          <Pin01 className="size-4 shrink-0 text-fg-quaternary" />
          Joined 4 years ago
        </span>
        <span className="flex items-center gap-1.5 text-sm text-tertiary">
          <Phone01 className="size-4 shrink-0 text-fg-quaternary" />
          0416 638 601
        </span>
        <span className="flex items-center gap-1.5 text-sm text-tertiary">
          <Mail01 className="size-4 shrink-0 text-fg-quaternary" />
          shakwat.au@gmail.com
        </span>
      </div>
    </div>
  </div>
);
