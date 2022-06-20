

/**
 * @param {string} specifier
 * @param {{
 *   conditions: string[],
 *   parentURL: string | undefined,
 * }} context
 * @param {Function} defaultResolve
 * @returns {Promise<{ url: string }>}
 */
export function resolve(specifier, context, defaultResolve) {
    const { parentURL = null } = context;

    if (specifier.includes("pixi.js")) {
        try {
            let resolve = defaultResolve("pixi-mock.js", context, defaultResolve);
            return resolve
        } catch (err) {
            console.error('cannot resolve pixi-mock.js import')
            console.error(err)
            console.error('please, try install dependency:')
            console.error('npm install --save ./test/pixi-mock/')
            process.exit(0);
        }
    } else 
        return defaultResolve(specifier, context, defaultResolve); 
  }
  