'use client'

import './PageHeader.css'
import * as React from "react"
import classNames from 'classnames';

type ScrollState = "up" | "down" | "top" | undefined;

function isInBrowser() {
  return typeof window !== 'undefined';
}

const PageHeader = (props: { height?: string | number, className?: string | undefined } & React.PropsWithChildren = {
  height: "48px"
}) => {
  const scrollTopRef = React.useRef<number | undefined>(undefined);
  const [scrollState, updateScrollState] = React.useState<ScrollState>("top");

  if (scrollTopRef.current == undefined && isInBrowser()) {
    scrollTopRef.current = 0;
    updateScrollState("top");
    const scrollHandler = (e: any) => {
      const currentScrollTop =
        e.target.scrollTop! || e.target.scrollingElement?.scrollTop;
      let currentState: ScrollState;
      if (currentScrollTop === 0) {
        currentState = "top";
      } else if (currentScrollTop > scrollTopRef.current!) {
        currentState = "down";
      } else {
        currentState = "up";
      }
      scrollTopRef.current = currentScrollTop;
      updateScrollState(currentState);
    }
    window?.addEventListener("scroll", scrollHandler);
  }
  return (
    <div style={{ height: props.height }}>
      <div
        style={ {height: props.height } }
        data-scroll={scrollState}
        className={classNames(
          "w-full fixed top-0",
          "transition-all duration-300",
          "data-[scroll=up]:header-blurred",
          "data-[scroll=top]:header-cleared",
          "data-[scroll=down]:header-hidden",
          props.className
        )}
      >
        {props.children}
      </div>
      <div className='h-full'/>
    </div>
  );
}

export default PageHeader