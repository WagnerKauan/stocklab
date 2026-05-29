'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent outline-none transition-colors duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-checked:bg-primary data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="
pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0
transition-transform duration-200
translate-x-0.75 data-[state=checked]:translate-x-5.25
"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
