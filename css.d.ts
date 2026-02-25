// TypeScript declaration for importing CSS files.
// `global.css` and any other non-module styles can be imported for side effects,
// but TS still needs to know how to handle the import.

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
