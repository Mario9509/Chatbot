const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//flowRentaCasas
const flowColoniasMZT = addKeyword(['Villa verde', 'villaverde']).addAnswer(
    'En Villaverde actualmente tenemos 2 casas disponibles'
  )

//flowPrincipal
const flowRentaCasas = addKeyword(['renta casas', 'casas en renta', 'casas']).addAnswer(
    ['Tenemos una variedad de casas disponibles para alquilar. ¿En qué ubicación estás interesado/a?'],
    null,
    null,
    [flowColoniasMZT]
  )
  
//flowPrincipal
  const flowRentaDepartamentos = addKeyword(['renta departamentos', 'departamentos en renta', 'departamentos', 'departamento']).addAnswer(
    'Por supuesto, contamos con una amplia selección de departamentos en renta. ¿En qué área estás interesado/a?'
  )
  
  const flowRequisitosPrecios = addKeyword(['requisitos', 'precios']).addAnswer(
    'Para rentar una propiedad, generalmente requerimos documentos como identificación, comprobante de ingresos y referencias personales. En cuanto al rango de precios, puede variar según la ubicación y características de la propiedad. ¿Tienes alguna preferencia específica en mente?'
  )
  
  const flowCaracteristicasPropiedades = addKeyword(['características', 'habitaciones']).addAnswer(
    'Tenemos una variedad de propiedades disponibles, como casas, departamentos y estudios. El número de habitaciones puede variar, desde una hasta múltiples habitaciones. ¿Hay alguna otra característica o preferencia que desees mencionar?'
  )
  
  const flowProgramarVisita = addKeyword(['programar visita', 'visitar propiedad']).addAnswer(
    '¡Por supuesto! Estoy encantado/a de ayudarte a programar una visita. Por favor, proporciona los detalles de la propiedad y tus preferencias de fecha y hora para coordinar la visita.'
  )
  
  const flowServiciosAdicionales = addKeyword(['servicios adicionales']).addAnswer(
    'Sí, en algunas de nuestras propiedades ofrecemos servicios adicionales como estacionamiento, gimnasio, áreas verdes, etc. Podemos ayudarte a encontrar una propiedad que se ajuste a tus necesidades y preferencias específicas.'
  )

  
const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(
    ['Lo siento, porfavor escribe una respuesta valida'],
    null,
    null,
    [flowRequisitosPrecios, flowCaracteristicasPropiedades]
  )

  const flowPrincipal = addKeyword(['hola', 'Buenos dias', 'Buenas tardes']).addAnswer(
    [
        'Hola, bienvenido/a a nuestra inmobiliaria. ¿En qué puedo ayudarte hoy?', 
        '\nRenta de *casas*', 
        'Renta de *Departamentos*'
    ],
    null,
    null,
    [flowRentaCasas, flowRentaDepartamentos]
);


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
