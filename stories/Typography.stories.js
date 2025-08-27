import tokens from '../tokens.json';

export default {
  title: 'Design Tokens/Typography',
};

export const TypeScale = () => {
  const fonts = tokens.global.fontFamilies;
  const sizes = tokens.global.fontSize;
  
  return `
    <div style="padding: 20px;">
      <h2>Font Families</h2>
      ${Object.entries(fonts).map(([name, font]) => `
        <p style="font-family: ${font.$value}">${name}: The quick brown fox jumps over the lazy dog</p>
      `).join('')}
      
      <h2>Font Sizes</h2>
      ${Object.entries(sizes).map(([name, size]) => `
        <p style="font-size: ${size.$value}px">${name} - ${size.$value}px</p>
      `).join('')}
    </div>
  `;
};
