import { useMemo, useState } from 'react'
import { calculateSubnet } from '../lib/subnet'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function SubnetCalculator() {
  useDocumentMeta('IP Subnet Calculator Free Online | MergeDoc', 'Calculate network address, broadcast address, and usable host range from a CIDR block, entirely in your browser.')
  const [cidr, setCidr] = useState('192.168.1.0/24')

  const info = useMemo(() => calculateSubnet(cidr), [cidr])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">IP Subnet Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Enter a CIDR block (e.g. 192.168.1.0/24) to see subnet details.</p>

      <input
        type="text"
        value={cidr}
        onChange={(e) => setCidr(e.target.value)}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {info ? (
        <div className="mt-6 space-y-2 text-sm">
          {[
            ['Network address', info.network],
            ['Broadcast address', info.broadcast],
            ['Subnet mask', info.mask],
            ['First usable host', info.firstHost],
            ['Last usable host', info.lastHost],
            ['Total addresses', info.totalHosts.toLocaleString()],
            ['Usable hosts', info.usableHosts.toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">{label}</span>
              <span className="font-mono font-medium">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-red-500">Invalid CIDR notation. Use the form x.x.x.x/prefix.</p>
      )}
    </div>
  )
}
