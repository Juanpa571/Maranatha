import React from 'react';
import SubpageHeader from './SubpageHeader';

/**
 * Header
 * Componente Header adaptativo unificado.
 * Exporta el Header con soporte para sincronización de tema dinámico ('light' | 'dark').
 */
export default function Header(props) {
  return <SubpageHeader {...props} />;
}

export { Header };
