// Mapeo estructurado de fichas de especificaciones táctiles estilo Build in Amsterdam
// Reemplaza tablas largas por tarjetas modulares de alta comprensión visual

export const DEFAULT_SPECS = {
  acabado: {
    label: 'Corte y Acabado',
    value: 'Corte Digital de Precisión',
    detail: 'Bordes milimétricos limpios sin rebabas',
    icon: 'Scissors',
  },
  material: {
    label: 'Material Base',
    value: 'Papeles y Cartulinas Especiales',
    detail: 'Materiales seleccionados de alta densidad',
    icon: 'Layers',
  },
  tiraje: {
    label: 'Tiraje Mínimo',
    value: 'Desde Pocas Unidades',
    detail: 'Sin exigencia de miles como en litografías',
    icon: 'Sparkles',
  },
  entrega: {
    label: 'Taller en Cali',
    value: '2 a 4 Días Hábiles',
    detail: 'Envíos locales o despacho certificado nacional',
    icon: 'Clock',
  },
};

export const PRODUCT_SPECS_MAP = {
  'cajas-personalizadas': {
    acabado: {
      label: 'Acabado Estructural',
      value: 'Relieve 3D & Shaker',
      detail: 'Capas superpuestas, acetato y glitter interactivo',
    },
    material: {
      label: 'Cartulina',
      value: 'Especial 240g – 280g',
      detail: 'Firmeza estructural con remates en lazo de satín',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 10 unidades',
      detail: 'Ideal para fiestas íntimas o eventos grandes',
    },
    entrega: {
      label: 'Producción',
      value: '3 a 5 días hábiles',
      detail: 'Diseño personalizado con aprobación previa',
    },
    finishOptions: ['Relieve 3D Clásico', 'Shaker con Lentejuelas', 'Ventana de Acetato'],
  },
  'stickers-personalizados': {
    acabado: {
      label: 'Tipo de Corte',
      value: 'Die-Cut al Contorno',
      detail: 'Silueta exacta de tu logo o diseño con corte suave',
    },
    material: {
      label: 'Sustrato',
      value: 'Vinilo Adhesivo Impermeable',
      detail: 'Resistente al agua, frío y fricción en empaques',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 50 unidades',
      detail: 'Por referencia o diseño individual',
    },
    entrega: {
      label: 'Producción',
      value: '2 a 4 días hábiles',
      detail: 'Revisión digital por WhatsApp antes de corte',
    },
    finishOptions: ['Vinilo Brillante', 'Vinilo Mate', 'Papel Fotográfico'],
  },
  'kit-cumpleanero': {
    acabado: {
      label: 'Contenido del Kit',
      value: 'Combo Coordinado Completo',
      detail: 'Topper 3D + 20 dulceros temáticos + banderín',
    },
    material: {
      label: 'Materiales',
      value: 'Cartulinas Perladas y Glitter',
      detail: 'Papeles especiales sin desprendimiento de escarcha',
    },
    tiraje: {
      label: 'Configuración',
      value: '1 kit temático completo',
      detail: 'Personalizado con nombre, edad y temática elegida',
    },
    entrega: {
      label: 'Producción',
      value: '4 a 6 días hábiles',
      detail: 'Empacado protector listo para montar en mesa',
    },
    finishOptions: ['Temática Infantil', 'Celebración Adulto', 'Graduación / Baby Shower'],
  },
  'toppers': {
    acabado: {
      label: 'Estructura',
      value: 'Multicapa 3D con Relieve',
      detail: 'Efecto de profundidad con varillas transparentes',
    },
    material: {
      label: 'Soporte',
      value: 'Acrílico Grado Alimenticio',
      detail: 'Cartulinas Sirio Pearl y cartulina espejo dorada/plateada',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 1 unidad',
      detail: 'Diseñado exclusivo para la medida de tu torta',
    },
    entrega: {
      label: 'Producción',
      value: '2 a 3 días hábiles',
      detail: 'Entrega express en Cali disponible',
    },
    finishOptions: ['Dorado Espejo', 'Pastel Multicapa', 'Shaker Interactivo'],
  },
  'tarjeta-agradecimiento': {
    acabado: {
      label: 'Detalle Artesanal',
      value: 'Plegable con Lazo y Marco',
      detail: 'Troquelado calado delicado con moño de satín',
    },
    material: {
      label: 'Papel',
      value: 'Cartulina Fina 240g',
      detail: 'Textura suave ideal para escritura a mano o impresa',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 20 unidades',
      detail: 'Acompañamiento premium para packaging de marcas',
    },
    entrega: {
      label: 'Producción',
      value: '2 a 3 días hábiles',
      detail: 'Diseño coordinado con la paleta de tu marca',
    },
    finishOptions: ['Blanco Puro', 'Lila Pastel', 'Kraft Rústico'],
  },
  'vinilos-adhesivos': {
    acabado: {
      label: 'Formato',
      value: 'Fraccionado por Metro',
      detail: 'Ancho estándar para plotter de corte Cameo y Cricut',
    },
    material: {
      label: 'Calibre',
      value: 'Vinilo Calandrado de Alto Agarre',
      detail: 'Apto para rotulación en vidrio, madera y plástico',
    },
    tiraje: {
      label: 'Mínimo',
      value: 'Desde 1 metro lineal',
      detail: 'Disponibilidad inmediata en taller en Cali',
    },
    entrega: {
      label: 'Despacho',
      value: 'Mismo día o 24 horas',
      detail: 'Entrega directa o recogida en Cali',
    },
    finishOptions: ['Gama Brillante', 'Gama Mate', 'Metalizados'],
  },
  'llavero-acrilico-rectangular': {
    acabado: {
      label: 'Corte',
      value: 'Láser Óptico sin Rebabas',
      detail: 'Cantos pulidos con perforación para argolla',
    },
    material: {
      label: 'Cuerpo',
      value: 'Acrílico Cristal 3mm',
      detail: 'Alta transparencia para vinilo, foto y resina epóxica',
    },
    tiraje: {
      label: 'Mínimo',
      value: 'Desde 12 unidades',
      detail: 'Venta por docenas para artesanos y recuerdos',
    },
    entrega: {
      label: 'Despacho',
      value: 'En stock inmediato',
      detail: 'Incluye argolla metálica niquelada',
    },
    finishOptions: ['Cristal Transparente', 'Espejo Plata', 'Espejo Oro'],
  },
  'llavero-acrilico-redondo': {
    acabado: {
      label: 'Formato',
      value: 'Circular de 5 cm de Diámetro',
      detail: 'Corte circular milimétrico para recuerdos y souvenirs',
    },
    material: {
      label: 'Cuerpo',
      value: 'Acrílico Cristal 3mm',
      detail: 'Superficie lisa lista para sublimación de vinilo o pintura',
    },
    tiraje: {
      label: 'Mínimo',
      value: 'Desde 12 unidades',
      detail: 'Por docena o paquetes de 50 und',
    },
    entrega: {
      label: 'Despacho',
      value: 'En stock inmediato',
      detail: 'Envíos a toda Colombia por transportadora',
    },
    finishOptions: ['Circular 5cm', 'Circular 6cm', 'Circular 4cm'],
  },
  'papel-adhesivo': {
    acabado: {
      label: 'Superficie',
      value: 'Glossy Brillante Fotográfico',
      detail: 'Secado instantáneo con colores vivos de alto contraste',
    },
    material: {
      label: 'Gramaje',
      value: '135 g/m² Tamaño Carta',
      detail: 'Adhesivo permanente de alta adherencia',
    },
    tiraje: {
      label: 'Presentación',
      value: 'Paquete x 50 hojas',
      detail: 'Compatible con impresoras de inyección de tinta caseras',
    },
    entrega: {
      label: 'Disponibilidad',
      value: 'Stock permanente en Cali',
      detail: 'Retiro en taller o mensajería express',
    },
    finishOptions: ['Brillante (Glossy)', 'Satinado', 'Holográfico'],
  },
  'papel-opalina-tamano-carta': {
    acabado: {
      label: 'Textura',
      value: 'Lisa y Mate Libre de Ácido',
      detail: 'Blancura uniforme para impresión nítida y troquelado',
    },
    material: {
      label: 'Gramaje',
      value: '220 g/m² Alto Calibre',
      detail: 'Ideal para tarjetas de presentación, tags e invitaciones',
    },
    tiraje: {
      label: 'Presentación',
      value: 'Paquete x 50 hojas',
      detail: 'Tamaño carta estándar (21.6 x 27.9 cm)',
    },
    entrega: {
      label: 'Disponibilidad',
      value: 'Stock permanente en Cali',
      detail: 'Despacho el mismo día de tu orden',
    },
    finishOptions: ['Blanca 220g', 'Marfil 220g', 'Lino Texturado'],
  },
  'tarjetas-presentacion': {
    acabado: {
      label: 'Protección',
      value: 'Plastificado Mate o Brillo',
      detail: 'Esquinas rectas o redondeadas con acabado sedoso',
    },
    material: {
      label: 'Sustrato',
      value: 'Propalcote 300g Grueso',
      detail: 'Rigidez profesional para máxima durabilidad en mano',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 50 unidades',
      detail: 'Tirajes cortos para emprendedores sin gastar de más',
    },
    entrega: {
      label: 'Producción',
      value: '3 a 5 días hábiles',
      detail: 'Muestra digital aprobada por WhatsApp antes de imprimir',
    },
    finishOptions: ['Laminado Mate', 'Laminado Brillante', 'Reserva UV Localizada'],
  },
  'volantes-publicitarios': {
    acabado: {
      label: 'Impresión',
      value: 'Full Color a 1 o 2 Caras',
      detail: 'Resolución de 2400 DPI con corte guillotina limpio',
    },
    material: {
      label: 'Papel',
      value: 'Propalcote 115g – 150g',
      detail: 'Papel publicitario brillante de alta rotación',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 50 unidades',
      detail: 'Formatos media carta (1/2) o cuarto de pliego (1/4)',
    },
    entrega: {
      label: 'Producción',
      value: '3 a 5 días hábiles',
      detail: 'Envíos en Cali y a todo el Valle del Cauca',
    },
    finishOptions: ['1 Cara (Frente)', '2 Caras (Tiro y Retiro)', 'Media Carta'],
  },
  'pendones-publicitarios': {
    acabado: {
      label: 'Terminación',
      value: 'Tubos de Madera y Cuerda',
      detail: 'Ojetes metálicos perimetrales listos para colgar',
    },
    material: {
      label: 'Sustrato',
      value: 'Lona Banner de 13 Onzas',
      detail: 'Resistente a la intemperie, lluvia y sol directo',
    },
    tiraje: {
      label: 'Formato',
      value: 'Desde 1 metro cuadrado',
      detail: 'Medidas comerciales (ej. 80x120cm, 100x150cm)',
    },
    entrega: {
      label: 'Producción',
      value: '2 a 3 días hábiles',
      detail: 'Entrega enrollada protegida sin arrugas',
    },
    finishOptions: ['Con Tubos y Cuerda', 'Con Ojetes Metálicos', 'Bolsillos Laterales'],
  },
  'etiquetas-ropa': {
    acabado: {
      label: 'Terminación',
      value: 'Perforación de 3mm o 4mm',
      detail: 'Lista para hilo plástico, cordón de yute o cinta',
    },
    material: {
      label: 'Sustrato',
      value: 'Propalcote 300g o Kraft',
      detail: 'Soporte rígido que jerarquiza las prendas de vestir',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 50 unidades',
      detail: 'Ideal para lanzamientos de colección de moda',
    },
    entrega: {
      label: 'Producción',
      value: '3 a 4 días hábiles',
      detail: 'Asesoría en dimensiones para etiquetado textil',
    },
    finishOptions: ['Propalcote Mate 300g', 'Cartulina Kraft Rústica', 'Bordes Redondeados'],
  },
  'carnet-escarapela': {
    acabado: {
      label: 'Presentación',
      value: 'PVC Termosellado Rígido',
      detail: 'Impresión indeleble resistente al roce continuo',
    },
    material: {
      label: 'Accesorios',
      value: 'Escarapela + Yoyo o Cinta',
      detail: 'Cinta satinada de cuello con mosquetón metálico',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 1 unidad',
      detail: 'Para colegios, empresas, eventos y congresos',
    },
    entrega: {
      label: 'Producción',
      value: '1 a 2 días hábiles',
      detail: 'Personalización con foto, datos y código de barras/QR',
    },
    finishOptions: ['Cinta de Cuello', 'Yoyo Retráctil', 'Portacarnet Rígido'],
  },
  'botones-publicitarios': {
    acabado: {
      label: 'Protección',
      value: 'Lámina Mylar Cristal',
      detail: 'Brillo fotográfico con protección contra rayones',
    },
    material: {
      label: 'Estructura',
      value: 'Base Metálica con Alfiler',
      detail: 'Fijación segura en prendas, bolsos y mochilas',
    },
    tiraje: {
      label: 'Pedido Mínimo',
      value: 'Desde 20 unidades',
      detail: 'Diámetro estándar de 5.5 cm de alta visibilidad',
    },
    entrega: {
      label: 'Producción',
      value: '2 a 3 días hábiles',
      detail: 'Ideales para campañas, cumpleaños y eventos de marca',
    },
    finishOptions: ['Diámetro 5.5 cm', 'Diámetro 4.5 cm', 'Diámetro 7.5 cm'],
  },
};

/**
 * Obtiene las 4 fichas de especificaciones táctiles para un producto dado.
 * Si el producto no tiene mapa específico, usa valores inteligentes por categoría o valores por defecto.
 */
export function getProductTactileSpecs(product) {
  if (!product) return DEFAULT_SPECS;
  const id = product.id || product._id;
  if (id && PRODUCT_SPECS_MAP[id]) {
    return PRODUCT_SPECS_MAP[id];
  }

  // Deducción por título/categoría si es un producto dinámico
  const title = (product.title || '').toLowerCase();
  if (title.includes('sticker') || title.includes('etiqueta')) {
    return PRODUCT_SPECS_MAP['stickers-personalizados'];
  }
  if (title.includes('caja') || title.includes('dulcero')) {
    return PRODUCT_SPECS_MAP['cajas-personalizadas'];
  }
  if (title.includes('tarjeta')) {
    return PRODUCT_SPECS_MAP['tarjetas-presentacion'];
  }
  if (title.includes('topper')) {
    return PRODUCT_SPECS_MAP['toppers'];
  }
  if (title.includes('vinilo')) {
    return PRODUCT_SPECS_MAP['vinilos-adhesivos'];
  }

  return DEFAULT_SPECS;
}
