import { useState, useEffect } from "react"
import { User } from "lucide-react"
import UserCard from "@/layouts/admin/UserCard"
import AddUserModal from "@/layouts/admin/AddUserModel"

export default function Users() {
  const [users, setUsers] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [usersResponse, institutionsResponse] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/institutions"),
        ])

        const usersData = await usersResponse.json()
        const institutionsData = await institutionsResponse.json()

        setUsers(usersData)
        setInstitutions(institutionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setUsers([
          {
            _id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            nationalId: "ID12345",
            institutions: ["1", "2"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "987-654-3210",
            nationalId: "ID67890",
            institutions: ["3"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ])
        setInstitutions([
          { _id: "1", name: "City University" },
          { _id: "2", name: "Tech Institute" },
          { _id: "3", name: "Business School" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddUser = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const newUser = await response.json()
        setUsers([...users, newUser])
        setAddDialogOpen(false)
      }
    } catch (error) {
      const newUser = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setUsers([...users, newUser])
      setAddDialogOpen(false)
    }
  }

  const handleUpdateUser = async (id, data) => {
    const updateData = { ...data }
    if (!updateData.password) delete updateData.password

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUsers(users.map(user => user._id === id ? updatedUser : user))
        setEditingId(null)
      }
    } catch (error) {
      setUsers(users.map(user => 
        user._id === id ? { ...user, ...updateData, updatedAt: new Date().toISOString() } : user
      ))
      setEditingId(null)
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" })
      setUsers(users.filter(user => user._id !== id))
    } catch (error) {
      setUsers(users.filter(user => user._id !== id))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <AddUserModal
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          institutions={institutions}
          onAddUser={handleAddUser}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No users found</h3>
          <p className="text-muted-foreground">Get started by adding a new user.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              institutions={institutions}
              editingId={editingId}
              formatDate={formatDate}
              onStartEditing={setEditingId}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          ))}
        </div>
      )}
    </div>
  )
}