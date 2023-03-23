// ==UserScript==
// @name         Misskey 絵文字の不要カテゴリ削除
// @namespace    https://misskey.io/@_kanade_
// @version      1.0.0
// @description  Misskey 絵文字の不要カテゴリ削除
// @author       kanade
// @license      MIT
// @match        https://misskey.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=misskey.io
// @grant        none
// @run-at       document-idle
// ==/UserScript==

const ms = 3000;

(function() {
    'use strict';
    document.addEventListener('keydown', detectShortcutKey);


    setTimeout(() => {
        removeUnnecessaryCategories();
        let btn = document.querySelectorAll('.post, .xbaFh.xfjt2.x2hCn.xze7V.xlA8v, .xviCy');

        for(let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', function() {
                clickEmojis();
            }, false);
        }
    }, ms);

    function clickEmojis() {
            setTimeout(() => {
                let element = document.querySelector(".xpDI4.xxtDg._popup");
                if(element != null) {
                    document.addEventListener('click', removeEmojiCategories);
                }
            }, 100);
    }

    function removeEmojiCategories(e){
        document.querySelectorAll('.emojis > .group:nth-last-child(2) > section').forEach(function(element) {
            if(!
                /Blob|ウンチゲボザウルス/
                .test(element.innerText)) {
                    element.remove();
            }
        });
    }

    function detectShortcutKey(e){
        let keyCodeN = 78;
        let keyCodeP = 80;

        let obj = document.activeElement;
        if(obj.tagName.toLowerCase() == 'input' || obj.tagName.toLowerCase() == 'textarea') {
            return;
        }

        if((e.keyCode == keyCodeN || e.keyCode == keyCodeP)) {
            clickEmojis();
            preventEvent(e);
            return;
        }
        return;
    }

    function preventEvent(key_event) {
        if (key_event.stopPropagation) {
            key_event.stopPropagation();
            key_event.preventDefault();
        }
    }
})();
