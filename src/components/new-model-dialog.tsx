"use client"

import { useState } from "react"
import { Plus, DollarSign } from "lucide-react"

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
import { Combobox } from "./combobox"
import { NewManufactureDialog } from "./new-manufacture-dialog"

interface NewModelDialogProps {
  onModelCreated?: (model: {
    label: string
    value: string
    manufacture?: number
    modelCategory?: number
    modelPurchase?: number
    modelDailyHire?: number
    modelWeeklyHire?: number
    modelWeight?: number
  }) => void
}

// Sample data - replace with your actual data source
const manufacturers = [
  { label: "Manufacturer A", value: "1" },
  { label: "Manufacturer B", value: "2" },
  { label: "Manufacturer C", value: "3" },
]

const categories = [
  { label: "Equipment", value: "1" },
  { label: "Vehicle", value: "2" },
  { label: "Tool", value: "3" },
  { label: "Furniture", value: "4" },
]

// Required field indicator component
const RequiredIndicator = () => <span className="text-red-500 ml-0.5">*</span>

export function NewModelDialog({ onModelCreated }: NewModelDialogProps) {
  const [open, setOpen] = useState(false)
  const [modelName, setModelName] = useState("")
  const [manufacture, setManufacture] = useState("")
  const [modelCategory, setModelCategory] = useState("")
  const [modelPurchase, setModelPurchase] = useState("")
  const [modelDailyHire, setModelDailyHire] = useState("")
  const [modelWeeklyHire, setModelWeeklyHire] = useState("")
  const [modelWeight, setModelWeight] = useState("")

  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = numericValue.split(".")
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("")
    }

    // Format with 2 decimal places if there's a decimal point
    if (numericValue.includes(".")) {
      const [whole, decimal] = numericValue.split(".")
      return whole + "." + (decimal.length > 2 ? decimal.substring(0, 2) : decimal)
    }

    return numericValue
  }

  const handleSave = () => {
    if (modelName.trim() && manufacture && modelCategory) {
      // Create a new model object
      const newModel = {
        label: modelName,
        value: modelName.toLowerCase().replace(/\s+/g, "-"),
        manufacture: Number(manufacture),
        modelCategory: Number(modelCategory),
        modelPurchase: modelPurchase ? Number(modelPurchase) : undefined,
        modelDailyHire: modelDailyHire ? Number(modelDailyHire) : undefined,
        modelWeeklyHire: modelWeeklyHire ? Number(modelWeeklyHire) : undefined,
        modelWeight: modelWeight ? Number(modelWeight) : undefined,
      }

      // Call the callback with the new model
      if (onModelCreated) {
        onModelCreated(newModel)
      }

      // Reset form and close dialog
      setModelName("")
      setManufacture("")
      setModelCategory("")
      setModelPurchase("")
      setModelDailyHire("")
      setModelWeeklyHire("")
      setModelWeight("")
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Model</DialogTitle>
          <DialogDescription>Create a new asset model to use in your inventory.</DialogDescription>
        </DialogHeader>

        <div className="text-sm text-muted-foreground mb-2">
          Fields marked with <span className="text-red-500">*</span> are required
        </div>

        <div className="grid gap-4 py-4">
          {/* Model Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Model Name
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="col-span-3"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
            />
          </div>

          {/* Manufacturer */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Manufacturer
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3 flex gap-2">
              <Combobox options={manufacturers} value={manufacture} onChange={setManufacture} className="flex-1" />
              <NewManufactureDialog
                onManufactureCreated={(newManufacture) => {
                  console.log("New manufacturer created:", newManufacture)
                  // In a real app, you would add this to your manufacturers list
                }}
              />
            </div>
          </div>

          {/* Model Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Category
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3">
              <Combobox options={categories} value={modelCategory} onChange={setModelCategory} />
            </div>
          </div>

          {/* Model Purchase Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Purchase Price
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3 relative">
              <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                value={modelPurchase}
                onChange={(e) => setModelPurchase(formatCurrency(e.target.value))}
                onBlur={(e) => {
                  // Format to 2 decimal places on blur
                  const value = e.target.value
                  if (value && !value.includes(".")) {
                    setModelPurchase(value + ".00")
                  } else if (value && value.endsWith(".")) {
                    setModelPurchase(value + "00")
                  } else if (value && value.includes(".") && value.split(".")[1].length === 1) {
                    setModelPurchase(value + "0")
                  }
                }}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Model Daily Hire Rate */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Daily Hire Rate
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3 relative">
              <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                value={modelDailyHire}
                onChange={(e) => setModelDailyHire(formatCurrency(e.target.value))}
                onBlur={(e) => {
                  // Format to 2 decimal places on blur
                  const value = e.target.value
                  if (value && !value.includes(".")) {
                    setModelDailyHire(value + ".00")
                  } else if (value && value.endsWith(".")) {
                    setModelDailyHire(value + "00")
                  } else if (value && value.includes(".") && value.split(".")[1].length === 1) {
                    setModelDailyHire(value + "0")
                  }
                }}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Model Weekly Hire Rate */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Weekly Hire Rate
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3 relative">
              <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                value={modelWeeklyHire}
                onChange={(e) => setModelWeeklyHire(formatCurrency(e.target.value))}
                onBlur={(e) => {
                  // Format to 2 decimal places on blur
                  const value = e.target.value
                  if (value && !value.includes(".")) {
                    setModelWeeklyHire(value + ".00")
                  } else if (value && value.endsWith(".")) {
                    setModelWeeklyHire(value + "00")
                  } else if (value && value.includes(".") && value.split(".")[1].length === 1) {
                    setModelWeeklyHire(value + "0")
                  }
                }}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Model Weight */}
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
              Weight
              <RequiredIndicator />
            </FormLabel>
            <div className="col-span-3">
              <Input
                type="number"
                value={modelWeight}
                onChange={(e) => setModelWeight(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Model</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
