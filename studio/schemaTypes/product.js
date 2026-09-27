import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Producto',
      type: 'string',
      description: 'Ej: Cajas Temáticas & Dulceros Personalizados, Stickers Troquelados...',
      validation: (Rule) => Rule.required().error('El nombre del producto es obligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Identificador)',
      type: 'slug',
      description: 'Identificador URL del producto (ej: cajas-personalizadas)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('El slug es obligatorio'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Breve Especificación',
      type: 'string',
      description: 'Ej: Diseño en relieve 3D, shaker y acabados de autor',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Detallada (Modal)',
      type: 'text',
      rows: 3,
      description: 'Texto descriptivo que aparece al abrir la vista rápida',
    }),
    defineField({
      name: 'price',
      title: 'Precio Visible (Texto)',
      type: 'string',
      description: 'Texto exacto con formato comercial (ej: Desde $2.800 COP o Desde $28.000 / 50 und)',
      validation: (Rule) => Rule.required().error('El precio visible es obligatorio'),
    }),
    defineField({
      name: 'priceNum',
      title: 'Precio Numérico (COP)',
      type: 'number',
      description: 'Valor numérico entero para ordenar por precio (ej: 2800 o 28000)',
    }),
    defineField({
      name: 'unit',
      title: 'Unidad de Medida',
      type: 'string',
      description: 'Ej: unidad, 50 unidades, paquete x 50 und, metro cuadrado',
    }),
    defineField({
      name: 'category',
      title: 'Categoría Principal',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Selecciona la línea de papelería a la que pertenece',
      validation: (Rule) => Rule.required().error('Debes asignar una categoría'),
    }),
    defineField({
      name: 'image',
      title: 'Fotografía en Alta Resolución',
      type: 'image',
      description: 'Fotografía oficial del producto (soporta WebP, PNG, JPG)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('La fotografía del producto es obligatoria'),
    }),
    defineField({
      name: 'alt',
      title: 'Texto Alternativo (Accesibilidad & SEO)',
      type: 'string',
      description: 'Descripción de la foto para lectores de pantalla y Google Imágenes',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Mensaje Personalizado de WhatsApp',
      type: 'string',
      description: 'Texto que se enviará automáticamente cuando el cliente dé clic en Cotizar',
      initialValue: 'Hola Maranatha 👋, quisiera cotizar este producto.',
    }),
    defineField({
      name: 'isFeatured',
      title: '¿Destacar en la Página Principal?',
      type: 'boolean',
      description: 'Activa esta casilla para mostrar este producto en las 3 tarjetas de la Home (CoreCatalog)',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Orden dentro de la categoría (1, 2, 3...)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
      categoryTitle: 'category.title',
    },
    prepare({ title, subtitle, media, categoryTitle }) {
      return {
        title,
        subtitle: `${subtitle || ''} ${categoryTitle ? `• ${categoryTitle}` : ''}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Por Categoría y Orden',
      name: 'categoryAndOrderAsc',
      by: [
        { field: 'category._ref', direction: 'asc' },
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Nombre (A - Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Precio: Menor a Mayor',
      name: 'priceNumAsc',
      by: [{ field: 'priceNum', direction: 'asc' }],
    },
    {
      title: 'Precio: Mayor a Menor',
      name: 'priceNumDesc',
      by: [{ field: 'priceNum', direction: 'desc' }],
    },
    {
      title: 'Destacados Primero',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
