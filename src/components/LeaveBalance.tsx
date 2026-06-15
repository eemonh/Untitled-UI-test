import { useState } from "react";
import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Heading as AriaHeading,
} from "react-aria-components";
import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { InputField } from "@/components/base/input/input";
import { useToast } from "@/components/base/toast/toast";
import { Plane, RefreshCw01, CalendarMinus01, CalendarCheck01, X } from "@untitledui/icons";
import { cx } from "@/utils/cx";

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

      {/* Custom modal matching the design */}
      <AriaModalOverlay
        isOpen={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        isDismissable
        className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
      >
        <AriaModal
          className={cx(
            "relative w-full max-w-md rounded-2xl bg-white shadow-2xl",
            "entering:animate-in entering:fade-in entering:zoom-in-95 entering:duration-150",
            "exiting:animate-out exiting:fade-out exiting:zoom-out-95 exiting:duration-100",
          )}
        >
          <AriaDialog className="outline-none">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-lg text-fg-quaternary transition hover:bg-gray-100 focus:outline-none"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Body */}
            <div className="flex flex-col gap-5 p-6">
              {/* Featured icon */}
              <div className="flex size-10 items-center justify-center rounded-xl border border-secondary bg-primary shadow-xs">
                <Plane className="size-5 text-fg-quaternary" />
              </div>

              {/* Title & subtitle */}
              <div className="flex flex-col gap-1">
                <AriaHeading slot="title" className="text-lg font-semibold text-gray-900">
                  Update Leave Balance
                </AriaHeading>
                <p className="text-sm text-gray-500">
                  Updating leave balance will be reflected to the employee
                </p>
              </div>

              {/* Fields — pre-filled with current values */}
              <div className="flex flex-col gap-4">
                <InputField
                  label="Annual Leave"
                  value={draftAnnual}
                  onChange={setDraftAnnual}
                  placeholder="e.g. 147"
                  type="number"
                />
                <InputField
                  label="Sick Leave"
                  value={draftSick}
                  onChange={setDraftSick}
                  placeholder="e.g. 70.2"
                  type="number"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-3 px-6 pb-6">
              <Button size="md" color="secondary" onPress={() => setIsModalOpen(false)} className="w-full justify-center">
                Cancel
              </Button>
              <Button size="md" color="primary" onPress={handleSave} className="w-full justify-center">
                Update
              </Button>
            </div>
          </AriaDialog>
        </AriaModal>
      </AriaModalOverlay>
    </>
  );
};
