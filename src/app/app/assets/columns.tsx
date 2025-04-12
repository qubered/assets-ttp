"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Doc } from ".@/convex/_generated/dataModel"
import { DataTableColumnHeader } from "@/components/data-table-column-header"

// Extended asset type with the processed fields
type ExtendedAsset = Doc<"assets"> & {
  modelName: string
  manufacturerName: string
  fullModelName: string
  locationName: string
}

export const columns: ColumnDef<ExtendedAsset>[] = [
  {
    accessorKey: "assetNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Asset Tag" />,
    cell: ({ row }) => {
      return <span className="font-semibold">{row.original.assetNumber}</span>
    },
    meta: {
      label: "Asset Tag",
    },
  },
  {
    accessorKey: "assetName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    meta: {
      label: "Name",
    },
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Serial Number" />,
    meta: {
      label: "Serial Number",
    },
  },
  {
    // Use the pre-processed field for searching
    accessorKey: "fullModelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Model" />,
    meta: {
      label: "Model",
    },
  },
  {
    // Use the pre-processed field for searching
    accessorKey: "locationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Storage Location" />,
    meta: {
      label: "Storage Location",
    },
  },
  {
    accessorKey: "_creationTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      return new Date(row.original._creationTime).toLocaleDateString("en-AU")
    },
    meta: {
      label: "Created At",
    },
  },
]
