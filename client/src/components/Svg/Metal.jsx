import React from 'react';

const MetalSvg = (props) => {
  return (
    <svg
      fill={props.color || "#000000"}
      height={props.size || "22px"}
      width={props.size || "22px"} 
      viewBox="0 0 128 128"
      {...props}
    >
      <path d="M123.415,17.06A16.823,16.823,0,0,0,110.94,4.585a1.752,1.752,0,0,0-1.6.537L98.771,16.6a1.752,1.752,0,0,0-.354,1.792c.006.014.453,1.511-1.283,3.248L75.98,42.569l-.015.013-.012.014L60.588,57.8c-1.778-1.027-5.253-3.844-3.87-9.719,1.44-6.123-.725-8.232-2.144-8.944-2.776-1.392-6.782.342-10.211,4.421-2.634,3.132-3.895,6.665-5.114,10.081-2.27,6.355-4.062,11.375-14.206,11.637-8.359.216-16.236,5.475-19.156,12.789C3.718,83.5,2.372,94.907,17.733,110.267c10.425,10.426,19.03,13.155,25.183,13.155a18.878,18.878,0,0,0,7.023-1.309c7.314-2.92,12.573-10.8,12.789-19.156.262-10.144,5.282-11.936,11.637-14.206,3.416-1.219,6.949-2.48,10.081-5.114,4.078-3.428,5.813-7.436,4.421-10.211-.712-1.419-2.821-3.584-8.944-2.144-5.88,1.386-8.684-2.057-9.721-3.868l36.155-36.548c1.7-1.7,3.132-1.317,3.248-1.283a1.752,1.752,0,0,0,1.792-.354l11.481-10.567A1.75,1.75,0,0,0,123.415,17.06ZM84.173,48.315l-4.488-4.488,8.8-8.709,4.392,4.392ZM71.6,61.025,66.975,56.4,77.2,46.289,81.711,50.8ZM54.818,77.988l-4.806-4.806,14.475-14.32,4.651,4.651Zm25.907-3.3c3.432-.808,4.766-.187,5.014.307.424.846-.409,3.326-3.545,5.962-2.65,2.228-5.881,3.382-9.006,4.5-6.7,2.393-13.634,4.868-13.959,17.41-.148,5.728-3.524,13.177-10.587,16-8,3.2-18.1-.737-28.434-11.07S5.943,87.361,9.138,79.358c2.819-7.063,10.268-10.439,16-10.587,12.542-.325,15.017-7.256,17.41-13.959,1.116-3.125,2.27-6.356,4.5-9.006,2.637-3.136,5.12-3.967,5.962-3.545.494.248,1.114,1.583.307,5.014-1.573,6.685,1.669,10.942,4.723,13.047L46.3,71.931a1.749,1.749,0,0,0-.006,2.481l7.3,7.295a1.746,1.746,0,0,0,1.237.513h0a1.751,1.751,0,0,0,1.239-.519L67.678,69.966C69.784,73.018,74.041,76.26,80.725,74.689ZM95.344,37.022l-4.366-4.366,7.386-7.307,4.287,4.287Zm14.334-10.968a6.883,6.883,0,0,0-4.434,1.225l-4.523-4.523a6.877,6.877,0,0,0,1.225-4.434l9.245-10.046a13.44,13.44,0,0,1,8.533,8.533Z" fill="#241c49" stroke="#0a2119" stroke-miterlimit="10"/>
    <path d="M46.74,88.839a1.75,1.75,0,1,0,2.475-2.475l-7.579-7.579a1.75,1.75,0,0,0-2.475,2.475Z" fill="#241c49" stroke="#0a2119" stroke-miterlimit="10"/>
    <path d="M53.883,93.507l-5.341,5.34-5.507.447-14.9-14.9a1.748,1.748,0,0,0-2.474,0l-4.8,4.8a1.751,1.751,0,0,0,0,2.475l15.474,15.474a1.752,1.752,0,0,0,2.475,0l4.341-4.341,6.313-.513a1.744,1.744,0,0,0,1.1-.507l5.8-5.8a1.749,1.749,0,1,0-2.474-2.474Zm-16.308,9.917-13-13,2.32-2.32,13,13Z" fill="#241c49" stroke="#0a2119" stroke-miterlimit="10"/>
    </svg>
  );
};

export default MetalSvg;
