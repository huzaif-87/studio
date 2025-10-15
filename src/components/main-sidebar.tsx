'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Code2,
  Home,
  Lightbulb,
  BrainCircuit,
  BotMessageSquare
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learning-path', label: 'Learning Paths', icon: BrainCircuit },
  { href: '/code-generator', label: 'Code Generator', icon: Code2 },
  { href: '/project-ideas', label: 'Project Ideas', icon: Lightbulb },
  { href: '/concept-explainer', label: 'Concept Explainer', icon: BookOpen },
  { href: '/ai-guide', label: 'AI Guide', icon: BotMessageSquare },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <BotMessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-headline font-semibold text-foreground group-data-[state=collapsed]:hidden">Zenith Flow</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
