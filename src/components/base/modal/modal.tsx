import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Heading as AriaHeading,
} from "react-aria-components";
import { X } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, description, children, footer }: ModalProps) => (
  <AriaModalOverlay
    isOpen={isOpen}
    onOpenChange={(open) => !open && onClose()}
    isDismissable
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
  >
    <AriaModal
      className={cx(
        "relative w-full max-w-md rounded-2xl bg-primary shadow-xl ring-1 ring-secondary",
        "entering:animate-in entering:fade-in entering:zoom-in-95 entering:duration-150",
        "exiting:animate-out exiting:fade-out exiting:zoom-out-95 exiting:duration-100",
      )}
    >
      <AriaDialog className="outline-none">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-secondary px-6 py-5">
          <div className="flex flex-col gap-0.5 pr-8">
            <AriaHeading slot="title" className="text-md font-semibold text-primary">
              {title}
            </AriaHeading>
            {description && <p className="text-sm text-tertiary">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg text-fg-quaternary transition hover:bg-primary_hover hover:text-fg-secondary focus:outline-none"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        {children && <div className="flex flex-col gap-4 px-6 py-5">{children}</div>}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-secondary px-6 py-4">
            {footer}
          </div>
        )}
      </AriaDialog>
    </AriaModal>
  </AriaModalOverlay>
);
