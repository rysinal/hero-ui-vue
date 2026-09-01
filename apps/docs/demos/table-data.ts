export interface TableUser {
  id: number
  name: string
  role: string
  status: string
  email: string
}

export const users: TableUser[] = [
  { email: 'kate@acme.com', id: 1, name: 'Kate Moore', role: 'CEO', status: 'Active' },
  { email: 'john@acme.com', id: 2, name: 'John Smith', role: 'CTO', status: 'Active' },
  { email: 'sara@acme.com', id: 3, name: 'Sara Johnson', role: 'CMO', status: 'On Leave' },
  { email: 'michael@acme.com', id: 4, name: 'Michael Brown', role: 'CFO', status: 'Active' },
  { email: 'emily@acme.com', id: 5, name: 'Emily Davis', role: 'Product Manager', status: 'Inactive' },
  { email: 'chris@acme.com', id: 6, name: 'Chris Wilson', role: 'Designer', status: 'Active' },
  { email: 'olivia@acme.com', id: 7, name: 'Olivia Lee', role: 'Engineer', status: 'Active' },
  { email: 'daniel@acme.com', id: 8, name: 'Daniel Kim', role: 'Engineer', status: 'On Leave' },
]

export const columns = [
  { id: 'name', name: 'Name' },
  { id: 'role', name: 'Role' },
  { id: 'status', name: 'Status' },
  { id: 'email', name: 'Email' },
] as const
