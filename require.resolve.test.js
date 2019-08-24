
const ASSERT = require("assert");
const PATH = require("path");
const RESOLVE = require(".");


describe('require.resolve.js', function () {

    function forContext (ctx) {

        const resolve = RESOLVE(ctx);

        it('Resolve sync', function () {
            ASSERT.equal(
                resolve('require.resolve.js'),
                PATH.join(__dirname, 'require.resolve.js')
            );
        });
    
        it('Resolve async', async function () {
            ASSERT.equal(
                await resolve.async('require.resolve.js'),
                PATH.join(__dirname, 'require.resolve.js')
            );        
        });
    
        it('Resolve missing module', async function () {
            try {
                resolve('__Will_never_find_this_module__');
            } catch (err) {
                ASSERT.equal(
                    err.message,
                    `Cannot find module '__Will_never_find_this_module__' from '${__dirname}'`
                );
            }
            try {
                await resolve.async('__Will_never_find_this_module__');
            } catch (err) {
                ASSERT.equal(
                    err.message,
                    `Cannot find module '__Will_never_find_this_module__' from '${__dirname}'`
                );
            }
        });
    }

    describe('for module', function () {
        forContext(module);
    });

    describe('for __dirname', function () {
        forContext(__dirname);
    });

});
