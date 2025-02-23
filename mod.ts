import type { Element, Node } from "hast";
import { hasProperty } from "hast-util-has-property";
import { visit } from "unist-util-visit";

// Type for the transform function that processes URLs
type URLTransformFn = (
  url: string,
  node: Element,
) => string;

// Type for the main transformer function that processes the syntax tree
type TreeTransformer = (tree: Node) => void;

// Default transform function type
const defaultTransform: URLTransformFn = (url: string) => url;

/**
 * Creates a transformer function that modifies URLs in the syntax tree
 * @param transformFn - Function to transform URLs in href and src attributes
 * @returns A transformer function that processes the syntax tree
 */
export default function transform(
  transformFn: URLTransformFn = defaultTransform,
): TreeTransformer {
  return function transformer(tree: Node): void {
    visit(tree, "element", function (node: Element): void {
      modify(node, "href");
      modify(node, "src");
    });
  };

  /**
   * Modifies a specific property of a node if it exists
   * @param node - The element node to modify
   * @param prop - The property name to check and modify ('href' or 'src')
   */
  function modify(node: Element, prop: "href" | "src"): void {
    if (hasProperty(node, prop)) {
      const url = node.properties[prop] as string;
      node.properties[prop] = transformFn(url, node);
    }
  }
}
