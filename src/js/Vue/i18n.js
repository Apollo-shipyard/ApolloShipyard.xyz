import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n();

const defaultLang = 'en';
const userLang = localStorage.getItem('language');
const browserLang = window.navigator.language.slice(0, 2);

const loadedLanguages = [];
const staticData = {
    'en': () => uniteLocFiles([
        import(/* webpackChunkName: "en-lang-1" */ `@Data/loc_strings_en.js`),
        import(/* webpackChunkName: "en-lang-2" */ `../../i18n/en.json`),
    ]),
};

if (userLang) {
    loadLanguage(userLang);
} else if (browserLang in staticData) {
    loadLanguage(browserLang);
} else {
    loadLanguage(defaultLang);
}

/**
 * 123
 * @param {Array<Object>} promises
 * @return {Promise<Object>}
 */
async function uniteLocFiles(promises) {
    return await Promise.all(promises)
        .then((files) => files
            .reduce((acc, module) => ({
                ...acc,
                ...module.default,
            }), {}),
        );
}
/**
 * 123
 * @param {String} key
 * @return {Promise<void>}
 */
async function loadLanguage(key) {
    if ((i18n.locale === key) || loadedLanguages.includes(key)) {
        i18n.locale = key;
        return;
    }
    const loc = await staticData[key]()
        .catch(console.error);

    i18n.setLocaleMessage(key, loc);
    i18n.locale = key;
    loadedLanguages.push(key);
    console.info(`${key.toUpperCase()} language loaded`, loc);
}

export default i18n;
export { loadLanguage };
