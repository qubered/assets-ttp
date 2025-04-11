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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewLocationDialogProps {
  onLocationCreated?: (location: {
    label: string
    value: string
    addressStreet1?: string
    addressStreet2?: string
    addressSuburb?: string
    addressPostcode?: number
    addressState?: string
  }) => void
}

// Australian states for the dropdown
const australianStates = [
  { label: "New South Wales", value: "NSW" },
  { label: "Victoria", value: "VIC" },
  { label: "Queensland", value: "QLD" },
  { label: "Western Australia", value: "WA" },
  { label: "South Australia", value: "SA" },
  { label: "Tasmania", value: "TAS" },
  { label: "Australian Capital Territory", value: "ACT" },
  { label: "Northern Territory", value: "NT" },
]

// Required field indicator component
const RequiredIndicator = () => <span className="text-red-500 ml-0.5">*</span>

export function NewLocationDialog({ onLocationCreated }: NewLocationDialogProps) {
  const [open, setOpen] = useState(false)
  const [locationName, setLocationName] = useState("")
  const [locationAddressStreet1, setLocationAddressStreet1] = useState("")
  const [locationAddressStreet2, setLocationAddressStreet2] = useState("")
  const [locationAddressSuburb, setLocationAddressSuburb] = useState("")
  const [locationAddressPostcode, setLocationAddressPostcode] = useState("")
  const [locationAddressState, setLocationAddressState] = useState("")
  const [postcodeError, setPostcodeError] = useState("")

  const validatePostcode = (value: string) => {
    // Clear previous error
    setPostcodeError("")

    // Allow empty string during typing
    if (!value) return true

    // Check if it's a valid number
    const numValue = Number(value)
    if (isNaN(numValue)) {
      setPostcodeError("Postcode must be a number")
      return false
    }

    return true
  }

  const handleSave = () => {
    // Validate required fields
    if (!locationName.trim()) {
      return // Location name is required
    }

    if (
      !locationAddressStreet1.trim() ||
      !locationAddressSuburb.trim() ||
      !locationAddressPostcode ||
      !locationAddressState
    ) {
      return // Required address fields
    }

    // Validate postcode is a number
    if (!validatePostcode(locationAddressPostcode)) {
      return
    }

    // Create a new location object
    const newLocation = {
      label: locationName,
      value: locationName.toLowerCase().replace(/\s+/g, "-"),
      addressStreet1: locationAddressStreet1,
      addressStreet2: locationAddressStreet2 || undefined,
      addressSuburb: locationAddressSuburb,
      addressPostcode: Number(locationAddressPostcode),
      addressState: locationAddressState,
    }

    // Call the callback with the new location
    if (onLocationCreated) {
      onLocationCreated(newLocation)
    }

    // Reset form and close dialog
    setLocationName("")
    setLocationAddressStreet1("")
    setLocationAddressStreet2("")
    setLocationAddressSuburb("")
    setLocationAddressPostcode("")
    setLocationAddressState("")
    setPostcodeError("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>Create a new storage location for your assets.</DialogDescription>
        </DialogHeader>

        <div className="text-sm text-muted-foreground mb-2">
          Fields marked with <span className="text-red-500">*</span> are required
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Location Name
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="col-span-3"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Warehouse A"
            />
          </div>

          <div className="my-2">
            <h3 className="text-sm font-medium mb-2 text-center">Address Details</h3>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Street Address
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="col-span-3"
              value={locationAddressStreet1}
              onChange={(e) => setLocationAddressStreet1(e.target.value)}
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Street Address 2</FormLabel>
            <Input
              className="col-span-3"
              value={locationAddressStreet2}
              onChange={(e) => setLocationAddressStreet2(e.target.value)}
              placeholder="Suite 101 (Optional)"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Suburb
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="col-span-3"
              value={locationAddressSuburb}
              onChange={(e) => setLocationAddressSuburb(e.target.value)}
              placeholder="Sydney"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Postcode
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3">
              <Input
                value={locationAddressPostcode}
                onChange={(e) => {
                  setLocationAddressPostcode(e.target.value)
                  validatePostcode(e.target.value)
                }}
                placeholder="2000"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {postcodeError && <p className="text-sm text-red-500 mt-1">{postcodeError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              State
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3">
              <Select value={locationAddressState} onValueChange={setLocationAddressState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {australianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Location</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
