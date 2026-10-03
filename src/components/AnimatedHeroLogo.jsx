import React from 'react';

/**
 * AnimatedHeroLogo
 * Emblema vectorial oficial de Maranatha:
 * - Unicornio con respiración natural (inclinación suave con pivote fijo en SVG sin transform-box)
 * - Estrellas matemáticas con centro exacto en (0,0) (destello y rotación libre sin layout thrashing)
 */
export default function AnimatedHeroLogo({ className = 'w-full h-full' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2144.43 3657.71 17392.62 17392.62"
      className={`${className} overflow-visible`}
      style={{
        overflow: 'visible',
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        imageRendering: 'optimizeQuality',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
      aria-label="Maranatha Emblema Oficial Animado"
      role="img"
    >
      {/* 1. Círculo exterior lavanda oficial */}
      <circle cx="10840.74" cy="12354.02" r="8696.31" fill="#E7D1FF" />

      {/* 2. Círculo interior blanco puro */}
      <circle cx="10840.74" cy="12354.02" r="7657.3" fill="#FEFEFE" />

      {/* 3. Unicornio Oficial en Morado Puro con inclinación y respiración orgánica */}
      <g className="animate-unicorn-breath">
        <path
          fill="#7E04A1"
          d="M9413.17 6629.69c-374.96,-442.66 -716.82,-903.9 -1074.74,-1361.85 -179.76,443.21 -349.51,1002.47 -302.38,1733.86 17.94,278.31 -251.32,756.51 -355.57,931.23 -164.78,276.37 -323.75,535.67 -495.71,806.09 -286.59,450.76 -1919.27,2939.31 -1922.05,3275.52 -3.99,478.88 688.1,1237.49 1343.22,1134.82 402.64,-63.1 1162.17,-599.08 1575.16,-794.77 151.72,-71.9 329.09,-12.42 517.84,-10.79 1428.68,12.43 2151.39,-1469.69 1849.52,-2329.51 -89.4,275.83 -131.43,488.6 -269.19,736.49 -155.6,279.95 -269.85,356.15 -440.79,537 -598.22,632.87 -1607.45,317.86 -1767.92,390.28l-895.8 492.59c-101.35,54.69 -500,273.62 -618.37,283.22 -249.77,20.24 -529.11,-229.07 -563.92,-389.78 -28.11,-129.69 603.8,-1048.37 709.2,-1214.21 259.98,-408.86 515.18,-808.99 774.38,-1218.25 188.81,-298.13 1056.06,-1625.9 1097.82,-1918.76 42.67,-299.35 65.95,-630.86 103.05,-937.12 147.43,151.41 205.32,297.69 332.43,443.75 471.21,541.36 706.72,663.84 1422.73,923.81 1763.56,640.26 2731.23,481.43 4112.54,2113.12 612.62,723.69 918.64,1478.43 976.63,2486.57 103.77,1805.09 -1069.3,3724.79 -2093.03,4726.33 -1347.04,1317.81 -3172.16,1756.49 -3760.95,2052.63 724.64,111.94 1704.95,-71.22 2346.16,-231.25 546.97,-136.57 1505.87,-504.83 1961.63,-816.33 298.4,-203.93 531.01,-365.24 809.97,-611.4 267.26,-235.87 475.64,-465.46 718.63,-772.43 440.52,-556.53 821.03,-1364.63 1021.24,-2129.27 375.18,-1432.74 290.03,-3345.33 -555.33,-4599.76 -331.44,-491.87 -180.07,-320.18 -611.57,-809.8 -448.62,-508.99 -1121.4,-969.56 -1750.83,-1289.73 -694.03,-353.06 -1287.96,-519.51 -1899.9,-677.56 -880.48,-227.46 -1687.71,-256.19 -2294.1,-954.74z"
        />
        {/* Cuerno que sobresale con orgullo de la margen circular del emblema */}
        <polygon
          fill="#7E04A1"
          points="7824.49,7515.32 3779.63,6020.09 7213.28,8483.3"
        />
      </g>

      {/* 4. Estrella 1 (Grande): Centrada matemáticamente en (0,0) */}
      <g transform="translate(11020.35, 15989.45)">
        <g className="animate-star-twinkle-1">
          <path
            fill="#7E04A1"
            d="M1447.33 0c-1085.5,199.83 -1247.5,361.83 -1447.33,1447.33 -199.84,-1085.5 -361.84,-1247.5 -1447.34,-1447.33 1085.5,-199.84 1247.5,-361.83 1447.33,-1447.34 199.84,1085.51 361.84,1247.5 1447.34,1447.34z"
          />
        </g>
      </g>

      {/* 5. Estrella 2 (Pequeña): Centrada matemáticamente en (0,0) */}
      <g transform="translate(12307.33, 14791.13)">
        <g className="animate-star-twinkle-2">
          <path
            fill="#7E04A1"
            d="M774.26 0c-580.7,106.9 -667.36,193.57 -774.26,774.27 -106.91,-580.7 -193.57,-667.37 -774.27,-774.27 580.7,-106.9 667.36,-193.57 774.26,-774.27 106.91,580.7 193.57,667.37 774.27,774.27z"
          />
        </g>
      </g>
    </svg>
  );
}
