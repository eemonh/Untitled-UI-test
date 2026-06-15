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
import { Bank, CreditCard01, Hash01, Building01, X } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export interface BankDetailsProps {
  bankName?: string;
  bsb?: string;
  accountNumber?: string;
  className?: string;
}

export const BankDetails = ({
  bankName: initialBank = "Commweath",
  bsb: initialBsb = "454 666",
  accountNumber: initialAccount = "045 854 454",
  className,
}: BankDetailsProps) => {
  const [bankName, setBankName] = useState(initialBank);
  const [bsb, setBsb] = useState(initialBsb);
  const [accountNumber, setAccountNumber] = useState(initialAccount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftBank, setDraftBank] = useState("");
  const [draftBsb, setDraftBsb] = useState("");
  const [draftAccount, setDraftAccount] = useState("");

  const openModal = () => {
    setDraftBank("");
    setDraftBsb("");
    setDraftAccount("");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (draftBank.trim()) setBankName(draftBank.trim());
    if (draftBsb.trim()) setBsb(draftBsb.trim());
    if (draftAccount.trim()) setAccountNumber(draftAccount.trim());
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        title="Bank Details"
        icon={<Bank className="size-4" />}
        action={
          <Button size="sm" color="secondary" onPress={openModal}>
            Update
          </Button>
        }
        className={className}
      >
        <div className="flex gap-6">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <Building01 className="size-4 text-fg-quaternary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-secondary">Bank</span>
              <span className="text-sm text-tertiary">{bankName}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <Hash01 className="size-4 text-fg-quaternary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-secondary">BSB</span>
              <span className="text-sm text-tertiary">{bsb}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <CreditCard01 className="size-4 text-fg-quaternary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-secondary">Account Number</span>
              <span className="text-sm text-tertiary">{accountNumber}</span>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Custom modal matching the design */}
      <AriaModalOverlay
        isOpen={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        isDismissable
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
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
                <Bank className="size-5 text-fg-quaternary" />
              </div>

              {/* Title & subtitle */}
              <div className="flex flex-col gap-1">
                <AriaHeading slot="title" className="text-lg font-semibold text-gray-900">
                  Update Bank Details
                </AriaHeading>
                <p className="text-sm text-gray-500">New Bank Details of the employee</p>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4">
                <InputField
                  label="Bank Name"
                  value={draftBank}
                  onChange={setDraftBank}
                  placeholder="Bank Name"
                  required
                />
                <InputField
                  label="BSB Number"
                  value={draftBsb}
                  onChange={setDraftBsb}
                  placeholder="000 000"
                  required
                />
                <InputField
                  label="Account Number"
                  value={draftAccount}
                  onChange={setDraftAccount}
                  placeholder="000 000 000"
                  required
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
