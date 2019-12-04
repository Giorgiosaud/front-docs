---
title: Manejo de sesión privada con OIDC
lang: es-CL
sidebar: true
sidebarDepth: 2
---
# Manejo de sesión privada usando OpenID Connect (OIDC)

El método recomendado para interactuar con una API privada usando la sesión de Modyo con una integración OIDC, consiste, básicamente de dos pasos: **hacer el sitio privado** y **habilitar la integración a nivel de cuenta**.

## Hacer el sitio privado

1. Inicia sesión en la cuenta dónde se desea crear el sitio privado.
2. Haz click en crear un nuevo sitio.
3. Asigna un nombre al nuevo sitio y selecciona el tema base.
4. En la sección `configuración > sitio`, bajo la pestaña **Restricciones**, seleccionamos **privado**. Además activa **Mostrar home a visitas públicas** para poder redireccionar usuarios sin sesión.

## Habilitar la integración a nivel de cuenta (para todos los sitios)

1. Ve a la cuenta, **Customers** y desde ahí a la sección **Configuración** y luego la pestaña **Integración**
2. Selecciona la integración OpenID Connect y activa la casilla de **Habilitar OpenID Connect**
3. Llena los datos de **Nombre del servicio, Client ID, Secret e Issuer** y haz click en **Lanzar servicio de descubrimiento**
4. Chequea los campos que necesites (Habilitar refresh token, Habilitar cierre de sesión remoto, Habilitar revocación de token, Habilitar sincronización de claims)
5. Asocia los campos del proveedor con los campos personalizados que tengas en Modyo [OpenID Connect 1.0 specification for Standard Claims](http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

## Usando Axios para hacer la integración

Si quieres usar una librería como `axios` para realizar una integración desde Modyo, un patrón que resulta conveniente es crear 3 snippets que se hagan cargo de los aspectos más básicas de una integración.

Las tareas que debes cubrir con los snippets son:

1. Un interceptor de requests para incluyan un token.
2. Un controlador de sesiones.
3. Una ventana modal que informe al usuario que su sesión va a expirar.

## Interceptar los request para que incluyan un token

```js
// variable global que representara una instancia de axios que se encargará de hacer las peticiones de los servicios
var axios_api = axios.create();
  axios_api.defaults.baseURL = 'URL DE API';
}
// variable global que representara una instancia de axios que se encargará de hacer las peticiones de la api de modyo
var axios_modyo=axios.create({
  baseURL: window.baseUrl + '/api/v1',
});
// variable global que representara una instancia de axios que se encargará de hacer las peticiones los json de contenido del sitio
var axios_modyo_json=axios.create({
  baseURL: {{site.url}},
});
// variable global que representara una instancia de axios que se encargará de hacer las peticiones relacionadas con la autenticación
var axios_auth = axios.create();
axios_auth.defaults.baseURL = window.baseUrl + '/auth/openidc';
// función que genera actividad en el sitio con cada petición de autenticación
var resetIdleTime = function(request){
  sessionManager.resetIdleTime();
	return request;
}
// función que agrega el token a cada uno de los request
var appendTokenToRequest=function (request) {
	return axios_auth.get('/access_token').then(function(response){
		request.headers.authorization='Bearer '+ response.data.access_token;
		return request;
	}
}
// función que maneja los errores de cada una de las peticiones y los envía a una instancia superior
var errorRequest=function(error){
  throw error;
}
axios_auth.interceptors.request.use(resetIdleTime);
axios_api.interceptors.request.use(appendTokenToRequest ,errorRequest);
```

## Un controlador de sesiones

```js
// se encargará de levantar el modal de advertencia que avisara el cierre próximo de la sesión, esta variable devolverá una promesa que será efectiva si se hace click en el botón Mantener Sesión y que lanzara una promesa reject en el caso de seleccionar el botón con la negativa de continuar
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
// será la que se encargara de al iniciarse comenzar el tracking del tiempo para levantar este modal y manejar del lado Front la sesión a continuación explicaremos cada uno de las propiedades y métodos de este objeto que maneja la sesión
var sessionManager = {
  // propiedad que define el tiempo desde la ultima actividad hasta el fin de la sesión en segundos (ojo no el tiempo de refresco del token sino el de finalización de la sesión, es recomendado que este sea un minuto menor al declarado por el provider del Open ID Connect para tener un poco de holgura con la sesión y el cierre de la misma sea 100% valido)
  timeToEndSessionInSeconds: 900,
  // propiedad donde se define el tiempo de levantamiento del modal de inactividad desde la ultima acción o petición en la pagina
  timeToRaiseWarningModalInSeconds: 720,
  // propiedad que guarda el timestamp del ultimo momento de actividad del sessionManager
  lastActionTimeInThisWindow: new Date().getTime(),
  // función que convierte segundos a milisegundos
  secondsToMilisecs: function(minutes) {
    return minutes * 1000;
  },
  // propiedad para almacenar el interval id de revision de eventos de sesion
  intevalId:null,
  // función que determina si se esta accediendo a la aplicación desde el modyoShell o no
  isModyoAppShell: function() {
    return /; Modyo_App_Shell/.test(navigator.userAgent);
  },
  // método que debe ser ejecutado en cada carga de pagina para comenzar el proceso de eventos de sesión a hacer seguimiento recomendado hacer esta invocación sessionManager.init() en el head del layout para comenzar a trackear la sesión (en algunos casos se definirá que los developers no lancen esta invocación en ese caso la api de prueba a conectarnos debe tener también este if y así lograremos que axios_api sirva para el entorno develop y el de desarrollo uno con sesión y el otro sin sesión manager)
  init: function() {
    this.resetIdleTime();
    this.intevalId=this.interval();
  },
  // reinicia el tiempo de espera o crea una nueva actividad en el sitio
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
  // método que inicia la actividad cada segundo js que manejara los eventos de sesión
  interval: function() {
    var self = this;
    return setInterval(this.checkSessionEvents, 1000, self);
  },
  // método que levanta el modal de warning time
  raiseModal: function() {
    return modalConfirm();
  },
  // método que cierra sesión y limpia storage
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
  // método que revisa los eventos de sesión para determinar si es momento de cierre de la misma o de mantenerla después de mostrar el modal
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

## Una ventana modal que informe al usuario que su sesión va a expirar

Este seria el modal a activar en el paso anterior con bootstrap para el manejo del warning modal.

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
          Su sesión va a expirar
        </h5>
      </div>
      <div class="modal-body text-center">
        <p>
          Su sesión va a expirar en <span id="expiration-time"></span> segundos.
        </p>
        <p>¿Quiere mantener su sesión?</p>
      </div>
      <div class="modal-footer">
        <button id="session-modal-yes" type="button" class="btn btn-primary">
          Si
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