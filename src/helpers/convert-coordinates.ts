/**
 * Permet de convertir des coordonnées Lambert 93 en WGS84.
 */
export const lambert93toWGPS = (lambertE: number, lambertN: number) => {
  const constantes = {
    GRS80E: 0.081819191042816,
    LONG_0: 3,
    XS: 700000,
    YS: 12655612.0499,
    n: 0.725607765053267,
    C: 11754255.4261,
  };

  const delX = lambertE - constantes.XS;
  const delY = lambertN - constantes.YS;
  const gamma = Math.atan(-delX / delY);
  const R = Math.sqrt(delX * delX + delY * delY);
  const latiso = Math.log(constantes.C / R) / constantes.n;
  const sinPhiit0 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * Math.sin(1)));
  const sinPhiit1 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit0));
  const sinPhiit2 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit1));
  const sinPhiit3 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit2));
  const sinPhiit4 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit3));
  const sinPhiit5 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit4));
  const sinPhiit6 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit5));

  const longRad = Math.asin(sinPhiit6);
  const latRad = gamma / constantes.n + (constantes.LONG_0 / 180) * Math.PI;

  const longitude = (latRad / Math.PI) * 180;
  const latitude = (longRad / Math.PI) * 180;

  return { longitude, latitude };
};
