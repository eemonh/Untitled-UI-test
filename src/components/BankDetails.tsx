import { useState } from "react";
import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { Modal } from "@/components/base/modal/modal";
import { InputField } from "@/components/base/input/input";
import { Bank, CreditCard01, Hash01, Building01 } from "@untitledui/icons";

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
  const [draftBank, setDraftBank] = useState(initialBank);
  const [draftBsb, setDraftBsb] = useState(initialBsb);
  const [draftAccount, setDraftAccount] = useState(initialAccount);

  const openModal = () => {
    setDraftBank(bankName);
    setDraftBsb(bsb);
    setDraftAccount(accountNumber);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setBankName(draftBank);
    setBsb(draftBsb);
    setAccountNumber(draftAccount);
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Bank Details"
        description="Edit the bank details for this employee."
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
          label="Bank Name"
          value={draftBank}
          onChange={setDraftBank}
          placeholder="e.g. Commonwealth"
        />
        <InputField
          label="BSB"
          value={draftBsb}
          onChange={setDraftBsb}
          placeholder="e.g. 454 666"
          hint="6-digit BSB number."
        />
        <InputField
          label="Account Number"
          value={draftAccount}
          onChange={setDraftAccount}
          placeholder="e.g. 045 854 454"
        />
      </Modal>
    </>
  );
};
