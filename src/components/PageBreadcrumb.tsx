import { Building01, ChevronRight } from "@untitledui/icons";

export const PageBreadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-tertiary mb-4">
    <Building01 className="size-4 shrink-0 text-fg-quaternary" />
    <ChevronRight className="size-4 shrink-0 text-fg-quaternary" />
    <span className="font-medium text-secondary">Employee Pay</span>
  </nav>
);
