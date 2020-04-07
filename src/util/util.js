export function checkEmail(email) {
    const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

    return emailReg.test(email);
}

export function safeHtml(a) { //转译html代码
    var s = "";
    for (var i = 0; i < a.length; i++) {
        var arg = String(a);
        s = arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return s;
}

export function setDocTitle(title) {
    document.title = title;
}