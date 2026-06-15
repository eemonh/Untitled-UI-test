import { useState } from "react";
import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { Modal } from "@/components/base/modal/modal";
import { InputField } from "@/components/base/input/input";
import { useToast } from "@/components/base/toast/toast";
import { Plane, RefreshCw01, CalendarMinus01, CalendarCheck01 } from "@untitledui/icons";

export interface LeaveBalanceProps {
  annualLeaveHours?: number;
  sickLeaveHours?: number;
  className?: string;
}

export const LeaveBalance = ({
  annualLeaveHours: initialAnnual = 147,
  sickLeaveHours: initialSick = 70.2,
  className,
}: LeaveBalanceProps) => {
  const { showToast } = useToast();

  const [annualLeaveHours, setAnnualLeaveHours] = useState(initialAnnual);
  const [sickLeaveHours, setSickLeaveHours] = useState(initialSick);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [draftAnnual, setDraftAnnual] = useState(String(initialAnnual));
  const [draftSick, setDraftSick] = useState(String(initialSick));

  const openModal = () => {
    setDraftAnnual(String(annualLeaveHours));
    setDraftSick(String(sickLeaveHours));
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const annual = parseFloat(draftAnnual);
    const sick = parseFloat(draftSick);
    if (!isNaN(annual)) setAnnualLeaveHours(annual);
    if (!isNaN(sick)) setSickLeaveHours(sick);
    setIsModalOpen(false);
  };

  const handleSyncXero = async () => {
    setIsSyncing(true);
    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => (Math.random() > 0.25 ? resolve(null) : reject()), 2000),
      );
      showToast({
        type: "success",
        title: "XERO sync successful",
        message: "Leave balances have been updated from XERO.",
      });
    } catch {
      showToast({
        type: "error",
        title: "XERO sync failed",
        message: "Could not connect to XERO. Please try again.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <InfoCard
        title="Leave Balance"
        icon={<Plane className="size-4" />}
        action={
          <div className="flex items-center gap-2">
            <Button size="sm" color="secondary" onPress={openModal} isDisabled={isSyncing}>
              Update
            </Button>
            <Button
              size="sm"
              color="primary"
              iconLeading={RefreshCw01}
              onPress={handleSyncXero}
              isLoading={isSyncing}
              showTextWhileLoading
            >
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Leave Balance"
        description="Edit the leave balances for this employee."
        footer={
          <>
            <Button size="md" color="secondary" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="md" color="primary" onPress={handleSave}>
              Save changes
            </Button>
          </>
        }
      >
        <InputField
          label="Annual Leave (Hours)"
          value={draftAnnual}
          onChange={setDraftAnnual}
          placeholder="e.g. 147"
          type="number"
          hint="Total annual leave hours available."
        />
        <InputField
          label="Sick Leave (Hours)"
          value={draftSick}
          onChange={setDraftSick}
          placeholder="e.g. 70.2"
          type="number"
          hint="Total sick leave hours available."
        />
      </Modal>
    </>
  );
};
