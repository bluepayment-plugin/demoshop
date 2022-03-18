export class ToolsClass {
  static scrollToElementTop (elem, offset = 0) {
    if (!window || !window.scrollTo) {
      return
    }

    const rect = elem.getBoundingClientRect()
    const targetPosition = rect.top + window.pageYOffset + offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'auto'
    })
  }
}
