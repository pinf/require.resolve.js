
const ASSERT = require("assert");
const PATH = require("path");
const RESOLVE = require(".")(module);


describe('require.resolve.js', function () {

    it('Resolve sync', function () {
        ASSERT.equal(
            RESOLVE('require.resolve.js'),
            PATH.join(__dirname, 'require.resolve.js')
        );
    });

    it('Resolve async', async function () {
        ASSERT.equal(
            await RESOLVE.async('require.resolve.js'),
            PATH.join(__dirname, 'require.resolve.js')
        );        
    });

    it('Resolve missing module', async function () {
        try {
            RESOLVE('__Will_never_find_this_module__');
        } catch (err) {
            ASSERT.equal(
                err.message,
                `Cannot find module '__Will_never_find_this_module__' from '${__dirname}'`
            );
        }
        try {
            await RESOLVE.async('__Will_never_find_this_module__');
        } catch (err) {
            ASSERT.equal(
                err.message,
                `Cannot find module '__Will_never_find_this_module__' from '${__dirname}'`
            );
        }
    });

});
