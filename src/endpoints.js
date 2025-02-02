
const domain = "http://localhost:3001";
const subdomainVolontari = "/users/";
const subdomainAssociazioni = "/associazioni/";


export const CheckLoggedinEndpoint = domain + subdomainVolontari +"checkLoggedIn";
export const ChangeImageVolontarioEndpoint =
  domain + "/users/modifyProfilePicture";

export const ListaAssociazioniEndpoint = domain + "/api/lista_associazioni";
  domain + subdomainVolontari +"modifyProfilePicture";
export const LoginEndpointVolontario = domain + subdomainVolontari +"login";
export const RegistrazioneVolontarioEndpoint =domain + subdomainVolontari +"registrazioneVolontario";
export const RegistrazioneAssociazioneEndpoint =domain + subdomainAssociazioni +"registrazioneAssociazione";
export const GetProfilePictureEndpoint = domain + subdomainVolontari +"getProfilePicture";
export const DeleteAccountEndpoint = domain + subdomainVolontari +"deleteAccount";
export const GetCurrentVolontario = domain + subdomainVolontari +"getCurrentVolontario";


export const getAssociazioniEndpoint = domain + subdomainAssociazioni +"getAssociazioni";
export const LoginEndpointAssociazione = domain + subdomainAssociazioni +"login";
export const GetCurrentAssociazione = domain + subdomainAssociazioni +"getCurrentAssociazione";
