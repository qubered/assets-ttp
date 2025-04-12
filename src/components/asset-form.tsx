"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Combobox } from "./combobox"
import { NewModelDialog } from "./new-model-dialog"
import { NewLocationDialog } from "./new-location-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


// Simplified form schema without model-specific details
const formSchema = z.object({
  assetNumber: z.string().min(1, { message: "Asset number is required" }),
  assetName: z.string().optional(),
  assetModel: z.string().min(1, { message: "Asset model is required" }),
  storageLocation: z.string().min(1, { message: "Storage location is required" }),
  purchaseDate: z.date({
    required_error: "Purchase date is required",
  }),
})

// Required field indicator component


export function AssetForm() {
  const createAsset = useMutation(api.tasks.createAsset);
  const models = useQuery(api.tasks.getModels);
  const manufacturers = useQuery(api.tasks.getManufactures);
  const locations = useQuery(api.tasks.getLocations);

  const shortModels =
    models?.map((model) => {
      const manufacturer = manufacturers?.find(m => m._id === model.manufacture);
      return {
        value: model._id,
        label: `${manufacturer?.manufactureName} ${model.modelName}`,
      };
    }) ?? [];

  const shortLocations = 
    locations?.map((location) => {
      return {
        value: `${location._id}`,
        label: location.locationName
      };
    }) ?? [];

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetNumber: "",
      assetName: "",
      assetModel: "",
      storageLocation: "",
      purchaseDate: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const newAsset = await createAsset({
      assetNumber: values.assetNumber,
      assetName: values.assetName,
      assetModel: values.assetModel, // Convert string to number
      storageLocation: values.storageLocation, // Convert string to number
      assetPurchaseDate: values.purchaseDate.toISOString() // Convert Date to ISO string
    })
    alert("Asset created successfully!")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Number */}
              <FormField
                control={form.control}
                name="assetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Asset Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Asset Name (Optional) */}
              <FormField
                control={form.control}
                name="assetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset name (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Asset Model */}
              <FormField
                control={form.control}
                name="assetModel"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Asset Model
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Combobox options={shortModels} {...field} className="flex-1" />
                      </FormControl>
                      <NewModelDialog
                        onModelCreated={(newModel) => {
                          // Add the new model to the models array
                          // In a real app, you would likely call an API here
                          console.log("New model created:", newModel)
                          // For demo purposes, we're just logging it
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Storage Location */}
              <FormField
                control={form.control}
                name="storageLocation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Storage Location
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Combobox options={shortLocations} {...field} className="flex-1" />
                      </FormControl>
                      <NewLocationDialog
                        onLocationCreated={(newLocation) => {
                          // Add the new location to the locations array
                          // In a real app, you would likely call an API here
                          console.log("New location created:", newLocation)
                          // For demo purposes, we're just logging it
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Purchase Date */}
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Purchase Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Create Asset</Button>
        </div>
      </form>
    </Form>
  )
}
