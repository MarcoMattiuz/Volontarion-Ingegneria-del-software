const domain = "http://localhost:8080";
const subdomainVolontari = "/users/";
const subdomainAssociazioni = "/associazioni/";
const subdomainEventi = "/events/";

export const CheckLoggedinEndpoint =
  domain + subdomainVolontari + "checkLoggedIn";
export const ChangeImageVolontarioEndpoint =
  domain + "/users/modifyProfilePicture";

export const ListaAssociazioniEndpoint = domain + "/api/lista_associazioni";

export const CambioPasswordVolontarioEndpoint =
  domain + subdomainVolontari + "changePassword";
export const LoginEndpointVolontario = domain + subdomainVolontari + "login";
export const RegistrazioneVolontarioEndpoint =
  domain + subdomainVolontari + "registrazioneVolontario";
export const GetProfilePictureEndpoint =
  domain + subdomainVolontari + "getProfilePicture";
export const DeleteAccountEndpoint =
  domain + subdomainVolontari + "deleteAccount";
export const GetCurrentVolontario =
  domain + subdomainVolontari + "getCurrentVolontario";
export const ModifyProfileVolontario =
  domain + subdomainVolontari + "modifyProfile";
export const GetVolontarioEndpoint =
  domain + subdomainVolontari + "getVolontario";
export const GetAssociazioniIscritteEndpoint =
  domain + subdomainVolontari + "getAssociazioniIscritte";
export const unsubscribeAssociazioneEndpoint =
  domain + subdomainVolontari + "unsubscribeAssociazione";
export const SeguiAssociazioneEndpoint =
  domain + subdomainVolontari + "seguiAssociazione";

export const CambioPasswordAssociazioneEndpoint =
  domain + subdomainAssociazioni + "changePassword";
export const getAssociazioniEndpoint =
  domain + subdomainAssociazioni + "getAssociazioni";
export const LoginEndpointAssociazione =
  domain + subdomainAssociazioni + "login";
export const GetCurrentAssociazione =
  domain + subdomainAssociazioni + "getCurrentAssociazione";
export const ModifyProfileAssociazione =
  domain + subdomainAssociazioni + "modifyProfile";
export const GetAssociazioneEndpoint =
  domain + subdomainAssociazioni + "getAssociazione";

export const GetVolontariIscrittiEventoEndpoint =
  domain + subdomainAssociazioni + "getVolontariIscrittiEvento";
export const RegistrazioneAssociazioneEndpoint =
  domain + subdomainAssociazioni + "registrazioneAssociazione";

export const CreateEventEndpoint = domain + subdomainEventi + "creaEvento";
export const GetEventiEndpoint = domain + subdomainEventi + "getEventi";
export const GetEventEndpoint = domain + subdomainEventi + "getEvent";
export const GetMyEventiAssociazioneEndpoint =
  domain + subdomainEventi + "getMyEventiAssociazione";
export const GetMyEventiAssociazioneVolontario =
  domain + subdomainEventi + "getMyEventiVolontario";
export const unsubscribeEventEndpoint =
  domain + subdomainEventi + "unsubscribeEvent";
export const GetMyEventiAssociazioniIscritte =
  domain + subdomainEventi + "eventiAssociazioniIscritte";

export const subscribeEventEndpoint =
  domain + subdomainEventi + "subscribeEvent";
export const DeleteEventEndpoint = domain + subdomainEventi + "deleteEvent";
export const ModifyEventEndpoint = domain + subdomainEventi + "modifyEvent";
