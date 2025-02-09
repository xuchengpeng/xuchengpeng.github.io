function initSearch() {
var elSearchBox = document.querySelector(".search"),
    elSearchBtn = document.querySelector(".search-start"),
    elSearchClear = document.querySelector(".search-clear"),
    elSearchInput = document.querySelector(".search-input"),
    elSearchResults = document.querySelector(".search-results"),
    searchValue = "",
    arrItems = [],
    arrContents = [],
    arrLinks = [],
    arrTitles = [],
    arrResults = [],
    indexItem = [],
    itemLength = 0,
    tmpDiv = document.createElement("div"),
    tmpAnchor = document.createElement("a"),
    isSearchFocused = !1,
    xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

function searchConfirm() {
    if ("" == elSearchInput.value)
        searchClear();
    else if (elSearchInput.value.search(/^\s+$/) >= 0) {
        searchInit();
        var e = tmpDiv.cloneNode(!0);
        e.innerText = "请输入有效内容...",
        elSearchResults.appendChild(e)
    } else
        searchInit(),
        searchValue = elSearchInput.value,
        searchMatching(arrTitles, arrContents, searchValue)
}

function searchClear() {
    elSearchInput.value = "",
    elSearchClear.style.display = "none",
    elSearchResults.style.display = "none"
}

function searchInit() {
    arrResults = [],
    indexItem = [],
    elSearchResults.innerHTML = "",
    elSearchClear.style.display = "block",
    elSearchResults.style.display = "block"
}

function searchMatching(e, t, r) {
    var a;
    try {
        a = new RegExp(r,"i")
    } catch (e) {
        var l = tmpDiv.cloneNode(!0);
        return l.innerHTML = '正则表达式语法错误，特殊符号前考虑加上转义符："&Backslash;"',
        l.className = "pink-text result-item",
        void elSearchResults.appendChild(l)
    }
    for (i = 0; i < itemLength; i++) {
        var s, n, c = e[i].search(a), h = t[i].search(a);
        if (-1 !== c || -1 !== h) {
            -1 !== c ? (s = c, n = e) : (s = h, n = t), indexItem.push(i);
            var o = n[i].match(a)[0].length;
            arrResults.push(n[i].slice(s - 20, s) + "<mark>" + n[i].slice(s, s + o) + "</mark>" + n[i].slice(s + o, s + o + 50))
        }
    }
    var u = tmpDiv.cloneNode(!0);
    if (u.className = "result-title",
        u.innerHTML = "总匹配：<b>" + indexItem.length + "</b> 项",
        elSearchResults.appendChild(u),
        0 == indexItem.length) {
        var d = tmpDiv.cloneNode(!0);
        d.innerText = "未匹配到内容...",
        d.className = "teal-text text-darken-3 result-item",
        elSearchResults.appendChild(d)
    }
    for (i = 0; i < arrResults.length; i++) {
        var m = tmpDiv.cloneNode(!0),
            p = tmpDiv.cloneNode(!0),
            S = tmpDiv.cloneNode(!0),
            v = tmpAnchor.cloneNode(!0);
        m.className = "result-item",
        p.className = "result-item-title",
        S.className = "result-item-detail",
        v.className = "blue-text",
        p.innerText = e[indexItem[i]],
        v.innerHTML = arrResults[i],
        v.href = arrLinks[indexItem[i]],
        m.appendChild(p),
        S.appendChild(v),
        m.appendChild(S),
        elSearchResults.appendChild(m)
    }
}

xhr.onreadystatechange = function() {
    if (4 == xhr.readyState && 200 == xhr.status) {
        var e = xhr.responseXML;
        if (!e)
            return;
        for (arrItems = e.getElementsByTagName("item"),
        itemLength = arrItems.length,
        i = 0; i < itemLength; i++)
            arrContents[i] = arrItems[i].getElementsByTagName("description")[0].childNodes[0].nodeValue.replace(/<.*?>/g, ""),
            arrLinks[i] = arrItems[i].getElementsByTagName("link")[0].childNodes[0].nodeValue.replace(/<.*?>/g, ""),
            arrTitles[i] = arrItems[i].getElementsByTagName("title")[0].childNodes[0].nodeValue.replace(/<.*?>/g, "");
        elSearchBox.style.display = "block"
    }
},
xhr.open("get", "/feed.xml", !0),
xhr.send(),
elSearchBtn.onclick = searchConfirm,
elSearchClear.onclick = searchClear,
elSearchInput.oninput = function() {
    setTimeout(searchConfirm, 0)
},
elSearchInput.onfocus = function() {
    isSearchFocused = !0
},
elSearchInput.onblur = function() {
    isSearchFocused = !1
},
window.addEventListener("load", searchClear),
document.addEventListener("keydown", (function(e) {
    isSearchFocused || "/" === e.key && (e.preventDefault(),
    elSearchInput.focus(),
    window.isSearchFocused = !0)
}
));
}

window.addEventListener("load", initSearch)