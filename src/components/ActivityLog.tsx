import { InfoCard } from "@/components/InfoCard";
import { FeaturedIcon } from "@/components/featured-icon";
import { Activity } from "@untitledui/icons";
import type { ReactElement } from "react";

// ─── Timeline Item ────────────────────────────────────────────────────────────

export interface ActivityItem {
  /** Icon element rendered inside the FeaturedIcon */
  icon: ReactElement;
  /** Bold title text */
  title: string;
  /** Name of the person who made the change */
  changedBy: string;
  /** Description paragraph — supports JSX so callers can bold inline values */
  description: ReactElement | string;
}

type TimelineItemProps = ActivityItem;

const TimelineItem = ({
  icon,
  title,
  changedBy,
  description,
}: TimelineItemProps) => (
  <div className="bg-primary border border-secondary rounded-xl p-4 shadow-xs flex items-start gap-4 relative w-full z-10">
    <FeaturedIcon icon={icon} color="gray" theme="modern" size="sm" />
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-primary">{title}</span>
        <span className="text-xs text-tertiary">
          Changed By:{" "}
          <span className="font-semibold text-secondary">{changedBy}</span>
        </span>
      </div>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  </div>
);

// ─── Activity ─────────────────────────────────────────────────────────────────

export interface ActivityProps {
  items?: ActivityItem[];
  className?: string;
}

const defaultItems: ActivityItem[] = [
  {
    icon: <Activity className="size-4" />,
    title: "Award level",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Award level changed by{" "}
        <span className="font-semibold text-primary">Zahir Hossain</span> from{" "}
        <span className="font-semibold text-primary">1</span> to{" "}
        <span className="font-semibold text-primary">2</span>
      </>
    ),
  },
  {
    icon: <Activity className="size-4" />,
    title: "Pay Point",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Pay point rolled over to 0 hours on{" "}
        <span className="font-semibold text-primary">15/06/2026</span> as{" "}
        <span className="font-semibold text-primary">1978 hours</span> have
        been completed.
      </>
    ),
  },
  {
    icon: <Activity className="size-4" />,
    title: "Probation Period",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Probation period extended by{" "}
        <span className="font-semibold text-primary">Zahir Hossain</span> from{" "}
        <span className="font-semibold text-primary">Sep 2, 2026</span> to{" "}
        <span className="font-semibold text-primary">Jan 4, 2027</span>
      </>
    ),
  },
  {
    icon: <Activity className="size-4" />,
    title: "Bank Account Updated",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Bank details changed by{" "}
        <span className="font-semibold text-primary">Zahir Hossain</span> on{" "}
        <span className="font-semibold text-primary">Sep 3, 2026</span>
      </>
    ),
  },
  {
    icon: <Activity className="size-4" />,
    title: "Leave Balance Updated",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Leave balance updated by{" "}
        <span className="font-semibold text-primary">Zahir Hossain</span> on{" "}
        <span className="font-semibold text-primary">Sep 3, 2026</span>
      </>
    ),
  },
  {
    icon: <Activity className="size-4" />,
    title: "Payroll",
    changedBy: "Zahir Hossain",
    description: (
      <>
        Salary increased by{" "}
        <span className="font-semibold text-primary">Zahir Hossain</span> for
        Ordinary hours{" "}
        <span className="font-semibold text-primary">$24.56</span> to{" "}
        <span className="font-semibold text-primary">$45.67</span>
      </>
    ),
  },
];

export const ActivityLog = ({ items = defaultItems, className }: ActivityProps) => {
  return (
    <InfoCard
      title="Activity"
      icon={<Activity className="size-4" />}
      className={className}
    >
      {/* Timeline Wrapper */}
      <div className="relative flex flex-col gap-4 py-2">
        {/* Vertical Connector Line */}
        <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-secondary z-0" />

        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </InfoCard>
  );
};
