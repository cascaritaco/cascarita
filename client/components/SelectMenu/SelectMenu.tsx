import React, { forwardRef } from "react";

import * as Select from "@radix-ui/react-select";
// import {
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@radix-ui/react-icons";
//
// export function SelectMenu({
//   open,
//   onOpenChange,
//   children,
//   ...delegated
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   children: React.ReactNode;
//   delegated?: React.HTMLProps<HTMLDivElement>;
// }) {
//   return (
//     <Select.Root open={open} onOpenChange={onOpenChange} {...delegated}>
//       <Select.Trigger>
//         <Select.Value />
//
//         <Select.Icon>
//           <ChevronDownIcon />
//         </Select.Icon>
//       </Select.Trigger>
//
//       <Select.Portal>
//         <Select.Content>
//           <Select.ScrollUpButton>
//             <ChevronUpIcon />
//           </Select.ScrollUpButton>
//
//           <Select.Viewport>{children}</Select.Viewport>
//
//           <Select.ScrollDownButton>
//             <ChevronDownIcon />
//           </Select.ScrollDownButton>
//         </Select.Content>
//       </Select.Portal>
//     </Select.Root>
//   );
// }
//
// export const SelectItem = React.forwardRef(({
//   children,
//   ...delegated
// }): {
//   children: React.ReactNode;
//   delegated?: React.HTMLProps<HTMLDivElement>;
// }) {
//   return (
//     <Select.Item {...delegated} ref={forwardRef}>
//       <Select.ItemText>{children}</Select.ItemText>
//
//       <Select.ItemIndicator>
//         <CheckIcon />
//       </Select.ItemIndicator>
//     </Select.Item>
//   );
// }
