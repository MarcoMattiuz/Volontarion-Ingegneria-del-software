const domain = "http://localhost:3001";
const subdomainVolontari = "/users/";
const subdomainAssociazioni = "/associazioni/";

export const CheckLoggedinEndpoint = domain + subdomainVolontari +"checkLoggedIn";
export const ChangeImageVolontarioEndpoint =
  domain + subdomainVolontari +"modifyProfilePicture";
export const LoginEndpoint = domain + subdomainVolontari +"login";
export const RegistrazioneVolontarioEndpoint =domain + subdomainVolontari +"registrazioneVolontario";
export const RegistrazioneAssociazioneEndpoint =domain + subdomainAssociazioni +"registrazioneAssociazione";
export const GetProfilePictureEndpoint = domain + subdomainVolontari +"getProfilePicture";
export const DeleteAccountEndpoint = domain + subdomainVolontari +"deleteAccount";


export const getAssociazioniEndpoint = domain + subdomainAssociazioni +"getAssociazioni";
