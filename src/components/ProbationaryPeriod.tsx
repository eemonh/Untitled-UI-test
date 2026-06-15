import { InfoCard } from "@/components/InfoCard";
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";
import { ClipboardCheck } from "@untitledui/icons";

export interface ProbationaryPeriodProps {
  progress?: number;
  startDate?: string;
  endDate?: string;
  className?: string;
}

export const ProbationaryPeriod = ({
  progress = 40,
  startDate = "Jun 1, 2026",
  endDate = "Sep 1, 2026",
  className,
}: ProbationaryPeriodProps) => {
  return (
    <InfoCard
      title="Probationary Period"
      icon={<ClipboardCheck className="size-4" />}
      className={className}
    >
      <div className="flex items-center justify-between gap-6 py-0 flex-1">
        {/* Circular Progress Bar */}
        <div className="flex-shrink-0">
          <ProgressBarCircle
            value={progress}
            min={0}
            max={100}
            size="xs"
            label="Completed"
          />
        </div>

        {/* Start & End Dates */}
        <div className="flex flex-col gap-4 flex-1 max-w-[160px]">
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-secondary">Start</span>
            <div className="border border-secondary bg-primary rounded-lg px-3 py-1.5 text-xs font-semibold text-primary shadow-xs">
              {startDate}
            </div>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-secondary">End</span>
            <div className="border border-secondary bg-primary rounded-lg px-3 py-1.5 text-xs font-semibold text-primary shadow-xs">
              {endDate}
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
