import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface SyncedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

function clamp(v: number): number {
  return Math.min(100, Math.max(0, v));
}

export function SyncedSlider({ value, onChange }: SyncedSliderProps) {
  return (
    <div className="flex gap-3 items-center">
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={([v]) => onChange(clamp(v))}
        className="flex-1"
      />
      <Input
        id="capacity-input"
        type="number"
        value={value}
        min={0}
        max={100}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="w-20 text-right bg-muted/40 tabular-nums"
      />
    </div>
  );
}
