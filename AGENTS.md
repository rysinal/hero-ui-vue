# Project Agent Constraints

- Browser validation and debugging must use the Chrome plugin skill at `/Users/bytedance/.codex/plugins/cache/openai-bundled/chrome/0.1.7/skills/chrome/SKILL.md` only. Do not use Computer Use, AppleScript, `open -a`, or other browser-control paths for this project.
- Component preview parity is judged against the React source and HeroUI React docs. For every implemented or modified component, compare not only the basic demo but also advanced source examples such as multiple selection, sections, surface/card compositions, validation, disabled states, icons, custom indicators, and custom styles when they exist upstream.
- Before considering a component done, mirror the React docs preview directory for that component unless a feature is explicitly impossible in Vue; if anything is skipped, document the reason in the final response.
- Interactive label/title areas inside selectable controls must share the same pointer/hover behavior as the control. Do not leave only the small checkbox/radio/switch control or description area clickable-looking when the upstream component makes the whole option/title area interactive.
- Prefer fixing component CSS/API behavior in `packages/vue` and `packages/styles`. Use docs-only styles only for multi-component demo layout, and include those styles in the visible demo source.
