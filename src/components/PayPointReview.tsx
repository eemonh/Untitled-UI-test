import { InfoCard } from "@/components/InfoCard";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Flag01 } from "@untitledui/icons";

export interface PayPointReviewProps {
  workedHours?: number;
  expectedHours?: number;
  label?: string;
  className?: string;
}

export const PayPointReview = ({
  workedHours = 900,
  expectedHours = 1978,
  label = "Worked Hours vs Expected Hours",
  className,
}: PayPointReviewProps) => {
  return (
    <InfoCard
      title="Pay Point Review"
      icon={<Flag01 className="size-4" />}
      className={className}
    >
      <div className="flex flex-col gap-5 pt-2 pb-3 flex-1 justify-center">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-secondary">{label}</span>
          <span className="font-medium text-tertiary">
            Target:{expectedHours}
          </span>
        </div>
        <div className="w-full pb-3">
          <ProgressBar
            value={workedHours}
            min={0}
            max={expectedHours}
            labelPosition="bottom-floating"
            valueFormatter={(val) => `${val}hrs`}
            className="h-3 w-full"
          />
        </div>
      </div>
    </InfoCard>
  );
};
