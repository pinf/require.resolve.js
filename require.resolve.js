
module.exports = function (module) {

    const RESOLVE = require('resolve');

    const basedir = module.id.replace(/\/[^\/]+$/, '');
    const dirs = module.paths.map(function (path) {
        return path.replace(/\/node_modules$/, '').replace(/^$/, '/');
    }).concat(module.paths).concat(
        (process.env.NODE_PATH || '').split(':')
    );

    const resolve = function (id) {
        try {
            return RESOLVE.sync(id, {
                basedir: basedir,
                preserveSymlinks: false,
                paths: dirs,
                moduleDirectory: '__Will_never_find_this_dir__'
            });
        } catch (err) {
            if (process.env.DEBUG) {
                console.error(`[require.resolve] ERROR: Cannot find module '${id}' from '${basedir}'`);
                console.error(`[require.resolve] Paths used to resolve '${id}':`, dirs);
            }
            throw err;
        }
    };

    resolve.async = async function (id) {
        try {
            return await new Promise(function (resolve, reject) {
                return RESOLVE(id, {
                    basedir: basedir,
                    preserveSymlinks: false,
                    paths: dirs,
                    moduleDirectory: '__Will_never_find_this_dir__'
                }, function (err, result) {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        } catch (err) {
            if (process.env.DEBUG) {
                console.error(`[require.resolve] ERROR: Cannot find module '${id}' from '${basedir}'`);
                console.error(`[require.resolve] Paths used to resolve '${id}':`, dirs);
            }
            throw err;
        }
    }

    return resolve;
}
