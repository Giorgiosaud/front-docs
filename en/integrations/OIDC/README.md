---
title: Private session management using OIDC
lang: en
sidebar: true
sidebarDepth: 2

---
# Private session management using OpenID Connect (OIDC)

The recommended method to interact with a private API using the Modyo session with an OIDC integration, basically consists of two steps: **make the site private** and **enable integration at the account level**.

## Make the site private

1. Log in to the account where you want to create the private site.
2. Click on create a new site.
3. Assign a name to the new site and select the base theme.
4. In the `configuration> site` section, under the **Restrictions** tab, we select **private**. It also activates **Show home to public visits** to be able to redirect users without a session.

## Enable account level integration (for all sites)

1. Go to the account, **Customers** and from there to the **Settings** section and then the **Integration** tab
2. Select the OpenID Connect integration and check the box for **Enable OpenID Connect**
3. Fill in the data for **Service name, Client ID, Secret and Issuer** and click **Launch discovery service**
4. Check the fields you need (Enable refresh token, Enable remote logout, Enable token revocation, Enable claims synchronization)
5. Associate the provider fields with the custom fields you have in Modyo [OpenID Connect 1.0 specification for Standard Claims](http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

## Using Axios to do the integration

If you want to use a library as `axios` to perform an integration from Modyo, a convenient pattern is to create 3 snippets that take care of the most basic aspects of an integration.

The tasks you must cover with snippets are:

1. A request interceptor to include a token.
2. A session controller.
3. A modal window that informs the user that their session will expire.

## Intercept requests to include a token

```js
// global variable that represents an instance of axios that will be in charge of making the service requests
var axios_api = axios.create();
  axios_api.defaults.baseURL = 'URL DE API';
}
// global variable that will represent an instance of axios that will be responsible for making the requests of the modyo api
var axios_modyo=axios.create({
  baseURL: window.baseUrl + '/api/v1',
});
// variable global que representara una instancia de axios que se encargará de hacer las peticiones los json de contenido del sitio
var axios_modyo_json=axios.create({
  baseURL: {{site.url}},
});
// global variable that represents an axios instance that will be responsible for making authentication-related requests
var axios_auth = axios.create();
axios_auth.defaults.baseURL = window.baseUrl + '/auth/openidc';
// function that generates activity on the site with each authentication request
var resetIdleTime = function(request){
  sessionManager.resetIdleTime();
	return request;
}
// function that adds the token to each of the request
var appendTokenToRequest=function (request) {
	return axios_auth.get('/access_token').then(function(response){
		request.headers.authorization='Bearer '+ response.data.access_token;
		return request;
	}
}
// function that handles the errors of each of the requests and sends them to a higher instance
var errorRequest=function(error){
  throw error;
}
axios_auth.interceptors.request.use(resetIdleTime);
axios_api.interceptors.request.use(appendTokenToRequest ,errorRequest);
```

## A session controller

```js
// will be responsible for raising the warning modality that warns the close of the session, this variable will return a promise that will be effective if you click on the Hold Session button and will launch a reject promise in the case of selecting the button with the negative to continue
var modalConfirm = function() {
  return new Promise(function(resolve, reject) {
    $("#session-modal").modal({
      backdrop: "static",
      keyboard: false,
      show: true
    });
    $("#session-modal-yes").on("click", function() {
      resolve("keep session");
      $("#session-modal").modal("hide");
    });
    $("#session-modal-no").on("click", function() {
      reject("destroy session");
      $("#session-modal").modal("hide");
    });
  });
};
// It will be the one that will be responsible for starting the time tracking to lift this modal and handle the Front side of the session, then we will explain each of the properties and methods of this object that handles the session
var sessionManager = {
  // property that defines the time from the last activity until the end of the session in seconds (note not the refresh time of the token but the end of the session, it is recommended that this be one minute shorter than the one declared by the provider of the Open ID Connect to have a little slack with the session and closing it is 100% valid)
  timeToEndSessionInSeconds: 900,
  // property where the lifting time of the inactivity modal is defined since the last action or request on the page
  timeToRaiseWarningModalInSeconds: 720,
  // property that saves the timestamp of the last moment of activity of the sessionManager
  lastActionTimeInThisWindow: new Date().getTime(),
  // function that converts seconds to milliseconds
  secondsToMilisecs: function(minutes) {
    return minutes * 1000;
  },
  // property to store the session id interval review session
  intevalId:null,
  // function that determines if the application is being accessed from the modyoShell or not
  isModyoAppShell: function() {
    return /; Modyo_App_Shell/.test(navigator.userAgent);
  },
  // method that must be executed on each page load to begin the process of session events to follow up recommended do this invocation sessionManager.init () in the head of the layout to begin tracking the session (in some cases it will be defined that the developers do not launch this invocation in that case the test api to connect us must also have this if and so we will achieve that axios_api serves for the develop and development environment one with session and the other without session manager)
  init: function() {
    this.resetIdleTime();
    this.intevalId=this.interval();
  },
  // reset the idle time or create a new activity on the site
  resetIdleTime: function() {
    this.lastActionTimeInThisWindow = new Date().getTime();
    var sessionEndTime =
      this.lastActionTimeInThisWindow +
      this.secondsToMilisecs(this.timeToEndSessionInSeconds);
    localStorage.setItem("timeToEndSession", sessionEndTime);
    var raiseWarningModalTime =
      this.lastActionTimeInThisWindow +
      this.secondsToMilisecs(this.timeToRaiseWarningModalInSeconds);
    localStorage.setItem("timeToRaiseWarningModal", raiseWarningModalTime);
  },
  // method that initiates the activity every second js that will handle the session events
  interval: function() {
    var self = this;
    return setInterval(this.checkSessionEvents, 1000, self);
  },
  // method that raises the warning time modal
  raiseModal: function() {
    return modalConfirm();
  },
  // logout method and clean storage and clear interval functions that checks session events
  logout: function() {
    localStorage.clear();
    sessionStorage.clear();
    clearInterval(this.intevalId);
    var withRedirect =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (withRedirect) {
      window.location.href =
        "{{site.account_url}}/logout?multi=true&redirect_to=https://chile.larrainvial.com";
    } else {
      window.location.href = "{{site.account_url}}/logout?site={{site.uuid}}";
    }
  },
  // method that reviews session events to determine if it is time to close it or keep it after showing the modal
  checkSessionEvents: function(self) {
    var sessionEndTime = localStorage.getItem("timeToEndSession");
    var raiseWarningModalTime = localStorage.getItem("timeToRaiseWarningModal");
    var diffInSecsToShow =
      Math.round((sessionEndTime - new Date().getTime()) / 1000) > 0
        ? Math.round((sessionEndTime - new Date().getTime()) / 1000)
        : 0;
    var expirationTimeHtml = document.querySelector("#expiration-time");
    var timeNow = new Date().getTime();
    expirationTimeHtml.innerText = diffInSecsToShow;
    if (sessionEndTime - timeNow < 0) {
      self.logout();
    } else if (raiseWarningModalTime - timeNow < 0) {
      self
        .raiseModal()
        .then(function(response) {
          axios_auth.get("/access_token");
        })
        .catch(function(err) {
          self.logout();
        });
    } else {
      if (($("#session-modal").data("bs.modal") || {})._isShown) {
        $("#session-modal").modal("hide");
      }
    }
  }
};
```

## A modal window that informs the user that their session will expire

This would be the modal to activate in the previous step with bootstrap for handling the warning modal.

```html
<div
  id="session-modal"
  class="modal fade"
  tabindex="-1"
  role="dialog"
  aria-labelledby="session-modal-label"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="session-modal-label">
          Your session will expire soon
        </h5>
      </div>
      <div class="modal-body text-center">
        <p>
          Your session will expire in <span id="expiration-time"></span> seconds.
        </p>
        <p>Do you want to keep your session?</p>
      </div>
      <div class="modal-footer">
        <button id="session-modal-yes" type="button" class="btn btn-primary">
          Yes
        </button>
        <button
          id="session-modal-no"
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          No
        </button>
      </div>
    </div>
  </div>
</div>
```