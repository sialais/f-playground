"use client"

import UITabSwitch from "@/components/widget/UITabSwitch";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react"
import { useMemo, useState } from "react";
import { PageRoute } from "./Routes";

class Routes {
  pages: PageRoute[];

  constructor(pages: PageRoute[]) {
      this.pages = pages;
  }

  getPageNames() {
      return this.pages.map(p => p.name)
  }

  getPageByName(name: string) : (PageRoute | undefined) {
      const filtered = this.pages.filter(p => p.name === name)
      return filtered.length > 0 ? filtered[0] : undefined
  }

  getPageByHref(href: string) : (PageRoute | undefined) {
      const filtered = this.pages.filter(p => href.startsWith(p.href))
      return filtered.length > 0 ? filtered.at(-1) : undefined
  }

}

const Navbar = (props: { className?: string, routes: PageRoute[] } & React.PropsWithChildren) => {
  const router = useRouter();
  const pathName = usePathname();
  const [loadingItem, setLoadingItem] = useState<string | undefined>(undefined);
  const pageRoutes = useMemo(() => new Routes(props.routes), [props.routes]);
  const tabOpts = useMemo(() => pageRoutes.getPageNames(), [pageRoutes]);
  return (
    <UITabSwitch
      options={tabOpts}
      loading={loadingItem}
      current={pageRoutes.getPageByHref(pathName)?.name}
      onTabChange={(id) => {
        setLoadingItem(id);
        router.push(pageRoutes.getPageByName(id)!.href);
      }}
      className={props.className}
    />
  );
}

export { Navbar }