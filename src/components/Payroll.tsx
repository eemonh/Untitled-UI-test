import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { CoinsHand } from "@untitledui/icons";

export interface PayrollItem {
  label: string;
  value: string;
}

export interface PayrollProps {
  items?: PayrollItem[];
  onUpdate?: () => void;
  className?: string;
}

const defaultItems: PayrollItem[] = [
  { label: "Ordinary Hours", value: "$27.15" },
  { label: "Weekday Evening", value: "$30.54" },
  { label: "Sleepover", value: "$120" },
  { label: "Overnight Hours", value: "$31.22" },
  { label: "STA", value: "$704" },
  { label: "KM", value: "$0.78" },
  { label: "Saturday", value: "$40.73" },
  { label: "Sunday", value: "$54.3" },
  { label: "Public Holiday", value: "$67.88" },
  { label: "Overtime", value: "$40.73" },
];

export const Payroll = ({
  items = defaultItems,
  onUpdate,
  className,
}: PayrollProps) => {
  const row1 = items.slice(0, 6);
  const row2 = items.slice(6);

  return (
    <InfoCard
      title="Payroll (services)"
      icon={<CoinsHand className="size-4" />}
      action={
        <Button size="sm" color="secondary" onPress={onUpdate}>
          Update
        </Button>
      }
      className={className}
    >
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-5">
          {row1.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-secondary">{item.label}</span>
              <span className="text-sm text-tertiary">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border-secondary" />

        {/* Row 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-5">
          {row2.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-secondary">{item.label}</span>
              <span className="text-sm text-tertiary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </InfoCard>
  );
};
