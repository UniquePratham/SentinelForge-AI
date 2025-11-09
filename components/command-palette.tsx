'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Home,
  LayoutDashboard,
  Upload,
  Download,
  Settings,
  LogOut,
  FileSearch,
} from 'lucide-react';

interface CommandPaletteProps {
  onUpload?: () => void;
  onExport?: () => void;
}

export function CommandPalette({ onUpload, onExport }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          {/* cleaned */}
        </CommandGroup>
        {(onUpload || onExport) && (
          <CommandGroup heading="Actions">
            {onUpload && (
              <CommandItem onSelect={() => runCommand(onUpload)}>
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload File</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  U
                </kbd>
              </CommandItem>
            )}
            {onExport && (
              <CommandItem onSelect={() => runCommand(onExport)}>
                <Download className="mr-2 h-4 w-4" />
                <span>Export Report</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  E
                </kbd>
              </CommandItem>
            )}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
