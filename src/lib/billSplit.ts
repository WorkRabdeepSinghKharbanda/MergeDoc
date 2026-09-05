export type Person = { name: string; paid: number }
export type Settlement = { from: string; to: string; amount: number }

/** Greedy settle-up: net each person's balance vs. equal share, then match largest debtor to largest creditor. */
export function settleBill(people: Person[]): Settlement[] {
  const total = people.reduce((sum, p) => sum + p.paid, 0)
  const share = people.length > 0 ? total / people.length : 0
  const balances = people.map((p) => ({ name: p.name, balance: p.paid - share }))

  const creditors = balances.filter((b) => b.balance > 0.005).map((b) => ({ ...b })).sort((a, b) => b.balance - a.balance)
  const debtors = balances.filter((b) => b.balance < -0.005).map((b) => ({ ...b, balance: -b.balance })).sort((a, b) => b.balance - a.balance)

  const settlements: Settlement[] = []
  let i = 0
  let j = 0
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].balance, creditors[j].balance)
    settlements.push({ from: debtors[i].name, to: creditors[j].name, amount })
    debtors[i].balance -= amount
    creditors[j].balance -= amount
    if (debtors[i].balance < 0.005) i++
    if (creditors[j].balance < 0.005) j++
  }
  return settlements
}
