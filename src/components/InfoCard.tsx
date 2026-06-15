import { cx } from "@/utils/cx";

export interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard = ({ icon, title, badge, action, children, className }: InfoCardProps) => (
  <div className={cx("bg-primary rounded-xl border border-secondary shadow-xs flex flex-col", className)}>
    <div className="flex p-4 items-center justify-between border-b border-secondary">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-full bg-brand-secondary">
          {icon}
        </div>
        <span className="text-md font-semibold text-primary">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge}
        {action}
      </div>
    </div>
    <div className="p-4 flex-1 flex flex-col gap-4">{children}</div>
  </div>
);