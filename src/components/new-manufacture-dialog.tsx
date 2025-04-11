"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormLabel } from "@/components/ui/form"

interface NewManufactureDialogProps {
  onManufactureCreated?: (manufacture: { label: string; value: string }) => void
}

// Required field indicator component
const RequiredIndicator = () => <span className="text-red-500 ml-0.5">*</span>

export function NewManufactureDialog({ onManufactureCreated }: NewManufactureDialogProps) {
  const [open, setOpen] = useState(false)
  const [manufactureName, setManufactureName] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  const handleSave = () => {
    if (manufactureName.trim()) {
      // Create a new manufacture object
      const newManufacture = {
        label: manufactureName,
        value: Date.now().toString(), // Using timestamp as a unique ID
        // You could also include the other fields in a real implementation
      }

      // Call the callback with the new manufacture
      if (onManufactureCreated) {
        onManufactureCreated(newManufacture)
      }

      // Reset form and close dialog
      setManufactureName("")
      setContactName("")
      setContactEmail("")
      setContactPhone("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Manufacturer</DialogTitle>
          <DialogDescription>Create a new manufacturer for your inventory.</DialogDescription>
        </DialogHeader>

        <div className="text-sm text-muted-foreground mb-2">
          Fields marked with <span className="text-red-500">*</span> are required
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Manufacturer Name
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="col-span-3"
              value={manufactureName}
              onChange={(e) => setManufactureName(e.target.value)}
              placeholder="Enter manufacturer name"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Contact Name</FormLabel>
            <Input
              className="col-span-3"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Enter contact person name (optional)"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Contact Email</FormLabel>
            <Input
              className="col-span-3"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Enter contact email (optional)"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Contact Phone</FormLabel>
            <Input
              className="col-span-3"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Enter contact phone (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Manufacturer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
