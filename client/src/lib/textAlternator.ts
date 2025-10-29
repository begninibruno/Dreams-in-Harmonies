// Walk the DOM and wrap text nodes in spans with alternating classes
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CANVAS', 'CODE', 'PRE', 'SVG', 'IMG', 'INPUT', 'TEXTAREA', 'BUTTON'
]);

function shouldSkip(node: Node) {
  return node.parentElement && SKIP_TAGS.has(node.parentElement.tagName);
}

export function applyTextAlternation(root: HTMLElement = document.body, cycle = 4) {
  if (!root) return;

  let index = 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue.trim();
      if (!text) return NodeFilter.FILTER_REJECT;
      if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
      // don't touch text that's already inside an alternator span
      if (node.parentElement && node.parentElement.classList && node.parentElement.classList.contains('text-alternated')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    nodes.push(n as Text);
  }

  nodes.forEach((textNode) => {
    const span = document.createElement('span');
    const cls = `text-alt-${(index % cycle) + 1}`;
    span.className = `text-alternated ${cls}`;
    // preserve whitespace around text node
    span.textContent = textNode.nodeValue;
    textNode.parentNode?.replaceChild(span, textNode);
    index += 1;
  });
}

export function removeTextAlternation(root: HTMLElement = document.body) {
  if (!root) return;
  const spans = Array.from(root.querySelectorAll('span.text-alternated')) as HTMLSpanElement[];
  spans.forEach((s) => {
    const txt = document.createTextNode(s.textContent || '');
    s.parentNode?.replaceChild(txt, s);
  });
}

export default applyTextAlternation;
