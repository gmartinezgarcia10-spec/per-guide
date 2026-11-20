type Root = ParentNode;

export const $ = <E extends Element = HTMLElement>(s: string, r: Root = document): E | null =>
  r.querySelector<E>(s);

export const $$ = <E extends Element = HTMLElement>(s: string, r: Root = document): E[] =>
  Array.from(r.querySelectorAll<E>(s));
