const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

  
  // Flujo flowRentaCasas
  const flowRentaCasas = addKeyword('1')
    .addAnswer('Tenemos una variedad de casas disponibles para alquilar.')
    .addAnswer('Para qué fecha la ocuparías? Por favor, proporciona la fecha en la que ocuparías la casa (ejemplo: "27 de junio").'
    );

const flowPrincipal = addKeyword(['Buenas tardes', 'Buenos dias', 'Buenos dias'])
  .addAnswer('🏡 Hola, bienvenido/a a nuestra inmobiliaria.')
  .addAnswer(
    [
      '¿En qué estás interesado el día de hoy?',
      '👉 *1* Casas en renta',
      '👉 *2* Departamentos en renta'
    ]
  )
  .addAnswer('Responde el número de la opción',
    null,
    null,
    [flowRentaCasas]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
