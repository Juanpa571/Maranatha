import { FolderIcon, PackageIcon, StarIcon, TagIcon } from '@sanity/icons';

export const deskStructure = (S) =>
  S.list()
    .title('Catálogo Maranatha')
    .items([
      // 1. Productos agrupados y ordenados por Categoría (Drill-down limpio)
      S.listItem()
        .title('Productos por Categoría')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('category')
            .title('Selecciona una Categoría')
            .child((categoryId) =>
              S.documentList()
                .title('Productos de la Categoría')
                .filter('_type == "product" && category._ref == $categoryId')
                .params({ categoryId })
                .defaultOrdering([
                  { field: 'order', direction: 'asc' },
                  { field: 'title', direction: 'asc' },
                ])
            )
        ),

      // 2. Destacados en la Home (CoreCatalog)
      S.listItem()
        .title('Destacados en la Home')
        .icon(StarIcon)
        .child(
          S.documentList()
            .title('Destacados en la Home (isFeatured)')
            .filter('_type == "product" && isFeatured == true')
            .defaultOrdering([
              { field: 'order', direction: 'asc' },
              { field: 'title', direction: 'asc' },
            ])
        ),

      // 3. Todos los Productos (Lista general completa)
      S.listItem()
        .title('Todos los Productos')
        .icon(PackageIcon)
        .schemaType('product')
        .child(
          S.documentTypeList('product')
            .title('Todos los Productos')
            .defaultOrdering([
              { field: 'category._ref', direction: 'asc' },
              { field: 'order', direction: 'asc' },
              { field: 'title', direction: 'asc' },
            ])
        ),

      S.divider(),

      // 4. Gestión directa de Categorías (SEO, banners y titulares)
      S.listItem()
        .title('Gestión de Categorías')
        .icon(TagIcon)
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categorías de Papelería')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
    ]);
