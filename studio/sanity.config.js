import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { deskStructure } from './deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Maranatha Papelería',

  projectId: 'yajv6uzt',
  dataset: 'production',

  plugins: [
    structureTool({
      title: 'Catálogo',
      structure: deskStructure,
    }),
    visionTool({
      title: 'Explorador GROQ',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
