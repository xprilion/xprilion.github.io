/* Loads speechify API */
function loadSpeechify() {
    const paths = window.location.pathname.split('/').filter(val => val.length !== 0);
    const articleId = paths[paths.length - 1].replace(/[\.,\$,\[,\],\#]/g, '-');
    initSpeechify(
        'xprilion',
        articleId,
        '.post-content > p',
        {
            bottom: 40,
            inlineBottomMargin: 32
        },
        {
            highlightingOptions: {
                enabledLanguages: [
                    { languageCode: 'en', highlighting: true },
                    { languageCode: 'hi', highlighting: true },
                    { languageCode: 'zh', highlighting: true },
                    { languageCode: 'fr', highlighting: true },
                    { languageCode: 'es', highlighting: true },
                ],
                selectors: {
                    heading: 'h1.post-title',
                    subHeading: null,
                    chunks: '.post-content > p:not(:has(> img)):not(:last-child), .post-content > h2, .post-content > h3, .post-content > pre, .post-content > blockquote > p'
                }
            }
        }
    ).then(() => { });
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadSpeechify();
});