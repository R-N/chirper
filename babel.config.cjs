module.exports = {
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { 
            legacy: true, 
            //decoratorsBeforeExport: true 
        }],
        ["@babel/plugin-proposal-class-properties", { 
            loose: true 
        }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    ],
};
