import { defineControls } from "./define-controls";

export const checkboxControls = defineControls({
  disabled: { type: "boolean", defaultValue: false, label: "disabled" },
  readonly: { type: "boolean", defaultValue: false, label: "readonly" },
});
