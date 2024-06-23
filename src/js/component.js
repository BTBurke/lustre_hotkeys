import hotkeys from 'hotkeys-js';

class HotkeyBind extends HTMLElement {
  static observedAttributes = ['bind'];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    let binding = this.getAttribute('bind');
    let host = shadow.host;
    console.log(`binding ${binding}`, host);

    if (binding) {
      hotkeys(binding, function(event, handler) {
        console.log(`firing ${handler.key}`)
        event.preventDefault();
        host.dispatchEvent(new CustomEvent('fire', { bubbles: true, composable: true }));
        return false;
      })
    }
  }

  disconnectedCallback() {
    let binding = this.getAttribute('bind');
    console.log(`unbinding ${binding}`);
    if (binding) {
      hotkeys.unbind(binding);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    hotkeys.unbind(oldValue);
    hotkeys(newValue, function(event, handler) {
      console.log(`firing ${handler.key}`)
      event.preventDefault();
      host.dispatchEvent(new CustomEvent('fire', { bubbles: true, composable: true }));
      return false;
    })
  }
}


export function register() {
  if (typeof window !== 'undefined') {
    let registry = window.customElements
    if (typeof registry.get('hotkey-bind') === 'undefined') {
      registry.define('hotkey-bind', HotkeyBind)
    }
  }
  return 'hotkey-bind'
}


