import { LitElement, html } from "https://unpkg.com/lit-element?module";
import "https://unpkg.com/@lrnwebcomponents/moment-element?module"
import "../services/hax-auth.js"

class HeympUsersList extends LitElement {
  static get properties() {
    return {
      users: { type: Array }
    }
  }

  constructor() {
    super()
    this.users = []
  }

  connectedCallback() {
    super.connectedCallback()
    this.getUsers()
  }

  render() {
    return html`
      <p>Users</p>
      <ul>
        ${this.users.map(user =>
          html`<li>${user.user}: Created container at <moment-element datetime=${user.updatedAt} output-format="ddd, hA"></moment-element></li>`
        )}
      </ul>

      <hax-auth></hax-auth>
    `
  }

  async getUsers() {
    const users = await fetch('https://hod.2019.hax.camp/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.localStorage.getItem('access_token')}` },
      body: JSON.stringify({ query: '{ servers { containerId user updatedAt } }' }),
    }).then(res => res.json())
    this.users = users.data.servers
  }
}

customElements.define('heymp-users-list', HeympUsersList)