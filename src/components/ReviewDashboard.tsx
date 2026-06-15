import { PayPointReview } from "@/components/PayPointReview";
import { ProbationaryPeriod } from "@/components/ProbationaryPeriod";
import { ActivityLog } from "@/components/ActivityLog";
import { LeaveBalance } from "@/components/LeaveBalance";
import { BankDetails } from "@/components/BankDetails";
import {
  Award01,
  Sliders01,
  ClipboardCheck,
  Bank,
  CalendarCheck01,
  BankNote01,
} from "@untitledui/icons";
import type { ActivityItem } from "@/components/ActivityLog";

const activityItems: ActivityItem[] = [
  {
    icon: <Award01 className="size-4" />,
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
    icon: <Sliders01 className="size-4" />,
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
    icon: <ClipboardCheck className="size-4" />,
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
    icon: <Bank className="size-4" />,
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
    icon: <CalendarCheck01 className="size-4" />,
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
    icon: <BankNote01 className="size-4" />,
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

export const ReviewDashboard = () => {
  return (
    <div className="w-full text-left bg-secondary p-6 md:p-8 flex flex-col gap-6 rounded-2xl border border-secondary shadow-sm">
      {/* Top Row: Leave Balance & Bank Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <LeaveBalance />
        <BankDetails />
      </div>

      {/* Second Row: Pay Point Review & Probationary Period */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <PayPointReview
            workedHours={900}
            expectedHours={1978}
            className="h-full"
          />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <ProbationaryPeriod
            progress={40}
            startDate="Jun 1, 2026"
            endDate="Sep 1, 2026"
            className="h-full"
          />
        </div>
      </div>

      {/* Bottom Row: Activity */}
      <div className="w-full">
        <ActivityLog items={activityItems} />
      </div>
    </div>
  );
};
