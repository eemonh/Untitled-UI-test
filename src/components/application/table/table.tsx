import { useState } from "react";
import { FilterLines, Plus, SearchLg, UploadCloud02 } from "@untitledui/icons";
import type { Key } from "react-aria-components";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { TabList, Tabs } from "../tabs/tabs";

const viewTabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

export const TableNoVendorsFound = () => {
    const [selectedTab, setSelectedTab] = useState<Key>("all");

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Vendor movements"
                badge="240 vendors"
                description="Keep track of vendor and their security ratings."
                contentTrailing={
                    <>
                        <div className="flex gap-3 md:pr-9">
                            <Button color="secondary" size="sm" iconLeading={UploadCloud02}>
                                Import
                            </Button>
                            <Button size="sm" iconLeading={Plus}>
                                Add vendor
                            </Button>
                        </div>
                        <div className="absolute top-5 right-4 md:right-6">
                            <DropdownIconSimple />
                        </div>
                    </>
                }
            />

            <div className="flex flex-wrap gap-3 border-b border-secondary px-4 py-3 max-md:flex-col md:px-6">
                <div className="flex min-w-0 flex-1 flex-wrap gap-3">
                    <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} className="w-auto">
                        <TabList size="sm" type="button-minimal" items={viewTabs} />
                    </Tabs>
                </div>
                <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                    <Input shortcut className="min-w-0 max-md:flex-1 md:w-70" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                    <Button color="secondary" size="sm" iconLeading={FilterLines} className="max-md:hidden">
                        Filters
                    </Button>
                    <Button aria-label="Filters" color="secondary" size="sm" iconLeading={FilterLines} className="md:hidden" />
                </div>
            </div>

            <div className="flex items-center justify-center overflow-hidden px-8 py-20">
                <EmptyState size="sm">
                    <EmptyState.Header pattern="none">
                        <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                    </EmptyState.Header>

                    <EmptyState.Content>
                        <EmptyState.Title>No vendors found</EmptyState.Title>
                        <EmptyState.Description>
                            Your search “Stripe” did not match any vendors. Please try again or create add a new vendor.
                        </EmptyState.Description>
                    </EmptyState.Content>

                    <EmptyState.Footer>
                        <Button size="sm" color="secondary">
                            Clear search
                        </Button>
                        <Button size="sm" iconLeading={Plus}>
                            New project
                        </Button>
                    </EmptyState.Footer>
                </EmptyState>
            </div>

            <PaginationCardMinimal align="right" />
        </TableCard.Root>
    );
};