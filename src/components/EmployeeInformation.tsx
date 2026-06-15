import { InfoCard } from "@/components/InfoCard";
import {
  User01,
  Briefcase01,
  Dataflow01,
  Award01,
  Flag01,
  ClipboardCheck,
  UserSquare,
  Target01,
  Hourglass01,
} from "@untitledui/icons";
import type { FC } from "react";

interface InfoField {
  icon: FC<{ className?: string }>;
  label: string;
  value: string;
}

interface EmployeeInformationProps {
  department?: string;
  employeeType?: string;
  awardLevel?: string;
  commenced?: string;
  position?: string;
  manager?: string;
  payPoint?: string;
  hoursWorked?: string;
  className?: string;
}

const Field = ({ icon: Icon, label, value }: InfoField) => (
  <div className="flex items-start gap-2.5">
    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
      <Icon className="size-4 text-fg-quaternary" />
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-semibold text-secondary">{label}</span>
      <span className="text-sm text-tertiary">{value}</span>
    </div>
  </div>
);

export const EmployeeInformation = ({
  department = "Direct Supports",
  employeeType = "Part Time",
  awardLevel = "1",
  commenced = "Jun 1, 2027",
  position = "Support Worker",
  manager = "Candace Matthews",
  payPoint = "2",
  hoursWorked = "1402",
  className,
}: EmployeeInformationProps) => {
  const row1: InfoField[] = [
    { icon: Briefcase01, label: "Department", value: department },
    { icon: Dataflow01, label: "Employee Type", value: employeeType },
    { icon: Award01, label: "Award level", value: awardLevel },
    { icon: Flag01, label: "Commenced", value: commenced },
  ];

  const row2: InfoField[] = [
    { icon: ClipboardCheck, label: "Position", value: position },
    { icon: UserSquare, label: "Manager", value: manager },
    { icon: Target01, label: "Pay Point", value: payPoint },
    { icon: Hourglass01, label: "Hours Worked", value: hoursWorked },
  ];

  return (
    <InfoCard
      title="Information"
      icon={<User01 className="size-4" />}
      className={className}
    >
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5">
          {row1.map((field) => (
            <Field key={field.label} {...field} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5">
          {row2.map((field) => (
            <Field key={field.label} {...field} />
          ))}
        </div>
      </div>
    </InfoCard>
  );
};
