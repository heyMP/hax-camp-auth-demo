import { LitElement, html } from "https://unpkg.com/lit-element?module";
import "../users/heymp-users-list.js"

class HeympHomeView extends LitElement {
  render() {
    return html`
      <h2>Home Page</h2>

      <p>Check out everyone using this app.</p>
      <heymp-users-list></heymp-users-list>
    `
  }
}

customElements.define('heymp-home-view', HeympHomeView)