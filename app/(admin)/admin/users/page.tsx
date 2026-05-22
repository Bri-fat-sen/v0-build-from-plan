"use client"
import { useState } from "react"
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Shield, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const users = Array.from({ length: 20 }, (_, i) => ({
  id: `u${i + 1}`,
  name: ["Kofi Mensah", "Amara Diallo", "Ngozi Okafor", "Sipho Dlamini", "Fatima Al-Rashid",
         "Kwame Asante", "Aisha Mohammed", "Tendai Mukoyi", "Chidi Eze", "Naledi Dube",
         "Omar Hassan", "Zainab Kamara", "Emmanuel Boateng", "Priya Nair", "Yaw Darko",
         "Miriam Abubakar", "Dakarai Moyo", "Seun Adeleke", "Blessing Obi", "Abdi Warsame"][i],
  email: `user${i + 1}@example.com`,
  tier: ["Free", "Basic", "Premium", "Platinum"][Math.floor(Math.random() * 4)],
  role: i === 0 ? "Admin" : i < 3 ? "Moderator" : "Listener",
  country: ["Ghana", "Senegal", "Nigeria", "South Africa", "Ethiopia", "Kenya", "Zimbabwe", "Cameroon", "UK", "USA"][i % 10],
  joined: `${["Jan","Feb","Mar","Apr","May","Jun"][Math.floor(Math.random() * 6)]} 2025`,
  status: i % 7 === 0 ? "suspended" : "active",
}))

const tierColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground",
  Basic: "bg-blue-500/15 text-blue-400",
  Premium: "bg-primary/15 text-primary",
  Platinum: "bg-accent/15 text-accent",
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const filtered = users.filter(u =>
    (filter === "All" || u.tier === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search))
  )

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">Browse, search, and manage platform users</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tabular-nums text-muted-foreground">2.45M total</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {["All", "Free", "Basic", "Premium", "Platinum"].map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={cn("rounded-md px-3 py-1 text-xs font-medium transition-colors",
                filter === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}>{t}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">User</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Country</th>
                <th className="p-3 text-xs text-muted-foreground">Tier</th>
                <th className="p-3 text-xs text-muted-foreground hidden md:table-cell">Role</th>
                <th className="p-3 text-xs text-muted-foreground hidden lg:table-cell">Joined</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
                <th className="p-3 text-xs text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-3 hidden text-muted-foreground sm:table-cell">{user.country}</td>
                  <td className="p-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tierColors[user.tier])}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="p-3 hidden text-muted-foreground md:table-cell">{user.role}</td>
                  <td className="p-3 hidden text-muted-foreground lg:table-cell">{user.joined}</td>
                  <td className="p-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs",
                      user.status === "active" ? "bg-green-500/15 text-green-400" : "bg-destructive/15 text-destructive"
                    )}>{user.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {user.status === "active"
                        ? <button title="Suspend" className="rounded p-1 text-muted-foreground hover:text-destructive"><UserX className="size-4" /></button>
                        : <button title="Activate" className="rounded p-1 text-muted-foreground hover:text-green-400"><UserCheck className="size-4" /></button>
                      }
                      <button title="Promote" className="rounded p-1 text-muted-foreground hover:text-primary"><Shield className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border p-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of 2,450,000 users</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Previous</button>
            <button className="rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
