import { SidebarTrigger } from '../ui/sidebar';

export function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <SidebarTrigger />
        <div className="flex-1" />
      </div>
    </header>
  );
}
