function ipToInt(ip: string): number | null {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return null
  return parts.reduce((acc, p) => acc * 256 + p, 0) >>> 0
}

function intToIp(n: number): string {
  return [24, 16, 8, 0].map((shift) => (n >>> shift) & 255).join('.')
}

export type SubnetInfo = {
  network: string
  broadcast: string
  mask: string
  firstHost: string
  lastHost: string
  totalHosts: number
  usableHosts: number
}

export function calculateSubnet(cidr: string): SubnetInfo | null {
  const [ip, prefixStr] = cidr.split('/')
  const prefix = Number(prefixStr)
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null
  const ipInt = ipToInt(ip)
  if (ipInt === null) return null

  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const network = ipInt & maskInt
  const broadcast = network | (~maskInt >>> 0)
  const totalHosts = 2 ** (32 - prefix)
  const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts

  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast >>> 0),
    mask: intToIp(maskInt),
    firstHost: intToIp(totalHosts > 2 ? network + 1 : network),
    lastHost: intToIp(totalHosts > 2 ? (broadcast >>> 0) - 1 : broadcast >>> 0),
    totalHosts,
    usableHosts,
  }
}
