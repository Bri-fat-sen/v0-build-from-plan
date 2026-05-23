'use client'

import { Settings as SettingsIcon, Save, Key, Shield } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="System Settings"
        description="Configure AfriStream platform settings"
        icon={SettingsIcon}
      />

      {/* General Settings */}
      <div className="px-4 lg:px-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">General Settings</h2>
          
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Platform Name</span>
              <input
                type="text"
                value="AfriStream"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Support Email</span>
              <input
                type="email"
                value="support@afri.stream"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Support Phone</span>
              <input
                type="tel"
                value="+27 (0) 800 123 456"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Streaming Settings */}
      <div className="px-4 lg:px-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Streaming Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="size-4 rounded accent-primary" />
                <span className="text-sm font-medium text-foreground">Enable Offline Downloads</span>
              </label>
              <p className="text-xs text-muted-foreground mt-1 ml-7">Allow users to download content for offline listening</p>
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="size-4 rounded accent-primary" />
                <span className="text-sm font-medium text-foreground">Enable Spatial Audio</span>
              </label>
              <p className="text-xs text-muted-foreground mt-1 ml-7">Support for immersive audio formats</p>
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="size-4 rounded accent-primary" />
                <span className="text-sm font-medium text-foreground">Enable Data Saver Mode</span>
              </label>
              <p className="text-xs text-muted-foreground mt-1 ml-7">Allow reduced quality streaming for lower bandwidth</p>
            </div>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-foreground">Max Concurrent Streams per User</span>
              <select className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>1 Device</option>
                <option selected>2 Devices</option>
                <option>4 Devices</option>
                <option>Unlimited</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Royalty Settings */}
      <div className="px-4 lg:px-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Royalty Settings</h2>
          
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Artist Revenue Share (%)</span>
              <input
                type="number"
                value={55}
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Minimum Payout Threshold</span>
              <input
                type="text"
                value="$50 USD"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Payout Schedule</span>
              <select className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Monthly</option>
                <option selected>Bi-weekly</option>
                <option>Weekly</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="px-4 lg:px-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="size-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">API Configuration</h2>
          </div>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between rounded-lg bg-secondary/20 p-3">
              <div>
                <p className="text-sm font-mono text-primary truncate">sk_live_abc123def456...</p>
                <p className="text-xs text-muted-foreground">Live API Key</p>
              </div>
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Rotate</button>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-secondary/20 p-3">
              <div>
                <p className="text-sm font-mono text-primary truncate">sk_test_xyz789uvw012...</p>
                <p className="text-xs text-muted-foreground">Test API Key</p>
              </div>
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Rotate</button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Permissions */}
      <div className="px-4 lg:px-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Staff Permissions</h2>
          </div>
          
          <div className="space-y-3 pt-2">
            {[
              { role: 'Admin', email: 'admin@afri.stream', perms: 'Full Access' },
              { role: 'Moderator', email: 'mod@afri.stream', perms: 'Content Moderation' },
              { role: 'Finance', email: 'finance@afri.stream', perms: 'Royalties & Payouts' },
            ].map((staff, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{staff.email}</p>
                  <p className="text-xs text-muted-foreground">{staff.role} • {staff.perms}</p>
                </div>
                <button className="text-xs font-medium text-red-400 hover:text-red-300">Remove</button>
              </div>
            ))}
          </div>

          <button className="w-full rounded-lg border border-primary/50 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10">
            + Add Staff Member
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4 lg:px-6 flex gap-3 pb-6">
        <button className="rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90 flex items-center gap-2">
          <Save className="size-4" />
          Save Settings
        </button>
        <button className="rounded-lg border border-border px-6 py-2.5 font-medium text-foreground hover:bg-muted">
          Cancel
        </button>
      </div>
    </div>
  )
}
