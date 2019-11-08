import { LitElement } from "https://unpkg.com/lit-element?module";

class HaxAuth extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    this.getAccessToken()
  }

  async login() {
    // if we are in the process of logging, meaning we have a new refresh_token
    if (this.getUrlParameter('login') === "true") {
      // remove query parameters
      window.history.pushState({},"", window.location.origin);
      // remove the existing access_token if we have one
      window.localStorage.removeItem("access_token");
      this.getAccessToken()
    }
    // Check if they already have a token
    else if (window.localStorage.getItem("access_token")) {
      window.localStorage.getItem("access_token");
    }
  }

  async getAccessToken() {
    try {
      const access_token = await fetch(
        `${window._env_.HAXCMS_AUTH_FQDN}/access_token`,
        {
          credentials: "include"
        }
      ).then(res => res.json());
      if (access_token) {
        this.accessToken = access_token;
        window.localStorage.setItem("access_token", access_token);
        this.dispatchEvent('hax-auth-login', {
          bubbles: true,
          details: {
            access_token
          }
        })
        return access_token;
      }
    } catch (error) {
      // We need to redirect the user back to the auth service
      // window.location.href = `${window._env_.HAXCMS_AUTH_FQDN}/login?redirect=${window.location.origin}?login=true`
    }
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

}

customElements.define('hax-auth', HaxAuth)
