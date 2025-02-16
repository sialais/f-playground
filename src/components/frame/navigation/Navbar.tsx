"use client"

import './Navbar.css'

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Tabs } from "radix-ui";

type Page = {
  name: string, 
  href: string
}

class PageRegister {
  pages: Page[];

  constructor(pages: Page[]) {
      this.pages = pages;
  }

  getPageNames() {
      return this.pages.map(p => p.name)
  }

  getPageByName(name: string) : (Page | undefined) {
      const filtered = this.pages.filter(p => p.name === name)
      return filtered.length > 0 ? filtered[0] : undefined
  }

  getPageByHref(href: string) : (Page | undefined) {
      const filtered = this.pages.filter(p => href.startsWith(p.href))
      return filtered.length > 0 ? filtered.at(-1) : undefined
  }

}

const Navbar = (props: { className?: string, routes: Page[] } & React.PropsWithChildren) => {
  const router = useRouter();
  const pathName = usePathname();
  const register = useMemo(() => new PageRegister(props.routes), [props.routes]);
  const current = useMemo(() => register.getPageByHref(pathName), [register, pathName]);
  const [currentLoading, setCurrentLoading] = useState<Page | undefined>(undefined);

  return (
    <Tabs.Root value={current?.name} onValueChange={(pageName) => {
      const targetPage = register.getPageByName(pageName)!;
      setCurrentLoading(targetPage);
      router.push(targetPage?.href);
    }} className={props.className}>
      <Tabs.List className="shrink-0 flex h-full">
        {props.routes.map((r) => (
          <Tabs.Trigger
            key={r.href}
            value={r.name}
            data-loading={r.href === currentLoading?.href && current?.href !== currentLoading.href ? "yes" : "no"}
            className="navbar data-[state=active]:navbar-active data-[loading=yes]:navbar-loading"
          >
            {r.name}
            <div className='indicator absolute'></div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export { Navbar }
export type { Page as PageRoute }