"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export default function AssetsPage() {
  const assetsResult = useQuery(api.tasks.getAssets) ?? []
  const modelResults = useQuery(api.tasks.getModels) ?? []
  const manufactureResults = useQuery(api.tasks.getManufactures) ?? []
  const locationResults = useQuery(api.tasks.getLocations) ?? []

  // Pre-process the data to include the resolved values for filtering
  const processedData = useMemo(() => {
    return assetsResult.map((asset) => {
      // Find the model and manufacturer
      const model = modelResults.find((m) => m._id === asset.assetModel)
      const manufacturer = manufactureResults.find((m) => m._id === model?.manufacture)

      // Find the location
      const location = locationResults.find((l) => l._id === asset.storageLocation)

      // Return the asset with additional properties for searching
      return {
        ...asset,
        // Add searchable fields
        modelName: model?.modelName || "",
        manufacturerName: manufacturer?.manufactureName || "",
        fullModelName: `${manufacturer?.manufactureName || ""} ${model?.modelName || ""}`,
        locationName: location?.locationName || "",
      }
    })
  }, [assetsResult, modelResults, manufactureResults, locationResults])

  // Define columns that should be hidden by default
  const hiddenColumnsByDefault = ["serialNumber", "_creationTime"]

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Assets</h1>
        <Button asChild>
          <Link href="/app/assets/new">
            <Plus className="mr-2 h-4 w-4" />
            New Asset
          </Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={processedData} hiddenColumns={hiddenColumnsByDefault} />
      </div>
    </div>
  )
}
