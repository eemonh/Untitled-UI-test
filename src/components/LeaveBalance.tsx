import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { Plane, RefreshCw01, CalendarMinus01, CalendarCheck01 } from "@untitledui/icons";

export interface LeaveItem {
  label: string;
  hours: number;
  icon?: React.ReactNode;
}

export interface LeaveBalanceProps {
  annualLeaveHours?: number;
  sickLeaveHours?: number;
  onUpdate?: () => void;
  onSyncXero?: () => void;
  className?: string;
}

export const LeaveBalance = ({
  annualLeaveHours = 147,
  sickLeaveHours = 70.2,
  onUpdate,
  onSyncXero,
  className,
}: LeaveBalanceProps) => {
  return (
    <InfoCard
      title="Leave Balance"
      icon={<Plane className="size-4" />}
      action={
        <div className="flex items-center gap-2">
          <Button size="sm" color="secondary" onPress={onUpdate}>
            Update
          </Button>
          <Button size="sm" color="primary" iconLeading={RefreshCw01} onPress={onSyncXero}>
            Sync XERO
          </Button>
        </div>
      }
      className={className}
    >
      <div className="flex gap-8">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
            <CalendarCheck01 className="size-4 text-fg-quaternary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-secondary">Annual Leave</span>
            <span className="text-sm text-tertiary">{annualLeaveHours} Hours</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
            <CalendarMinus01 className="size-4 text-fg-quaternary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-secondary">Sick Leave</span>
            <span className="text-sm text-tertiary">{sickLeaveHours} Hours</span>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
