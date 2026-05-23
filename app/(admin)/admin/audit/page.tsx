'use client'

import { ScrollText, Clock, Filter } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

const AUDIT_LOGS = [
  { id: 1, action: 'User Login', user: 'admin_user@afri.stream', target: 'User: user_001', timestamp: '2025-05-21 14:23:45', status: 'success' },
  { id: 2, action: 'Content Approved', user: 'admin_mod_02@afri.stream', target: 'Track: song_234', timestamp: '2025-05-21 13:51:12', status: 'success' },
  { id: 3, action: 'Revenue Adjustment', user: 'admin_finance@afri.stream', target: 'Artist: artist_567', timestamp: '2025-05-21 12:30:00', status: 'success' },
  { id: 4, action: 'User Suspended', user: 'admin_security@afri.stream', target: 'User: spam_bot_789', timestamp: '2025-05-21 11:45:23', status: 'success' },
  { id: 5, action: 'Payment Processed', user: 'admin_finance@afri.stream', target: 'Label: label_123', timestamp: '2025-05-21 10:12:34', status: 'success' },
  { id: 6, action: 'Settings Changed', user: 'admin_sys@afri.stream', target: 'System: streaming_limit', timestamp: '2025-05-20 16:05:22', status: 'success' },
  { id: 7, action: 'Content Removed', user: 'admin_mod_01@afri.stream', target: 'Movie: movie_456', timestamp: '2025-05-20 14:30:15', status: 'success' },
  { id: 8, action: 'Data Export', user: 'admin_analytics@afri.stream', target: 'Report: monthly_stats', timestamp: '2025-05-20 09:20:00', status: 'success' },
]

export default function AuditLogsPage() {
  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Audit Logs"
        description="View all system actions and administrative activities"
        icon={ScrollText}
      />

      {/* Filters */}
      <div className="px-4 lg:px-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by action or user..."
          className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Logs Table */}
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="p-3">Action</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3 font-medium text-foreground">{log.action}</td>
                    <td className="p-3 text-muted-foreground text-xs">{log.user}</td>
                    <td className="p-3 text-primary font-mono text-xs">{log.target}</td>
                    <td className="p-3 text-muted-foreground text-xs">{log.timestamp}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400 font-medium">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 lg:px-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-8 of 1,234 audit logs</p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50">
            Previous
          </button>
          <button className="rounded-lg border border-primary bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
            1
          </button>
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
            2
          </button>
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
            3
          </button>
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
            Next
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mx-4 rounded-lg border border-border bg-card p-4 space-y-2 lg:mx-6">
        <div className="flex gap-2">
          <Clock className="size-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Logs Retention</p>
            <p className="text-xs text-muted-foreground">Audit logs are retained for 90 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
