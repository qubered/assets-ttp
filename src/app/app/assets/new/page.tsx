import { AssetForm } from "@/components/asset-form"

export default function NewAssetPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Asset</h1>
      <AssetForm />
    </div>
  )
}
