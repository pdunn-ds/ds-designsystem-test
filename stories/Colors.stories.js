import tokens from '../tokens.json';

export default {
  title: 'Design Tokens/Colors',
};

export const ColorPalette = () => {
  const colors = tokens.global;
  
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; padding: 20px;">
      ${Object.entries(colors)
        .filter(([key, value]) => value.$type === 'color')
        .map(([name, token]) => `
          <div style="text-align: center;">
            <div style="width: 100%; height: 100px; background: ${token.$value}; border-radius: 8px; border: 1px solid #ddd;"></div>
            <h4>${name}</h4>
            <code>${token.$value}</code>
          </div>
        `).join('')}
    </div>
  `;
};
