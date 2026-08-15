import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn('inline-flex w-full gap-1 rounded-lg border border-rule bg-sunk p-1', className)} {...props} />
))
TabsList.displayName = 'TabsList'

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex-1 rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors',
      'data-[state=active]:bg-sheet data-[state=active]:text-seal data-[state=active]:shadow-[var(--shadow-sm)]',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn('mt-4', className)} {...props} />)
TabsContent.displayName = 'TabsContent'
