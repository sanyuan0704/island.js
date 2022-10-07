import { useState } from 'react';
import MiniMenuSvg from './icons/miniMenu.svg';

export function MiniNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div flex="center" m="l-2 r-4" cursor="pointer">
        <MiniMenuSvg w="5" h="5" />
      </div>
      <div
        pos="fixed left-0 top-14"
        w="100%"
        h="[calc(100vh-56px)]"
        bg="bg-default"
      >
        <div flex="center col">
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfsdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfssssssssdf</p>
          <p>sdfsdf</p>
        </div>
      </div>
    </>
  );
}
