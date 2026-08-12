"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  User,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import logOut from "@/app/service/logout"

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gears", href: "/gear", icon: FolderKanban },
  { label: "Log In", href: "/auth/login", icon: BarChart3 },
  { label: "Register", href: "/auth/register", icon: Users },
]

const userMenuItems = [
  { label: "Profile", href: "#profile", icon: User },
  { label: "Settings", href: "#settings", icon: Settings },
  { label: "Billing", href: "#billing", icon: CreditCard },
]

type NavProps = {
  user: {
    id: string,
    name: string,
    email: string,
    role: string,
    iat:number,
    exp: number
  }
}

export function Navbar({user} : NavProps) {
  const [activeHref, setActiveHref] = useState(navLinks[0].href)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            {/* A */} G 
          </span>
          <span className="text-lg">GearUp</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveHref(link.href)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                activeHref === link.href && "text-foreground",
              )}
              aria-current={activeHref === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="relative size-9 rounded-full p-0" aria-label="Open user menu" />
              }
            >
              <Avatar className="size-9">
                <AvatarImage src="/diverse-avatars.png" alt="Jane Cooper" />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    <span className="text-xs font-normal text-muted-foreground">Role: {user.role}</span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} onClick={() => 

                  console.log("[v0] navigate:", 
                    // item.href
                  )
                  
                  }>
                    <item.icon data-icon="inline-start" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => 
                    console.log("[v0] log out")
                    // logOut()
                    

                  }
                >
                  <LogOut data-icon="inline-start" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile nav links */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHref(link.href)
                setMobileOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                activeHref === link.href && "bg-accent text-accent-foreground",
              )}
              aria-current={activeHref === link.href ? "page" : undefined}
            >
              <link.icon className="size-4" />
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
