import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/base/buttons/button";
import { Bank, CreditCard01, Hash01, Building01 } from "@untitledui/icons";

export interface BankDetailsProps {
  bankName?: string;
  bsb?: string;
  accountNumber?: string;
  onUpdate?: () => void;
  className?: string;
}

export const BankDetails = ({
  bankName = "Commweath",
  bsb = "454 666",
  accountNumber = "045 854 454",
  onUpdate,
  className,
}: BankDetailsProps) => {
  return (
    <InfoCard
      title="Bank Details"
      icon={<Bank className="size-4" />}
      action={
        <Button size="sm" color="secondary" onPress={onUpdate}>
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
  );
};
