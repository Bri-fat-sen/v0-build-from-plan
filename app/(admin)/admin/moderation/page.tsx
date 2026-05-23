'use client'

import { ShieldAlert, CheckCircle, Clock, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

const FLAGGED_CONTENT = [
  { id: 1, type: 'Track', title: 'Song Title', artist: 'Artist Name', reason: 'Copyright Claim', status: 'pending', date: '2025-05-21' },
  { id: 2, type: 'Movie', title: 'Film Title', studio: 'Studio Name', reason: 'Explicit Content', status: 'reviewed', date: '2025-05-20' },
  { id: 3, type: 'Comment', author: 'User123', content: 'Inappropriate text...', reason: 'Hate Speech', status: 'pending', date: '2025-05-21' },
  { id: 4, type: 'Profile', user: 'Creator Name', reason: 'Fraud Report', status: 'investigating', date: '2025-05-19' },
  { id: 5, type: 'Video', title: 'Creator Video', creator: 'Creator Name', reason: 'Misinformation', status: 'approved', date: '2025-05-18' },
]

const STATUSES = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
  reviewed: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Reviewed' },
  investigating: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Investigating' },
  approved: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Approved' },
}

export default function ModerationPage() {
  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Content Moderation"
        description="Review flagged content and manage compliance"
        icon={ShieldAlert}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 lg:px-6">
        {[
          { label: 'Pending Review', value: '12', icon: Clock },
          { label: 'Investigating', value: '8', icon: ShieldAlert },
          { label: 'Resolved', value: '342', icon: CheckCircle },
          { label: 'Deleted', value: '45', icon: Trash2 },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4 text-center">
            <stat.icon className="mx-auto size-5 text-primary mb-2" />
            <p className="text-2xl font-mono font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Flagged Content Table */}
      <div className="px-4 lg:px-6">
        <h2 className="font-display font-semibold text-foreground mb-3">Flagged Content</h2>
        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="p-3">Type</th>
                  <th className="p-3">Title / Author</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {FLAGGED_CONTENT.map((item) => {
                  const statusStyle = STATUSES[item.status as keyof typeof STATUSES]
                  return (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-3 font-mono text-xs text-primary">{item.type}</td>
                      <td className="p-3 text-foreground font-medium">
                        {item.title || item.content || item.user || 'N/A'}
                      </td>
                      <td className="p-3 text-muted-foreground text-xs">{item.reason}</td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground text-xs">{item.date}</td>
                      <td className="p-3">
                        <button className="text-primary hover:text-primary/80 text-xs font-medium">Review</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 lg:px-6">
        <h2 className="font-display font-semibold text-foreground mb-3">Recent Actions</h2>
        <div className="space-y-2">
          {[
            { action: 'Content Removed', user: 'Admin-01', time: '2 hours ago' },
            { action: 'User Warned', user: 'Admin-02', time: '5 hours ago' },
            { action: 'Account Suspended', user: 'Admin-03', time: '1 day ago' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <p className="text-xs text-muted-foreground">by {log.user}</p>
              </div>
              <p className="text-xs text-muted-foreground">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
