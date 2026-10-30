// Language-specific strings passed into the shared legal copy (src/content/legal.js).
const config = require("../../site.config");

const OPTIONS = {
  en: {
    updated: "30 October 2026",
    processors: ["with our website host and email provider, who process data on our behalf under contract;"],
    enquiryNote: (endpoint) =>
      endpoint
        ? "The enquiry form is sent to our form-handling provider, which delivers it to our inbox."
        : "The enquiry form does not send anything itself: it opens your own email app with your enquiry filled in.",
    thirdParty: "Fonts are served from this website's own domain. Photos load from Unsplash's image service (images.unsplash.com), which does not set cookies.",
  },
  fr: {
    updated: "30 octobre 2026",
    processors: ["avec notre hébergeur et notre messagerie, qui traitent les données pour notre compte dans le cadre d’un contrat ;"],
    enquiryNote: (endpoint) =>
      endpoint
        ? "Le formulaire de demande est transmis à notre prestataire de formulaires, qui le remet dans notre boîte mail."
        : "Le formulaire de demande n’envoie rien lui-même : il ouvre votre propre messagerie avec votre demande déjà remplie.",
    thirdParty: "Les polices sont servies depuis le domaine de ce site. Les photos sont chargées depuis le service d’images d’Unsplash (images.unsplash.com), qui ne dépose pas de cookie.",
  },
  de: {
    updated: "30. Oktober 2026",
    processors: ["an unseren Hosting- und E-Mail-Anbieter, die Daten in unserem Auftrag auf vertraglicher Grundlage verarbeiten;"],
    enquiryNote: (endpoint) =>
      endpoint
        ? "Das Anfrageformular wird an unseren Formulardienst übermittelt, der es an unser Postfach weiterleitet."
        : "Das Anfrageformular sendet selbst nichts: Es öffnet Ihr eigenes E-Mail-Programm mit Ihrer ausgefüllten Anfrage.",
    thirdParty: "Schriften werden von der eigenen Domain dieser Website geladen. Fotos kommen vom Bilddienst von Unsplash (images.unsplash.com), der keine Cookies setzt.",
  },
  es: {
    updated: "30 de octubre de 2026",
    processors: ["con nuestro proveedor de alojamiento web y de correo, que tratan los datos por cuenta nuestra en virtud de un contrato;"],
    enquiryNote: (endpoint) =>
      endpoint
        ? "El formulario de solicitud se envía a nuestro proveedor de formularios, que lo entrega en nuestro buzón."
        : "El formulario de solicitud no envía nada por sí mismo: abre su propio programa de correo con la solicitud ya rellenada.",
    thirdParty: "Las fuentes se sirven desde el propio dominio de este sitio. Las fotos se cargan desde el servicio de imágenes de Unsplash (images.unsplash.com), que no instala cookies.",
  },
};

/** Options for legalPages()/LEGAL[lang]() in the given language. */
module.exports = (lang) => {
  const o = OPTIONS[lang];
  return {
    brand: config.brand.name,
    email: config.contact.email,
    address: config.contact.address,
    updated: o.updated,
    storage: [],
    processors: o.processors,
    enquiryNote: o.enquiryNote(config.enquiry.endpoint),
    thirdParty: o.thirdParty,
  };
};
