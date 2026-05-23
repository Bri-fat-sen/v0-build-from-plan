import { SkeletonRow } from "@/components/afristream-loader"

export default function LibraryLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
      {/* Filter row */}
      <div className="flex justify-between">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-white/10" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
      </div>
      {/* Playlist rows */}
      <div className="space-y-1">
        {[...Array(12)].map((_, i) => (
          <SkeletonRow key={i} className="animate-pulse" />
        ))}
      </div>
    </div>
  )
}
