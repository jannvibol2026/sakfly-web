import { Skeleton } from "@/components/ui/skeleton";

/**
 * loading.tsx — 01-frontend-architecture.md §7.2, 02-design-system.md §14.1.
 * Shape-matched to the Dashboard's real layout (stat cards, tiles, list)
 * to avoid layout shift on data arrival.
 */
export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-9 w-64" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
