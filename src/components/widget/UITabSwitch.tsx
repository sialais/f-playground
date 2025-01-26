'use client'

import React from 'react';
import { Tabs } from 'radix-ui';
import type { ReactNode } from 'react'
import classNames from 'classnames';
import "./UITabSwitch.css"

type UITabOption = {
  id: string,
  name?: string,
  content?: ReactNode | undefined,
}

type SwitchProps = {
  options: (UITabOption | string)[],
  current?: string | undefined,
  loading?: string | undefined,
  onTabChange?: (id: string) => void,
  className?: string,
}

const UITabSwitch = ({options, current, loading, onTabChange, className} : SwitchProps) => {
  const opts: UITabOption[] = options.map(op => typeof op === "string" ? { id: op } : op);
  return (
    <Tabs.Root value={current} onValueChange={onTabChange} className={className}>
      <Tabs.List className="shrink-0 flex h-full">
        {opts.map((opt) => (
          <Tabs.Trigger
            key={opt.id}
            value={opt.id}
            data-loading={opt.id === loading && current !== loading ? "yes" : "no"}
            className={classNames("ui-tab data-[state=active]:ui-tab-active data-[loading=yes]:ui-tab-loading")}
          >
            {opt.name || opt.id}
            <div className='indicator absolute'></div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {opts
        .filter((opt) => opt.content !== undefined)
        .map((opt) => (
          <Tabs.Content key={opt.id} value={opt.id}>
            {opt.content!}
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
};

export default UITabSwitch;
export type { UITabOption };