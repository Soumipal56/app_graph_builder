import { LayoutGrid, GitBranch, Activity, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutGrid, label: 'Apps' },
  { icon: GitBranch, label: 'Graph' },
  { icon: Activity, label: 'Monitor' },
  { icon: Settings, label: 'Settings' },
];

export function LeftRail() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:flex flex-col items-center gap-1 py-3 px-2 w-14 border-r bg-background shrink-0"
    >
      {navItems.map(({ icon: Icon, label }) => (
        <button
          key={label}
          title={label}
          aria-label={label}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </nav>
  );
}
