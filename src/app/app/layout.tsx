import { AssetSidebar } from "@/components/asset-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { Separator } from "@/components/ui/separator"


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
                    <SidebarTrigger className="" />
                    <Separator orientation="vertical" className="ml-2 h-4" />
                    <h1 className="text-xl font-semibold"></h1>
                    <span className="text-sm text-muted-foreground"></span>
                </header>
                <ConvexClientProvider>
                  <div className="m-4">
                      {children}
                  </div>
                </ConvexClientProvider>

                
            </SidebarInset>
      </SidebarProvider>
    )
  }