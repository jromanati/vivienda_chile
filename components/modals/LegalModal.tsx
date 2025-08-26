"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay, // 👈 importa el overlay
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: "privacy" | "terms"
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const content = {
  privacy: {
    title: "Política de Privacidad de Viviendachile",
    content: (
      <div className="space-y-6">
        <section>
          <p className="text-gray-600">
            En Viviendachile, la privacidad y seguridad de tus datos personales son nuestra máxima prioridad. Esta
            Política de Privacidad describe cómo recopilamos, usamos y protegemos la información que nos proporcionas al
            utilizar nuestro sitio web y servicios. Nos comprometemos a que tu información se utilice únicamente de
            acuerdo con lo estipulado en este documento.
          </p>
          <p className="text-gray-600">
            Es importante que revises periódicamente esta política, ya que puede ser actualizada o modificada para
            reflejar cambios en nuestras prácticas o en la normativa vigente.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Información que recopilamos</h3>
          <p className="text-gray-600 mb-3">
            Al utilizar nuestra plataforma, podemos solicitarte información personal que nos permita identificarte. Esta
            información puede incluir:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Datos de contacto: Nombre completo y dirección de correo electrónico.</li>
            <li>Información demográfica: Detalles sobre tu perfil y preferencias.</li>
            <li>
              Datos de geolocalización: Con tu consentimiento, recopilamos tu ubicación para mostrarte propiedades
              cercanas y relevantes en los mapas de nuestra plataforma.
            </li>
            <li>
              Información de facturación o entrega: Datos específicos necesarios para procesar pedidos o transacciones,
              si corresponde.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Uso de la información recopilada</h3>
          <p className="text-gray-600 mb-3">
            Utilizamos la información que recopilamos con el objetivo de brindarte el mejor servicio posible y una
            experiencia de usuario personalizada. Específicamente, los datos nos permiten:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Mantener un registro de usuarios y gestionar tu cuenta.</li>
            <li>Desplegar información georreferenciada sobre propiedades de acuerdo a tu ubicación.</li>
            <li>
              Enviarte comunicaciones relevantes, como ofertas especiales, nuevos productos e información publicitaria
              que consideremos de tu interés. Puedes cancelar la suscripción a estos correos en cualquier momento.
            </li>
            <li>Mejorar nuestros servicios y la funcionalidad de la plataforma.</li>
          </ul>
          <p className="text-gray-600">
            En Viviendachile, mantenemos un firme compromiso con la seguridad de tus datos. Constantemente actualizamos
            nuestros sistemas y procedimientos para prevenir cualquier acceso no autorizado.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Cookies y tecnologías de seguimiento</h3>
          <p className="text-gray-600 mb-3">
            Una cookie es un pequeño archivo que se almacena en tu computador con tu permiso. Su función es recopilar
            información sobre el uso de nuestra plataforma y ayudarte a personalizar tu experiencia.
          </p>
          <p className="text-gray-600">Utilizamos cookies para:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Identificar las secciones que visitas.</li>
            <li>Guardar la información necesaria para recuperar tus datos y preferencias.</li>
            <li>Realizar análisis estadísticos y mejorar continuamente tu experiencia de usuario.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Enlaces a terceros</h3>
          <p className="text-gray-600">
            Nuestra plataforma puede contener enlaces a otros sitios web que podrían ser de tu interés. Al hacer clic en
            estos enlaces y abandonar nuestro sitio, debes tener en cuenta que ya no tenemos control sobre ese nuevo
            sitio. Por lo tanto, no somos responsables por la protección y privacidad de tus datos en dichos sitios, los
            cuales están sujetos a sus propias políticas. Te recomendamos revisarlas para asegurarte de estar de acuerdo
            con sus términos.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Control de tu información personal</h3>
          <p className="text-gray-600">
            Tienes el control sobre tus datos. En cualquier momento, puedes restringir la recopilación o el uso de tu
            información.
          </p>
          <p className="text-gray-600">
            Viviendachile no venderá, cederá ni distribuirá tu información personal a terceros sin tu consentimiento, a
            menos que sea requerido por una orden judicial.
          </p>
          <p className="text-gray-600">
            Nos reservamos el derecho de modificar los términos de esta Política de Privacidad en cualquier momento.
          </p>
        </section>
      </div>
    ),
  },
  terms: {
    title: "Términos y Condiciones Generales de Servicio de Viviendachile",
    content: (
      <div className="space-y-6">
        <section>
          <p className="text-gray-600">
            El presente documento establece los Términos y Condiciones Generales que regulan la relación comercial
            entre Viviendachile y sus clientes, sean estos personas naturales o jurídicas. El uso de los servicios de
            Viviendachile implica la aceptación plena de estos Términos.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">1. Naturaleza de los Servicios</h3>
          <p className="text-gray-600">
            Viviendachile es una empresa dedicada a la prestación de servicios de asesoría inmobiliaria, corretaje de
            propiedades, gestión de financiamiento y asistencia legal en operaciones de compraventa, arriendo y
            tasación de inmuebles en el territorio nacional. Los servicios se prestan bajo el mandato del Cliente, quien
            confiere a la Empresa la facultad de intermediar y gestionar en su nombre.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">2. Obligaciones de Viviendachile</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>
              <span className="font-medium">Asesoría Profesional:</span> Brindar una asesoría diligente y profesional,
              informando al Cliente sobre las condiciones del mercado, los procesos legales y los riesgos asociados a la
              operación inmobiliaria.
            </li>
            <li>
              <span className="font-medium">Confidencialidad:</span> Mantener la confidencialidad de la información
              proporcionada por el Cliente, utilizándola exclusivamente para los fines del mandato.
            </li>
            <li>
              <span className="font-medium">Promoción y Gestión:</span> Realizar las gestiones de promoción y difusión
              de la propiedad (en caso de venta o arriendo) en plataformas online y otros medios, de acuerdo a lo
              pactado.
            </li>
            <li>
              <span className="font-medium">Transparencia:</span> Informar al Cliente de manera oportuna sobre el estado
              de las negociaciones, visitas de interesados y cualquier avance relevante en el proceso.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">3. Obligaciones del Cliente</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>
              <span className="font-medium">Información Veraz:</span> Proporcionar a Viviendachile toda la información y
              documentación veraz, completa y actualizada sobre la propiedad o sus requisitos de búsqueda.
            </li>
            <li>
              <span className="font-medium">Acceso a la Propiedad:</span> Permitir el acceso a la propiedad para
              tasaciones, fotografías, grabaciones de video y visitas de potenciales interesados, en horarios y
              condiciones previamente acordadas.
            </li>
            <li>
              <span className="font-medium">Exclusividad (si aplica):</span> En caso de optar por un mandato con
              cláusula de exclusividad, el Cliente se compromete a no encargar a otra persona o empresa la misma gestión
              durante la vigencia del contrato.
            </li>
            <li>
              <span className="font-medium">Pago de Honorarios:</span> Pagar los honorarios o comisiones pactados en el
              contrato de prestación de servicios, en los plazos y formas estipulados.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">4. Honorarios y Comisiones</h3>
          <p className="text-gray-600">
            Los honorarios de Viviendachile, que constituyen la remuneración por sus servicios, serán acordados y
            establecidos en un contrato de prestación de servicios específico para cada operación. Estos honorarios se
            basarán en un porcentaje del precio final de la compraventa o en un porcentaje del valor del contrato de
            arriendo, según corresponda.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">5. Responsabilidad</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>
              Viviendachile actúa como un intermediario y gestor. No es responsable por vicios ocultos de las
              propiedades ni por la solvencia de las partes en una operación, aunque pondrá su máxima diligencia en la
              verificación de los antecedentes.
            </li>
            <li>
              La Empresa no será responsable por pérdidas o daños que no sean consecuencia directa e inmediata del
              incumplimiento de sus obligaciones contractuales.
            </li>
            <li>
              El Cliente es el único responsable por la veracidad de la información y la documentación que entrega a
              Viviendachile.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">6. Propiedad Intelectual</h3>
          <p className="text-gray-600">
            Todo el material creado por Viviendachile para la promoción de las propiedades (fotografías, videos, textos,
            etc.) es propiedad intelectual de la Empresa y no podrá ser utilizado por el Cliente o terceros sin
            autorización expresa.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">7. Protección de Datos y Privacidad</h3>
          <p className="text-gray-600">
            Al utilizar los servicios, el Cliente acepta que Viviendachile recopile, almacene y procese sus datos
            personales de acuerdo con su Política de Privacidad, con el fin de gestionar la operación, mejorar los
            servicios y enviar comunicaciones de marketing. La Empresa se compromete a proteger los datos personales de
            acuerdo con la Ley N°19.628 sobre Protección de la Vida Privada.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">8. Duración y Terminación del Servicio</h3>
          <p className="text-gray-600 mb-3">La duración del mandato será la pactada en el contrato de servicios. El contrato podrá terminar por:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Cumplimiento de la operación.</li>
            <li>Mutuo acuerdo de las partes.</li>
            <li>Incumplimiento grave de las obligaciones de cualquiera de las partes.</li>
            <li>Expira el plazo del contrato de servicios.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">9. Jurisdicción y Resolución de Conflictos</h3>
          <p className="text-gray-600">
            Cualquier controversia o disputa derivada de la interpretación o ejecución de estos Términos será resuelta
            por los tribunales ordinarios de justicia de la comuna de Santiago. El Cliente y Viviendachile fijan su
            domicilio en la comuna de Santiago para todos los efectos legales.
          </p>
        </section>
      </div>
    ),
  },
};


  const { title, content: modalContent } = content[type]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white rounded-2xl border border-gray-200 dark:border-slate-700 shadow-2xl p-6">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-2xl font-bold ">
            {title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="px-6 py-4">
              {modalContent}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default LegalModal
