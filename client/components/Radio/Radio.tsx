import React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

export default function Radio({ children }: { children: React.ReactNode }) {
  return <RadioGroup.Root>{children}</RadioGroup.Root>;
}
