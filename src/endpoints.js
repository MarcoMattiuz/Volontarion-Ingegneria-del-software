
const domain = "http://localhost:3001";
const subdomainVolontari = "/users/";
const subdomainAssociazioni = "/associazioni/";
const subdomainEventi = "/events/";


export const CheckLoggedinEndpoint = domain + subdomainVolontari +"checkLoggedIn";
export const ChangeImageVolontarioEndpoint =domain + "/users/modifyProfilePicture";

export const ListaAssociazioniEndpoint = domain + "/api/lista_associazioni";

export const CambioPasswordVolontarioEndpoint = domain + subdomainVolontari+"changePassword";
export const LoginEndpointVolontario = domain + subdomainVolontari +"login";
export const RegistrazioneVolontarioEndpoint =domain + subdomainVolontari +"registrazioneVolontario";
export const RegistrazioneAssociazioneEndpoint =domain + subdomainAssociazioni +"registrazioneAssociazione";
export const GetProfilePictureEndpoint = domain + subdomainVolontari +"getProfilePicture";
export const DeleteAccountEndpoint = domain + subdomainVolontari +"deleteAccount";
export const GetCurrentVolontario = domain + subdomainVolontari +"getCurrentVolontario";
export const ModifyProfileVolontario = domain + subdomainVolontari +"modifyProfile";

export const CambioPasswordAssociazioneEndpoint = domain + subdomainAssociazioni+"changePassword";
export const getAssociazioniEndpoint = domain + subdomainAssociazioni +"getAssociazioni";
export const LoginEndpointAssociazione = domain + subdomainAssociazioni +"login";
export const GetCurrentAssociazione = domain + subdomainAssociazioni +"getCurrentAssociazione";
export const ModifyProfileAssociazione = domain + subdomainAssociazioni +"modifyProfile";


export const CreaEventoEndpoint = domain + subdomainEventi +"creaEvento";


