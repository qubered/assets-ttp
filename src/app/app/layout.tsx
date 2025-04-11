import { AssetSidebar } from "@/components/asset-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"


export const metadata = {
    title: "TwoToned RMS"
  }

export default function AppLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <SidebarProvider>
            <AssetSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <span className="text-sm text-muted-foreground">Welcome to your asset management dashboard</span>
                </header>
                <div className="m-4">
                    {children}
                </div>
                
            </SidebarInset>
      </SidebarProvider>
    )
  }