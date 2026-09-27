import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Categoría',
      type: 'string',
      description: 'Ej: Papelería Creativa, Insumos de Papelería, Papelería Empresarial',
      validation: (Rule) => Rule.required().error('El título de la categoría es obligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Identificador único para la URL (ej: papeleria-creativa)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('El slug es obligatorio para la navegación'),
    }),
    defineField({
      name: 'alias',
      title: 'Alias alternativo de URL',
      type: 'string',
      description: 'Opcional. Para redirecciones o enlaces antiguos (ej: insumos-papeleria)',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO para Google',
      type: 'string',
      description: 'Título visible en la pestaña del navegador y motores de búsqueda',
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Título de Sección',
      type: 'string',
      description: 'Encabezado principal visible al ingresar a la página de categoría',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Subtítulo de Sección',
      type: 'string',
      description: 'Bajada descriptiva que acompaña al título de sección',
    }),
    defineField({
      name: 'headline',
      title: 'Titular de Apertura (Línea 1)',
      type: 'string',
      description: 'Ej: Papelería Creativa,',
    }),
    defineField({
      name: 'subheadline',
      title: 'Titular de Apertura (Línea 2 con énfasis)',
      type: 'string',
      description: 'Ej: ¡detalles únicos para celebrar y regalar en Cali!',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Editorial',
      type: 'text',
      rows: 3,
      description: 'Párrafo explicativo para clientes y optimización SEO en Cali',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Imagen Banner de Fondo',
      type: 'image',
      description: 'Fotografía representativa para la tarjeta en la página principal',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Número para ordenar las pestañas (1, 2, 3...)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'bannerImage',
    },
  },
});
