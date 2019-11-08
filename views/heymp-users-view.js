import { LitElement, html } from "https://unpkg.com/lit-element?module";

class HeympUsersView extends LitElement {
  render() {
    return html`
      <h2>Users Page</h2>
      Here's a list of current users:
    `
  }
}

customElements.define('heymp-users-view', HeympUsersView)